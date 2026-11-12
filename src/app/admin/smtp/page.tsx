'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Mail, Send, CheckCircle, AlertCircle, Save, ShieldCheck } from 'lucide-react';

export default function SmtpAdminPage() {
  const [smtp, setSmtp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/smtp')
      .then((r) => r.json())
      .then((data) => {
        setSmtp(data || {});
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setAlert(null);

    try {
      const res = await fetch('/api/smtp', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smtp),
      });

      if (res.ok) {
        setAlert({ type: 'success', message: 'SMTP settings saved successfully!' });
      } else {
        setAlert({ type: 'error', message: 'Failed to update SMTP configuration' });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmail) {
      setAlert({ type: 'error', message: 'Enter a valid recipient email for the test' });
      return;
    }
    setTesting(true);
    setAlert(null);

    try {
      const res = await fetch('/api/smtp/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setAlert({ type: 'success', message: `Test email sent successfully to ${testEmail}!` });
      } else {
        setAlert({ type: 'error', message: data.error || 'Failed to dispatch test email' });
      }
    } catch {
      setAlert({ type: 'error', message: 'Network or SMTP connection error' });
    } finally {
      setTesting(false);
    }
  };

  if (loading || !smtp) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-gray-400">Loading SMTP configuration...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="pb-4 border-b border-navy-800">
          <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
            10. SMTP Email Server & Notification Engine
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Configure outgoing mail server, autoresponder templates, administrator notifications, and deliverability testing.
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
          {/* SMTP Server Credentials */}
          <div className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-4">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <h3 className="text-sm font-bold text-saffron-400 uppercase tracking-wider">
                SMTP Server Connection Parameters
              </h3>
              <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smtp.isEnabled}
                  onChange={(e) => setSmtp({ ...smtp, isEnabled: e.target.checked })}
                  className="w-4 h-4 rounded text-saffron-500"
                />
                <span>Enable Automated Email Dispatch</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  SMTP Host Server
                </label>
                <input
                  type="text"
                  required
                  value={smtp.smtpHost || ''}
                  onChange={(e) => setSmtp({ ...smtp, smtpHost: e.target.value })}
                  placeholder="smtp.gmail.com"
                  className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  SMTP Port
                </label>
                <input
                  type="number"
                  required
                  value={smtp.smtpPort || 587}
                  onChange={(e) => setSmtp({ ...smtp, smtpPort: parseInt(e.target.value) })}
                  className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  SMTP Username / Email
                </label>
                <input
                  type="text"
                  value={smtp.smtpUsername || ''}
                  onChange={(e) => setSmtp({ ...smtp, smtpUsername: e.target.value })}
                  placeholder="user@example.com"
                  className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  SMTP Password / App Key
                </label>
                <input
                  type="password"
                  value={smtp.smtpPassword || ''}
                  onChange={(e) => setSmtp({ ...smtp, smtpPassword: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Encryption Protocol
                </label>
                <select
                  value={smtp.encryption || 'TLS'}
                  onChange={(e) => setSmtp({ ...smtp, encryption: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                >
                  <option value="TLS">TLS (Port 587)</option>
                  <option value="SSL">SSL (Port 465)</option>
                  <option value="NONE">None</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sender & Receiver Info */}
          <div className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-4">
            <h3 className="text-sm font-bold text-saffron-400 uppercase tracking-wider">
              Sender & Notification Recipients
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Sender Display Name
                </label>
                <input
                  type="text"
                  value={smtp.senderName || ''}
                  onChange={(e) => setSmtp({ ...smtp, senderName: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Sender Email Address
                </label>
                <input
                  type="email"
                  value={smtp.senderEmail || ''}
                  onChange={(e) => setSmtp({ ...smtp, senderEmail: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Admin Notification Email
                </label>
                <input
                  type="email"
                  value={smtp.adminNotificationEmail || ''}
                  onChange={(e) => setSmtp({ ...smtp, adminNotificationEmail: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs sm:text-sm shadow-glow-saffron transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save SMTP Settings'}</span>
            </button>
          </div>
        </form>

        {/* Live Test Email Section */}
        <div className="bg-navy-900/80 p-6 rounded-3xl border border-saffron-500/30 space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-saffron-400" />
            <h3 className="text-sm font-bold text-white font-serif">
              Test Outgoing Email Delivery
            </h3>
          </div>
          <p className="text-xs text-gray-300">
            Verify that your SMTP connection, host credentials, and encryption handshake work seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="Enter your personal email to receive test message..."
              className="flex-1 bg-navy-950 text-white text-xs px-4 py-2.5 rounded-xl border border-navy-700 w-full"
            />
            <button
              type="button"
              onClick={handleTestEmail}
              disabled={testing || !testEmail}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-navy-800 hover:bg-navy-750 text-saffron-400 font-bold text-xs border border-navy-700 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{testing ? 'Testing Handshake...' : 'Send Test Email'}</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
