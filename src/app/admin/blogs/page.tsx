'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { PlusCircle, Trash2, Edit2, FileText, Search, CheckCircle, Save, ExternalLink, Tag, Video } from 'lucide-react';
import Link from 'next/link';

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);

  const fetchBlogs = () => {
    fetch('/api/blogs')
      .then((r) => r.json())
      .then((data) => {
        setBlogs(data || []);
        setLoading(false);
      });
  };

  const fetchCategories = () => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => setCategories(data || []));
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = editingBlog.id ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/blogs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBlog),
      });

      if (res.ok) {
        setAlert('Article saved successfully!');
        setEditingBlog(null);
        fetchBlogs();
        setTimeout(() => setAlert(null), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
    fetchBlogs();
  };

  const filteredBlogs = blogs.filter((b) => {
    return (
      searchTerm === '' ||
      b.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.titlePa.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-navy-800 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
              5. Blog & Public News Management
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Draft, schedule, publish bilingual articles, attach media or video URLs, and configure SEO metadata.
            </p>
          </div>

          <button
            onClick={() =>
              setEditingBlog({
                titleEn: '',
                titlePa: '',
                slug: '',
                shortDescEn: '',
                shortDescPa: '',
                contentEn: '',
                contentPa: '',
                featuredImage: '/images/blog-health-camp.jpg',
                videoUrl: '',
                categoryId: categories[0]?.id || 1,
                isFeatured: false,
                status: 'published',
                authorName: 'Sardar Khushinder Singh',
                metaTitle: '',
                metaDescription: '',
                metaKeywords: '',
              })
            }
            className="px-4 py-2.5 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-glow-saffron transition-all self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Article</span>
          </button>
        </div>

        {alert && (
          <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{alert}</span>
          </div>
        )}

        {/* Editor Form Modal */}
        {editingBlog && (
          <div className="bg-navy-900 p-6 sm:p-8 rounded-3xl border border-saffron-500/40 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <h3 className="text-base font-bold text-white font-serif">
                {editingBlog.id ? `Edit Article: ${editingBlog.titleEn}` : 'Compose New Article'}
              </h3>
              <button
                onClick={() => setEditingBlog(null)}
                className="text-xs text-gray-400 hover:text-white"
              >
                Close Editor
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Bilingual Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Article Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBlog.titleEn}
                    onChange={(e) => setEditingBlog({ ...editingBlog, titleEn: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Article Title (Punjabi) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBlog.titlePa}
                    onChange={(e) => setEditingBlog({ ...editingBlog, titlePa: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                  />
                </div>
              </div>

              {/* Slug, Category, Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Custom URL Slug (Leave blank for auto)
                  </label>
                  <input
                    type="text"
                    value={editingBlog.slug || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                    placeholder="e.g. medical-camp-jand-sahib"
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={editingBlog.categoryId}
                    onChange={(e) => setEditingBlog({ ...editingBlog, categoryId: parseInt(e.target.value) })}
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameEn} ({c.namePa})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Publish Status
                  </label>
                  <select
                    value={editingBlog.status}
                    onChange={(e) => setEditingBlog({ ...editingBlog, status: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>

              {/* Short Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Short Summary (English) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingBlog.shortDescEn}
                    onChange={(e) => setEditingBlog({ ...editingBlog, shortDescEn: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs p-3 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Short Summary (Punjabi) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingBlog.shortDescPa}
                    onChange={(e) => setEditingBlog({ ...editingBlog, shortDescPa: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs p-3 rounded-xl border border-navy-700"
                  />
                </div>
              </div>

              {/* Full Content Body */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Full Content (English) *
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={editingBlog.contentEn}
                    onChange={(e) => setEditingBlog({ ...editingBlog, contentEn: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs p-3 rounded-xl border border-navy-700 font-sans leading-relaxed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Full Content (Punjabi) *
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={editingBlog.contentPa}
                    onChange={(e) => setEditingBlog({ ...editingBlog, contentPa: e.target.value })}
                    className="w-full bg-navy-950 text-white text-xs p-3 rounded-xl border border-navy-700 font-sans leading-relaxed"
                  />
                </div>
              </div>

              {/* Media & Video URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Featured Image URL
                  </label>
                  <input
                    type="text"
                    value={editingBlog.featuredImage || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, featuredImage: e.target.value })}
                    placeholder="/images/blog-health-camp.jpg or /uploads/..."
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Optional Video URL (YouTube embed or MP4)
                  </label>
                  <input
                    type="text"
                    value={editingBlog.videoUrl || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/embed/..."
                    className="w-full bg-navy-950 text-white text-xs px-3 py-2.5 rounded-xl border border-navy-700"
                  />
                </div>
              </div>

              {/* SEO Settings */}
              <div className="bg-navy-950/60 p-4 rounded-2xl border border-navy-800 space-y-3">
                <span className="text-xs font-bold text-saffron-400 block uppercase tracking-wider">
                  Article Search Engine Optimization (SEO)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Meta Title</label>
                    <input
                      type="text"
                      value={editingBlog.metaTitle || ''}
                      onChange={(e) => setEditingBlog({ ...editingBlog, metaTitle: e.target.value })}
                      className="w-full bg-navy-900 text-white text-xs px-3 py-1.5 rounded-lg border border-navy-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Meta Description</label>
                    <input
                      type="text"
                      value={editingBlog.metaDescription || ''}
                      onChange={(e) => setEditingBlog({ ...editingBlog, metaDescription: e.target.value })}
                      className="w-full bg-navy-900 text-white text-xs px-3 py-1.5 rounded-lg border border-navy-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Keywords</label>
                    <input
                      type="text"
                      value={editingBlog.metaKeywords || ''}
                      onChange={(e) => setEditingBlog({ ...editingBlog, metaKeywords: e.target.value })}
                      className="w-full bg-navy-900 text-white text-xs px-3 py-1.5 rounded-lg border border-navy-700"
                    />
                  </div>
                </div>
              </div>

              {/* Featured toggle & Author */}
              <div className="flex items-center gap-6 pt-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                  <input
                    type="checkbox"
                    checked={Boolean(editingBlog.isFeatured)}
                    onChange={(e) => setEditingBlog({ ...editingBlog, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-saffron-500"
                  />
                  <span>Mark as Featured Post (Pinned to Homepage)</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-navy-800">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs shadow-glow-saffron flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : 'Save Article'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles by title or keyword..."
            className="w-full bg-navy-900 text-white text-xs sm:text-sm pl-11 pr-4 py-3 rounded-2xl border border-navy-800"
          />
        </div>

        {/* Blog Table */}
        <div className="bg-navy-900/80 rounded-3xl border border-navy-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-950 border-b border-navy-800 text-gray-400 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-6 py-4">Title & Details</th>
                  <th className="px-4 py-4">Category</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Views</th>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800">
                {filteredBlogs.map((b) => (
                  <tr key={b.id} className="hover:bg-navy-850/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 rounded-lg overflow-hidden bg-navy-950 shrink-0 border border-navy-800">
                          <img src={b.featuredImage || '/images/blog-health-camp.jpg'} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="font-bold text-white block">{b.titleEn}</span>
                          <span className="text-[11px] text-saffron-400 block mt-0.5">{b.titlePa}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-300 font-medium">
                      {b.category?.nameEn || 'General'}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                          b.status === 'published'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-300 font-bold">
                      {b.viewsCount || 0}
                    </td>
                    <td className="px-4 py-4 text-gray-400">
                      {new Date(b.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blog/${b.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-gray-300 hover:text-white"
                          title="View on site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setEditingBlog(b)}
                          className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-saffron-400"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(b.id)}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
