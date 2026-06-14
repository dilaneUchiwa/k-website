import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: { db: { url: 'file:./test.db' } },
});

beforeAll(async () => {
  // seed minimum data for tests
  await prisma.$executeRawUnsafe('PRAGMA journal_mode=WAL');

  const role = await prisma.userRole.upsert({
    where: { name: '__test_role__' },
    create: { name: '__test_role__' },
    update: {},
  });

  const cat = await prisma.category.upsert({
    where: { slug: 'test-cat' },
    create: { name: 'Test Category', slug: 'test-cat', order: 99 },
    update: {},
  });

  await prisma.product.upsert({
    where: { slug: 'test-howo' },
    create: {
      name: 'Test HOWO',
      slug: 'test-howo',
      brand: 'SINOTRUK',
      model: 'HOWO Test',
      description: 'Test product for unit tests',
      categoryId: cat.id,
      featured: true,
      status: 'ACTIVE',
    },
    update: {},
  });

  await prisma.product.upsert({
    where: { slug: 'test-archived' },
    create: {
      name: 'Test Archived',
      slug: 'test-archived',
      brand: 'SANY',
      model: 'Archived',
      description: 'Archived product',
      categoryId: cat.id,
      featured: false,
      status: 'ARCHIVED',
    },
    update: {},
  });
});

afterAll(async () => {
  // clean test data
  await prisma.product.deleteMany({ where: { slug: { in: ['test-howo', 'test-archived'] } } });
  await prisma.category.deleteMany({ where: { slug: 'test-cat' } });
  await prisma.userRole.deleteMany({ where: { name: '__test_role__' } });
  await prisma.$disconnect();
});

describe('Product queries (integration)', () => {
  it('finds active products', async () => {
    const products = await prisma.product.findMany({
      where: { status: 'ACTIVE' },
    });
    expect(products.length).toBeGreaterThan(0);
    products.forEach(p => expect(p.status).toBe('ACTIVE'));
  });

  it('finds featured products only', async () => {
    const products = await prisma.product.findMany({
      where: { featured: true, status: 'ACTIVE' },
    });
    expect(products.length).toBeGreaterThan(0);
    products.forEach(p => expect(p.featured).toBe(true));
  });

  it('finds product by slug', async () => {
    const product = await prisma.product.findUnique({
      where: { slug: 'test-howo' },
    });
    expect(product).not.toBeNull();
    expect(product?.name).toBe('Test HOWO');
    expect(product?.brand).toBe('SINOTRUK');
  });

  it('returns null for nonexistent slug', async () => {
    const product = await prisma.product.findUnique({
      where: { slug: 'nonexistent-product-xyz' },
    });
    expect(product).toBeNull();
  });

  it('filters products by category', async () => {
    const cat = await prisma.category.findUnique({ where: { slug: 'test-cat' } });
    if (!cat) return;
    const products = await prisma.product.findMany({
      where: { categoryId: cat.id },
    });
    expect(products.length).toBe(2); // howo + archived
  });

  it('excludes archived products from public listing', async () => {
    const archived = await prisma.product.findMany({
      where: { status: 'ARCHIVED' },
    });
    const active = await prisma.product.findMany({
      where: { status: 'ACTIVE' },
    });
    expect(archived.some(p => p.slug === 'test-archived')).toBe(true);
    expect(active.every(p => p.status === 'ACTIVE')).toBe(true);
  });

  it('search by name', async () => {
    const results = await prisma.product.findMany({
      where: {
        name: { contains: 'HOWO' },
        status: 'ACTIVE',
      },
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(p => p.slug === 'test-howo')).toBe(true);
  });
});
