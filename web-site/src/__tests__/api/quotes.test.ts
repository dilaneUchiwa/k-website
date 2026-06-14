import { describe, it, expect, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { quoteSchema } from '@/lib/validations';

const prisma = new PrismaClient({
  datasources: { db: { url: 'file:./test.db' } },
});

afterAll(async () => {
  await prisma.quoteRequest.deleteMany({
    where: { email: 'test-vitest@example.cm' },
  });
  await prisma.$disconnect();
});

describe('QuoteRequest creation (integration)', () => {
  it('creates a valid quote request in DB', async () => {
    const input = {
      fullName: 'Test Client',
      email: 'test-vitest@example.cm',
      country: 'Cameroun',
      productName: 'SINOTRUK HOWO 8x4',
      quantity: 2,
    };

    const parsed = quoteSchema.safeParse(input);
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;

    const created = await prisma.quoteRequest.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        country: parsed.data.country ?? '',
        productName: parsed.data.productName,
        quantity: parsed.data.quantity,
        status: 'NEW',
      },
    });

    expect(created.id).toBeTruthy();
    expect(created.status).toBe('NEW');
    expect(created.fullName).toBe('Test Client');
  });

  it('can update quote status to IN_PROGRESS', async () => {
    const quote = await prisma.quoteRequest.findFirst({
      where: { email: 'test-vitest@example.cm' },
    });
    if (!quote) return;

    const updated = await prisma.quoteRequest.update({
      where: { id: quote.id },
      data: { status: 'IN_PROGRESS' },
    });

    expect(updated.status).toBe('IN_PROGRESS');
  });

  it('can update quote status to DONE', async () => {
    const quote = await prisma.quoteRequest.findFirst({
      where: { email: 'test-vitest@example.cm' },
    });
    if (!quote) return;

    const updated = await prisma.quoteRequest.update({
      where: { id: quote.id },
      data: { status: 'DONE' },
    });

    expect(updated.status).toBe('DONE');
  });

  it('lists quotes filtered by status NEW', async () => {
    // Create a NEW quote
    await prisma.quoteRequest.create({
      data: {
        fullName: 'Test New',
        email: 'test-vitest@example.cm',
        country: 'Sénégal',
        productName: 'SANY SY215C',
        quantity: 1,
        status: 'NEW',
      },
    });

    const newQuotes = await prisma.quoteRequest.findMany({
      where: { status: 'NEW' },
    });
    expect(newQuotes.every(q => q.status === 'NEW')).toBe(true);
  });
});

describe('QuoteRequest validation', () => {
  it('rejects quote with missing email', () => {
    const result = quoteSchema.safeParse({
      fullName: 'Jean',
      productName: 'HOWO',
    });
    expect(result.success).toBe(false);
  });

  it('rejects quote with invalid email', () => {
    const result = quoteSchema.safeParse({
      fullName: 'Jean Mbarga',
      email: 'not-email',
      productName: 'HOWO',
    });
    expect(result.success).toBe(false);
  });

  it('accepts optional country', () => {
    const result = quoteSchema.safeParse({
      fullName: 'Jean Mbarga',
      email: 'jean@example.cm',
      productName: 'SINOTRUK HOWO',
    });
    expect(result.success).toBe(true);
  });
});
