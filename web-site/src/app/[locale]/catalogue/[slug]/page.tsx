import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/front/ProductCard';
import ImageGallery from './ImageGallery';

export default async function ProductDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const t = await getTranslations('products');

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { order: 'asc' } },
      specs: { orderBy: { order: 'asc' } },
    },
  });

  if (!product) notFound();

  const similar = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      status: 'ACTIVE',
    },
    include: {
      category: true,
      images: { orderBy: { order: 'asc' }, take: 1 },
    },
    take: 4,
  });

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href={`/${locale}`} className="hover:text-blue transition-colors">Accueil</Link>
        <span>/</span>
        <Link href={`/${locale}/catalogue`} className="hover:text-blue transition-colors">Catalogue</Link>
        <span>/</span>
        <Link href={`/${locale}/catalogue?category=${product.category.slug}`} className="hover:text-blue transition-colors">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-ink font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Gallery */}
        <ImageGallery images={product.images} productName={product.name} />

        {/* Details */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-head font-bold text-sky bg-sky/10 px-2.5 py-1 rounded-full">{product.brand}</span>
            <span className="text-xs text-muted bg-bg-soft px-2.5 py-1 rounded-full">{product.category.name}</span>
            {product.featured && (
              <span className="text-xs font-head font-bold text-white bg-cta px-2.5 py-1 rounded-full">TOP</span>
            )}
          </div>

          <h1 className="font-head font-extrabold text-3xl md:text-4xl text-ink mb-2 leading-tight">{product.name}</h1>
          <p className="text-muted text-sm mb-6">Modèle : <span className="font-semibold text-ink">{product.model}</span></p>

          <p className="text-muted leading-relaxed mb-8">{product.description}</p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/devis?product=${product.slug}`}
              className="flex items-center gap-2 bg-cta text-white font-head font-semibold px-7 py-3.5 rounded-xl hover:bg-cta-dark transition-all shadow-[0_6px_20px_rgba(224,90,0,.3)] hover:-translate-y-0.5"
            >
              {t('request_quote')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="flex items-center gap-2 border border-line text-ink font-head font-semibold px-6 py-3.5 rounded-xl hover:border-blue hover:text-blue transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>

      {/* Technical specs */}
      {product.specs.length > 0 && (
        <section className="mb-16">
          <h2 className="font-head font-extrabold text-2xl text-ink mb-6">{t('specs')}</h2>
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr key={spec.id} className={i % 2 === 0 ? 'bg-white' : 'bg-bg-soft'}>
                    <td className="px-5 py-3.5 font-head font-semibold text-ink w-1/3">{spec.key}</td>
                    <td className="px-5 py-3.5 text-muted">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Similar products */}
      {similar.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-head font-extrabold text-2xl text-ink">{t('similar')}</h2>
            <Link
              href={`/${locale}/catalogue?category=${product.category.slug}`}
              className="flex items-center gap-1 text-sm font-head font-semibold text-blue hover:text-navy transition-colors"
            >
              Voir tous <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similar.map(p => (
              <ProductCard key={p.id} product={p as any} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
