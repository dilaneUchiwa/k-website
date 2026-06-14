import React from 'react';
import { prisma } from '@/lib/prisma';
import DevisClient from './DevisClient';

export default async function AdminDevisPage({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const filter = searchParams.filter || 'all';
  const where: Record<string, unknown> = {};
  if (filter !== 'all') where.status = filter.toUpperCase();

  const quotes = await prisma.quoteRequest.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { product: { select: { name: true, slug: true } } },
  });

  return <DevisClient quotes={quotes as any} filter={filter} />;
}
