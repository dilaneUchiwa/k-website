import React from 'react';
import { prisma } from '@/lib/prisma';
import ProductForm from '../ProductForm';

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="max-w-5xl">
      <ProductForm categories={categories} />
    </div>
  );
}
