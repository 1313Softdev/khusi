'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Save, CheckCircle, ExternalLink, Globe, Search, Code } from 'lucide-react';
import Link from 'next/link';

export default function SeoAdminPage() {
  const [seoList, setSeoList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/seo')
      .then((r) => r.json())
      .then((data) => {
        setSeoList(data || []);
        setLoading(false);
      });
  }, []);

  const handleUpdate = (path: string, field: string, value: any) => {
    setSeoList((prev) =>
      prev.map((s) => (s.pagePath === path ? { ...s, [field]: value } : s))
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setAlert(null);

    try {
      const res = await fetch('/api/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: seoList }),
      });

      if (res.ok) {
        setAlert('SEO settings saved successfully!');
        setTimeout(() => setAlert(null), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-navy-800 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
              7. Meta & Search Engine Optimization (SEO)
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Customize meta tags, Social Sharing cards (Facebook/X), Google Analytics tracking, and structured Schema.org data.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/sitemap.xml"
              target="_blank"
              className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-xs font-bold text-saffron-400 flex items-center gap-1.5 border border-navy-700"
            >
              <span>sitemap.xml</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/robots.txt"
              target="_blank"
              className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-xs font-bold text-saffron-400 flex items-center gap-1.5 border border-navy-700"
            >
              <span>robots.txt</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {alert && (
          <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{alert}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {seoList.map((seo) => (
            <div
              key={seo.pagePath}
              className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-saffron-400" />
                  <span className="text-sm font-bold text-white font-serif">
                    Page Route: <code className="text-saffron-300 bg-navy-950 px-2 py-0.5 rounded">{seo.pagePath}</code>
                  </span>
                </div>
                <label className="flex items-center gap-2 text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={seo.isIndexable}
                    onChange={(e) => handleUpdate(seo.pagePath, 'isIndexable', e.target.checked)}
                    className="w-4 h-4 rounded text-saffron-500"
                  />
                  <span>Indexable by Google</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Meta Title (Recommended &lt; 65 characters)
                </label>
                <input
                  type="text"
                  value={seo.metaTitle || ''}
                  onChange={(e) => handleUpdate(seo.pagePath, 'metaTitle', e.target.value)}
                  className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Meta Description (Recommended &lt; 160 characters)
                </label>
                <textarea
                  rows={2}
                  value={seo.metaDescription || ''}
                  onChange={(e) => handleUpdate(seo.pagePath, 'metaDescription', e.target.value)}
                  className="w-full bg-navy-950 text-white text-xs p-3 rounded-xl border border-navy-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Meta Keywords (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={seo.metaKeywords || ''}
                    onChange={(e) => handleUpdate(seo.pagePath, 'metaKeywords', e.target.value)}
                    className="w-full bg-navy-950 text-white text-xs px-3.5 py-2 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Open Graph / Social Sharing Image URL
                  </label>
                  <input
                    type="text"
                    value={seo.ogImage || ''}
                    onChange={(e) => handleUpdate(seo.pagePath, 'ogImage', e.target.value)}
                    className="w-full bg-navy-950 text-white text-xs px-3.5 py-2 rounded-xl border border-navy-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Google Analytics ID (e.g. G-XXXXXXXX)
                  </label>
                  <input
                    type="text"
                    value={seo.googleAnalyticsId || ''}
                    onChange={(e) => handleUpdate(seo.pagePath, 'googleAnalyticsId', e.target.value)}
                    placeholder="G-..."
                    className="w-full bg-navy-950 text-white text-xs px-3.5 py-2 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Google Search Console Verification Meta Tag
                  </label>
                  <input
                    type="text"
                    value={seo.googleSearchConsoleCode || ''}
                    onChange={(e) => handleUpdate(seo.pagePath, 'googleSearchConsoleCode', e.target.value)}
                    placeholder="google-site-verification=..."
                    className="w-full bg-navy-950 text-white text-xs px-3.5 py-2 rounded-xl border border-navy-700"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs sm:text-sm shadow-glow-saffron transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save All SEO Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
