import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function GET() {
  const logos = await prisma.logoSlide.findMany({
    orderBy: { displayOrder: 'asc' },
  });
  return NextResponse.json(logos);
}

export async function POST(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const created = await prisma.logoSlide.create({
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
        displayOrder: parseInt(body.displayOrder) || 0,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    });

    await logActivity('CREATE_LOGO', 'Logos', `Created logo: ${created.title}`, admin.userId);
    return NextResponse.json({ success: true, logo: created });
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
    const updated = await prisma.logoSlide.update({
      where: { id: parseInt(body.id) },
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
        displayOrder: parseInt(body.displayOrder) || 0,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    });

    await logActivity('UPDATE_LOGO', 'Logos', `Updated logo: ${updated.id}`, admin.userId);
    return NextResponse.json({ success: true, logo: updated });
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

  await prisma.logoSlide.delete({ where: { id } });
  await logActivity('DELETE_LOGO', 'Logos', `Deleted logo: ${id}`, admin.userId);
  return NextResponse.json({ success: true, message: 'Logo deleted' });
}
