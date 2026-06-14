import { describe, it, expect, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { transactionSchema } from '@/lib/validations';

const prisma = new PrismaClient({
  datasources: { db: { url: 'file:./test.db' } },
});

afterAll(async () => {
  await prisma.transaction.deleteMany({
    where: { category: '__vitest__' },
  });
  await prisma.$disconnect();
});

// Helper to get a userId for testing (uses admin from seed)
async function getTestUserId(): Promise<string> {
  const user = await prisma.user.findFirst();
  if (!user) throw new Error('No user in test DB — run seed first');
  return user.id;
}

describe('Transaction creation (integration)', () => {
  it('creates an INCOME transaction', async () => {
    const userId = await getTestUserId();
    const tx = await prisma.transaction.create({
      data: {
        type: 'INCOME',
        category: '__vitest__',
        amount: 97000000,
        currency: 'XAF',
        description: 'Vente test — HOWO 8x4',
        date: new Date('2026-06-12'),
        createdById: userId,
      },
    });
    expect(tx.type).toBe('INCOME');
    expect(tx.amount).toBe(97000000);
  });

  it('creates an EXPENSE transaction', async () => {
    const userId = await getTestUserId();
    const tx = await prisma.transaction.create({
      data: {
        type: 'EXPENSE',
        category: '__vitest__',
        amount: 14000000,
        currency: 'XAF',
        description: 'Fret maritime',
        date: new Date('2026-06-12'),
        createdById: userId,
      },
    });
    expect(tx.type).toBe('EXPENSE');
  });
});

describe('Report calculation (integration)', () => {
  it('computes income sum correctly', async () => {
    const incomes = await prisma.transaction.aggregate({
      where: { type: 'INCOME', category: '__vitest__' },
      _sum: { amount: true },
    });
    expect(incomes._sum.amount).toBeGreaterThanOrEqual(97000000);
  });

  it('computes expense sum correctly', async () => {
    const expenses = await prisma.transaction.aggregate({
      where: { type: 'EXPENSE', category: '__vitest__' },
      _sum: { amount: true },
    });
    expect(expenses._sum.amount).toBeGreaterThanOrEqual(14000000);
  });

  it('calculates profit = income - expense', async () => {
    const [incomes, expenses] = await Promise.all([
      prisma.transaction.aggregate({
        where: { type: 'INCOME', category: '__vitest__' },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: { type: 'EXPENSE', category: '__vitest__' },
        _sum: { amount: true },
      }),
    ]);

    const profit = (incomes._sum.amount ?? 0) - (expenses._sum.amount ?? 0);
    expect(profit).toBeGreaterThan(0); // 97M - 14M = 83M
  });
});

describe('transactionSchema validation', () => {
  it('accepts valid income', () => {
    const result = transactionSchema.safeParse({
      type: 'INCOME',
      category: 'Vente engin',
      amount: 48500000,
      currency: 'XAF',
      description: 'Vente HOWO',
      date: '2026-06-12',
    });
    expect(result.success).toBe(true);
  });

  it('rejects negative amount', () => {
    const result = transactionSchema.safeParse({
      type: 'INCOME',
      category: 'Vente',
      amount: -1000,
      currency: 'XAF',
      description: 'Test',
      date: '2026-06-12',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid type', () => {
    const result = transactionSchema.safeParse({
      type: 'TRANSFER',
      category: 'Test',
      amount: 1000,
      currency: 'XAF',
      description: 'Test',
      date: '2026-06-12',
    });
    expect(result.success).toBe(false);
  });
});
