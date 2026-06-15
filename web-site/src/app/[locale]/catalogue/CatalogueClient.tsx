'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/front/ProductCard';
import { useTranslations } from 'next-intl';

interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  model: string;
  description: string;
  featured: boolean;
  category: { name: string; slug: string };
  images: { url: string; alt?: string | null }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { products: number };
}

interface Props {
  products: Product[];
  categories: Category[];
  locale: string;
  total: number;
  page: number;
  totalPages: number;
  initialCategory?: string;
  initialQuery?: string;
}

export default function CatalogueClient({
  products,
  categories,
  locale,
  total,
  page,
  totalPages,
  initialCategory,
  initialQuery,
}: Props) {
  const t = useTranslations('products');
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(initialQuery || '');

  const navigate = (params: Record<string, string | undefined>) => {
    const sp = new URLSearchParams();
    if (params.category) sp.set('category', params.category);
    if (params.q) sp.set('q', params.q);
    if (params.page && params.page !== '1') sp.set('page', params.page);
    const qs = sp.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ''}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ q: search || undefined, category: initialCategory });
  };

  const handleCategory = (slug: string | undefined) => {
    navigate({ category: slug, q: initialQuery });
  };

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('filters.search')}
              className="w-full pl-10 pr-4 py-2.5 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue text-white font-head font-semibold text-sm rounded-xl hover:bg-navy transition-colors"
          >
            Rechercher
          </button>
        </form>

        {/* Count */}
        <div className="flex items-center text-sm text-muted self-center">
          {total} produit{total !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => handleCategory(undefined)}
          className={`px-4 py-2 rounded-xl font-head font-semibold text-sm transition-all ${
            !initialCategory
              ? 'bg-blue text-white shadow-sm'
              : 'bg-white border border-line text-muted hover:border-blue hover:text-blue'
          }`}
        >
          {t('filters.all')}
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategory(cat.slug)}
            className={`px-4 py-2 rounded-xl font-head font-semibold text-sm transition-all ${
              initialCategory === cat.slug
                ? 'bg-blue text-white shadow-sm'
                : 'bg-white border border-line text-muted hover:border-blue hover:text-blue'
            }`}
          >
            {cat.name} <span className="opacity-60">({cat._count.products})</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-24 text-center text-muted"
        >
          <p className="text-lg font-head font-semibold mb-2">Aucun produit trouvé</p>
          <p className="text-sm">Essayez une autre recherche ou catégorie.</p>
        </motion.div>
      ) : (
        <motion.div
          key={`${initialCategory}-${initialQuery}-${page}`}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } }, hidden: {} }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map(product => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] } },
              }}
            >
              <ProductCard product={product} locale={locale} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            disabled={page <= 1}
            onClick={() => navigate({ page: String(page - 1), category: initialCategory, q: initialQuery })}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-line text-muted hover:border-blue hover:text-blue disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => navigate({ page: String(p), category: initialCategory, q: initialQuery })}
              className={`w-9 h-9 flex items-center justify-center rounded-xl font-head font-semibold text-sm transition-colors ${
                p === page
                  ? 'bg-blue text-white'
                  : 'border border-line text-muted hover:border-blue hover:text-blue'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            disabled={page >= totalPages}
            onClick={() => navigate({ page: String(page + 1), category: initialCategory, q: initialQuery })}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-line text-muted hover:border-blue hover:text-blue disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}
