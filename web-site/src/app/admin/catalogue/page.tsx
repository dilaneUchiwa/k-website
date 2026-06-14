import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Eye, Pencil } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function AdminCataloguePage({
  searchParams,
}: {
  searchParams: { filter?: string; q?: string };
}) {
  const filter = searchParams.filter || 'all';
  const q = searchParams.q;

  const where: Record<string, unknown> = {};
  if (filter === 'active') where.status = 'ACTIVE';
  if (filter === 'featured') where.featured = true;
  if (filter === 'archived') where.status = 'ARCHIVED';
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { brand: { contains: q } },
      { model: { contains: q } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    include: {
      category: true,
      images: { take: 1, orderBy: { order: 'asc' } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const filters = [
    { key: 'all', label: 'Tous' },
    { key: 'active', label: 'Actifs' },
    { key: 'featured', label: 'En vedette' },
    { key: 'archived', label: 'Archivés' },
  ];

  const STATUS_COLORS: Record<string, string> = {
    ACTIVE: 'bg-green/10 text-green',
    ARCHIVED: 'bg-muted/10 text-muted',
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {filters.map(f => (
            <Link
              key={f.key}
              href={`/admin/catalogue?filter=${f.key}${q ? `&q=${q}` : ''}`}
              className={`px-4 py-2 rounded-xl font-head font-semibold text-sm transition-colors ${
                filter === f.key ? 'bg-blue text-white' : 'bg-white border border-line text-muted hover:border-blue hover:text-blue'
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-3">
          <form>
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Rechercher..."
              className="px-4 py-2 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue w-48"
            />
          </form>
          <Link
            href="/admin/catalogue/new"
            className="flex items-center gap-2 bg-blue text-white font-head font-semibold px-5 py-2 rounded-xl hover:bg-navy transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Nouveau produit
          </Link>
        </div>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-line py-20 text-center">
          <p className="text-muted font-head font-semibold">Aucun produit trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map(product => {
            const image = product.images[0];
            return (
              <div key={product.id} className="bg-white rounded-2xl border border-line overflow-hidden hover:shadow-md transition-all">
                <div className="relative h-40 bg-bg-soft">
                  {image ? (
                    <Image src={image.url} alt={product.name} fill className="object-contain p-3" />
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted/30">
                      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                    </div>
                  )}
                  <span className={`absolute top-2 right-2 text-xs font-head font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[product.status] || 'bg-bg-soft text-muted'}`}>
                    {product.status === 'ACTIVE' ? 'Actif' : 'Archivé'}
                  </span>
                  {product.featured && (
                    <span className="absolute top-2 left-2 text-xs font-head font-bold px-2 py-0.5 rounded-full bg-cta text-white">TOP</span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted mb-0.5">{product.brand} — {product.category.name}</p>
                  <h3 className="font-head font-bold text-ink text-sm leading-tight mb-3">{product.name}</h3>
                  <div className="flex gap-2">
                    <Link
                      href={`/fr/catalogue/${product.slug}`}
                      target="_blank"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-line text-muted text-xs font-head font-semibold hover:border-blue hover:text-blue transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      Voir
                    </Link>
                    <Link
                      href={`/admin/catalogue/${product.id}`}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue/5 text-blue text-xs font-head font-semibold hover:bg-blue/10 transition-colors"
                    >
                      <Pencil className="w-3 h-3" />
                      Modifier
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
