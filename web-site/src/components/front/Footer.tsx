import React from 'react';
import Link from 'next/link';
import { Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="bg-navy text-[#bcd2e8]">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-head font-extrabold text-lg text-white">TOCHE & FILS</div>
                <div className="text-[11px] tracking-widest uppercase text-[#7aa8cc]">International Trade Co., LTD</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-[300px]">{t('tagline')}</p>
            <div className="mt-5 flex flex-col gap-2 text-sm">
              <a href="tel:+237694945547" className="flex items-center gap-2 hover:text-white transition-colors">
                <span>📞</span> +237 694 945 547
              </a>
              <a href="tel:+8618333718710" className="flex items-center gap-2 hover:text-white transition-colors">
                <span>📞</span> +86 183 3371 8710
              </a>
              <a href="mailto:franklin@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <span>✉️</span> franklin@gmail.com
              </a>
              <span className="flex items-center gap-2">
                <span>📍</span> Douala, Cameroun / Guangzhou, Chine
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-head font-bold text-white text-sm uppercase tracking-wider mb-4">{t('navigation')}</h4>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                { href: `/${locale}`, label: nav('home') },
                { href: `/${locale}/catalogue`, label: nav('catalogue') },
                { href: `/${locale}/services`, label: nav('services') },
                { href: `/${locale}/apropos`, label: nav('about') },
                { href: `/${locale}/contact`, label: nav('contact') },
                { href: `/${locale}/devis`, label: nav('quote') },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h4 className="font-head font-bold text-white text-sm uppercase tracking-wider mb-4">{t('contact')}</h4>
            <Link
              href={`/${locale}/devis`}
              className="inline-flex items-center gap-2 bg-cta text-white font-head font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-cta-dark transition-colors"
            >
              {nav('quote')}
            </Link>
            <div className="mt-4">
              <a
                href="https://wa.me/237694945547"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1faf54] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#179247] transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#6f93b6]">
          <span>© {new Date().getFullYear()} TOCHE & FILS International Trade Co., LTD. {t('rights')}.</span>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/mentions-legales`} className="hover:text-white">{t('terms')}</Link>
            <Link href={`/${locale}/confidentialite`} className="hover:text-white">{t('privacy')}</Link>
            <span className="text-[#6f93b6]/60">|</span>
            <span>
              Réalisé par{' '}
              <span className="font-semibold text-[#8fb8d8] hover:text-white transition-colors">GreeZe</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
