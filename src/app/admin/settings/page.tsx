'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';

export default function WebsiteSettingsAdminPage() {
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        setFormData(data || {});
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setAlert(null);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setAlert({ type: 'success', message: 'Website settings saved successfully!' });
      } else {
        setAlert({ type: 'error', message: data.error || 'Failed to update settings' });
      }
    } catch {
      setAlert({ type: 'error', message: 'Network error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-gray-400">Loading settings...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-navy-800">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
              1. Website Settings & Branding
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Configure portal titles, logos, brand colors, language preferences, and official contact channels.
            </p>
          </div>
        </div>

        {alert && (
          <div
            className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
              alert.type === 'success'
                ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-200'
                : 'bg-red-950 border border-red-500/40 text-red-200'
            }`}
          >
            {alert.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span>{alert.message}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Identity & Headings */}
          <div className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-4">
            <h3 className="text-sm font-bold text-saffron-400 uppercase tracking-wider">
              Identity & Global Branding
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Website Name
                </label>
                <input
                  type="text"
                  value={formData.siteName || ''}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-navy-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Portal Header Title
                </label>
                <input
                  type="text"
                  value={formData.siteTitle || ''}
                  onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-navy-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Global Website Description
              </label>
              <textarea
                rows={2}
                value={formData.siteDescription || ''}
                onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                className="w-full bg-navy-950 text-white text-xs sm:text-sm p-3 rounded-xl border border-navy-700"
              />
            </div>
          </div>

          {/* Logo URLs */}
          <div className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-4">
            <h3 className="text-sm font-bold text-saffron-400 uppercase tracking-wider">
              Logos & Favicon URLs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Main Header Logo
                </label>
                <input
                  type="text"
                  value={formData.mainLogoUrl || ''}
                  onChange={(e) => setFormData({ ...formData, mainLogoUrl: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Footer Logo
                </label>
                <input
                  type="text"
                  value={formData.footerLogoUrl || ''}
                  onChange={(e) => setFormData({ ...formData, footerLogoUrl: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Favicon / Emblem Icon
                </label>
                <input
                  type="text"
                  value={formData.faviconUrl || ''}
                  onChange={(e) => setFormData({ ...formData, faviconUrl: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-4">
            <h3 className="text-sm font-bold text-saffron-400 uppercase tracking-wider">
              Official Contact & Office Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={formData.contactPhone || ''}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-navy-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Official Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail || ''}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-navy-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumber || ''}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-navy-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Office Physical Address
              </label>
              <input
                type="text"
                value={formData.contactAddress || ''}
                onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })}
                className="w-full bg-navy-950 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-navy-700"
              />
            </div>
          </div>

          {/* Color & Language Controls */}
          <div className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-4">
            <h3 className="text-sm font-bold text-saffron-400 uppercase tracking-wider">
              Colors & Language Preferences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Primary Dark Navy Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.primaryColor || '#0B192C'}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="w-8 h-8 rounded border border-navy-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.primaryColor || '#0B192C'}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="flex-1 bg-navy-950 text-white text-xs px-3 py-2 rounded-xl border border-navy-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Accent Saffron/Gold Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.accentColor || '#F59E0B'}
                    onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                    className="w-8 h-8 rounded border border-navy-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.accentColor || '#F59E0B'}
                    onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                    className="flex-1 bg-navy-950 text-white text-xs px-3 py-2 rounded-xl border border-navy-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Default Language
                </label>
                <select
                  value={formData.defaultLanguage || 'en'}
                  onChange={(e) => setFormData({ ...formData, defaultLanguage: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                >
                  <option value="en">English (Default)</option>
                  <option value="pa">Punjabi (ਪੰਜਾਬੀ)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-6 text-xs text-gray-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.punjabiFirst)}
                  onChange={(e) => setFormData({ ...formData, punjabiFirst: e.target.checked })}
                  className="w-4 h-4 rounded text-saffron-500 bg-navy-950 border-navy-700"
                />
                <span>Set Punjabi as Initial Default Interface (ਪੰਜਾਬੀ-ਮੁੱਖ ਇੰਟਰਫੇਸ)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.allowLanguageToggle !== false}
                  onChange={(e) => setFormData({ ...formData, allowLanguageToggle: e.target.checked })}
                  className="w-4 h-4 rounded text-saffron-500 bg-navy-950 border-navy-700"
                />
                <span>Allow Public Visitors to Toggle Language</span>
              </label>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Footer Copyright Text
              </label>
              <input
                type="text"
                value={formData.copyrightText || ''}
                onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
                className="w-full bg-navy-950 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-navy-700"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs sm:text-sm shadow-glow-saffron transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
