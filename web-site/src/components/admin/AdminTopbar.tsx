'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, ExternalLink } from 'lucide-react';

interface AdminTopbarProps {
  title: string;
  onMenuClick?: () => void;
}

export default function AdminTopbar({ title, onMenuClick }: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-line h-16 flex items-center px-6 gap-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-line hover:bg-bg-soft"
      >
        <Menu className="w-5 h-5 text-navy" />
      </button>

      <h1 className="font-head font-extrabold text-xl text-ink flex-1">{title}</h1>

      <Link
        href="/fr"
        target="_blank"
        className="hidden sm:flex items-center gap-2 text-sm font-head font-semibold text-muted border border-line px-4 py-2 rounded-xl hover:border-blue hover:text-blue transition-colors"
      >
        <ExternalLink className="w-4 h-4" />
        Voir le site
      </Link>
    </header>
  );
}
