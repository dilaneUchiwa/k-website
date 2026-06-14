import { describe, it, expect } from 'vitest';

// ─── Currency formatter ───────────────────────────────────────

function formatCurrency(amount: number, currency: string = 'XAF'): string {
  if (currency === 'XAF') {
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(amount) + ' FCFA';
  }
  const symbols: Record<string, string> = { USD: '$', EUR: '€', CNY: '¥' };
  const symbol = symbols[currency] ?? currency;
  return symbol + ' ' + new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(amount);
}

describe('formatCurrency', () => {
  it('formats XAF correctly', () => {
    expect(formatCurrency(48500000, 'XAF')).toContain('FCFA');
    expect(formatCurrency(48500000, 'XAF')).toContain('48');
  });

  it('formats USD with dollar sign', () => {
    expect(formatCurrency(1000, 'USD')).toContain('$');
  });

  it('formats EUR with euro sign', () => {
    expect(formatCurrency(500, 'EUR')).toContain('€');
  });

  it('defaults to XAF', () => {
    expect(formatCurrency(1000)).toContain('FCFA');
  });

  it('handles 0', () => {
    const result = formatCurrency(0, 'XAF');
    expect(result).toContain('FCFA');
  });
});

// ─── Invoice number generator ────────────────────────────────

function generateInvoiceNumber(year: number, sequence: number): string {
  return `FAC-${year}-${String(sequence).padStart(4, '0')}`;
}

describe('generateInvoiceNumber', () => {
  it('generates correct format', () => {
    expect(generateInvoiceNumber(2026, 1)).toBe('FAC-2026-0001');
  });

  it('pads sequence to 4 digits', () => {
    expect(generateInvoiceNumber(2026, 42)).toBe('FAC-2026-0042');
  });

  it('handles 4-digit sequences', () => {
    expect(generateInvoiceNumber(2026, 1000)).toBe('FAC-2026-1000');
  });
});

// ─── Slug generator ──────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

describe('slugify', () => {
  it('converts to lowercase', () => {
    expect(slugify('SINOTRUK')).toBe('sinotruk');
  });

  it('replaces spaces with hyphens', () => {
    expect(slugify('HOWO 8x4')).toBe('howo-8x4');
  });

  it('removes accents', () => {
    expect(slugify('Chargé')).toBe('charge');
  });

  it('handles multiple spaces', () => {
    expect(slugify('SANY  SD22')).toBe('sany-sd22');
  });

  it('removes special chars except hyphens', () => {
    expect(slugify('XCMG XS123!')).toBe('xcmg-xs123');
  });
});

// ─── Progress percentage calculator ──────────────────────────

function calcProgress(current: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}

describe('calcProgress', () => {
  it('returns 0 for target 0', () => {
    expect(calcProgress(100, 0)).toBe(0);
  });

  it('calculates percentage correctly', () => {
    expect(calcProgress(251, 300)).toBe(84);
  });

  it('caps at 100%', () => {
    expect(calcProgress(400, 300)).toBe(100);
  });

  it('returns 0 for 0 current', () => {
    expect(calcProgress(0, 300)).toBe(0);
  });
});

// ─── Date formatter ──────────────────────────────────────────

function formatDate(dateStr: string, locale: string = 'fr-FR'): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

describe('formatDate', () => {
  it('formats date in french locale', () => {
    const result = formatDate('2026-06-12', 'fr-FR');
    expect(result).toContain('12');
    expect(result).toContain('06');
    expect(result).toContain('2026');
  });

  it('formats date in english locale', () => {
    const result = formatDate('2026-06-12', 'en-US');
    expect(result).toContain('2026');
  });
});
