'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Layers, Save, CheckCircle, ArrowUp, ArrowDown } from 'lucide-react';

export default function HomepageSectionAdminPage() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);

  const fetchSections = () => {
    fetch('/api/sections')
      .then((r) => r.json())
      .then((d) => {
        setSections(d || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleToggle = (id: number) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isEnabled: !s.isEnabled } : s))
    );
  };

  const handleTextChange = (id: number, field: string, val: any) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Re-assign displayOrder numbers
    const reordered = updated.map((item, idx) => ({ ...item, displayOrder: idx + 1 }));
    setSections(reordered);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setAlert(null);

    try {
      const res = await fetch('/api/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections }),
      });

      if (res.ok) {
        setAlert('Homepage sections configuration updated successfully!');
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
              12. Homepage Section Layout Manager
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Re-order sections, toggle visibility, customize headings, and adjust posts count on the live homepage.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs flex items-center gap-2 shadow-glow-saffron self-start sm:self-auto transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Section Order'}</span>
          </button>
        </div>

        {alert && (
          <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{alert}</span>
          </div>
        )}

        <div className="space-y-4">
          {sections.map((section, idx) => (
            <div
              key={section.id}
              className={`p-5 rounded-2xl border transition-all ${
                section.isEnabled
                  ? 'bg-navy-900/80 border-navy-800'
                  : 'bg-navy-950/60 border-navy-850 opacity-60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Up / Down Reorder buttons */}
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveOrder(idx, 'up')}
                      className="p-1 rounded bg-navy-950 hover:bg-navy-800 disabled:opacity-20 text-gray-400 hover:text-white"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === sections.length - 1}
                      onClick={() => moveOrder(idx, 'down')}
                      className="p-1 rounded bg-navy-950 hover:bg-navy-800 disabled:opacity-20 text-gray-400 hover:text-white"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="w-7 h-7 rounded-lg bg-navy-950 border border-navy-700 text-saffron-400 font-bold text-xs flex items-center justify-center">
                    {section.displayOrder}
                  </span>

                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {section.sectionKey.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] text-gray-400 block">
                      Default Key: <code className="text-saffron-400">{section.sectionKey}</code>
                    </span>
                  </div>
                </div>

                {/* Enable toggle */}
                <div className="flex items-center gap-4">
                  {section.sectionKey === 'latest_blogs' && (
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <span>Posts displayed:</span>
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={section.postsCount || 6}
                        onChange={(e) => handleTextChange(section.id, 'postsCount', parseInt(e.target.value))}
                        className="w-16 bg-navy-950 text-white text-xs px-2 py-1 rounded border border-navy-700"
                      />
                    </div>
                  )}

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-200">
                    <input
                      type="checkbox"
                      checked={section.isEnabled}
                      onChange={() => handleToggle(section.id)}
                      className="w-4 h-4 rounded text-saffron-500"
                    />
                    <span>{section.isEnabled ? 'Enabled' : 'Hidden'}</span>
                  </label>
                </div>
              </div>

              {/* Editable Headings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-navy-800/80">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">
                    Section Title (English)
                  </label>
                  <input
                    type="text"
                    value={section.titleEn || ''}
                    onChange={(e) => handleTextChange(section.id, 'titleEn', e.target.value)}
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">
                    Section Title (Punjabi)
                  </label>
                  <input
                    type="text"
                    value={section.titlePa || ''}
                    onChange={(e) => handleTextChange(section.id, 'titlePa', e.target.value)}
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2 rounded-xl border border-navy-700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
