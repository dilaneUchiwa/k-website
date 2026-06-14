'use client';

import React, { useState } from 'react';
import { CheckCircle, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
}

interface Props {
  products: Product[];
  initialProduct?: string;
}

export default function DevisForm({ products, initialProduct }: Props) {
  const t = useTranslations('quote.form');

  const defaultProduct = products.find(p => p.slug === initialProduct)?.id || '';

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    productId: defaultProduct,
    productName: products.find(p => p.slug === initialProduct)?.name || '',
    quantity: 1,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'productId') {
      const found = products.find(p => p.id === value);
      setForm(prev => ({ ...prev, productId: value, productName: found?.name || '' }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
        }),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
    } catch {
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green" />
        </div>
        <h3 className="font-head font-extrabold text-xl text-ink mb-2">{t('success')}</h3>
        <p className="text-muted text-sm max-w-sm">Notre équipe étudiera votre demande et vous contactera rapidement.</p>
      </div>
    );
  }

  const inputCls = 'w-full px-4 py-3 border border-line rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue placeholder:text-muted/60';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-head font-semibold text-ink mb-1.5">{t('name')} *</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            className={inputCls}
            placeholder="Franklin Kuate"
          />
        </div>
        <div>
          <label className="block text-sm font-head font-semibold text-ink mb-1.5">{t('email')} *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputCls}
            placeholder="vous@exemple.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-head font-semibold text-ink mb-1.5">{t('phone')}</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={inputCls}
            placeholder="+237 6XX XXX XXX"
          />
        </div>
        <div>
          <label className="block text-sm font-head font-semibold text-ink mb-1.5">{t('country')}</label>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            className={inputCls}
            placeholder="Cameroun"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-head font-semibold text-ink mb-1.5">{t('product')}</label>
          <select
            name="productId"
            value={form.productId}
            onChange={handleChange}
            className={inputCls}
          >
            <option value="">-- Sélectionner un produit --</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.brand} — {p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-head font-semibold text-ink mb-1.5">{t('quantity')}</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            min={1}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-head font-semibold text-ink mb-1.5">{t('message')}</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          className={`${inputCls} resize-none`}
          placeholder="Précisez vos besoins, spécifications particulières..."
        />
      </div>

      {error && (
        <p className="text-red text-sm font-medium">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 bg-cta text-white font-head font-semibold px-8 py-3.5 rounded-xl hover:bg-cta-dark transition-all shadow-[0_6px_20px_rgba(224,90,0,.25)] hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none"
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
        {t('submit')}
      </button>
    </form>
  );
}
