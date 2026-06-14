'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Upload, CheckCircle } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Spec { key: string; value: string }

interface ProductImage { id?: string; url: string; alt?: string | null }

interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  description: string;
  categoryId: string;
  featured: boolean;
  status: string;
  specs: Spec[];
  images: ProductImage[];
}

export default function ProductForm({ categories, product }: { categories: Category[]; product?: Product }) {
  const router = useRouter();
  const isEdit = !!product;

  const [form, setForm] = useState({
    name: product?.name || '',
    brand: product?.brand || '',
    model: product?.model || '',
    description: product?.description || '',
    categoryId: product?.categoryId || (categories[0]?.id || ''),
  });
  const [status, setStatus] = useState(product?.status || 'ACTIVE');
  const [featured, setFeatured] = useState(product?.featured || false);
  const [specs, setSpecs] = useState<Spec[]>(
    product?.specs?.length ? product.specs : [{ key: '', value: '' }]
  );
  const [images, setImages] = useState<string[]>(product?.images?.map(i => i.url) || []);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const addSpec = () => setSpecs(s => [...s, { key: '', value: '' }]);
  const removeSpec = (i: number) => setSpecs(s => s.filter((_, idx) => idx !== i));
  const updateSpec = (i: number, field: 'key' | 'value', val: string) =>
    setSpecs(s => s.map((sp, idx) => idx === i ? { ...sp, [field]: val } : sp));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => setImages(prev => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...form,
        status,
        featured,
        specs: specs.filter(s => s.key && s.value),
        images: images.map((url, i) => ({ url, order: i })),
      };
      const url = isEdit ? `/api/admin/products/${product!.id}` : '/api/admin/products';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
      setTimeout(() => router.push('/admin/catalogue'), 1500);
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = 'w-full px-4 py-3 border border-line rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue placeholder:text-muted/60';

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-line">
        <CheckCircle className="w-12 h-12 text-green mb-4" />
        <p className="font-head font-extrabold text-xl text-ink">Produit {isEdit ? 'mis à jour' : 'créé'} !</p>
        <p className="text-muted text-sm mt-2">Redirection en cours...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-line p-6 space-y-5">
            <h2 className="font-head font-extrabold text-xl text-ink">{isEdit ? 'Modifier le produit' : 'Nouveau produit'}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-head font-semibold text-ink mb-1.5">Nom *</label>
                <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-head font-semibold text-ink mb-1.5">Marque *</label>
                <input type="text" value={form.brand} onChange={e => setForm(p => ({ ...p, brand: e.target.value }))} required className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-head font-semibold text-ink mb-1.5">Modèle *</label>
                <input type="text" value={form.model} onChange={e => setForm(p => ({ ...p, model: e.target.value }))} required className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-head font-semibold text-ink mb-1.5">Catégorie *</label>
                <select value={form.categoryId} onChange={e => setForm(p => ({ ...p, categoryId: e.target.value }))} required className={inputCls}>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-head font-semibold text-ink mb-1.5">Description</label>
              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={4} className={`${inputCls} resize-none`} />
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white rounded-2xl border border-line p-6 space-y-4">
            <h2 className="font-head font-extrabold text-lg text-ink">Photos</h2>

            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-line rounded-xl cursor-pointer hover:border-blue hover:bg-blue/3 transition-all">
              <Upload className="w-8 h-8 text-muted mb-2" />
              <span className="text-sm text-muted font-head font-semibold">Cliquez ou glissez des images</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
            </label>

            {images.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {images.map((src, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-line group">
                    <img src={src} alt="" className="w-full h-full object-contain p-1" />
                    <button
                      type="button"
                      onClick={() => setImages(imgs => imgs.filter((_, idx) => idx !== i))}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Specs */}
          <div className="bg-white rounded-2xl border border-line p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-head font-extrabold text-lg text-ink">Caractéristiques techniques</h2>
              <button type="button" onClick={addSpec} className="flex items-center gap-1.5 text-sm font-head font-semibold text-blue hover:text-navy">
                <Plus className="w-4 h-4" /> Ajouter
              </button>
            </div>
            <div className="space-y-3">
              {specs.map((spec, i) => (
                <div key={i} className="flex gap-3">
                  <input type="text" value={spec.key} onChange={e => updateSpec(i, 'key', e.target.value)} placeholder="Clé (ex: Poids)" className={`${inputCls} flex-1`} />
                  <input type="text" value={spec.value} onChange={e => updateSpec(i, 'value', e.target.value)} placeholder="Valeur (ex: 28 000 kg)" className={`${inputCls} flex-1`} />
                  <button type="button" onClick={() => removeSpec(i)} className="text-muted hover:text-red transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-line p-6 space-y-5">
            <h2 className="font-head font-extrabold text-lg text-ink">Publication</h2>

            <div>
              <label className="block text-sm font-head font-semibold text-ink mb-2">Statut</label>
              <div className="space-y-2">
                {[{ v: 'ACTIVE', l: 'Actif' }, { v: 'ARCHIVED', l: 'Archivé' }].map(opt => (
                  <label key={opt.v} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value={opt.v} checked={status === opt.v} onChange={() => setStatus(opt.v)} className="accent-blue" />
                    <span className="text-sm text-ink">{opt.l}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setFeatured(f => !f)}
                className={`w-11 h-6 rounded-full transition-colors relative ${featured ? 'bg-blue' : 'bg-line'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${featured ? 'translate-x-6' : 'translate-x-1'}`} />
              </div>
              <span className="text-sm font-head font-semibold text-ink">Produit en vedette</span>
            </label>
          </div>

          {/* Preview card */}
          {form.name && (
            <div className="bg-white rounded-2xl border border-line p-4">
              <p className="text-xs font-head font-semibold text-muted uppercase mb-3">Aperçu</p>
              <div className="rounded-xl border border-line overflow-hidden">
                <div className="h-28 bg-bg-soft flex items-center justify-center">
                  {images[0] ? (
                    <img src={images[0]} className="h-full w-full object-contain p-2" alt="" />
                  ) : (
                    <div className="text-muted/20">
                      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs text-sky font-head font-semibold mb-0.5">{form.brand}</p>
                  <p className="font-head font-bold text-sm text-ink line-clamp-1">{form.name}</p>
                </div>
              </div>
            </div>
          )}

          {error && <p className="text-red text-sm font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue text-white font-head font-semibold py-3.5 rounded-xl hover:bg-navy transition-colors disabled:opacity-60"
          >
            {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {isEdit ? 'Mettre à jour' : 'Créer le produit'}
          </button>
        </div>
      </div>
    </form>
  );
}
