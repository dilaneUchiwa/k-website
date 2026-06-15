import React from 'react';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import DevisForm from './DevisForm';
import { CheckCircle } from 'lucide-react';

export default async function DevisPage({
  params: { locale: _locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { product?: string };
}) {
  const t = await getTranslations('quote');

  const products = await prisma.product.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { name: 'asc' },
    select: { id: true, name: true, slug: true, brand: true },
  });

  return (
    <div>
      {/* Hero */}
      <section
        className="py-20 text-white"
        style={{ background: 'linear-gradient(115deg, #063D6E 0%, #0A5FA8 100%)' }}
      >
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <div className="font-head font-bold text-xs tracking-[0.14em] uppercase text-sky mb-4">Devis</div>
          <h1 className="font-head font-extrabold text-4xl md:text-5xl text-white leading-tight mb-4">
            {t('title')}
          </h1>
          <p className="text-[#c2dcf0] text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      <div className="max-w-[900px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Benefits */}
          <div className="space-y-5">
            <h2 className="font-head font-extrabold text-xl text-ink">Pourquoi demander un devis ?</h2>
            {[
              'Offre personnalisée selon vos besoins',
              'Réponse garantie en moins de 48h',
              'Prix compétitifs directs du fabricant',
              'Accompagnement jusqu\'à la livraison',
              'Aucun engagement à la réception',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green flex-none mt-0.5" />
                <span className="text-sm text-muted">{item}</span>
              </div>
            ))}

            <div className="mt-8 p-5 bg-blue/5 border border-blue/20 rounded-xl">
              <p className="text-sm font-head font-semibold text-ink mb-1">Contact direct</p>
              <a href="tel:+237694945547" className="text-sm text-blue hover:text-navy font-medium">+237 694 945 547</a>
              <p className="text-xs text-muted mt-1">Lundi–Samedi, 8h–18h</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-line rounded-2xl p-8">
              <h2 className="font-head font-extrabold text-2xl text-ink mb-6">Votre demande de devis</h2>
              <DevisForm products={products} initialProduct={searchParams.product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
