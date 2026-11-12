'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Search, Calendar, ArrowRight, PlayCircle, Tag, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import AdBanner, { AdvertisementData } from '@/components/public/AdBanner';

interface BlogListClientProps {
  initialBlogs: any[];
  categories: any[];
  ads: AdvertisementData[];
}

export default function BlogListClient({ initialBlogs, categories, ads }: BlogListClientProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((b) => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        b.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.titlePa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.shortDescEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.shortDescPa.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat =
        selectedCat === 'all' || b.category?.slug === selectedCat;

      return matchesSearch && matchesCat;
    });
  }, [initialBlogs, searchTerm, selectedCat]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage) || 1;
  const displayedBlogs = filteredBlogs.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest font-extrabold text-saffron-400 bg-saffron-500/10 px-3.5 py-1 rounded-full border border-saffron-500/20 inline-block mb-3">
          {t('Official Updates & Articles', 'ਅਧਿਕਾਰਤ ਲੇਖ ਤੇ ਖ਼ਬਰਾਂ')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif mb-4">
          {t('News, Social Work & Blogs', 'ਸਮਾਜ ਸੇਵਾ ਤੇ ਤਾਜ਼ਾ ਵਿਚਾਰ')}
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          {t(
            'Verified documentation of public health camps, youth activities, agrarian memorandums, and public service milestones.',
            'ਲੋਕ ਸੇਵਾ ਕਾਰਜਾਂ, ਮੈਡੀਕਲ ਕੈਂਪਾਂ ਅਤੇ ਲੋਕ ਹਿੱਤੂ ਮਸਲਿਆਂ ਸੰਬੰਧੀ ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦੇ ਵਿਚਾਰ।'
          )}
        </p>
      </div>

      {/* Controls Bar: Search & Category Filter */}
      <div className="bg-navy-900/90 p-4 sm:p-6 rounded-3xl border border-navy-800 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={t('Search articles, keywords...', 'ਖ਼ਬਰਾਂ ਜਾਂ ਵਿਸ਼ੇ ਲੱਭੋ...')}
            className="w-full bg-navy-950 text-white placeholder-gray-500 text-xs sm:text-sm pl-11 pr-4 py-3 rounded-full border border-navy-700 focus:outline-none focus:border-saffron-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => {
              setSelectedCat('all');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCat === 'all'
                ? 'bg-saffron-500 text-navy-950 shadow-glow-saffron'
                : 'bg-navy-950 text-gray-300 hover:text-white border border-navy-800'
            }`}
          >
            {t('All Categories', 'ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ')}
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCat(c.slug);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCat === c.slug
                  ? 'bg-saffron-500 text-navy-950 shadow-glow-saffron'
                  : 'bg-navy-950 text-gray-300 hover:text-white border border-navy-800'
              }`}
            >
              {t(c.nameEn, c.namePa)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Posts Stream */}
        <div className="lg:col-span-8">
          {displayedBlogs.length > 0 ? (
            <div className="space-y-8">
              {displayedBlogs.map((blog, idx) => {
                const dateStr = new Date(blog.publishedAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });

                return (
                  <React.Fragment key={blog.id}>
                    <article className="bg-navy-900/80 rounded-3xl overflow-hidden border border-navy-800 hover:border-saffron-500/40 transition-all duration-300 flex flex-col md:flex-row group shadow-xl">
                      {/* Thumbnail */}
                      <div className="md:w-5/12 aspect-[16/10] md:aspect-auto bg-navy-950 relative overflow-hidden shrink-0">
                        <img
                          src={blog.featuredImage || '/images/blog-health-camp.jpg'}
                          alt={blog.titleEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {blog.videoUrl && (
                          <div className="absolute top-3 left-3 bg-red-600/90 text-white px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1">
                            <PlayCircle className="w-3.5 h-3.5" />
                            <span>Video</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 md:w-7/12 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2 text-xs">
                            <span className="text-saffron-400 font-bold">
                              {t(blog.category?.nameEn || 'General', blog.category?.namePa || 'ਜਨਰਲ')}
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-saffron-400" />
                              {dateStr}
                            </span>
                          </div>

                          <h2 className="text-lg sm:text-xl font-bold text-white font-serif group-hover:text-saffron-400 transition-colors line-clamp-2 leading-snug mb-3">
                            <Link href={`/blog/${blog.slug}`}>
                              {t(blog.titleEn, blog.titlePa)}
                            </Link>
                          </h2>

                          <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed mb-4">
                            {t(blog.shortDescEn, blog.shortDescPa)}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-navy-800/80 flex items-center justify-between">
                          <Link
                            href={`/blog/${blog.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-400 hover:text-saffron-300"
                          >
                            <span>{t('Read Full Article', 'ਪੂਰਾ ਲੇਖ ਪੜ੍ਹੋ')}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </article>

                    {/* Between blogs advertisement after 2nd post */}
                    {idx === 1 && (
                      <AdBanner ads={ads} placement="between_blogs" />
                    )}
                  </React.Fragment>
                );
              })}

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="pt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2.5 rounded-full bg-navy-900 hover:bg-navy-800 disabled:opacity-30 border border-navy-800 text-gray-300"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-9 h-9 rounded-full text-xs font-bold transition-all ${
                        currentPage === idx + 1
                          ? 'bg-saffron-500 text-navy-950 font-black shadow-glow-saffron'
                          : 'bg-navy-900 hover:bg-navy-800 text-gray-300 border border-navy-800'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2.5 rounded-full bg-navy-900 hover:bg-navy-800 disabled:opacity-30 border border-navy-800 text-gray-300"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center bg-navy-900/60 rounded-3xl border border-navy-800">
              <p className="text-gray-400 text-sm">
                {t('No articles matched your search query.', 'ਕੋਈ ਲੇਖ ਨਹੀਂ ਮਿਲਿਆ।')}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCat('all');
                }}
                className="mt-4 px-4 py-2 rounded-full bg-saffron-500 text-navy-950 font-bold text-xs"
              >
                {t('Reset Filters', 'ਮੁੜ ਸ਼ੁਰੂ ਕਰੋ')}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* About Author Card */}
          <div className="bg-navy-900 p-6 rounded-3xl border border-navy-800 text-center">
            <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-2 border-saffron-500/40 mb-4 shadow">
              <img
                src="/images/khushinder-profile.png"
                alt="Sardar Khushinder Singh"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-white font-bold text-base font-serif">
              {t('Sardar Khushinder Singh', 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ')}
            </h3>
            <p className="text-xs text-saffron-400 font-medium mt-1">
              {t('Social Worker & Leader', 'ਸਮਾਜ ਸੇਵੀ ਤੇ ਆਗੂ')}
            </p>
            <p className="text-xs text-gray-300 mt-3 leading-relaxed">
              {t(
                'Representing the voice of rural Punjab, farmers, and youth under Punjab Sanjhivalta Dal.',
                'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਅਧੀਨ ਪਿੰਡਾਂ, ਕਿਸਾਨਾਂ ਅਤੇ ਨੌਜਵਾਨਾਂ ਦੀ ਬਿਹਤਰੀ ਲਈ ਯਤਨਸ਼ੀਲ।'
              )}
            </p>
            <Link
              href="/about"
              className="mt-4 inline-block text-xs font-bold text-saffron-400 hover:underline"
            >
              {t('View Full Biography →', 'ਪੂਰੀ ਜੀਵਨੀ ਪੜ੍ਹੋ →')}
            </Link>
          </div>

          {/* Sidebar Advertisement */}
          <AdBanner ads={ads} placement="blog_sidebar" />
        </div>
      </div>
    </div>
  );
}
