'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  Sliders,
  UserCheck,
  RotateCw,
  FileText,
  Image as ImageIcon,
  Search,
  Megaphone,
  Share2,
  Mail,
  Inbox,
  Layers,
  Bot,
  ExternalLink,
  LogOut,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  onCloseMobile?: () => void;
  onLogout?: () => void;
  user?: any;
}

export default function AdminSidebar({ onCloseMobile, onLogout, user }: AdminSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin', label: 'Dashboard Overview', icon: LayoutDashboard },
    { href: '/admin/settings', label: '1. Website Settings', icon: Settings },
    { href: '/admin/hero', label: '2. Hero Slider', icon: Sliders },
    { href: '/admin/biography', label: '3. Biography & Vision', icon: UserCheck },
    { href: '/admin/logos', label: '4. Logo Animation', icon: RotateCw },
    { href: '/admin/blogs', label: '5. Blog Manager', icon: FileText },
    { href: '/admin/media', label: '6. Media Library', icon: ImageIcon },
    { href: '/admin/seo', label: '7. Meta & SEO', icon: Search },
    { href: '/admin/ads', label: '8. Advertisement', icon: Megaphone },
    { href: '/admin/social', label: '9. Social Media Sync', icon: Share2 },
    { href: '/admin/smtp', label: '10. SMTP Email', icon: Mail },
    { href: '/admin/inquiries', label: '11. Public Inquiries', icon: Inbox },
    { href: '/admin/sections', label: '12. Section Manager', icon: Layers },
    { href: '/admin/ai', label: 'Smart AI Assistant', icon: Bot },
  ];

  return (
    <aside className="w-64 bg-navy-950 border-r border-navy-800 flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-navy-800 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-saffron-500 to-amber-400 p-0.5 flex items-center justify-center font-bold text-navy-950 font-serif shadow-glow-saffron text-xs">
            KS
          </div>
          <div>
            <span className="text-white font-bold text-sm tracking-tight block">
              Admin Portal
            </span>
            <span className="text-[11px] text-saffron-400 font-medium block">
              S. Khushinder Singh
            </span>
          </div>
        </Link>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* User Mini Bar */}
      <div className="px-5 py-3 bg-navy-900/60 border-b border-navy-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5 truncate">
          <div className="w-7 h-7 rounded-full bg-saffron-500/20 text-saffron-400 flex items-center justify-center text-xs font-bold">
            {(user?.fullName || 'A')[0]}
          </div>
          <div className="truncate">
            <span className="text-xs font-semibold text-gray-200 block truncate">
              {user?.fullName || 'Super Admin'}
            </span>
            <span className="text-[10px] text-emerald-400 block font-bold">
              ● Online
            </span>
          </div>
        </div>

        <Link
          href="/"
          target="_blank"
          className="p-1 text-gray-400 hover:text-saffron-400"
          title="Open Live Website"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Menu Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-xs font-medium">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                isActive
                  ? 'bg-saffron-500 text-navy-950 font-bold shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-navy-900/80'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-navy-950' : 'text-saffron-400'}`} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-navy-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs font-bold transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Admin</span>
        </button>
      </div>
    </aside>
  );
}
