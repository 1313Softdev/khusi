'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { PlusCircle, Trash2, Edit2, Megaphone, CheckCircle, Save, ExternalLink } from 'lucide-react';

export default function AdvertisementAdminPage() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAd, setEditingAd] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);

  const fetchAds = () => {
    fetch('/api/advertisements')
      .then((r) => r.json())
      .then((d) => {
        setAds(d || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = editingAd.id ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/advertisements', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingAd),
      });

      if (res.ok) {
        setAlert('Advertisement saved successfully!');
        setEditingAd(null);
        fetchAds();
        setTimeout(() => setAlert(null), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this advertisement?')) return;
    await fetch(`/api/advertisements?id=${id}`, { method: 'DELETE' });
    fetchAds();
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-navy-800 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
              8. Advertisement & Public Banner Manager
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Control banners, public notices, awareness campaigns, Google AdSense, and placements across the website.
            </p>
          </div>

          <button
            onClick={() =>
              setEditingAd({
                title: '',
                placement: 'homepage',
                imageUrl: '/images/ad-blood-donation.jpg',
                destinationUrl: '/contact',
                htmlCode: '',
                isActive: true,
              })
            }
            className="px-4 py-2.5 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-glow-saffron transition-all self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Banner</span>
          </button>
        </div>

        {alert && (
          <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{alert}</span>
          </div>
        )}

        {/* Modal / Form */}
        {editingAd && (
          <div className="bg-navy-900 p-6 rounded-3xl border border-saffron-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <h3 className="text-sm font-bold text-white font-serif">
                {editingAd.id ? `Edit Banner #${editingAd.id}` : 'Create New Banner'}
              </h3>
              <button
                onClick={() => setEditingAd(null)}
                className="text-xs text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Banner Title / Notice Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAd.title}
                    onChange={(e) => setEditingAd({ ...editingAd, title: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Placement Location *
                  </label>
                  <select
                    value={editingAd.placement}
                    onChange={(e) => setEditingAd({ ...editingAd, placement: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                  >
                    <option value="homepage">Homepage Banner</option>
                    <option value="between_blogs">Between Blog Posts</option>
                    <option value="blog_sidebar">Blog Sidebar</option>
                    <option value="before_article">Before Article Content</option>
                    <option value="after_article">After Article Content</option>
                    <option value="footer">Footer Awareness Bar</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Banner Graphic Image URL
                  </label>
                  <input
                    type="text"
                    value={editingAd.imageUrl || ''}
                    onChange={(e) => setEditingAd({ ...editingAd, imageUrl: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Destination Link URL
                  </label>
                  <input
                    type="text"
                    value={editingAd.destinationUrl || ''}
                    onChange={(e) => setEditingAd({ ...editingAd, destinationUrl: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Optional Custom HTML Code / Google AdSense Tag
                </label>
                <textarea
                  rows={3}
                  value={editingAd.htmlCode || ''}
                  onChange={(e) => setEditingAd({ ...editingAd, htmlCode: e.target.value })}
                  placeholder="<script async src=...></script> or custom HTML..."
                  className="w-full bg-navy-950 text-white text-xs p-3 rounded-xl border border-navy-700 font-mono"
                />
              </div>

              <div className="flex items-center gap-6 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                  <input
                    type="checkbox"
                    checked={editingAd.isActive}
                    onChange={(e) => setEditingAd({ ...editingAd, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-saffron-500"
                  />
                  <span>Active (Displayed in Selected Placement)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-navy-800">
                <button
                  type="button"
                  onClick={() => setEditingAd(null)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs shadow"
                >
                  {saving ? 'Saving...' : 'Save Banner'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Existing Ads List */}
        <div className="space-y-4">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="bg-navy-900/80 p-5 rounded-2xl border border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-14 rounded-xl bg-navy-950 overflow-hidden border border-navy-700 shrink-0 flex items-center justify-center p-1">
                  {ad.imageUrl ? (
                    <img src={ad.imageUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] font-mono text-saffron-400">HTML CODE</span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{ad.title}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ad.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-800 text-gray-400'
                      }`}
                    >
                      {ad.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  <span className="text-xs text-saffron-400 font-semibold block mt-0.5 capitalize">
                    Placement: {ad.placement.replace('_', ' ')}
                  </span>
                  {ad.destinationUrl && (
                    <span className="text-[11px] text-gray-400 block mt-0.5 truncate max-w-sm">
                      Target: {ad.destinationUrl}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => setEditingAd(ad)}
                  className="p-2 rounded-lg bg-navy-800 hover:bg-navy-750 text-saffron-400"
                  title="Edit Banner"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(ad.id)}
                  className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400"
                  title="Delete Banner"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
