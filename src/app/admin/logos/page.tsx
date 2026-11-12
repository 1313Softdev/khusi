'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { PlusCircle, Trash2, Edit2, RotateCw, Play, CheckCircle, Save } from 'lucide-react';
import LogoCarousel from '@/components/public/LogoCarousel';

export default function LogoAnimationAdminPage() {
  const [logos, setLogos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLogo, setEditingLogo] = useState<any | null>(null);
  const [rotationInterval, setRotationInterval] = useState(4);
  const [effect, setEffect] = useState<'fade' | 'rotate' | 'slide'>('fade');
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);

  const fetchLogos = () => {
    fetch('/api/logos')
      .then((r) => r.json())
      .then((d) => {
        setLogos(d || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = editingLogo.id ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/logos', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingLogo),
      });
      if (res.ok) {
        setAlert('Logo saved successfully!');
        setEditingLogo(null);
        fetchLogos();
        setTimeout(() => setAlert(null), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this logo?')) return;
    await fetch(`/api/logos?id=${id}`, { method: 'DELETE' });
    fetchLogos();
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-navy-800 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
              4. Animated Logo Introduction Manager
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Upload organization insignia, manage rotating transitions, display effects (fade, rotate, slide), and live preview.
            </p>
          </div>

          <button
            onClick={() =>
              setEditingLogo({
                title: '',
                imageUrl: '/images/logo-emblem.png',
                displayOrder: logos.length + 1,
                isActive: true,
              })
            }
            className="px-4 py-2.5 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-glow-saffron transition-all self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Logo</span>
          </button>
        </div>

        {alert && (
          <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{alert}</span>
          </div>
        )}

        {/* Live Preview Bar */}
        <div className="bg-navy-900/90 rounded-3xl p-6 border border-saffron-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-saffron-400 font-bold text-xs">
              <Play className="w-4 h-4" />
              <span>LIVE ANIMATION PREVIEW</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-400">Effect:</span>
                <select
                  value={effect}
                  onChange={(e: any) => setEffect(e.target.value)}
                  className="bg-navy-950 text-white text-xs px-2.5 py-1 rounded border border-navy-700"
                >
                  <option value="fade">Smooth Fade</option>
                  <option value="rotate">3D Rotate</option>
                  <option value="slide">Horizontal Slide</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-gray-400">Interval:</span>
                <select
                  value={rotationInterval}
                  onChange={(e) => setRotationInterval(parseInt(e.target.value))}
                  className="bg-navy-950 text-white text-xs px-2.5 py-1 rounded border border-navy-700"
                >
                  <option value={2}>2 Seconds</option>
                  <option value={4}>4 Seconds</option>
                  <option value={6}>6 Seconds</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-navy-800">
            <LogoCarousel
              logos={logos}
              rotationInterval={rotationInterval}
              effect={effect}
              isEnabled={true}
            />
          </div>
        </div>

        {/* Modal / Form for editing */}
        {editingLogo && (
          <div className="bg-navy-900 p-6 rounded-3xl border border-navy-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <h3 className="text-sm font-bold text-white font-serif">
                {editingLogo.id ? `Edit Logo #${editingLogo.id}` : 'Upload New Logo'}
              </h3>
              <button
                onClick={() => setEditingLogo(null)}
                className="text-xs text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Logo Title / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingLogo.title}
                    onChange={(e) => setEditingLogo({ ...editingLogo, title: e.target.value })}
                    placeholder="e.g. Punjab Sanjhivalta Dal"
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Logo Image URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingLogo.imageUrl}
                    onChange={(e) => setEditingLogo({ ...editingLogo, imageUrl: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Order:</span>
                  <input
                    type="number"
                    value={editingLogo.displayOrder}
                    onChange={(e) => setEditingLogo({ ...editingLogo, displayOrder: parseInt(e.target.value) })}
                    className="w-20 bg-navy-950 text-white text-xs px-2 py-1.5 rounded border border-navy-700"
                  />
                </div>

                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingLogo.isActive}
                    onChange={(e) => setEditingLogo({ ...editingLogo, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-saffron-500"
                  />
                  <span>Display in Logo Animation</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-navy-800">
                <button
                  type="button"
                  onClick={() => setEditingLogo(null)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs shadow"
                >
                  {saving ? 'Saving...' : 'Save Logo'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Existing Logos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="bg-navy-900/80 p-4 rounded-2xl border border-navy-800 flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[4/3] rounded-xl bg-navy-950 p-4 flex items-center justify-center border border-navy-800/80 mb-3">
                  <img src={logo.imageUrl} alt={logo.title} className="max-h-full max-w-full object-contain" />
                </div>
                <h4 className="text-xs font-bold text-white truncate">{logo.title}</h4>
                <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
                  <span>Order: #{logo.displayOrder}</span>
                  <span className={logo.isActive ? 'text-emerald-400 font-bold' : 'text-gray-500'}>
                    {logo.isActive ? 'Active' : 'Disabled'}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-navy-800 flex items-center justify-end gap-2">
                <button
                  onClick={() => setEditingLogo(logo)}
                  className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-saffron-400"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(logo.id)}
                  className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400"
                  title="Delete"
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
