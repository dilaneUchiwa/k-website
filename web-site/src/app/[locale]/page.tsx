import React from 'react';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import HomeClient from './HomeClient';

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('hero');
  const tServices = await getTranslations('services');
  const tProducts = await getTranslations('products');
  const tHow = await getTranslations('how_it_works');
  const tWhy = await getTranslations('why_us');
  const tStats = await getTranslations('stats');

  const featuredProducts = await prisma.product.findMany({
    where: { featured: true, status: 'ACTIVE' },
    include: {
      category: true,
      images: { orderBy: { order: 'asc' }, take: 1 },
    },
    take: 4,
  });

  const services = [
    { key: 'import', icon: '🚢', title: tServices('import.title' as any), desc: tServices('import.desc' as any) },
    { key: 'transport', icon: '🚛', title: tServices('transport.title' as any), desc: tServices('transport.desc' as any) },
    { key: 'financing', icon: '💳', title: tServices('financing.title' as any), desc: tServices('financing.desc' as any) },
    { key: 'warranty', icon: '🛡️', title: tServices('warranty.title' as any), desc: tServices('warranty.desc' as any) },
    { key: 'inspection', icon: '🔍', title: tServices('inspection.title' as any), desc: tServices('inspection.desc' as any) },
    { key: 'consulting', icon: '🤝', title: tServices('consulting.title' as any), desc: tServices('consulting.desc' as any) },
    { key: 'training', icon: '🎓', title: tServices('training.title' as any), desc: tServices('training.desc' as any) },
  ];

  const stats = [
    { value: '500+', label: tStats('machines'), iconName: 'truck' as const },
    { value: '12', label: tStats('countries'), iconName: 'globe' as const },
    { value: '48h', label: tStats('delivery'), iconName: 'clock' as const },
    { value: '10+', label: tStats('years'), iconName: 'award' as const },
  ];

  const steps = [1, 2, 3, 4].map(step => ({
    step,
    title: tHow(`step${step}.title` as any),
    desc: tHow(`step${step}.desc` as any),
  }));

  const whyItems = [
    { key: 'price', icon: '💰', title: tWhy('price.title' as any), desc: tWhy('price.desc' as any) },
    { key: 'quality', icon: '✅', title: tWhy('quality.title' as any), desc: tWhy('quality.desc' as any) },
    { key: 'speed', icon: '⚡', title: tWhy('speed.title' as any), desc: tWhy('speed.desc' as any) },
    { key: 'support', icon: '🤝', title: tWhy('support.title' as any), desc: tWhy('support.desc' as any) },
  ];

  return (
    <HomeClient
      locale={locale}
      services={services}
      stats={stats}
      steps={steps}
      whyItems={whyItems}
      featuredProducts={featuredProducts as any}
      hero={{
        eyebrow: t('eyebrow'),
        title: t('title'),
        subtitle: t('subtitle'),
        cta_primary: t('cta_primary'),
        cta_secondary: t('cta_secondary'),
      }}
      labels={{
        servicesTitle: tServices('title'),
        servicesSubtitle: tServices('subtitle'),
        productsTitle: tProducts('title'),
        productsSubtitle: tProducts('subtitle'),
        viewAll: tProducts('view_all'),
        howTitle: tHow('title'),
        howSubtitle: tHow('subtitle'),
        whyTitle: tWhy('title'),
        ctaTitle: 'Prêt à équiper votre chantier ?',
        ctaSubtitle: 'Notre équipe répond en moins de 48h. Obtenez un devis personnalisé dès maintenant.',
        ctaBtn: 'Demander un devis',
        ctaContact: 'Nous contacter',
      }}
    />
  );
}
