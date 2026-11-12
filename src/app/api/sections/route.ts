import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function GET() {
  const sections = await prisma.homepageSection.findMany({
    orderBy: { displayOrder: 'asc' },
  });
  return NextResponse.json(sections);
}

export async function PUT(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { sections } = await req.json();
    if (!Array.isArray(sections)) {
      return NextResponse.json({ error: 'Sections array is required' }, { status: 400 });
    }

    for (const s of sections) {
      await prisma.homepageSection.update({
        where: { id: s.id },
        data: {
          titleEn: s.titleEn,
          titlePa: s.titlePa,
          subtitleEn: s.subtitleEn,
          subtitlePa: s.subtitlePa,
          isEnabled: s.isEnabled,
          displayOrder: s.displayOrder,
          bgColor: s.bgColor,
          postsCount: s.postsCount || 6,
        },
      });
    }

    await logActivity('UPDATE_SECTIONS', 'Sections', 'Updated homepage sections order and configuration', admin.userId);
    return NextResponse.json({ success: true, message: 'Sections updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
