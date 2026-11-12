'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar, ArrowRight, PlayCircle, Tag } from 'lucide-react';

export interface BlogPostItem {
  id: number;
  titleEn: string;
  titlePa: string;
  slug: string;
  shortDescEn: string;
  shortDescPa: string;
  featuredImage?: string | null;
  videoUrl?: string | null;
  publishedAt: string | Date;
  category?: {
    nameEn: string;
    namePa: string;
  } | null;
  isFeatured?: boolean;
}

interface LatestBlogsProps {
  blogs?: BlogPostItem[];
  titleEn?: string;
  titlePa?: string;
}

export default function LatestBlogs({
  blogs = [],
  titleEn = 'Latest Blogs & Public News',
  titlePa = 'ਤਾਜ਼ਾ ਖ਼ਬਰਾਂ ਤੇ ਬਲਾਗ',
}: LatestBlogsProps) {
  const { t } = useLanguage();

  if (blogs.length === 0) return null;

  return (
    <section className="py-20 bg-navy-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 border-b border-navy-800 pb-6">
          <div>
            <span className="text-saffron-400 text-xs font-extrabold uppercase tracking-widest block mb-2">
              {t('Official Bulletins & Articles', 'ਅਧਿਕਾਰਤ ਖ਼ਬਰਾਂ ਤੇ ਲੇਖ')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-serif">
              {t(titleEn, titlePa)}
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-saffron-400 hover:text-saffron-300 font-bold text-sm group"
          >
            <span>{t('View All Articles', 'ਸਾਰੇ ਲੇਖ ਤੇ ਖ਼ਬਰਾਂ ਦੇਖੋ')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => {
            const dateStr = new Date(blog.publishedAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <article
                key={blog.id}
                className="glass-card rounded-2xl overflow-hidden flex flex-col group card-hover-lift shadow-xl"
              >
                {/* Featured Image & Badge */}
                <div className="relative aspect-[16/10] bg-navy-900 overflow-hidden">
                  <img
                    src={blog.featuredImage || '/images/blog-health-camp.jpg'}
                    alt={blog.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60" />

                  {/* Category Pill */}
                  {blog.category && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-navy-900/90 text-saffron-400 border border-saffron-500/30 backdrop-blur-sm">
                        {t(blog.category.nameEn, blog.category.namePa)}
                      </span>
                    </div>
                  )}

                  {/* Video indicator if video attached */}
                  {blog.videoUrl && (
                    <div className="absolute bottom-3 right-3 text-white bg-red-600/90 px-2 py-0.5 rounded-md flex items-center gap-1 text-[11px] font-semibold">
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Video</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <Calendar className="w-3.5 h-3.5 text-saffron-400" />
                      <span>{dateStr}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white font-serif group-hover:text-saffron-400 transition-colors line-clamp-2 leading-snug mb-3">
                      <Link href={`/blog/${blog.slug}`}>
                        {t(blog.titleEn, blog.titlePa)}
                      </Link>
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed">
                      {t(blog.shortDescEn, blog.shortDescPa)}
                    </p>
                  </div>

                  {/* Card Footer: Read More */}
                  <div className="mt-6 pt-4 border-t border-navy-800/80 flex items-center justify-between">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-400 hover:text-saffron-300"
                    >
                      <span>{t('Read More', 'ਪੂਰਾ ਪੜ੍ਹੋ')}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
