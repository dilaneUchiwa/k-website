'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    brand: string;
    model: string;
    description: string;
    featured?: boolean;
    category: { name: string; slug: string };
    images: { url: string; alt?: string | null }[];
  };
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const t = useTranslations('products');
  const image = product.images[0];

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(10,95,168,0.13)' }}
      transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="bg-white rounded-2xl border border-line shadow-sm overflow-hidden group"
    >
      <div className="relative h-52 bg-bg-soft overflow-hidden">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt || product.name}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted">
            <svg viewBox="0 0 24 24" className="w-16 h-16 opacity-30" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M14 18V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h1"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="6.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/></svg>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-cta text-white text-[11px] font-head font-bold px-2 py-0.5 rounded-full">
            TOP
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-head font-semibold text-sky bg-sky/10 px-2 py-0.5 rounded-full">{product.brand}</span>
          <span className="text-xs text-muted">{product.category.name}</span>
        </div>
        <h3 className="font-head font-bold text-[17px] text-ink leading-tight mb-1">{product.name}</h3>
        <p className="text-sm text-muted line-clamp-2 mb-4">{product.description}</p>
        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}/catalogue/${product.slug}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-blue text-white font-head font-semibold text-sm py-2.5 rounded-xl hover:bg-navy transition-colors"
          >
            {t('view_detail')}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={`/${locale}/devis?product=${product.slug}`}
            className="px-3 py-2.5 border border-line rounded-xl text-sm text-muted hover:border-blue hover:text-blue transition-colors font-head font-semibold"
          >
            Devis
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
