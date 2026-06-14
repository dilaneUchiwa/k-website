import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug, status: 'ACTIVE' },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
        specs: { orderBy: { order: 'asc' } },
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Get similar products
    const similar = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        status: 'ACTIVE',
        id: { not: product.id },
      },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' }, take: 1 },
      },
      take: 4,
    });

    return NextResponse.json({ product, similar });
  } catch (error) {
    console.error('Product GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
