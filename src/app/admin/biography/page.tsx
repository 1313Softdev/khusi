'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Save, CheckCircle, AlertCircle, UserCheck } from 'lucide-react';

export default function BiographyAdminPage() {
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/biography')
      .then((r) => r.json())
      .then((data) => {
        setFormData(data || {});
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setAlert(null);

    try {
      const res = await fetch('/api/biography', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setAlert({ type: 'success', message: 'Biography details updated successfully!' });
      } else {
        setAlert({ type: 'error', message: 'Failed to update biography' });
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
        <div className="p-8 text-center text-gray-400">Loading biography details...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="pb-4 border-b border-navy-800">
          <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
            3. Biography & Public Service Manager
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Maintain verified public records, journey, public service milestones, vision for Punjab, and Punjab Sanjhivalta Dal membership.
          </p>
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
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span>{alert.message}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Identity & Images */}
          <div className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-4">
            <h3 className="text-sm font-bold text-saffron-400 uppercase tracking-wider">
              Profile Photo & Official Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Full Name (English)
                </label>
                <input
                  type="text"
                  value={formData.fullNameEn || ''}
                  onChange={(e) => setFormData({ ...formData, fullNameEn: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-navy-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Full Name (Punjabi)
                </label>
                <input
                  type="text"
                  value={formData.fullNamePa || ''}
                  onChange={(e) => setFormData({ ...formData, fullNamePa: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-navy-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Title & Identity (English)
                </label>
                <input
                  type="text"
                  value={formData.titleEn || ''}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-navy-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Title & Identity (Punjabi)
                </label>
                <input
                  type="text"
                  value={formData.titlePa || ''}
                  onChange={(e) => setFormData({ ...formData, titlePa: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-navy-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Official Profile Image URL
              </label>
              <input
                type="text"
                value={formData.profileImageUrl || ''}
                onChange={(e) => setFormData({ ...formData, profileImageUrl: e.target.value })}
                className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
              />
            </div>
          </div>

          {/* Short Bio summary */}
          <div className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-4">
            <h3 className="text-sm font-bold text-saffron-400 uppercase tracking-wider">
              Short Biography (Displayed on Homepage)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  English Summary
                </label>
                <textarea
                  rows={4}
                  value={formData.shortBioEn || ''}
                  onChange={(e) => setFormData({ ...formData, shortBioEn: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs sm:text-sm p-3 rounded-xl border border-navy-700 leading-relaxed"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Punjabi Summary
                </label>
                <textarea
                  rows={4}
                  value={formData.shortBioPa || ''}
                  onChange={(e) => setFormData({ ...formData, shortBioPa: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs sm:text-sm p-3 rounded-xl border border-navy-700 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Full Biography Narrative */}
          <div className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-4">
            <h3 className="text-sm font-bold text-saffron-400 uppercase tracking-wider">
              Comprehensive Personal Biography
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Full Narrative (English)
                </label>
                <textarea
                  rows={7}
                  value={formData.fullBioEn || ''}
                  onChange={(e) => setFormData({ ...formData, fullBioEn: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs sm:text-sm p-3 rounded-xl border border-navy-700 leading-relaxed font-sans"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Full Narrative (Punjabi)
                </label>
                <textarea
                  rows={7}
                  value={formData.fullBioPa || ''}
                  onChange={(e) => setFormData({ ...formData, fullBioPa: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs sm:text-sm p-3 rounded-xl border border-navy-700 leading-relaxed font-sans"
                />
              </div>
            </div>
          </div>

          {/* Social Work Journey & Public Service */}
          <div className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-4">
            <h3 className="text-sm font-bold text-saffron-400 uppercase tracking-wider">
              Social Work Journey & Service Milestones
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Journey (English)
                </label>
                <textarea
                  rows={5}
                  value={formData.journeyEn || ''}
                  onChange={(e) => setFormData({ ...formData, journeyEn: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs p-3 rounded-xl border border-navy-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Journey (Punjabi)
                </label>
                <textarea
                  rows={5}
                  value={formData.journeyPa || ''}
                  onChange={(e) => setFormData({ ...formData, journeyPa: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs p-3 rounded-xl border border-navy-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Public Service Activities (English)
                </label>
                <textarea
                  rows={6}
                  value={formData.publicServiceEn || ''}
                  onChange={(e) => setFormData({ ...formData, publicServiceEn: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs p-3 rounded-xl border border-navy-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Public Service Activities (Punjabi)
                </label>
                <textarea
                  rows={6}
                  value={formData.publicServicePa || ''}
                  onChange={(e) => setFormData({ ...formData, publicServicePa: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs p-3 rounded-xl border border-navy-700"
                />
              </div>
            </div>
          </div>

          {/* Vision for Punjab & Organization */}
          <div className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-4">
            <h3 className="text-sm font-bold text-saffron-400 uppercase tracking-wider">
              Vision & Punjab Sanjhivalta Dal
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Vision for Punjab (English)
                </label>
                <textarea
                  rows={4}
                  value={formData.visionEn || ''}
                  onChange={(e) => setFormData({ ...formData, visionEn: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs p-3 rounded-xl border border-navy-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Vision for Punjab (Punjabi)
                </label>
                <textarea
                  rows={4}
                  value={formData.visionPa || ''}
                  onChange={(e) => setFormData({ ...formData, visionPa: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs p-3 rounded-xl border border-navy-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Punjab Sanjhivalta Dal Principles (English)
                </label>
                <textarea
                  rows={4}
                  value={formData.organizationEn || ''}
                  onChange={(e) => setFormData({ ...formData, organizationEn: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs p-3 rounded-xl border border-navy-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Punjab Sanjhivalta Dal Principles (Punjabi)
                </label>
                <textarea
                  rows={4}
                  value={formData.organizationPa || ''}
                  onChange={(e) => setFormData({ ...formData, organizationPa: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs p-3 rounded-xl border border-navy-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Inspirational Quote (English)
                </label>
                <input
                  type="text"
                  value={formData.quoteEn || ''}
                  onChange={(e) => setFormData({ ...formData, quoteEn: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs px-3 py-2 rounded-xl border border-navy-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Inspirational Quote (Punjabi)
                </label>
                <input
                  type="text"
                  value={formData.quotePa || ''}
                  onChange={(e) => setFormData({ ...formData, quotePa: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs px-3 py-2 rounded-xl border border-navy-700"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs sm:text-sm shadow-glow-saffron transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Updating...' : 'Save Biography'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
