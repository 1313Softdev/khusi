import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
  FileText,
  Inbox,
  Share2,
  Image as ImageIcon,
  Clock,
  ArrowRight,
  PlusCircle,
  Eye,
  CheckCircle,
  AlertTriangle,
  UserCheck,
} from 'lucide-react';

export const revalidate = 0; // Fresh metrics

export default async function AdminDashboardPage() {
  const [
    totalBlogs,
    publishedBlogs,
    draftBlogs,
    totalInquiries,
    unreadInquiries,
    mediaCount,
    recentInquiries,
    socialAccounts,
    activityLogs,
  ] = await Promise.all([
    prisma.blog.count(),
    prisma.blog.count({ where: { status: 'published' } }),
    prisma.blog.count({ where: { status: 'draft' } }),
    prisma.contactInquiry.count(),
    prisma.contactInquiry.count({ where: { isRead: false } }),
    prisma.mediaLibrary.count(),
    prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.socialAccount.findMany({ where: { isActive: true } }),
    prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
      include: { user: true },
    }),
  ]);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-900/80 p-6 rounded-3xl border border-navy-800">
          <div>
            <span className="text-xs uppercase tracking-widest font-extrabold text-saffron-400 block mb-1">
              Executive Management Overview
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
              Sardar Khushinder Singh Jand Sahib — Portal Administration
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Real-time synchronization with local MySQL database. All updates reflect instantly on live website.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/blogs?action=new"
              className="px-4 py-2.5 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-glow-saffron transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Write Blog</span>
            </Link>
            <Link
              href="/admin/inquiries"
              className="px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-white font-bold text-xs border border-navy-700 flex items-center gap-1.5"
            >
              <Inbox className="w-4 h-4 text-saffron-400" />
              <span>Inquiries ({unreadInquiries} New)</span>
            </Link>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Blogs */}
          <div className="bg-navy-900/70 p-5 rounded-2xl border border-navy-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-semibold block uppercase">
                Articles & Blogs
              </span>
              <span className="text-2xl font-extrabold text-white mt-1 block">
                {totalBlogs}
              </span>
              <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-1">
                <span className="text-emerald-400 font-bold">{publishedBlogs} Published</span>
                <span>•</span>
                <span className="text-amber-400 font-bold">{draftBlogs} Drafts</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Inquiries */}
          <div className="bg-navy-900/70 p-5 rounded-2xl border border-navy-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-semibold block uppercase">
                Public Inquiries
              </span>
              <span className="text-2xl font-extrabold text-white mt-1 block">
                {totalInquiries}
              </span>
              <span className="text-[11px] text-amber-400 font-bold mt-1 block">
                {unreadInquiries} Awaiting Review
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-saffron-500/10 text-saffron-400 flex items-center justify-center">
              <Inbox className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Media Library */}
          <div className="bg-navy-900/70 p-5 rounded-2xl border border-navy-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-semibold block uppercase">
                Media Assets
              </span>
              <span className="text-2xl font-extrabold text-white mt-1 block">
                {mediaCount}
              </span>
              <span className="text-[11px] text-emerald-400 font-bold mt-1 block">
                High-Resolution Storage
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <ImageIcon className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Social Accounts */}
          <div className="bg-navy-900/70 p-5 rounded-2xl border border-navy-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-semibold block uppercase">
                Social Channels
              </span>
              <span className="text-2xl font-extrabold text-white mt-1 block">
                {socialAccounts.length}
              </span>
              <span className="text-[11px] text-emerald-400 font-bold mt-1 block">
                Sync Engine Active
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
              <Share2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Section 2: Recent Inquiries & Activity Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Inquiries List */}
          <div className="lg:col-span-7 bg-navy-900/70 p-6 rounded-3xl border border-navy-800">
            <div className="flex items-center justify-between pb-4 border-b border-navy-800 mb-4">
              <div>
                <h3 className="text-base font-bold text-white font-serif">
                  Recent Public Inquiries & Messages
                </h3>
                <span className="text-xs text-gray-400">Directly from the website contact form</span>
              </div>
              <Link
                href="/admin/inquiries"
                className="text-xs font-bold text-saffron-400 hover:underline flex items-center gap-1"
              >
                <span>View All ({totalInquiries})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentInquiries.length > 0 ? (
              <div className="space-y-3">
                {recentInquiries.map((iq) => (
                  <div
                    key={iq.id}
                    className="p-3.5 rounded-xl bg-navy-950/70 border border-navy-800/80 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white truncate">
                          {iq.fullName}
                        </span>
                        {!iq.isRead && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-saffron-500 text-navy-950">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-300 truncate mt-0.5">
                        {iq.subject}: {iq.message}
                      </p>
                      <span className="text-[10px] text-gray-500 block mt-1">
                        {new Date(iq.createdAt).toLocaleString()} • {iq.mobileNumber}
                      </span>
                    </div>

                    <Link
                      href={`/admin/inquiries?id=${iq.id}`}
                      className="px-3 py-1.5 rounded-lg bg-navy-850 hover:bg-navy-800 text-xs text-saffron-400 font-bold border border-navy-700 shrink-0"
                    >
                      Read
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-gray-400">
                No inquiries received yet.
              </div>
            )}
          </div>

          {/* Activity Logs & Social Status */}
          <div className="lg:col-span-5 space-y-6">
            {/* Social Sync Monitor */}
            <div className="bg-navy-900/70 p-6 rounded-3xl border border-navy-800">
              <h3 className="text-base font-bold text-white font-serif mb-3">
                Social Feed Sync Health
              </h3>
              <div className="space-y-3">
                {socialAccounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-navy-950/60 border border-navy-800 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="capitalize font-bold text-gray-200">
                        {acc.platform}
                      </span>
                      <span className="text-gray-400 text-[11px] truncate max-w-[140px]">
                        ({acc.accountName})
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{acc.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit / Activity Logs */}
            <div className="bg-navy-900/70 p-6 rounded-3xl border border-navy-800">
              <h3 className="text-base font-bold text-white font-serif mb-3">
                Recent Admin Activity Logs
              </h3>
              <div className="space-y-2.5">
                {activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="text-xs p-2.5 rounded-lg bg-navy-950/40 border border-navy-800/60"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-saffron-400">{log.action}</span>
                      <span className="text-gray-500">
                        {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-gray-300 text-[11px] mt-0.5 truncate">
                      {log.details || log.module}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
