import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import AdBanner from '@/components/public/AdBanner';
import AiAssistantWidget from '@/components/public/AiAssistantWidget';
import { prisma } from '@/lib/prisma';
import BlogPostClient from './BlogPostClient';

export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  let blog = null;
  try {
    blog = await prisma.blog.findUnique({
      where: { slug },
    });
  } catch (e) {
    // Database fallback
  }

  if (!blog) return { title: 'Article Not Found | Sardar Khushinder Singh Jand Sahib' };

  return {
    title: blog.metaTitle || blog.titleEn,
    description: blog.metaDescription || blog.shortDescEn,
    keywords: blog.metaKeywords ? blog.metaKeywords.split(', ') : undefined,
    openGraph: {
      title: blog.metaTitle || blog.titleEn,
      description: blog.metaDescription || blog.shortDescEn,
      images: [blog.ogImage || blog.featuredImage || '/images/blog-health-camp.jpg'],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.metaTitle || blog.titleEn,
      description: blog.metaDescription || blog.shortDescEn,
      images: [blog.ogImage || blog.featuredImage || '/images/blog-health-camp.jpg'],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  let settings = null;
  let blog: any = null;
  let advertisements: any[] = [];
  let socialAccounts: any[] = [];
  let relatedBlogs: any[] = [];

  try {
    const results = await Promise.all([
      prisma.websiteSetting.findFirst(),
      prisma.blog.findUnique({
        where: { slug },
        include: {
          category: true,
          tags: { include: { tag: true } },
        },
      }),
      prisma.advertisement.findMany({ where: { isActive: true } }),
      prisma.socialAccount.findMany({ where: { isActive: true } }),
    ]);

    settings = results[0];
    blog = results[1];
    advertisements = results[2];
    socialAccounts = results[3];

    if (blog) {
      // Increment views
      await prisma.blog.update({
        where: { id: blog.id },
        data: { viewsCount: { increment: 1 } },
      }).catch(() => null);

      // Fetch related articles in same category
      relatedBlogs = await prisma.blog.findMany({
        where: {
          categoryId: blog.categoryId,
          id: { not: blog.id },
          status: 'published',
        },
        take: 3,
        include: { category: true },
      });
    }
  } catch (e) {
    // Database fallback
  }

  if (!blog) notFound();

  const formattedBlog = {
    ...blog,
    publishedAt: blog.publishedAt ? blog.publishedAt.toISOString() : new Date().toISOString(),
    tags: (blog.tags || []).map((t: any) => ({ nameEn: t.tag?.nameEn || '', namePa: t.tag?.namePa || '', slug: t.tag?.slug || '' })),
  };

  const formattedRelated = relatedBlogs.map((r) => ({
    id: r.id,
    titleEn: r.titleEn,
    titlePa: r.titlePa,
    slug: r.slug,
    shortDescEn: r.shortDescEn,
    shortDescPa: r.shortDescPa,
    featuredImage: r.featuredImage,
    publishedAt: r.publishedAt.toISOString(),
    category: r.category,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-navy-950 text-white">
      <Navbar settings={settings || undefined} />

      <main className="flex-1 pt-24 pb-20">
        <BlogPostClient
          blog={formattedBlog}
          relatedBlogs={formattedRelated}
          ads={advertisements}
        />
      </main>

      <Footer settings={settings || undefined} socialLinks={socialAccounts} />
      <AiAssistantWidget />
    </div>
  );
}
