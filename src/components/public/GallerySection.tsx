'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Image as ImageIcon, Play, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export interface GalleryItem {
  id: number;
  imageUrl: string;
  titleEn?: string | null;
  titlePa?: string | null;
  caption?: string | null;
  videoUrl?: string | null;
  isFeatured?: boolean;
  category?: string;
}

interface GallerySectionProps {
  images?: GalleryItem[];
}

export default function GallerySection({ images = [] }: GallerySectionProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  if (images.length === 0) return null;

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(images.map((img) => img.category).filter(Boolean)))];

  const filteredImages = images.filter((img) => {
    if (selectedCategory === 'all') return true;
    return img.category === selectedCategory;
  });

  const activeImage = lightboxIdx !== null ? filteredImages[lightboxIdx] : null;

  return (
    <section id="gallery" className="py-20 bg-navy-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-saffron-400 text-xs font-extrabold uppercase tracking-widest block mb-2">
            {t('Visual Moments & Documentation', 'ਤਸਵੀਰਾਂ ਵਿੱਚ ਲੋਕ ਸੇਵਾ ਦਾ ਸਫ਼ਰ')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-serif mb-4">
            {t('Social Work & Community Gallery', 'ਸਮਾਜ ਸੇਵਾ ਤੇ ਗਤੀਵਿਧੀਆਂ ਦੀ ਗੈਲਰੀ')}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            {t(
              'Glimpses from free medical camps, sports tournaments, tree plantation drives, and village development meetings.',
              'ਮੈਡੀਕਲ ਕੈਂਪਾਂ, ਖੇਡ ਮੇਲਿਆਂ, ਰੁੱਖ ਲਗਾਓ ਮੁਹਿੰਮਾਂ ਅਤੇ ਪਿੰਡਾਂ ਦੀਆਂ ਜਨਤਕ ਸਭਾਵਾਂ ਦੀਆਂ ਤਸਵੀਰਾਂ।'
            )}
          </p>
        </div>

        {/* Category Pills */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat as string}
                onClick={() => setSelectedCategory(cat as string)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all capitalize ${
                  selectedCategory === cat
                    ? 'bg-saffron-500 text-navy-950 shadow-glow-saffron'
                    : 'bg-navy-900 text-gray-300 hover:text-white border border-navy-800'
                }`}
              >
                {cat === 'all' ? t('All Photos & Videos', 'ਸਭ ਤਸਵੀਰਾਂ') : cat}
              </button>
            ))}
          </div>
        )}

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => setLightboxIdx(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-navy-900 border border-navy-800 hover:border-saffron-500/50 cursor-pointer shadow-lg transition-all duration-300"
            >
              <img
                src={img.imageUrl}
                alt={img.titleEn || 'Gallery image'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-0 group-hover:opacity-90 transition-opacity flex flex-col justify-end p-4">
                <span className="text-white font-bold text-xs sm:text-sm line-clamp-1">
                  {t(img.titleEn || '', img.titlePa || '')}
                </span>
                {img.caption && (
                  <span className="text-[11px] text-gray-300 line-clamp-1 mt-0.5">
                    {img.caption}
                  </span>
                )}
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-saffron-400 font-semibold">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t('Click to enlarge', 'ਵੱਡੀ ਕਰਕੇ ਦੇਖੋ')}</span>
                </div>
              </div>

              {/* Video icon badge if video */}
              {img.videoUrl && (
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow">
                  <Play className="w-3.5 h-3.5 fill-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous / Next buttons */}
          {filteredImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx((prev) => (prev! + 1) % filteredImages.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Modal Content */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            {activeImage.videoUrl ? (
              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
                <iframe
                  src={activeImage.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={activeImage.imageUrl}
                alt={activeImage.titleEn || ''}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
            )}
            <div className="text-center mt-4">
              <h4 className="text-white text-base sm:text-lg font-bold">
                {t(activeImage.titleEn || '', activeImage.titlePa || '')}
              </h4>
              {activeImage.caption && (
                <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-2xl">
                  {activeImage.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
