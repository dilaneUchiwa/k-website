'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Truck, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

const LOCALES = [
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'zh', flag: '🇨🇳', label: '中文' },
];

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/catalogue`, label: t('catalogue') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/apropos`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(href);
  };

  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(switchLocale(e.target.value));
  };


  return (
    <>
      {/* Topbar */}
      <div className="bg-navy text-[#cfe3f5] text-sm hidden md:block">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[42px] gap-4">
          <div className="flex gap-5 items-center">
            <a href="tel:+237694945547" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +237 694 945 547
            </a>
            <a href="mailto:franklin@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              franklin@gmail.com
            </a>
          </div>
          <a
            href="https://wa.me/237694945547"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#1faf54] text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-[#179247] transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* Main header */}
      <header className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-line transition-all ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-[1280px] mx-auto px-6">
          <nav className="flex items-center gap-6 h-[74px]">
            {/* Brand */}
            <Link href={`/${locale}`} className="flex items-center gap-3 mr-auto">
              <div className="w-11 h-11 rounded-xl bg-navy flex items-center justify-center flex-none">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-head font-extrabold text-[17px] text-navy leading-tight">TOCHE & FILS</div>
                <div className="text-[11px] tracking-widest uppercase text-muted font-semibold">International Trade</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-body font-medium text-[15px] px-3.5 py-2 rounded-lg transition-all ${
                    isActive(link.href)
                      ? 'text-blue after:absolute after:bottom-0.5 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-cta after:rounded'
                      : 'text-gray-600 hover:text-blue hover:bg-blue/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Language selector */}
            <div className="hidden lg:flex items-center relative">
              <select
                value={locale}
                onChange={handleLocaleChange}
                className="appearance-none bg-white border border-line rounded-xl pl-3 pr-8 py-2 text-sm font-head font-semibold text-ink cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue hover:border-blue/40 transition-all"
              >
                {LOCALES.map(loc => (
                  <option key={loc.code} value={loc.code}>
                    {loc.flag} {loc.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
            </div>

            {/* CTA */}
            <Link
              href={`/${locale}/devis`}
              className="hidden lg:inline-flex items-center gap-2 bg-cta text-white font-head font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-cta-dark transition-all shadow-[0_6px_16px_rgba(224,90,0,.25)] hover:-translate-y-0.5"
            >
              {t('quote')}
            </Link>

            {/* Burger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-line"
            >
              <Menu className="w-5 h-5 text-navy" />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 bg-black/40 z-[80] transition-opacity ${drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setDrawerOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-[min(340px,86vw)] bg-white z-[90] transition-transform shadow-2xl flex flex-col ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <Link href={`/${locale}`} className="flex items-center gap-2" onClick={() => setDrawerOpen(false)}>
            <div className="w-9 h-9 rounded-lg bg-navy flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="font-head font-extrabold text-navy">TOCHE & FILS</span>
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-navy" />
          </button>
        </div>
        <nav className="flex flex-col p-3 gap-1 flex-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className={`px-4 py-3.5 rounded-xl font-head font-semibold text-[16px] transition-colors ${
                isActive(link.href) ? 'bg-blue/8 text-blue' : 'text-navy hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-line">
          <label className="block text-xs font-head font-semibold text-muted uppercase tracking-wider mb-2">Langue</label>
          <div className="relative">
            <select
              value={locale}
              onChange={e => {
                handleLocaleChange(e);
                setDrawerOpen(false);
              }}
              className="w-full appearance-none bg-bg-soft border border-line rounded-xl pl-3 pr-8 py-2.5 text-sm font-head font-semibold text-ink cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue/30"
            >
              {LOCALES.map(loc => (
                <option key={loc.code} value={loc.code}>
                  {loc.flag} {loc.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          </div>
        </div>
        <div className="p-4">
          <Link
            href={`/${locale}/devis`}
            onClick={() => setDrawerOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-cta text-white font-head font-semibold py-3 rounded-xl hover:bg-cta-dark transition-colors"
          >
            {t('quote')}
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
