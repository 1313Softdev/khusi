export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendContactEmails } from '@/lib/mailer';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const isRead = searchParams.get('isRead');
  const search = searchParams.get('search');

  const whereClause: any = {};
  if (isRead !== null && isRead !== undefined && isRead !== '') {
    whereClause.isRead = isRead === 'true';
  }
  if (search) {
    whereClause.OR = [
      { fullName: { contains: search } },
      { email: { contains: search } },
      { mobileNumber: { contains: search } },
      { subject: { contains: search } },
      { message: { contains: search } },
    ];
  }

  const inquiries = await prisma.contactInquiry.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(inquiries);
}

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, mobileNumber, subject, message } = await req.json();

    if (!fullName || !email || !mobileNumber || !subject || !message) {
      return NextResponse.json({ error: 'All fields are mandatory' }, { status: 400 });
    }

    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || '';

    const created = await prisma.contactInquiry.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        mobileNumber: mobileNumber.trim(),
        subject: subject.trim(),
        message: message.trim(),
        ipAddress: typeof ipAddress === 'string' ? ipAddress.split(',')[0] : '127.0.0.1',
        userAgent: userAgent.slice(0, 255),
      },
    });

    // Send emails via SMTP asynchronously without blocking the user
    sendContactEmails({
      fullName,
      email,
      mobileNumber,
      subject,
      message,
    }).catch((e) => console.error('SMTP Background Error:', e));

    return NextResponse.json({ success: true, inquiryId: created.id });
  } catch (err: any) {
    console.error('Contact inquiry error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const id = parseInt(body.id);

    const updated = await prisma.contactInquiry.update({
      where: { id },
      data: {
        isRead: body.isRead !== undefined ? body.isRead : undefined,
        isReplied: body.isReplied !== undefined ? body.isReplied : undefined,
        adminNotes: body.adminNotes !== undefined ? body.adminNotes : undefined,
      },
    });

    await logActivity('UPDATE_INQUIRY', 'Inquiries', `Updated inquiry: ${id}`, admin.userId);
    return NextResponse.json({ success: true, inquiry: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get('id') || '0');

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  await prisma.contactInquiry.delete({ where: { id } });
  await logActivity('DELETE_INQUIRY', 'Inquiries', `Deleted inquiry ID: ${id}`, admin.userId);
  return NextResponse.json({ success: true, message: 'Inquiry deleted' });
}
