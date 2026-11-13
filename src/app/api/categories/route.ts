export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function GET() {
  const categories = await prisma.blogCategory.findMany({
    orderBy: { nameEn: 'asc' },
    include: { _count: { select: { blogs: true } } },
  });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { nameEn, namePa, slug, description } = await req.json();
    const created = await prisma.blogCategory.create({
      data: {
        nameEn,
        namePa,
        slug: slug || nameEn.toLowerCase().replace(/\s+/g, '-'),
        description: description || null,
        isActive: true,
      },
    });

    await logActivity('CREATE_CATEGORY', 'Blogs', `Created category: ${created.nameEn}`, admin.userId);
    return NextResponse.json({ success: true, category: created });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
