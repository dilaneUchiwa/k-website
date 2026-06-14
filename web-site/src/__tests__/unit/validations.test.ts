import { describe, it, expect } from 'vitest';
import {
  quoteSchema,
  contactSchema,
  productSchema,
  categorySchema,
  invoiceSchema,
  transactionSchema,
  loginSchema,
} from '@/lib/validations';

// ─── quoteSchema ─────────────────────────────────────────────

describe('quoteSchema', () => {
  const valid = {
    fullName: 'Jean Mbarga',
    email: 'jean@example.cm',
    productName: 'SINOTRUK HOWO 8x4',
    quantity: 2,
  };

  it('accepts valid quote', () => {
    const result = quoteSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('rejects short fullName', () => {
    const result = quoteSchema.safeParse({ ...valid, fullName: 'J' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = quoteSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects quantity < 1', () => {
    const result = quoteSchema.safeParse({ ...valid, quantity: 0 });
    expect(result.success).toBe(false);
  });

  it('accepts without optional phone/country', () => {
    const result = quoteSchema.safeParse({ ...valid });
    expect(result.success).toBe(true);
  });

  it('defaults quantity to 1 when not provided', () => {
    const { quantity: _, ...noQty } = valid;
    const result = quoteSchema.safeParse(noQty);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.quantity).toBe(1);
  });
});

// ─── contactSchema ───────────────────────────────────────────

describe('contactSchema', () => {
  const valid = {
    fullName: 'Ali Hassan',
    email: 'ali@example.sn',
    subject: 'Demande de partenariat',
    message: 'Bonjour, je souhaite discuter d\'un partenariat commercial.',
  };

  it('accepts valid contact message', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects message shorter than 10 chars', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'Bonjour' }).success).toBe(false);
  });

  it('rejects empty subject', () => {
    expect(contactSchema.safeParse({ ...valid, subject: '' }).success).toBe(false);
  });

  it('rejects invalid email', () => {
    expect(contactSchema.safeParse({ ...valid, email: 'invalide' }).success).toBe(false);
  });
});

// ─── productSchema ───────────────────────────────────────────

describe('productSchema', () => {
  const valid = {
    name: 'SINOTRUK HOWO 8x4',
    slug: 'sinotruk-howo-8x4',
    brand: 'SINOTRUK',
    model: 'HOWO 380',
    description: 'Camion benne robuste pour chantiers exigeants.',
    categoryId: 'cuid123',
  };

  it('accepts valid product', () => {
    expect(productSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects missing name', () => {
    expect(productSchema.safeParse({ ...valid, name: '' }).success).toBe(false);
  });

  it('rejects missing slug', () => {
    expect(productSchema.safeParse({ ...valid, slug: '' }).success).toBe(false);
  });

  it('defaults status to ACTIVE', () => {
    const result = productSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.status).toBe('ACTIVE');
  });

  it('defaults featured to false', () => {
    const result = productSchema.safeParse(valid);
    if (result.success) expect(result.data.featured).toBe(false);
  });

  it('rejects invalid status', () => {
    expect(productSchema.safeParse({ ...valid, status: 'INVALID' }).success).toBe(false);
  });
});

// ─── categorySchema ──────────────────────────────────────────

describe('categorySchema', () => {
  it('accepts valid category', () => {
    expect(categorySchema.safeParse({ name: 'Camions bennes', slug: 'camions-bennes' }).success).toBe(true);
  });

  it('rejects empty name', () => {
    expect(categorySchema.safeParse({ name: '', slug: 'slug' }).success).toBe(false);
  });

  it('defaults order to 0', () => {
    const result = categorySchema.safeParse({ name: 'Test', slug: 'test' });
    if (result.success) expect(result.data.order).toBe(0);
  });
});

// ─── invoiceSchema ───────────────────────────────────────────

describe('invoiceSchema', () => {
  const valid = {
    number: 'FAC-2026-0001',
    clientName: 'Société BTP Douala',
    currency: 'XAF',
    items: [
      { description: 'SINOTRUK HOWO 8x4', quantity: 2, unitPrice: 22000000 },
    ],
  };

  it('accepts valid invoice', () => {
    expect(invoiceSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects invoice without items', () => {
    expect(invoiceSchema.safeParse({ ...valid, items: [] }).success).toBe(false);
  });

  it('rejects item with quantity 0', () => {
    const items = [{ description: 'Test', quantity: 0, unitPrice: 100 }];
    expect(invoiceSchema.safeParse({ ...valid, items }).success).toBe(false);
  });

  it('rejects invalid tax rate (>100)', () => {
    expect(invoiceSchema.safeParse({ ...valid, taxRate: 101 }).success).toBe(false);
  });

  it('defaults status to DRAFT', () => {
    const result = invoiceSchema.safeParse(valid);
    if (result.success) expect(result.data.status).toBe('DRAFT');
  });
});

// ─── transactionSchema ───────────────────────────────────────

describe('transactionSchema', () => {
  const valid = {
    type: 'INCOME' as const,
    category: 'Vente engin',
    amount: 48500000,
    currency: 'XAF',
    description: 'Vente HOWO 8x4',
    date: '2026-06-12',
  };

  it('accepts valid income transaction', () => {
    expect(transactionSchema.safeParse(valid).success).toBe(true);
  });

  it('accepts valid expense transaction', () => {
    expect(transactionSchema.safeParse({ ...valid, type: 'EXPENSE' }).success).toBe(true);
  });

  it('rejects invalid type', () => {
    expect(transactionSchema.safeParse({ ...valid, type: 'TRANSFER' }).success).toBe(false);
  });

  it('rejects amount <= 0', () => {
    expect(transactionSchema.safeParse({ ...valid, amount: -100 }).success).toBe(false);
  });

  it('rejects empty category', () => {
    expect(transactionSchema.safeParse({ ...valid, category: '' }).success).toBe(false);
  });
});

// ─── loginSchema ─────────────────────────────────────────────

describe('loginSchema', () => {
  it('accepts valid login', () => {
    expect(loginSchema.safeParse({ email: 'franklin@gmail.com', password: 'Admin@2026!' }).success).toBe(true);
  });

  it('rejects invalid email', () => {
    expect(loginSchema.safeParse({ email: 'notmail', password: 'Admin@2026!' }).success).toBe(false);
  });

  it('rejects empty password', () => {
    expect(loginSchema.safeParse({ email: 'franklin@gmail.com', password: '' }).success).toBe(false);
  });
});
