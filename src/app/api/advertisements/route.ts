import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function GET() {
  const ads = await prisma.advertisement.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(ads);
}

export async function POST(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const created = await prisma.advertisement.create({
      data: {
        title: body.title,
        placement: body.placement,
        imageUrl: body.imageUrl || null,
        destinationUrl: body.destinationUrl || null,
        htmlCode: body.htmlCode || null,
        isActive: body.isActive !== undefined ? body.isActive : true,
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
      },
    });

    await logActivity('CREATE_AD', 'Ads', `Created ad: ${created.title} (${created.placement})`, admin.userId);
    return NextResponse.json({ success: true, advertisement: created });
  } catch (err: any) {
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
    const updated = await prisma.advertisement.update({
      where: { id },
      data: {
        title: body.title,
        placement: body.placement,
        imageUrl: body.imageUrl,
        destinationUrl: body.destinationUrl,
        htmlCode: body.htmlCode,
        isActive: body.isActive !== undefined ? body.isActive : true,
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
      },
    });

    await logActivity('UPDATE_AD', 'Ads', `Updated ad: ${updated.id}`, admin.userId);
    return NextResponse.json({ success: true, advertisement: updated });
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

  await prisma.advertisement.delete({ where: { id } });
  await logActivity('DELETE_AD', 'Ads', `Deleted ad: ${id}`, admin.userId);
  return NextResponse.json({ success: true, message: 'Ad deleted' });
}
