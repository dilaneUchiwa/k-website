'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, Globe, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeUp, FadeIn, SlideIn, StaggerChildren, StaggerItem, FloatImage, ScaleIn } from '@/components/ui/Animate';
import { ProductCard } from '@/components/front/ProductCard';
import { SectionHead } from '@/components/front/SectionHead';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

interface Service { key: string; icon: string; title: string; desc: string }
interface Stat { value: string; label: string; iconName: 'truck' | 'globe' | 'clock' | 'award' }
interface Step { step: number; title: string; desc: string }
interface WhyItem { key: string; icon: string; title: string; desc: string }
interface Product {
  id: string; name: string; slug: string; brand: string;
  category: { name: string };
  images: { url: string }[];
}

interface HomeClientProps {
  locale: string;
  services: Service[];
  stats: Stat[];
  steps: Step[];
  whyItems: WhyItem[];
  featuredProducts: Product[];
  hero: { eyebrow: string; title: string; subtitle: string; cta_primary: string; cta_secondary: string };
  labels: {
    servicesTitle: string; servicesSubtitle: string;
    productsTitle: string; productsSubtitle: string; viewAll: string;
    howTitle: string; howSubtitle: string;
    whyTitle: string;
    ctaTitle: string; ctaSubtitle: string; ctaBtn: string; ctaContact: string;
  };
}

const STAT_ICONS: Record<string, React.ReactNode> = {
  truck: <Truck className="w-8 h-8" />,
  globe: <Globe className="w-8 h-8" />,
  clock: <Clock className="w-8 h-8" />,
  award: <Award className="w-8 h-8" />,
};

export default function HomeClient({ locale, services, stats, steps, whyItems, featuredProducts, hero, labels }: HomeClientProps) {
  return (
    <div>
      {/* HERO */}
      <section
        className="relative min-h-[92vh] flex items-center overflow-hidden"
        style={{
          background: 'radial-gradient(1200px 600px at 80% -10%, rgba(46,156,219,.22), transparent 60%), linear-gradient(115deg,#06335c 0%, #0A5FA8 55%, #0e6fc0 100%)',
        }}
      >
        {/* Floating background blobs */}
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 bg-sky/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-64 h-64 bg-blue/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div className="max-w-[1280px] mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-14 relative z-10">
          <div className="flex-1 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="font-head font-bold text-xs tracking-[0.14em] uppercase text-sky mb-4"
            >
              {hero.eyebrow}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease }}
              className="font-head font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.08] mb-6 max-w-[580px]"
            >
              {hero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease }}
              className="text-[#c2dcf0] text-lg leading-relaxed mb-10 max-w-[500px]"
            >
              {hero.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href={`/${locale}/catalogue`}
                className="flex items-center gap-2 bg-cta text-white font-head font-semibold px-7 py-4 rounded-xl hover:bg-cta-dark transition-all shadow-[0_8px_24px_rgba(224,90,0,.35)] hover:-translate-y-1 active:scale-95"
              >
                {hero.cta_primary}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 font-head font-semibold px-7 py-4 rounded-xl hover:bg-white/20 transition-all hover:-translate-y-0.5"
              >
                {hero.cta_secondary}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-14 flex flex-wrap gap-8"
            >
              {stats.slice(0, 3).map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.7 + i * 0.1, ease }}
                  className="text-white"
                >
                  <div className="font-head font-extrabold text-3xl text-sky">{stat.value}</div>
                  <div className="text-sm text-[#9ec8e8] mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Hero image — floating */}
          <FloatImage className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-white/5 rounded-3xl blur-3xl" />
              <Image
                src="/images/p-howo-clean.png"
                alt="SINOTRUK HOWO"
                width={500}
                height={380}
                className="relative drop-shadow-2xl"
                priority
              />
            </div>
          </FloatImage>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-bg-soft">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeUp className="text-center mb-14">
            <SectionHead
              eyebrow="Services"
              title={labels.servicesTitle}
              subtitle={labels.servicesSubtitle}
              center
            />
          </FadeUp>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
            {services.map(svc => (
              <StaggerItem key={svc.key}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-line hover:shadow-md hover:-translate-y-1.5 hover:border-blue/20 transition-all duration-300 cursor-default h-full">
                  <div className="text-3xl mb-4">{svc.icon}</div>
                  <h3 className="font-head font-bold text-base text-ink mb-2">{svc.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{svc.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <FadeUp>
              <SectionHead
                eyebrow="Catalogue"
                title={labels.productsTitle}
                subtitle={labels.productsSubtitle}
              />
            </FadeUp>
            <FadeIn delay={0.2} className="hidden md:block">
              <Link
                href={`/${locale}/catalogue`}
                className="flex items-center gap-2 text-blue font-head font-semibold text-sm hover:text-navy transition-colors group"
              >
                {labels.viewAll}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
          </div>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {featuredProducts.map(product => (
              <StaggerItem key={product.id}>
                <ProductCard product={product as any} locale={locale} />
              </StaggerItem>
            ))}
          </StaggerChildren>
          <div className="mt-8 text-center md:hidden">
            <Link href={`/${locale}/catalogue`} className="inline-flex items-center gap-2 text-blue font-head font-semibold">
              {labels.viewAll}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-bg-soft">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeUp className="text-center mb-14">
            <SectionHead eyebrow="Processus" title={labels.howTitle} subtitle={labels.howSubtitle} center />
          </FadeUp>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.12}>
            {steps.map(({ step, title, desc }) => (
              <StaggerItem key={step}>
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-14 h-14 rounded-2xl bg-blue text-white font-head font-extrabold text-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue/20 cursor-default"
                  >
                    {step}
                  </motion.div>
                  <h3 className="font-head font-bold text-base text-ink mb-2">{title}</h3>
                  <p className="text-sm text-muted">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeUp className="text-center mb-14">
            <SectionHead eyebrow="Avantages" title={labels.whyTitle} center />
          </FadeUp>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {whyItems.map(item => (
              <StaggerItem key={item.key}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(10,95,168,0.12)' }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl p-7 border border-line hover:border-blue/20 transition-colors cursor-default h-full"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-head font-bold text-base text-ink mb-2">{item.title}</h3>
                  <p className="text-sm text-muted">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* STATS BANNER */}
      <section
        className="py-16 overflow-hidden"
        style={{ background: 'linear-gradient(115deg, #063D6E 0%, #0A5FA8 100%)' }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.12}>
            {stats.map(stat => (
              <StaggerItem key={stat.label}>
                <div className="text-center text-white">
                  <div className="text-sky mb-2 flex justify-center">{STAT_ICONS[stat.iconName]}</div>
                  <div className="font-head font-extrabold text-4xl mb-1">{stat.value}</div>
                  <div className="text-[#9ec8e8] text-sm">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA CONTACT */}
      <section className="py-20 bg-bg-soft">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <FadeUp>
            <SectionHead
              eyebrow="Contact"
              title={labels.ctaTitle}
              subtitle={labels.ctaSubtitle}
              center
            />
          </FadeUp>
          <FadeUp delay={0.15} className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href={`/${locale}/devis`}
              className="flex items-center gap-2 bg-cta text-white font-head font-semibold px-7 py-4 rounded-xl hover:bg-cta-dark transition-all shadow-[0_8px_24px_rgba(224,90,0,.3)] hover:-translate-y-0.5 active:scale-95"
            >
              {labels.ctaBtn}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="flex items-center gap-2 border border-blue text-blue font-head font-semibold px-7 py-4 rounded-xl hover:bg-blue hover:text-white transition-all hover:-translate-y-0.5"
            >
              {labels.ctaContact}
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
