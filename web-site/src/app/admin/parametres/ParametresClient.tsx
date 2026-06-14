'use client';

import React, { useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';

export default function ParametresClient({ settings }: { settings: Record<string, string> }) {
  const [form, setForm] = useState({
    phone_cm: settings.phone_cm ?? '+237 694 945 547',
    phone_cn: settings.phone_cn ?? '+86 183 3371 8710',
    email: settings.email ?? 'contact@tochefils.com',
    whatsapp: settings.whatsapp ?? '+237 694 945 547',
    address_cn: settings.address_cn ?? 'N° 411, Zone A, 4e étage, Guangzhou, Chine',
    address_cm: settings.address_cm ?? 'Yaoundé, Cameroun',
    slogan: settings.slogan ?? "L'Afrique équipée, la Chine livrée.",
    facebook: settings.facebook ?? '',
    linkedin: settings.linkedin ?? '',
    twitter: settings.twitter ?? '',
    youtube: settings.youtube ?? '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const inputCls = 'w-full px-4 py-2.5 border border-line rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="font-head font-extrabold text-2xl text-ink">Paramètres du site</h1>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-blue text-white font-head font-semibold px-5 py-2.5 rounded-xl hover:bg-navy transition-all text-sm disabled:opacity-60"
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Enregistré !' : saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl border border-line p-6 space-y-5">
        <h2 className="font-head font-extrabold text-lg text-ink">Informations de contact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-head font-semibold text-ink mb-1.5">Téléphone Cameroun</label>
            <input value={form.phone_cm} onChange={e => setForm(p => ({ ...p, phone_cm: e.target.value }))} className={inputCls} placeholder="+237 6XX XXX XXX" />
          </div>
          <div>
            <label className="block text-sm font-head font-semibold text-ink mb-1.5">Téléphone Chine</label>
            <input value={form.phone_cn} onChange={e => setForm(p => ({ ...p, phone_cn: e.target.value }))} className={inputCls} placeholder="+86 XXX XXXX XXXX" />
          </div>
          <div>
            <label className="block text-sm font-head font-semibold text-ink mb-1.5">Email</label>
            <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className={inputCls} placeholder="contact@..." />
          </div>
          <div>
            <label className="block text-sm font-head font-semibold text-ink mb-1.5">WhatsApp</label>
            <input value={form.whatsapp} onChange={e => setForm(p => ({ ...p, whatsapp: e.target.value }))} className={inputCls} placeholder="+237 6XX XXX XXX" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-head font-semibold text-ink mb-1.5">Adresse Chine</label>
          <input value={form.address_cn} onChange={e => setForm(p => ({ ...p, address_cn: e.target.value }))} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-head font-semibold text-ink mb-1.5">Adresse Cameroun</label>
          <input value={form.address_cm} onChange={e => setForm(p => ({ ...p, address_cm: e.target.value }))} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-head font-semibold text-ink mb-1.5">Slogan</label>
          <input value={form.slogan} onChange={e => setForm(p => ({ ...p, slogan: e.target.value }))} className={inputCls} />
        </div>
      </div>

      {/* Social */}
      <div className="bg-white rounded-2xl border border-line p-6 space-y-5">
        <h2 className="font-head font-extrabold text-lg text-ink">Réseaux sociaux</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/...' },
            { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/...' },
            { key: 'twitter', label: 'Twitter / X', placeholder: 'https://twitter.com/...' },
            { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/...' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-head font-semibold text-ink mb-1.5">{label}</label>
              <input
                value={(form as any)[key]}
                onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                className={inputCls}
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
