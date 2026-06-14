'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Tag,
  Image,
  FileText,
  MessageSquare,
  Receipt,
  BarChart2,
  Globe,
  Users,
  Settings,
  Truck,
  X,
  ExternalLink,
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/catalogue', label: 'Catalogue', icon: Package },
  { href: '/admin/categories', label: 'Catégories', icon: Tag },
  { href: '/admin/medias', label: 'Médias', icon: Image },
  { href: '/admin/devis', label: 'Devis', icon: FileText },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/facturation', label: 'Facturation', icon: Receipt },
  { href: '/admin/comptabilite', label: 'Comptabilité', icon: BarChart2 },
  { href: '/admin/pages', label: 'Pages', icon: Globe },
  { href: '/admin/utilisateurs', label: 'Utilisateurs', icon: Users },
  { href: '/admin/parametres', label: 'Paramètres', icon: Settings },
];

interface AdminSidebarProps {
  open?: boolean;
  onClose?: () => void;
  userName?: string;
  userRole?: string;
}

export default function AdminSidebar({ open, onClose, userName, userRole }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {onClose && (
        <div
          className={`fixed inset-0 bg-black/50 z-[70] lg:hidden transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[260px] z-[80] flex flex-col transition-transform lg:translate-x-0 lg:static lg:z-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: '#072A4D' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-none">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-head font-extrabold text-white text-sm leading-tight">TOCHE & FILS</div>
              <div className="text-white/50 text-[10px] uppercase tracking-wider">Admin</div>
            </div>
          </Link>
          {onClose && (
            <button onClick={onClose} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/60">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
          {NAV.map(item => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-head font-semibold transition-all ${
                  active
                    ? 'bg-white/15 text-white'
                    : 'text-white/60 hover:bg-white/8 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 flex-none" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 pb-4 pt-2 border-t border-white/10 space-y-2">
          <Link
            href="/fr"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-head font-semibold text-white/60 hover:bg-white/8 hover:text-white transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Voir le site
          </Link>
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-sky/30 flex items-center justify-center text-sky text-xs font-bold flex-none">
              {userName?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-head font-semibold truncate">{userName || 'Admin'}</div>
              <div className="text-white/40 text-[10px]">{userRole || 'Administrateur'}</div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="text-white/30 hover:text-white/60 text-[10px] font-head"
            >
              Déco.
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
