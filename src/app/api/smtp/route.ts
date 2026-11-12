import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function GET() {
  const setting = await prisma.smtpSetting.findFirst();
  return NextResponse.json(setting);
}

export async function PUT(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await prisma.smtpSetting.upsert({
      where: { id: 1 },
      update: {
        smtpHost: body.smtpHost,
        smtpPort: parseInt(body.smtpPort) || 587,
        smtpUsername: body.smtpUsername,
        smtpPassword: body.smtpPassword !== undefined ? body.smtpPassword : '',
        encryption: body.encryption || 'TLS',
        senderName: body.senderName,
        senderEmail: body.senderEmail,
        adminNotificationEmail: body.adminNotificationEmail,
        isEnabled: body.isEnabled !== undefined ? body.isEnabled : true,
      },
      create: {
        id: 1,
        ...body,
      },
    });

    await logActivity('UPDATE_SMTP', 'SMTP', 'Updated SMTP email configuration', admin.userId);
    return NextResponse.json({ success: true, smtp: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
