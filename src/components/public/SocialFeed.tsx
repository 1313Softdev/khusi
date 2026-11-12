'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Heart, MessageCircle, ExternalLink, Calendar, RefreshCw } from 'lucide-react';

export interface SocialPost {
  id: number;
  platform: string; // 'facebook' | 'instagram'
  postId: string;
  authorName: string;
  caption?: string | null;
  mediaUrl?: string | null;
  mediaType: string;
  permalink: string;
  timestamp: string | Date;
  likesCount: number;
  commentsCount: number;
}

interface SocialFeedProps {
  posts?: SocialPost[];
  fbPageUrl?: string;
  igProfileUrl?: string;
}

export default function SocialFeed({
  posts = [],
  fbPageUrl = 'https://www.facebook.com/khushindersingh.sandhu',
  igProfileUrl = 'https://www.instagram.com/khushinder_singh',
}: SocialFeedProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'facebook' | 'instagram'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredPosts = posts.filter((p) => {
    if (activeTab === 'all') return true;
    return p.platform.toLowerCase() === activeTab;
  });

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetch('/api/social/sync', { method: 'POST' });
      window.location.reload();
    } catch {
      setIsRefreshing(false);
    }
  };

  return (
    <section className="py-16 bg-navy-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-navy-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-saffron-400 text-xs uppercase tracking-widest font-extrabold mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t('Live Official Feeds', 'ਅਧਿਕਾਰਤ ਸੋਸ਼ਲ ਮੀਡੀਆ ਅਪਡੇਟਸ')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-serif">
              {t('Facebook & Instagram Updates', 'ਫੇਸਬੁੱਕ ਅਤੇ ਇੰਸਟਾਗ੍ਰਾਮ ਗਤੀਵਿਧੀਆਂ')}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-1 max-w-xl">
              {t(
                'Direct verified public messages, speeches, village tours, and service photos straight from the ground.',
                'ਪਿੰਡਾਂ ਦੇ ਦੌਰੇ, ਜਨਤਕ ਸੁਣਵਾਈਆਂ, ਮੈਡੀਕਲ ਕੈਂਪਾਂ ਅਤੇ ਲੋਕ ਹਿੱਤੂ ਮੁੱਦਿਆਂ ਦੀਆਂ ਤਾਜ਼ਾ ਪੋਸਟਾਂ।'
              )}
            </p>
          </div>

          {/* Platform Filter Tabs & Refresh Button */}
          <div className="flex items-center gap-3">
            <div className="flex bg-navy-900 rounded-full p-1 border border-navy-800">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'all'
                    ? 'bg-saffron-500 text-navy-950 shadow-md'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('All', 'ਸਭ')}
              </button>
              <button
                onClick={() => setActiveTab('facebook')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'facebook'
                    ? 'bg-[#1877F2] text-white shadow-md'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Facebook
              </button>
              <button
                onClick={() => setActiveTab('instagram')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'instagram'
                    ? 'bg-gradient-to-r from-pink-500 to-amber-500 text-white shadow-md'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Instagram
              </button>
            </div>

            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-full bg-navy-850 hover:bg-navy-800 text-gray-300 border border-navy-700/60 hover:text-saffron-400 transition-all"
              title="Refresh feeds"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-saffron-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Post Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const isFb = post.platform.toLowerCase() === 'facebook';
              const dateStr = new Date(post.timestamp).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div
                  key={post.id || post.postId}
                  className="glass-card rounded-2xl overflow-hidden flex flex-col group card-hover-lift shadow-xl"
                >
                  {/* Card Header */}
                  <div className="p-4 flex items-center justify-between border-b border-white/5 bg-navy-950/60">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md ${
                          isFb ? 'bg-[#1877F2] text-white' : 'bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white'
                        }`}
                      >
                        {isFb ? 'f' : 'ig'}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-200 truncate max-w-[150px]">
                          {post.authorName || 'Sardar Khushinder Singh'}
                        </span>
                        <span className="text-[10px] text-gray-400 flex items-center gap-1 font-sans">
                          <Calendar className="w-2.5 h-2.5 text-saffron-400" />
                          {dateStr}
                        </span>
                      </div>
                    </div>

                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-saffron-400 transition-colors p-1.5 rounded-full hover:bg-white/5"
                      title="View original post"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Card Media */}
                  {post.mediaUrl && (
                    <div className="relative aspect-video sm:aspect-[16/10] bg-navy-950 overflow-hidden">
                      <img
                        src={post.mediaUrl}
                        alt="Social post media"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  {/* Card Caption */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <p className="text-xs sm:text-sm text-gray-200 line-clamp-4 leading-relaxed font-normal">
                      {post.caption || t('Verified public update from Sardar Khushinder Singh Jand Sahib.', 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਵੱਲੋਂ ਤਾਜ਼ਾ ਜਨਤਕ ਅਪਡੇਟ।')}
                    </p>

                    {/* Likes & Comments Footer */}
                    <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 text-pink-400 font-medium">
                          <Heart className="w-3.5 h-3.5 fill-pink-500/20 text-pink-400" />
                          <span>{post.likesCount}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{post.commentsCount}</span>
                        </span>
                      </div>

                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-saffron-400 hover:text-saffron-300 font-bold flex items-center gap-1 group/btn"
                      >
                        <span>{t('View Post', 'ਪੋਸਟ ਦੇਖੋ')}</span>
                        <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Graceful Fallback Card */
          <div className="p-8 text-center bg-navy-900/60 rounded-2xl border border-navy-800 max-w-xl mx-auto">
            <p className="text-gray-300 text-sm mb-4">
              {t(
                'Social feeds are currently synchronizing or connecting. Follow official accounts directly:',
                'ਸੋਸ਼ਲ ਮੀਡੀਆ ਅਪਡੇਟਸ ਲੋਡ ਹੋ ਰਹੇ ਹਨ। ਤੁਸੀਂ ਹੇਠਾਂ ਦਿੱਤੇ ਲਿੰਕਾਂ ਰਾਹੀਂ ਅਧਿਕਾਰਤ ਪੇਜ ਦੇਖ ਸਕਦੇ ਹੋ:'
              )}
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href={fbPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full bg-[#1877F2] text-white font-bold text-xs flex items-center gap-2 shadow"
              >
                Facebook Page
              </a>
              <a
                href={igProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 text-white font-bold text-xs flex items-center gap-2 shadow"
              >
                Instagram Profile
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
