'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar, User, ArrowLeft, Share2, Check, Tag, Eye } from 'lucide-react';
import AdBanner, { AdvertisementData } from '@/components/public/AdBanner';

interface BlogPostClientProps {
  blog: any;
  relatedBlogs: any[];
  ads: AdvertisementData[];
}

export default function BlogPostClient({ blog, relatedBlogs, ads }: BlogPostClientProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const dateStr = new Date(blog.publishedAt).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareTitle = encodeURIComponent(t(blog.titleEn, blog.titlePa));
  const shareUrl = encodeURIComponent(currentUrl);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-saffron-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('Back to all articles', 'ਸਾਰੇ ਲੇਖਾਂ ਵੱਲ ਵਾਪਸ')}</span>
        </Link>
      </div>

      {/* Category Pill & Publish Details */}
      <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
        {blog.category && (
          <span className="px-3 py-1 rounded-full bg-saffron-500/10 text-saffron-400 border border-saffron-500/30 font-bold uppercase tracking-wider">
            {t(blog.category.nameEn, blog.category.namePa)}
          </span>
        )}
        <div className="flex items-center gap-1.5 text-gray-400">
          <Calendar className="w-3.5 h-3.5 text-saffron-400" />
          <span>{dateStr}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <User className="w-3.5 h-3.5 text-saffron-400" />
          <span>{blog.authorName}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400 ml-auto">
          <Eye className="w-3.5 h-3.5" />
          <span>{blog.viewsCount} views</span>
        </div>
      </div>

      {/* Main Title */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif leading-tight mb-6">
        {t(blog.titleEn, blog.titlePa)}
      </h1>

      {/* Short Summary Lead */}
      <p className="text-base sm:text-xl text-saffron-200/90 font-medium leading-relaxed mb-8 border-l-4 border-saffron-500 pl-4 py-1">
        {t(blog.shortDescEn, blog.shortDescPa)}
      </p>

      {/* Social Share Bar Top */}
      <div className="flex items-center justify-between py-4 border-y border-navy-800 mb-8 text-xs text-gray-400">
        <span className="flex items-center gap-1.5 font-bold text-gray-300">
          <Share2 className="w-4 h-4 text-saffron-400" />
          <span>{t('Share this article:', 'ਇਸ ਲੇਖ ਨੂੰ ਸਾਂਝਾ ਕਰੋ:')}</span>
        </span>
        <div className="flex items-center gap-2">
          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
          >
            WhatsApp
          </a>
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full bg-[#1877F2] hover:bg-blue-600 text-white font-bold transition-colors"
          >
            Facebook
          </a>
          {/* Twitter / X */}
          <a
            href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full bg-black hover:bg-gray-800 text-white font-bold transition-colors"
          >
            𝕏
          </a>
          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 rounded-full bg-navy-800 hover:bg-navy-700 text-gray-200 border border-navy-700 font-bold transition-colors flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
            <span>{copied ? t('Copied!', 'ਕਾਪੀ ਹੋ ਗਿਆ!') : t('Copy Link', 'ਲਿੰਕ ਕਾਪੀ ਕਰੋ')}</span>
          </button>
        </div>
      </div>

      {/* Hero Media: Image or Video */}
      {blog.videoUrl ? (
        <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black mb-10 border border-navy-800">
          <iframe
            src={blog.videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : blog.featuredImage ? (
        <div className="w-full rounded-3xl overflow-hidden shadow-2xl border border-navy-800 mb-10 bg-navy-900">
          <img
            src={blog.featuredImage}
            alt={blog.titleEn}
            className="w-full h-auto object-cover max-h-[550px]"
          />
        </div>
      ) : null}

      {/* Before Article Advertisement */}
      <AdBanner ads={ads} placement="before_article" />

      {/* Main Full Article Body */}
      <div className="prose prose-invert prose-lg max-w-none text-gray-200 text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal space-y-6">
        {t(blog.contentEn, blog.contentPa)}
      </div>

      {/* After Article Advertisement */}
      <AdBanner ads={ads} placement="after_article" />

      {/* Tags Section */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="mt-10 pt-6 border-t border-navy-800 flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-saffron-400" />
          <span className="text-xs font-bold text-gray-400">{t('Tags:', 'ਟੈਗਸ:')}</span>
          {blog.tags.map((tag: any, i: number) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full bg-navy-900 text-gray-300 border border-navy-800"
            >
              #{t(tag.nameEn, tag.namePa)}
            </span>
          ))}
        </div>
      )}

      {/* Author Bio Box */}
      <div className="mt-12 p-6 rounded-3xl bg-navy-900 border border-navy-800 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-saffron-500 shrink-0">
          <img
            src="/images/khushinder-profile.png"
            alt="Sardar Khushinder Singh"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-white font-bold text-base font-serif">
            {t('Published by Office of Sardar Khushinder Singh', 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦਫ਼ਤਰ ਵੱਲੋਂ ਪ੍ਰਕਾਸ਼ਿਤ')}
          </h4>
          <p className="text-xs text-saffron-400 font-medium">
            {t('Social Worker & Member of Punjab Sanjhivalta Dal', 'ਸਮਾਜ ਸੇਵੀ ਅਤੇ ਮੈਂਬਰ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ')}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {t(
              'Village Jand Sahib, Punjab, India. Devoted to the welfare of the people of Punjab.',
              'ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ, ਪੰਜਾਬ। ਲੋਕ ਹਿੱਤਾਂ ਅਤੇ ਪੰਜਾਬ ਦੀ ਚੜ੍ਹਦੀ ਕਲਾ ਨੂੰ ਸਮਰਪਿਤ।'
            )}
          </p>
        </div>
      </div>

      {/* Related Articles */}
      {relatedBlogs && relatedBlogs.length > 0 && (
        <div className="mt-16 pt-12 border-t border-navy-800">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-serif mb-6">
            {t('Related Updates & News', 'ਹੋਰ ਸੰਬੰਧਿਤ ਖ਼ਬਰਾਂ ਤੇ ਲੇਖ')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBlogs.map((r) => (
              <div
                key={r.id}
                className="bg-navy-900/60 rounded-2xl overflow-hidden border border-navy-800 hover:border-saffron-500/40 p-4 transition-all group"
              >
                <Link href={`/blog/${r.slug}`} className="block">
                  <div className="aspect-video rounded-xl overflow-hidden bg-navy-950 mb-3">
                    <img
                      src={r.featuredImage || '/images/blog-health-camp.jpg'}
                      alt={r.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-saffron-400 line-clamp-2 leading-snug">
                    {t(r.titleEn, r.titlePa)}
                  </h4>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
