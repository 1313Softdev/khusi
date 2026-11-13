export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function GET() {
  const galleries = await prisma.gallery.findMany({
    orderBy: { displayOrder: 'asc' },
    include: {
      images: { orderBy: { displayOrder: 'asc' } },
    },
  });
  return NextResponse.json(galleries);
}

export async function POST(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Check if adding image to existing gallery or creating gallery
    if (body.action === 'add_image') {
      const img = await prisma.galleryImage.create({
        data: {
          galleryId: parseInt(body.galleryId),
          imageUrl: body.imageUrl,
          titleEn: body.titleEn || null,
          titlePa: body.titlePa || null,
          caption: body.caption || null,
          videoUrl: body.videoUrl || null,
          isFeatured: Boolean(body.isFeatured),
          displayOrder: parseInt(body.displayOrder) || 0,
        },
      });
      await logActivity('ADD_GALLERY_IMAGE', 'Gallery', `Added image to gallery ${body.galleryId}`, admin.userId);
      return NextResponse.json({ success: true, image: img });
    }

    const created = await prisma.gallery.create({
      data: {
        titleEn: body.titleEn,
        titlePa: body.titlePa,
        slug: body.slug || body.titleEn.toLowerCase().replace(/\s+/g, '-'),
        category: body.category || 'General',
        description: body.description || null,
        displayOrder: parseInt(body.displayOrder) || 0,
        isActive: true,
      },
    });

    await logActivity('CREATE_GALLERY', 'Gallery', `Created album: ${created.titleEn}`, admin.userId);
    return NextResponse.json({ success: true, gallery: created });
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
  const galleryId = searchParams.get('galleryId');
  const imageId = searchParams.get('imageId');

  if (imageId) {
    await prisma.galleryImage.delete({ where: { id: parseInt(imageId) } });
    await logActivity('DELETE_GALLERY_IMAGE', 'Gallery', `Deleted image: ${imageId}`, admin.userId);
    return NextResponse.json({ success: true, message: 'Image deleted' });
  }

  if (galleryId) {
    await prisma.gallery.delete({ where: { id: parseInt(galleryId) } });
    await logActivity('DELETE_GALLERY', 'Gallery', `Deleted gallery: ${galleryId}`, admin.userId);
    return NextResponse.json({ success: true, message: 'Gallery deleted' });
  }

  return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
}
