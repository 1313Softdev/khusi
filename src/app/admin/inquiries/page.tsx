'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Inbox, Search, Download, Trash2, Mail, CheckCircle2, Clock, Send, Eye, X } from 'lucide-react';

export default function InquiriesAdminPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRead, setFilterRead] = useState<string>('all');
  const [activeInquiry, setActiveInquiry] = useState<any | null>(null);
  const [replyModal, setReplyModal] = useState<any | null>(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);

  const fetchInquiries = () => {
    fetch('/api/inquiries')
      .then((r) => r.json())
      .then((data) => {
        setInquiries(data || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleMarkStatus = async (id: number, isRead: boolean) => {
    await fetch('/api/inquiries', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isRead }),
    });
    fetchInquiries();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' });
    if (activeInquiry?.id === id) setActiveInquiry(null);
    fetchInquiries();
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyModal) return;

    setSendingReply(true);
    try {
      const res = await fetch('/api/inquiries/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryId: replyModal.id,
          replySubject,
          replyMessage,
        }),
      });

      if (res.ok) {
        setAlert(`Reply sent successfully to ${replyModal.email}!`);
        setReplyModal(null);
        fetchInquiries();
        setTimeout(() => setAlert(null), 3000);
      }
    } finally {
      setSendingReply(false);
    }
  };

  const filtered = inquiries.filter((iq) => {
    const matchesSearch =
      searchTerm === '' ||
      iq.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iq.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iq.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterRead === 'all' ||
      (filterRead === 'read' && iq.isRead) ||
      (filterRead === 'unread' && !iq.isRead);

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-navy-800 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
              11. Public Contact Inquiry & Grievance Manager
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Review public messages, citizen grievances, appointment requests, reply via official email, and export CSV logs.
            </p>
          </div>

          <a
            href="/api/inquiries/export"
            download
            className="px-4 py-2.5 rounded-full bg-navy-800 hover:bg-navy-750 text-saffron-400 border border-navy-700 font-bold text-xs flex items-center gap-2 shadow self-start sm:self-auto transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </a>
        </div>

        {alert && (
          <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{alert}</span>
          </div>
        )}

        {/* Filter / Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-navy-900/80 p-4 rounded-2xl border border-navy-800">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, subject..."
              className="w-full bg-navy-950 text-white text-xs pl-10 pr-3 py-2 rounded-xl border border-navy-700"
            />
          </div>

          <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
            <span className="text-gray-400">Status:</span>
            {['all', 'unread', 'read'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterRead(st)}
                className={`px-3 py-1 rounded-lg capitalize font-bold transition-all ${
                  filterRead === st
                    ? 'bg-saffron-500 text-navy-950 shadow'
                    : 'bg-navy-950 text-gray-300 border border-navy-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-navy-900/80 rounded-3xl border border-navy-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-950 border-b border-navy-800 text-gray-400 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-6 py-4">Sender & Contact</th>
                  <th className="px-4 py-4">Subject & Message</th>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800">
                {filtered.map((iq) => (
                  <tr
                    key={iq.id}
                    className={`hover:bg-navy-850/50 transition-colors ${
                      !iq.isRead ? 'bg-navy-950/40 font-semibold' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <span className="font-bold text-white block">{iq.fullName}</span>
                        <span className="text-[11px] text-saffron-400 block">{iq.mobileNumber}</span>
                        <span className="text-[10px] text-gray-500 block">{iq.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 max-w-sm">
                      <span className="font-bold text-white block truncate">{iq.subject}</span>
                      <p className="text-gray-300 text-[11px] truncate mt-0.5">{iq.message}</p>
                    </td>
                    <td className="px-4 py-4 text-gray-400 text-[11px]">
                      {new Date(iq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      {iq.isReplied ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          Replied
                        </span>
                      ) : iq.isRead ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-800 text-gray-400">
                          Read
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-saffron-500 text-navy-950">
                          Unread
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setActiveInquiry(iq);
                            if (!iq.isRead) handleMarkStatus(iq.id, true);
                          }}
                          className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-saffron-400"
                          title="Read Full Message"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setReplyModal(iq);
                            setReplySubject(`Re: ${iq.subject} - Office of Sardar Khushinder Singh`);
                            setReplyMessage(`Dear ${iq.fullName},\n\nThank you for reaching out to the office of Sardar Khushinder Singh Jand Sahib regarding your message.\n\n`);
                          }}
                          className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-blue-400"
                          title="Reply via Email"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(iq.id)}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400"
                          title="Delete Inquiry"
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

        {/* Read Message Modal */}
        {activeInquiry && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-navy-900 border border-navy-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4">
              <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                <h3 className="text-base font-bold text-white font-serif">
                  Public Inquiry Details
                </h3>
                <button
                  onClick={() => setActiveInquiry(null)}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="text-gray-400 text-xs block">From:</span>
                  <span className="font-bold text-white text-base">{activeInquiry.fullName}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-400 text-xs block">Email:</span>
                    <a href={`mailto:${activeInquiry.email}`} className="text-saffron-400 hover:underline">
                      {activeInquiry.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs block">Phone:</span>
                    <a href={`tel:${activeInquiry.mobileNumber}`} className="text-saffron-400 hover:underline">
                      {activeInquiry.mobileNumber}
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-gray-400 text-xs block">Subject:</span>
                  <span className="font-bold text-white">{activeInquiry.subject}</span>
                </div>

                <div>
                  <span className="text-gray-400 text-xs block mb-1">Message Content:</span>
                  <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {activeInquiry.message}
                  </div>
                </div>

                {activeInquiry.adminNotes && (
                  <div>
                    <span className="text-gray-400 text-xs block mb-1">Internal Notes:</span>
                    <div className="p-3 rounded-lg bg-navy-950/70 border border-navy-800/80 text-xs text-amber-300">
                      {activeInquiry.adminNotes}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-navy-800 flex justify-end gap-3">
                <button
                  onClick={() => setActiveInquiry(null)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setReplyModal(activeInquiry);
                    setReplySubject(`Re: ${activeInquiry.subject} - Office of Sardar Khushinder Singh`);
                    setReplyMessage(`Dear ${activeInquiry.fullName},\n\nThank you for reaching out to the office of Sardar Khushinder Singh Jand Sahib.\n\n`);
                    setActiveInquiry(null);
                  }}
                  className="px-5 py-2 rounded-full bg-saffron-500 text-navy-950 font-bold text-xs"
                >
                  Reply via Email
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reply by Email Modal */}
        {replyModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-navy-900 border border-navy-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4">
              <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                <h3 className="text-base font-bold text-white font-serif">
                  Send Official Email Reply
                </h3>
                <button
                  onClick={() => setReplyModal(null)}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSendReply} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Recipient
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${replyModal.fullName} <${replyModal.email}>`}
                    className="w-full bg-navy-950 text-gray-400 text-xs px-3.5 py-2 rounded-xl border border-navy-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Email Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={replySubject}
                    onChange={(e) => setReplySubject(e.target.value)}
                    className="w-full bg-navy-950 text-white text-xs px-3.5 py-2 rounded-xl border border-navy-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Reply Message
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="w-full bg-navy-950 text-white text-xs p-3.5 rounded-xl border border-navy-700 leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-navy-800">
                  <button
                    type="button"
                    onClick={() => setReplyModal(null)}
                    className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={sendingReply}
                    className="px-5 py-2.5 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{sendingReply ? 'Sending...' : 'Send Reply'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
