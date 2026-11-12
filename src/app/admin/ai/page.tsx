'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Bot, Save, PlusCircle, Trash2, CheckCircle, AlertCircle, Key, MessageSquare, BookOpen, ShieldCheck } from 'lucide-react';

export default function AiAssistantAdminPage() {
  const [settings, setSettings] = useState<any>(null);
  const [knowledgeSources, setKnowledgeSources] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // New Knowledge Source Form
  const [newSourceTitle, setNewSourceTitle] = useState('');
  const [newSourceCategory, setNewSourceCategory] = useState('biography');
  const [newSourceContent, setNewSourceContent] = useState('');

  const fetchAll = () => {
    Promise.all([
      fetch('/api/ai/settings').then((r) => r.json()),
      fetch('/api/ai/knowledge').then((r) => r.json()),
      fetch('/api/ai/logs').then((r) => r.json()),
    ]).then(([s, k, c]) => {
      setSettings(s || {});
      setKnowledgeSources(k || []);
      setConversations(c || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setAlert(null);

    try {
      const res = await fetch('/api/ai/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setAlert({ type: 'success', message: 'AI configuration and system rules updated successfully!' });
      } else {
        setAlert({ type: 'error', message: 'Failed to update AI settings' });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleAddKnowledge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSourceTitle || !newSourceContent) return;

    try {
      const res = await fetch('/api/ai/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newSourceTitle,
          category: newSourceCategory,
          content: newSourceContent,
        }),
      });

      if (res.ok) {
        setNewSourceTitle('');
        setNewSourceContent('');
        fetchAll();
      }
    } catch (e: any) {
      setAlert({ type: 'error', message: e.message });
    }
  };

  const handleDeleteKnowledge = async (id: number) => {
    if (!confirm('Delete this approved knowledge document?')) return;
    await fetch(`/api/ai/knowledge?id=${id}`, { method: 'DELETE' });
    fetchAll();
  };

  if (loading || !settings) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-gray-400">Loading AI Assistant configurations...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="pb-4 border-b border-navy-800">
          <div className="flex items-center gap-2 text-saffron-400 font-bold text-xs uppercase tracking-widest mb-1">
            <Bot className="w-4 h-4" />
            <span>AI Knowledge & Automated Assistant</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Smart Public Assistant & Knowledge Grounding
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Strictly maintains identity boundaries, Google Gemini model credentials, verified knowledge sources, and visitor chat transcripts.
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

        {/* Section 1: AI Model Settings */}
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-4">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <h3 className="text-sm font-bold text-saffron-400 uppercase tracking-wider">
                Google Gemini API & Runtime Parameters
              </h3>
              <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.isEnabled}
                  onChange={(e) => setSettings({ ...settings, isEnabled: e.target.checked })}
                  className="w-4 h-4 rounded text-saffron-500"
                />
                <span>Enable Public AI Assistant Widget</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Google Gemini API Key (Optional — fallback engine functions without key)
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={settings.apiKey || ''}
                    onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                    placeholder="AIzaSy..."
                    className="w-full bg-navy-950 text-white text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-navy-700 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Model Name
                </label>
                <input
                  type="text"
                  value={settings.modelName || 'gemini-1.5-flash'}
                  onChange={(e) => setSettings({ ...settings, modelName: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-navy-700"
                />
              </div>
            </div>

            {/* System Prompt / Identity Rule */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-gray-300">
                  Strict Identity Rules & System Instructions
                </label>
                <span className="text-[10px] text-amber-400">Strictly Enforced Against Hallucinations</span>
              </div>
              <textarea
                rows={6}
                value={settings.systemPrompt || ''}
                onChange={(e) => setSettings({ ...settings, systemPrompt: e.target.value })}
                className="w-full bg-navy-950 text-white text-xs p-3.5 rounded-xl border border-navy-700 leading-relaxed font-mono"
              />
            </div>

            {/* Welcome messages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Welcome Greeting (English)
                </label>
                <textarea
                  rows={2}
                  value={settings.welcomeMessageEn || ''}
                  onChange={(e) => setSettings({ ...settings, welcomeMessageEn: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs p-2.5 rounded-xl border border-navy-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Welcome Greeting (Punjabi)
                </label>
                <textarea
                  rows={2}
                  value={settings.welcomeMessagePa || ''}
                  onChange={(e) => setSettings({ ...settings, welcomeMessagePa: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs p-2.5 rounded-xl border border-navy-700"
                />
              </div>
            </div>

            {/* Fallback responses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Fallback Response (English)
                </label>
                <textarea
                  rows={2}
                  value={settings.fallbackResponseEn || ''}
                  onChange={(e) => setSettings({ ...settings, fallbackResponseEn: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs p-2.5 rounded-xl border border-navy-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Fallback Response (Punjabi)
                </label>
                <textarea
                  rows={2}
                  value={settings.fallbackResponsePa || ''}
                  onChange={(e) => setSettings({ ...settings, fallbackResponsePa: e.target.value })}
                  className="w-full bg-navy-950 text-white text-xs p-2.5 rounded-xl border border-navy-700"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs shadow-glow-saffron transition-all flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Updating Rules...' : 'Save AI Settings'}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Section 2: Approved Knowledge Sources */}
        <div className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-6">
          <div className="flex items-center justify-between border-b border-navy-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-saffron-400 uppercase tracking-wider">
                Approved Grounded Knowledge Documents
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                The AI assistant uses only these approved facts to answer questions accurately.
              </p>
            </div>
          </div>

          {/* Add Knowledge Source */}
          <form onSubmit={handleAddKnowledge} className="p-4 rounded-2xl bg-navy-950 border border-navy-800 space-y-3">
            <h4 className="text-xs font-bold text-white">Add New Knowledge Document</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  required
                  value={newSourceTitle}
                  onChange={(e) => setNewSourceTitle(e.target.value)}
                  placeholder="Document Title (e.g. Free Eye Camp Guidelines & Records)"
                  className="w-full bg-navy-900 text-white text-xs px-3.5 py-2 rounded-xl border border-navy-700"
                />
              </div>
              <div>
                <select
                  value={newSourceCategory}
                  onChange={(e) => setNewSourceCategory(e.target.value)}
                  className="w-full bg-navy-900 text-white text-xs px-3 py-2 rounded-xl border border-navy-700"
                >
                  <option value="biography">Biography</option>
                  <option value="public_service">Public Service</option>
                  <option value="sanjhivalta_dal">Punjab Sanjhivalta Dal</option>
                  <option value="contact">Contact Information</option>
                  <option value="faqs">General FAQs</option>
                </select>
              </div>
            </div>

            <textarea
              rows={3}
              required
              value={newSourceContent}
              onChange={(e) => setNewSourceContent(e.target.value)}
              placeholder="Enter verified factual content..."
              className="w-full bg-navy-900 text-white text-xs p-3 rounded-xl border border-navy-700"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Approved Knowledge Source</span>
              </button>
            </div>
          </form>

          {/* List of Knowledge Sources */}
          <div className="space-y-3">
            {knowledgeSources.map((ks) => (
              <div
                key={ks.id}
                className="p-4 rounded-2xl bg-navy-950/60 border border-navy-800 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-serif">{ks.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-navy-900 text-saffron-400 border border-saffron-500/20">
                      {ks.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-normal">
                    {ks.content}
                  </p>
                </div>

                <button
                  onClick={() => handleDeleteKnowledge(ks.id)}
                  className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/50 shrink-0"
                  title="Delete source"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Visitor Chat Logs */}
        <div className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 space-y-4">
          <div className="flex items-center justify-between border-b border-navy-800 pb-3">
            <h3 className="text-sm font-bold text-saffron-400 uppercase tracking-wider">
              Recent Visitor Chat Logs & Conversations
            </h3>
            <span className="text-xs text-gray-400">Total Sessions: {conversations.length}</span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {conversations.length > 0 ? (
              conversations.map((conv) => (
                <div key={conv.id} className="p-4 rounded-2xl bg-navy-950 border border-navy-800/80 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <span className="font-mono text-saffron-400">Session: {conv.sessionId}</span>
                    <span>{new Date(conv.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {conv.messages?.map((m: any) => (
                      <div
                        key={m.id}
                        className={`p-2 rounded-xl text-xs ${
                          m.sender === 'user'
                            ? 'bg-navy-900 text-gray-200 border border-navy-800'
                            : 'bg-navy-850 text-saffron-200'
                        }`}
                      >
                        <span className="font-bold text-[10px] text-gray-400 block uppercase">
                          {m.sender}:
                        </span>
                        <span>{m.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-xs text-gray-400">
                No chat logs recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
