import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validations';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { category: true, specs: { orderBy: { order: 'asc' } }, images: { orderBy: { order: 'asc' } } },
    });
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { specs, images, ...productData } = body;
    const parsed = productSchema.safeParse(productData);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation error', details: parsed.error.issues }, { status: 400 });
    }

    // Update product and replace specs/images
    await prisma.$transaction(async (tx) => {
      await tx.product.update({ where: { id: params.id }, data: parsed.data });
      if (specs) {
        await tx.productSpec.deleteMany({ where: { productId: params.id } });
        await tx.productSpec.createMany({ data: specs.map((s: any) => ({ ...s, productId: params.id })) });
      }
      if (images) {
        await tx.productImage.deleteMany({ where: { productId: params.id } });
        await tx.productImage.createMany({ data: images.map((i: any) => ({ ...i, productId: params.id })) });
      }
    });

    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { category: true, specs: true, images: true },
    });

    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
