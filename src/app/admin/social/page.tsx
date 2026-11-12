'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Share2, RefreshCw, CheckCircle, AlertCircle, Save, ExternalLink } from 'lucide-react';

export default function SocialMediaAdminPage() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchAccounts = () => {
    fetch('/api/social')
      .then((r) => r.json())
      .then((data) => {
        setAccounts(data || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleUpdate = (platform: string, field: string, val: any) => {
    setAccounts((prev) =>
      prev.map((a) => (a.platform === platform ? { ...a, [field]: val } : a))
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setAlert(null);

    try {
      const res = await fetch('/api/social', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accounts }),
      });

      if (res.ok) {
        setAlert({ type: 'success', message: 'Social credentials and URLs updated successfully!' });
      } else {
        setAlert({ type: 'error', message: 'Failed to update credentials' });
      }
    } catch {
      setAlert({ type: 'error', message: 'Network error' });
    } finally {
      setSaving(false);
    }
  };

  const handleManualSync = async () => {
    setSyncing(true);
    setAlert(null);

    try {
      const res = await fetch('/api/social/sync', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setAlert({
          type: 'success',
          message: 'Social feeds background sync completed. Cached records refreshed!',
        });
        fetchAccounts();
      } else {
        setAlert({ type: 'error', message: data.error || 'Failed to sync feeds' });
      }
    } catch {
      setAlert({ type: 'error', message: 'Sync connection failed' });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-navy-800 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
              9. Social Media & Meta Graph API Integration
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Connect authorized Meta Graph APIs (Facebook & Instagram), configure profile handles, and manage live caching.
            </p>
          </div>

          <button
            onClick={handleManualSync}
            disabled={syncing}
            className="px-5 py-2.5 rounded-full bg-navy-800 hover:bg-navy-750 text-saffron-400 hover:text-saffron-300 font-bold text-xs flex items-center gap-2 border border-navy-700 shadow self-start sm:self-auto transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Synchronizing Feeds...' : 'Sync Now with Meta API'}</span>
          </button>
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
          {/* Facebook Configuration */}
          {accounts
            .filter((a) => a.platform === 'facebook')
            .map((fb) => (
              <div
                key={fb.platform}
                className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#1877F2] text-white flex items-center justify-center font-bold text-xs">
                      f
                    </div>
                    <h3 className="text-sm font-bold text-white font-serif">
                      Facebook Official Page Integration
                    </h3>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      fb.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    Status: {fb.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Facebook Page Public URL
                    </label>
                    <input
                      type="text"
                      value={fb.profileUrl || ''}
                      onChange={(e) => handleUpdate('facebook', 'profileUrl', e.target.value)}
                      className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Facebook Page ID
                    </label>
                    <input
                      type="text"
                      value={fb.pageId || ''}
                      onChange={(e) => handleUpdate('facebook', 'pageId', e.target.value)}
                      placeholder="e.g. 1029384756"
                      className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Meta Graph API Access Token (Stored Securely)
                  </label>
                  <input
                    type="password"
                    value={fb.accessToken || ''}
                    onChange={(e) => handleUpdate('facebook', 'accessToken', e.target.value)}
                    placeholder="EAA..."
                    className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700 font-mono"
                  />
                  <span className="text-[11px] text-gray-500 mt-1 block">
                    Never exposed to public frontend code. When empty, verified cached posts are displayed automatically.
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={fb.isFeedEnabled}
                      onChange={(e) => handleUpdate('facebook', 'isFeedEnabled', e.target.checked)}
                      className="w-4 h-4 rounded text-saffron-500"
                    />
                    <span>Show Facebook updates on Homepage feed</span>
                  </label>

                  {fb.lastSyncedAt && (
                    <span className="text-gray-500 ml-auto">
                      Last Synced: {new Date(fb.lastSyncedAt).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            ))}

          {/* Instagram Configuration */}
          {accounts
            .filter((a) => a.platform === 'instagram')
            .map((ig) => (
              <div
                key={ig.platform}
                className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs">
                      ig
                    </div>
                    <h3 className="text-sm font-bold text-white font-serif">
                      Instagram Business Account Integration
                    </h3>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      ig.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    Status: {ig.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Instagram Profile URL
                    </label>
                    <input
                      type="text"
                      value={ig.profileUrl || ''}
                      onChange={(e) => handleUpdate('instagram', 'profileUrl', e.target.value)}
                      className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Instagram Business Account ID
                    </label>
                    <input
                      type="text"
                      value={ig.businessAccountId || ''}
                      onChange={(e) => handleUpdate('instagram', 'businessAccountId', e.target.value)}
                      placeholder="e.g. 178414002345678"
                      className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Instagram Access Token
                  </label>
                  <input
                    type="password"
                    value={ig.accessToken || ''}
                    onChange={(e) => handleUpdate('instagram', 'accessToken', e.target.value)}
                    placeholder="IGQV..."
                    className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700 font-mono"
                  />
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ig.isFeedEnabled}
                      onChange={(e) => handleUpdate('instagram', 'isFeedEnabled', e.target.checked)}
                      className="w-4 h-4 rounded text-saffron-500"
                    />
                    <span>Show Instagram media on Homepage feed</span>
                  </label>

                  {ig.lastSyncedAt && (
                    <span className="text-gray-500 ml-auto">
                      Last Synced: {new Date(ig.lastSyncedAt).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            ))}

          {/* Other Social Handles */}
          <div className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-4">
            <h3 className="text-sm font-bold text-saffron-400 uppercase tracking-wider">
              Other Official Channels & Social Links
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {accounts
                .filter((a) => !['facebook', 'instagram'].includes(a.platform))
                .map((item) => (
                  <div key={item.platform}>
                    <label className="block text-xs font-semibold text-gray-300 mb-1 capitalize">
                      {item.platform} URL
                    </label>
                    <input
                      type="text"
                      value={item.profileUrl || ''}
                      onChange={(e) => handleUpdate(item.platform, 'profileUrl', e.target.value)}
                      className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs sm:text-sm shadow-glow-saffron transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Social Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
