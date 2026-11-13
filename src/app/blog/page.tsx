import React from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import AdBanner from '@/components/public/AdBanner';
import AiAssistantWidget from '@/components/public/AiAssistantWidget';
import { prisma } from '@/lib/prisma';
import BlogListClient from './BlogListClient';

export const dynamic = 'force-dynamic';

export default async function BlogListingPage() {
  let settings = null;
  let categories: any[] = [];
  let blogs: any[] = [];
  let advertisements: any[] = [];
  let socialAccounts: any[] = [];

  try {
    const results = await Promise.all([
      prisma.websiteSetting.findFirst(),
      prisma.blogCategory.findMany({ where: { isActive: true } }),
      prisma.blog.findMany({
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
        include: {
          category: true,
          tags: { include: { tag: true } },
        },
      }),
      prisma.advertisement.findMany({ where: { isActive: true } }),
      prisma.socialAccount.findMany({ where: { isActive: true } }),
    ]);
    [settings, categories, blogs, advertisements, socialAccounts] = results;
  } catch (e) {
    // Database might not be connected during static build
  }

  const formattedBlogs = blogs.map((b) => ({
    id: b.id,
    titleEn: b.titleEn,
    titlePa: b.titlePa,
    slug: b.slug,
    shortDescEn: b.shortDescEn,
    shortDescPa: b.shortDescPa,
    featuredImage: b.featuredImage,
    videoUrl: b.videoUrl,
    publishedAt: b.publishedAt.toISOString(),
    categoryId: b.categoryId,
    category: b.category,
    isFeatured: b.isFeatured,
    tags: b.tags.map((t) => ({ nameEn: t.tag.nameEn, namePa: t.tag.namePa, slug: t.tag.slug })),
  }));

  return (
    <div className="flex flex-col min-h-screen bg-navy-950 text-white">
      <Navbar settings={settings || undefined} />

      <main className="flex-1 pt-24 pb-20">
        <BlogListClient
          initialBlogs={formattedBlogs}
          categories={categories}
          ads={advertisements}
        />
      </main>

      <Footer settings={settings || undefined} socialLinks={socialAccounts} />
      <AiAssistantWidget />
    </div>
  );
}
