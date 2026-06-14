'use client';

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
      setForm({ fullName: '', email: '', phone: '', subject: '', message: '' });
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
        <p className="text-muted">Nous vous répondrons dans les 48 heures.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm font-head font-semibold text-blue hover:text-navy"
        >
          Envoyer un autre message
        </button>
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
          <label className="block text-sm font-head font-semibold text-ink mb-1.5">{t('subject')} *</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className={inputCls}
            placeholder="Demande d'information"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-head font-semibold text-ink mb-1.5">{t('message')} *</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className={`${inputCls} resize-none`}
          placeholder="Bonjour, je souhaite..."
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
        {t('send')}
      </button>
    </form>
  );
}
