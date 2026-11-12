'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Calendar, ShieldCheck, Clock } from 'lucide-react';

interface ContactClientViewProps {
  settings: any;
}

export default function ContactClientView({ settings }: ContactClientViewProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    subject: '',
    message: '',
    mathAnswer: '',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    // Spam honeypot check
    if (formData.honeypot) {
      return;
    }

    // Math captcha check (7)
    if (formData.mathAnswer.trim() !== '7') {
      setStatus({
        type: 'error',
        message: t('Security verification answer is incorrect (3 + 4 = ?).', 'ਸੁਰੱਖਿਆ ਸਵਾਲ ਦਾ ਜਵਾਬ ਗਲਤ ਹੈ (3 + 4 = ?)।'),
      });
      return;
    }

    if (!formData.fullName || !formData.email || !formData.mobileNumber || !formData.subject || !formData.message) {
      setStatus({
        type: 'error',
        message: t('Please fill in all mandatory fields.', 'ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੇ ਲੋੜੀਂਦੇ ਖਾਨੇ ਭਰੋ।'),
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          mobileNumber: formData.mobileNumber,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({
          type: 'success',
          message: t(
            'Your inquiry has been submitted successfully. A confirmation message has been recorded and our office team will respond shortly.',
            'ਤੁਹਾਡਾ ਸੁਨੇਹਾ ਸਫ਼ਲਤਾਪੂਰਵਕ ਦਰਜ ਕਰ ਲਿਆ ਗਿਆ ਹੈ। ਦਫ਼ਤਰ ਵੱਲੋਂ ਜਲਦ ਹੀ ਰਾਬਤਾ ਕਾਇਮ ਕੀਤਾ ਜਾਵੇਗਾ।'
          ),
        });
        setFormData({
          fullName: '',
          email: '',
          mobileNumber: '',
          subject: '',
          message: '',
          mathAnswer: '',
          honeypot: '',
        });
      } else {
        setStatus({
          type: 'error',
          message: data.error || t('Failed to send message. Please try again.', 'ਸੁਨੇਹਾ ਭੇਜਣ ਵਿੱਚ ਅਸਫ਼ਲਤਾ, ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।'),
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: t('Network error. Please try again or call the office directly.', 'ਕੁਨੈਕਸ਼ਨ ਸਮੱਸਿਆ, ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest font-extrabold text-saffron-400 bg-saffron-500/10 px-3.5 py-1 rounded-full border border-saffron-500/20 inline-block mb-3">
          {t('Public Relations & Grievances', 'ਜਨਤਕ ਸੰਪਰਕ ਤੇ ਮੁਸ਼ਕਲਾਂ ਦਾ ਹੱਲ')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif mb-4">
          {t('Contact Sardar Khushinder Singh Jand Sahib', 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਨਾਲ ਸੰਪਰਕ ਕਰੋ')}
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {t(
            'Whether you have a village community issue, seek guidance, or want to invite Sardar Khushinder Singh for public welfare initiatives, our doors are always open.',
            'ਪਿੰਡਾਂ ਦੇ ਸਾਂਝੇ ਮਸਲੇ, ਸਮਾਜ ਸੇਵਾ ਸੰਬੰਧੀ ਵਿਚਾਰ ਜਾਂ ਜਨਤਕ ਮੁਲਾਕਾਤ ਲਈ ਤੁਸੀਂ ਸਿੱਧਾ ਸੁਨੇਹਾ ਭੇਜ ਸਕਦੇ ਹੋ।'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Office Details */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Info Card */}
          <div className="bg-navy-900/90 rounded-3xl p-8 border border-navy-800 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white font-serif border-b border-navy-800 pb-4">
              {t('Official Office Details', 'ਦਫ਼ਤਰੀ ਵੇਰਵੇ')}
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-saffron-500/10 border border-saffron-500/30 flex items-center justify-center text-saffron-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">
                    {t('Location & Address', 'ਪਤਾ')}
                  </span>
                  <span className="text-sm font-medium text-white block mt-0.5">
                    {settings?.contactAddress || 'Village Jand Sahib, District Sri Muktsar Sahib / Bathinda Belt, Punjab 152026, India'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-saffron-500/10 border border-saffron-500/30 flex items-center justify-center text-saffron-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">
                    {t('Direct Phone / WhatsApp', 'ਫ਼ੋਨ / ਵਟਸਐਪ')}
                  </span>
                  <a
                    href={`tel:${settings?.contactPhone || '+919876543210'}`}
                    className="text-sm font-bold text-saffron-400 hover:underline block mt-0.5"
                  >
                    {settings?.contactPhone || '+91 98765 43210'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-saffron-500/10 border border-saffron-500/30 flex items-center justify-center text-saffron-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">
                    {t('Official Email', 'ਅਧਿਕਾਰਤ ਈਮੇਲ')}
                  </span>
                  <a
                    href={`mailto:${settings?.contactEmail || 'contact@khushindersingh.org'}`}
                    className="text-sm font-medium text-white hover:text-saffron-400 block mt-0.5"
                  >
                    {settings?.contactEmail || 'contact@khushindersingh.org'}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sunday Meeting Hours Card */}
          <div className="bg-gradient-to-br from-navy-900 to-navy-850 rounded-3xl p-8 border border-saffron-500/30 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-saffron-400">
              <Calendar className="w-6 h-6" />
              <h4 className="text-lg font-bold text-white font-serif">
                {t('Weekly Public Grievance Sabha', 'ਹਫ਼ਤਾਵਾਰੀ ਜਨਤਕ ਸੁਣਵਾਈ ਸਭਾ')}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {t(
                'Every Sunday from 10:00 AM to 2:00 PM, Sardar Khushinder Singh personally meets villagers, farmer delegations, and youth at the Jand Sahib office.',
                'ਹਰ ਐਤਵਾਰ ਸਵੇਰੇ 10:00 ਤੋਂ ਦੁਪਹਿਰ 2:00 ਵਜੇ ਤੱਕ ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦਫ਼ਤਰ ਵਿਖੇ ਲੋਕਾਂ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਖ਼ੁਦ ਸੁਣਦੇ ਹਨ।'
              )}
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
              <Clock className="w-3.5 h-3.5" />
              <span>{t('Sundays: 10:00 AM – 2:00 PM', 'ਐਤਵਾਰ: ਸਵੇਰੇ 10 ਵਜੇ – ਦੁਪਹਿਰ 2 ਵਜੇ')}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-navy-900 rounded-3xl p-8 sm:p-10 border border-navy-800 shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif mb-6">
              {t('Send a Public Message or Inquiry', 'ਆਪਣਾ ਸੁਨੇਹਾ ਜਾਂ ਮੰਗ ਪੱਤਰ ਭੇਜੋ')}
            </h3>

            {status && (
              <div
                className={`p-4 rounded-2xl mb-6 flex items-start gap-3 text-sm ${
                  status.type === 'success'
                    ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-200'
                    : 'bg-red-950/80 border border-red-500/40 text-red-200'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot field (hidden from genuine users) */}
              <input
                type="text"
                name="user_hp"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    {t('Full Name *', 'ਪੂਰਾ ਨਾਮ *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Harpreet Singh"
                    className="w-full bg-navy-950 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-xl border border-navy-700 focus:outline-none focus:border-saffron-500"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    {t('Mobile Number *', 'ਮੋਬਾਈਲ ਨੰਬਰ *')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    placeholder="+91 98765 00000"
                    className="w-full bg-navy-950 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-xl border border-navy-700 focus:outline-none focus:border-saffron-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  {t('Email Address *', 'ਈਮੇਲ ਪਤਾ *')}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="harpreet@example.com"
                  className="w-full bg-navy-950 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-xl border border-navy-700 focus:outline-none focus:border-saffron-500"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  {t('Subject / Topic *', 'ਵਿਸ਼ਾ *')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Canal Water Issue / Medical Camp Request"
                  className="w-full bg-navy-950 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-xl border border-navy-700 focus:outline-none focus:border-saffron-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  {t('Message / Grievance Description *', 'ਸੁਨੇਹਾ / ਵੇਰਵਾ *')}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your details respectfully..."
                  className="w-full bg-navy-950 text-white placeholder-gray-500 text-sm p-4 rounded-xl border border-navy-700 focus:outline-none focus:border-saffron-500 leading-relaxed"
                />
              </div>

              {/* Anti-Spam Math Challenge */}
              <div className="bg-navy-950/60 p-4 rounded-xl border border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-gray-300">
                  {t('Spam Protection Verification: What is 3 + 4 ?', 'ਸਪੈਮ ਰੋਕਥਾਮ ਜਾਂਚ: 3 + 4 ਕਿੰਨਾ ਹੁੰਦਾ ਹੈ?')}
                </span>
                <input
                  type="text"
                  required
                  value={formData.mathAnswer}
                  onChange={(e) => setFormData({ ...formData, mathAnswer: e.target.value })}
                  placeholder="Answer"
                  className="w-24 bg-navy-900 text-white text-center text-sm py-1.5 px-3 rounded-lg border border-navy-700 focus:outline-none focus:border-saffron-500"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-navy-950 font-extrabold text-sm sm:text-base shadow-glow-saffron transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? t('Submitting...', 'ਜਮ੍ਹਾਂ ਹੋ ਰਿਹਾ ਹੈ...') : t('Submit Message to Office', 'ਦਫ਼ਤਰ ਨੂੰ ਸੁਨੇਹਾ ਭੇਜੋ')}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
