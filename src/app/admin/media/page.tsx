'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Upload, Trash2, Copy, Check, Search, Filter, Folder, File, Video, Image as ImageIcon } from 'lucide-react';

export default function MediaLibraryAdminPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');

  const fetchMedia = () => {
    fetch('/api/media')
      .then((r) => r.json())
      .then((data) => {
        setMedia(data || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name);
    formData.append('folder', selectedFolder === 'all' ? 'general' : selectedFolder);

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        fetchMedia();
      }
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (id: number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this media file?')) return;
    await fetch(`/api/media?id=${id}`, { method: 'DELETE' });
    fetchMedia();
  };

  const filteredMedia = media.filter((m) => {
    const matchSearch = searchTerm === '' || m.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFolder = selectedFolder === 'all' || m.folder === selectedFolder;
    return matchSearch && matchFolder;
  });

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-navy-800 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
              6. Media Library & Storage
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Upload, organize, inspect, and copy permanent URLs for photos, videos, and campaign graphics.
            </p>
          </div>

          <label className="px-5 py-2.5 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs flex items-center gap-2 shadow-glow-saffron cursor-pointer self-start sm:self-auto transition-all">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading...' : 'Upload Media File'}</span>
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-navy-900/80 p-4 rounded-2xl border border-navy-800">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search file name..."
              className="w-full bg-navy-950 text-white text-xs pl-10 pr-3 py-2 rounded-xl border border-navy-700"
            />
          </div>

          <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
            <span className="text-gray-400">Folder:</span>
            {['all', 'general', 'events', 'campaigns'].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFolder(f)}
                className={`px-3 py-1 rounded-lg capitalize font-bold transition-all ${
                  selectedFolder === f
                    ? 'bg-saffron-500 text-navy-950 shadow'
                    : 'bg-navy-950 text-gray-300 border border-navy-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredMedia.map((m) => {
            const isVideo = m.fileType === 'video';
            const isCopied = copiedId === m.id;

            return (
              <div
                key={m.id}
                className="bg-navy-900 rounded-2xl overflow-hidden border border-navy-800 group hover:border-saffron-500/50 flex flex-col justify-between shadow-lg"
              >
                <div className="aspect-square bg-navy-950 relative overflow-hidden flex items-center justify-center">
                  {isVideo ? (
                    <div className="flex flex-col items-center gap-1 text-gray-400">
                      <Video className="w-8 h-8 text-saffron-400" />
                      <span className="text-[10px] uppercase font-bold">Video</span>
                    </div>
                  ) : (
                    <img
                      src={m.fileUrl}
                      alt={m.altText || ''}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  )}

                  {/* Actions overlay */}
                  <div className="absolute inset-0 bg-navy-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <button
                      onClick={() => handleCopyUrl(m.id, m.fileUrl)}
                      className="p-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-saffron-400"
                      title="Copy URL"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="p-2 rounded-lg bg-red-950 hover:bg-red-900 text-red-400"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-2.5">
                  <span className="text-[11px] font-bold text-white truncate block">
                    {m.fileName}
                  </span>
                  <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1">
                    <span>{(m.fileSize / 1024).toFixed(0)} KB</span>
                    <span className="capitalize">{m.folder}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
