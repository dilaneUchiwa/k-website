import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductForm from '../ProductForm';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id: params.id },
      include: {
        specs: { orderBy: { order: 'asc' } },
        images: { orderBy: { order: 'asc' } },
      },
    }),
    prisma.category.findMany({ orderBy: { order: 'asc' } }),
  ]);

  if (!product) notFound();

  return (
    <div className="max-w-5xl">
      <ProductForm categories={categories} product={product as any} />
    </div>
  );
}
