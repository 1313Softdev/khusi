'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MessageSquare, X, Send, Bot, Sparkles, ShieldAlert, CheckCircle, RefreshCcw } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sources?: string[];
  timestamp: Date;
}

export default function AiAssistantWidget() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize session
  useEffect(() => {
    let sid = localStorage.getItem('khushinder_ai_session');
    if (!sid) {
      sid = 'ks_' + Math.random().toString(36).substring(2, 11) + Date.now();
      localStorage.setItem('khushinder_ai_session', sid);
    }
    setSessionId(sid);

    // Initial greeting
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text:
          language === 'pa'
            ? "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦੇ ਅਧਿਕਾਰਤ ਪੋਰਟਲ 'ਤੇ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਮੈਂ ਉਹਨਾਂ ਦੀ ਸਮਾਜ ਸੇਵਾ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਮੈਂਬਰਸ਼ਿਪ, ਲੋਕ ਭਲਾਈ ਕਾਰਜਾਂ ਅਤੇ ਦਫ਼ਤਰੀ ਸੰਪਰਕ ਸੰਬੰਧੀ ਤੁਹਾਡੀ ਕੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?"
            : 'Sat Sri Akal! Welcome to the official portal of Sardar Khushinder Singh Jand Sahib (Social Worker & Member of Punjab Sanjhivalta Dal). How may I assist you regarding his public service, verified initiatives, or contact details?',
        timestamp: new Date(),
        sources: ['Official Portal'],
      },
    ]);
  }, [language]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickQuestions = [
    {
      en: 'Who is Sardar Khushinder Singh?',
      pa: 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਕੌਣ ਹਨ?',
    },
    {
      en: 'What is Punjab Sanjhivalta Dal?',
      pa: 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਕੀ ਹੈ?',
    },
    {
      en: 'Key social work & medical camps',
      pa: 'ਮੁੱਖ ਸਮਾਜ ਸੇਵਾ ਤੇ ਮੈਡੀਕਲ ਕੈਂਪ',
    },
    {
      en: 'Office address & public meeting hours',
      pa: 'ਦਫ਼ਤਰ ਦਾ ਪਤਾ ਅਤੇ ਮੁਲਾਕਾਤ ਸਮਾਂ',
    },
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          sessionId,
          language,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: Message = {
          id: 'bot_' + Date.now(),
          sender: 'assistant',
          text: data.reply,
          sources: data.sources || [],
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('AI API Error');
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          sender: 'assistant',
          text:
            language === 'pa'
              ? 'ਮਾਫ਼ ਕਰਨਾ, ਇਸ ਵੇਲੇ ਕੁਨੈਕਸ਼ਨ ਵਿੱਚ ਸਮੱਸਿਆ ਆ ਰਹੀ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਸੰਪਰਕ ਪੰਨੇ ਰਾਹੀਂ ਸਿੱਧਾ ਦਫ਼ਤਰ ਨਾਲ ਰਾਬਤਾ ਕਰੋ।'
              : 'I am experiencing a brief connection issue. Please feel free to reach out directly through our Contact page.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-navy-950 font-extrabold text-sm shadow-glow-saffron transform hover:scale-105 transition-all duration-300 border-2 border-white/20"
          aria-label="Open AI Assistant"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <Bot className="w-5 h-5 text-navy-950" />
          <span className="hidden sm:inline">
            {t('Ask Assistant', 'ਪੁੱਛੋ ਸਹਾਇਕ')}
          </span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[420px] h-[580px] max-h-[90vh] bg-navy-950/98 backdrop-blur-xl rounded-3xl border border-saffron-500/40 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 p-4 border-b border-navy-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-saffron-500/20 border border-saffron-500/40 flex items-center justify-center text-saffron-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-white text-sm font-bold font-serif">
                    {t('Official Portal Assistant', 'ਅਧਿਕਾਰਤ ਪੋਰਟਲ ਸਹਾਇਕ')}
                  </h4>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    AI Verified
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">
                  {t('Sardar Khushinder Singh Jand Sahib', 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ')}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-navy-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? 'bg-gradient-to-r from-saffron-500 to-amber-500 text-navy-950 font-medium rounded-tr-none shadow'
                        : 'bg-navy-900 border border-navy-800 text-gray-200 rounded-tl-none shadow'
                    }`}
                  >
                    {m.text}

                    {/* Sources Badge */}
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-navy-800/80 flex flex-wrap items-center gap-1.5 text-[10px] text-saffron-400 font-medium">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span>Sources: {m.sources.join(', ')}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 px-1">
                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-saffron-400 text-xs bg-navy-900/80 p-3 rounded-2xl max-w-[70%] border border-navy-800 animate-pulse">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>{t('Retrieving verified records...', 'ਰਿਕਾਰਡਾਂ ਦੀ ਪੜਤਾਲ ਹੋ ਰਹੀ ਹੈ...')}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Pills */}
          <div className="px-3 py-2 bg-navy-900/40 border-t border-navy-800/80 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(t(q.en, q.pa))}
                className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-navy-850 hover:bg-navy-800 text-gray-300 hover:text-saffron-300 border border-navy-700/60 transition-colors"
              >
                {t(q.en, q.pa)}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-navy-900 border-t border-navy-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t(
                'Ask about Khushinder Singh, social work, office...',
                'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜਾਂ ਸਮਾਜ ਸੇਵਾ ਬਾਰੇ ਪੁੱਛੋ...'
              )}
              className="flex-1 bg-navy-950 text-white placeholder-gray-500 text-xs sm:text-sm px-4 py-2.5 rounded-full border border-navy-700 focus:outline-none focus:border-saffron-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-full bg-saffron-500 hover:bg-saffron-600 disabled:opacity-40 text-navy-950 flex items-center justify-center shrink-0 transition-all font-bold"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
