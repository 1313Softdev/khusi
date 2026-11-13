export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const categoryId = searchParams.get('categoryId');
  const search = searchParams.get('search');

  const whereClause: any = {};
  if (status) whereClause.status = status;
  if (categoryId) whereClause.categoryId = parseInt(categoryId);
  if (search) {
    whereClause.OR = [
      { titleEn: { contains: search } },
      { titlePa: { contains: search } },
      { shortDescEn: { contains: search } },
    ];
  }

  const blogs = await prisma.blog.findMany({
    where: whereClause,
    orderBy: { publishedAt: 'desc' },
    include: {
      category: true,
      tags: { include: { tag: true } },
    },
  });

  return NextResponse.json(blogs);
}

export async function POST(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    let slug = body.slug ? slugify(body.slug) : slugify(body.titleEn);
    if (!slug) slug = 'post-' + Date.now();

    // Check slug uniqueness
    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const created = await prisma.blog.create({
      data: {
        titleEn: body.titleEn,
        titlePa: body.titlePa,
        slug: slug,
        shortDescEn: body.shortDescEn,
        shortDescPa: body.shortDescPa,
        contentEn: body.contentEn,
        contentPa: body.contentPa,
        featuredImage: body.featuredImage || null,
        galleryImages: body.galleryImages || null,
        videoUrl: body.videoUrl || null,
        categoryId: parseInt(body.categoryId),
        isFeatured: Boolean(body.isFeatured),
        status: body.status || 'published',
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
        authorName: body.authorName || 'Sardar Khushinder Singh',
        metaTitle: body.metaTitle || body.titleEn,
        metaDescription: body.metaDescription || body.shortDescEn,
        metaKeywords: body.metaKeywords || null,
        ogImage: body.ogImage || body.featuredImage || null,
      },
    });

    await logActivity('CREATE_BLOG', 'Blogs', `Created blog: ${created.titleEn}`, admin.userId);
    return NextResponse.json({ success: true, blog: created });
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

    const updated = await prisma.blog.update({
      where: { id },
      data: {
        titleEn: body.titleEn,
        titlePa: body.titlePa,
        slug: body.slug ? slugify(body.slug) : undefined,
        shortDescEn: body.shortDescEn,
        shortDescPa: body.shortDescPa,
        contentEn: body.contentEn,
        contentPa: body.contentPa,
        featuredImage: body.featuredImage,
        galleryImages: body.galleryImages,
        videoUrl: body.videoUrl,
        categoryId: parseInt(body.categoryId),
        isFeatured: Boolean(body.isFeatured),
        status: body.status,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
        authorName: body.authorName,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        metaKeywords: body.metaKeywords,
        ogImage: body.ogImage,
      },
    });

    await logActivity('UPDATE_BLOG', 'Blogs', `Updated blog: ${updated.id}`, admin.userId);
    return NextResponse.json({ success: true, blog: updated });
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

  await prisma.blog.delete({ where: { id } });
  await logActivity('DELETE_BLOG', 'Blogs', `Deleted blog ID: ${id}`, admin.userId);
  return NextResponse.json({ success: true, message: 'Blog deleted' });
}
