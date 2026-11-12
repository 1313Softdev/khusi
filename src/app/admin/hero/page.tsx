'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { PlusCircle, Trash2, Edit2, CheckCircle, Save, Eye, Video, Image as ImageIcon } from 'lucide-react';

export default function HeroSectionAdminPage() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlide, setEditingSlide] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);

  const fetchSlides = () => {
    fetch('/api/hero')
      .then((r) => r.json())
      .then((d) => {
        setSlides(d || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = editingSlide.id ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/hero', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSlide),
      });
      if (res.ok) {
        setAlert('Slide saved successfully!');
        setEditingSlide(null);
        fetchSlides();
        setTimeout(() => setAlert(null), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this slide?')) return;
    await fetch(`/api/hero?id=${id}`, { method: 'DELETE' });
    fetchSlides();
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-navy-800 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
              2. Hero Section Slider Manager
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Manage background slides, bilingual headings, call-to-actions, video backgrounds, and overlay opacities.
            </p>
          </div>

          <button
            onClick={() =>
              setEditingSlide({
                titleEn: '',
                titlePa: '',
                subtitleEn: 'Sardar Khushinder Singh Jand Sahib',
                subtitlePa: 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ',
                descriptionEn: '',
                descriptionPa: '',
                imageUrl: '/images/hero-1.jpg',
                videoUrl: '',
                btn1TextEn: 'About Me',
                btn1TextPa: 'ਮੇਰੇ ਬਾਰੇ',
                btn1Url: '/about',
                btn2TextEn: 'Contact Me',
                btn2TextPa: 'ਸੰਪਰਕ ਕਰੋ',
                btn2Url: '/contact',
                overlayOpacity: 0.5,
                displayOrder: slides.length + 1,
                isActive: true,
              })
            }
            className="px-4 py-2.5 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-glow-saffron transition-all self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Slide</span>
          </button>
        </div>

        {alert && (
          <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{alert}</span>
          </div>
        )}

        {/* Slide Edit Modal / Form */}
        {editingSlide && (
          <div className="bg-navy-900 p-6 rounded-3xl border border-saffron-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <h3 className="text-sm font-bold text-white font-serif">
                {editingSlide.id ? `Edit Slide #${editingSlide.id}` : 'Create New Hero Slide'}
              </h3>
              <button
                onClick={() => setEditingSlide(null)}
                className="text-xs text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Heading Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingSlide.titleEn}
                    onChange={(e) => setEditingSlide({ ...editingSlide, titleEn: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Heading Title (Punjabi) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingSlide.titlePa}
                    onChange={(e) => setEditingSlide({ ...editingSlide, titlePa: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Subtitle (English)
                  </label>
                  <input
                    type="text"
                    value={editingSlide.subtitleEn || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, subtitleEn: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Subtitle (Punjabi)
                  </label>
                  <input
                    type="text"
                    value={editingSlide.subtitlePa || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, subtitlePa: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Description (English)
                  </label>
                  <textarea
                    rows={2}
                    value={editingSlide.descriptionEn || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, descriptionEn: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs p-2.5 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Description (Punjabi)
                  </label>
                  <textarea
                    rows={2}
                    value={editingSlide.descriptionPa || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, descriptionPa: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs p-2.5 rounded-xl border border-navy-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Background Image URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingSlide.imageUrl}
                    onChange={(e) => setEditingSlide({ ...editingSlide, imageUrl: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Optional Video URL (.mp4 or stream)
                  </label>
                  <input
                    type="text"
                    value={editingSlide.videoUrl || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, videoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Overlay Darkness (0.1 to 0.9)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.1"
                    max="0.95"
                    value={editingSlide.overlayOpacity}
                    onChange={(e) => setEditingSlide({ ...editingSlide, overlayOpacity: parseFloat(e.target.value) })}
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Button 1 Label</label>
                  <input
                    type="text"
                    value={editingSlide.btn1TextEn || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, btn1TextEn: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Button 1 URL</label>
                  <input
                    type="text"
                    value={editingSlide.btn1Url || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, btn1Url: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Button 2 Label</label>
                  <input
                    type="text"
                    value={editingSlide.btn2TextEn || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, btn2TextEn: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Button 2 URL</label>
                  <input
                    type="text"
                    value={editingSlide.btn2Url || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, btn2Url: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2 rounded-xl border border-navy-700"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2 text-xs">
                <label className="flex items-center gap-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={editingSlide.isActive}
                    onChange={(e) => setEditingSlide({ ...editingSlide, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-saffron-500"
                  />
                  <span>Active (Displayed on Live Site)</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Order:</span>
                  <input
                    type="number"
                    value={editingSlide.displayOrder}
                    onChange={(e) => setEditingSlide({ ...editingSlide, displayOrder: parseInt(e.target.value) })}
                    className="w-16 bg-navy-950 text-white text-xs px-2 py-1 rounded border border-navy-700"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-navy-800">
                <button
                  type="button"
                  onClick={() => setEditingSlide(null)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : 'Save Slide'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Existing Slides List */}
        <div className="space-y-4">
          {slides.map((s) => (
            <div
              key={s.id}
              className="bg-navy-900/80 p-5 rounded-2xl border border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 rounded-xl bg-navy-950 overflow-hidden relative border border-navy-700 shrink-0">
                  <img src={s.imageUrl} alt={s.titleEn} className="w-full h-full object-cover" />
                  {s.videoUrl && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Video className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-serif">
                      {s.titleEn}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-800 text-gray-400'
                      }`}
                    >
                      {s.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  <span className="text-xs text-saffron-400 block mt-0.5">
                    {s.titlePa}
                  </span>
                  <span className="text-[11px] text-gray-400 block mt-1">
                    Order: #{s.displayOrder} • Opacity: {s.overlayOpacity}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => setEditingSlide(s)}
                  className="p-2 rounded-lg bg-navy-800 hover:bg-navy-750 text-saffron-400 border border-navy-700"
                  title="Edit Slide"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30"
                  title="Delete Slide"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
