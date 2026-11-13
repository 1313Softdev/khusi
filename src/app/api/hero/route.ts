export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function GET() {
  const slides = await prisma.heroSlide.findMany({
    orderBy: { displayOrder: 'asc' },
  });
  return NextResponse.json(slides);
}

export async function POST(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const created = await prisma.heroSlide.create({
      data: {
        titleEn: body.titleEn,
        titlePa: body.titlePa,
        subtitleEn: body.subtitleEn || null,
        subtitlePa: body.subtitlePa || null,
        descriptionEn: body.descriptionEn || null,
        descriptionPa: body.descriptionPa || null,
        imageUrl: body.imageUrl,
        videoUrl: body.videoUrl || null,
        btn1TextEn: body.btn1TextEn || 'About Me',
        btn1TextPa: body.btn1TextPa || 'ਮੇਰੇ ਬਾਰੇ',
        btn1Url: body.btn1Url || '/about',
        btn2TextEn: body.btn2TextEn || 'Contact Me',
        btn2TextPa: body.btn2TextPa || 'ਸੰਪਰਕ ਕਰੋ',
        btn2Url: body.btn2Url || '/contact',
        overlayOpacity: parseFloat(body.overlayOpacity) || 0.5,
        displayOrder: parseInt(body.displayOrder) || 0,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    });

    await logActivity('CREATE_HERO_SLIDE', 'Hero', `Created slide: ${created.titleEn}`, admin.userId);
    return NextResponse.json({ success: true, slide: created });
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
    const updated = await prisma.heroSlide.update({
      where: { id: parseInt(body.id) },
      data: {
        titleEn: body.titleEn,
        titlePa: body.titlePa,
        subtitleEn: body.subtitleEn || null,
        subtitlePa: body.subtitlePa || null,
        descriptionEn: body.descriptionEn || null,
        descriptionPa: body.descriptionPa || null,
        imageUrl: body.imageUrl,
        videoUrl: body.videoUrl || null,
        btn1TextEn: body.btn1TextEn,
        btn1TextPa: body.btn1TextPa,
        btn1Url: body.btn1Url,
        btn2TextEn: body.btn2TextEn,
        btn2TextPa: body.btn2TextPa,
        btn2Url: body.btn2Url,
        overlayOpacity: parseFloat(body.overlayOpacity) || 0.5,
        displayOrder: parseInt(body.displayOrder) || 0,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    });

    await logActivity('UPDATE_HERO_SLIDE', 'Hero', `Updated slide: ${updated.id}`, admin.userId);
    return NextResponse.json({ success: true, slide: updated });
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

  await prisma.heroSlide.delete({ where: { id } });
  await logActivity('DELETE_HERO_SLIDE', 'Hero', `Deleted slide: ${id}`, admin.userId);
  return NextResponse.json({ success: true, message: 'Slide deleted' });
}
