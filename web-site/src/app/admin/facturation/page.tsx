import React from 'react';
import { prisma } from '@/lib/prisma';
import FacturationClient from './FacturationClient';

export default async function FacturationPage() {
  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true },
    take: 20,
  });

  return <FacturationClient invoices={invoices as any} />;
}
