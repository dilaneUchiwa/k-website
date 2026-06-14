import React from 'react';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import CatalogueClient from './CatalogueClient';

export default async function CataloguePage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { category?: string; q?: string; page?: string };
}) {
  const t = await getTranslations('products');

  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { products: true } } },
  });

  const page = Number(searchParams.page) || 1;
  const pageSize = 12;

  const where: Record<string, unknown> = { status: 'ACTIVE' };
  if (searchParams.category) {
    where.category = { slug: searchParams.category };
  }
  if (searchParams.q) {
    where.OR = [
      { name: { contains: searchParams.q } },
      { brand: { contains: searchParams.q } },
      { model: { contains: searchParams.q } },
    ];
  }

  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      include: {
        category: true,
        images: { orderBy: { order: 'asc' }, take: 1 },
      },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      {/* Hero */}
      <section
        className="py-16 text-white"
        style={{ background: 'linear-gradient(115deg, #063D6E 0%, #0A5FA8 100%)' }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center">
            <div className="font-head font-bold text-xs tracking-[0.14em] uppercase text-sky mb-3">Catalogue</div>
            <h1 className="font-head font-extrabold text-4xl md:text-5xl text-white leading-tight mb-3">{t('title')}</h1>
            <p className="text-[#c2dcf0] text-lg max-w-xl mx-auto">{t('subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <CatalogueClient
          products={products as any}
          categories={categories as any}
          locale={locale}
          total={total}
          page={page}
          totalPages={totalPages}
          initialCategory={searchParams.category}
          initialQuery={searchParams.q}
        />
      </div>
    </div>
  );
}
