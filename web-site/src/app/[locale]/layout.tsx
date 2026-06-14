import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header } from '@/components/front/Header';
import { Footer } from '@/components/front/Footer';

export const dynamic = 'force-dynamic';

const locales = ['fr', 'en', 'es', 'zh'];

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
