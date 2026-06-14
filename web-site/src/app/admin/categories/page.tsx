'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Check, Package } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  order: number;
  _count: { products: number };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const res = await fetch('/api/admin/categories');
    if (res.ok) {
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addCategory = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName }),
    });
    if (res.ok) {
      setNewName('');
      setShowAdd(false);
      load();
    }
    setSaving(false);
  };

  const updateCategory = async (id: string) => {
    if (!editName.trim()) return;
    setSaving(true);
    await fetch(`/api/admin/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName }),
    });
    setEditId(null);
    load();
    setSaving(false);
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Supprimer cette catégorie ?')) return;
    await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    load();
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><span className="w-8 h-8 border-2 border-blue/30 border-t-blue rounded-full animate-spin" /></div>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-muted text-sm">{categories.length} catégories au total</p>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-blue text-white font-head font-semibold px-5 py-2 rounded-xl hover:bg-navy transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Nouvelle catégorie
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="bg-white border border-blue/20 rounded-2xl p-5 flex gap-3 items-center">
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Nom de la catégorie..."
            className="flex-1 px-4 py-2.5 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue"
            autoFocus
            onKeyDown={e => e.key === 'Enter' && addCategory()}
          />
          <button onClick={addCategory} disabled={saving} className="p-2.5 rounded-xl bg-green/10 text-green hover:bg-green/20 transition-colors">
            <Check className="w-4 h-4" />
          </button>
          <button onClick={() => setShowAdd(false)} className="p-2.5 rounded-xl hover:bg-bg-soft text-muted">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white rounded-2xl border border-line p-5 hover:shadow-sm transition-all">
            {editId === cat.id ? (
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="flex-1 px-3 py-2 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30"
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && updateCategory(cat.id)}
                />
                <button onClick={() => updateCategory(cat.id)} className="p-2 rounded-lg bg-green/10 text-green">
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setEditId(null)} className="p-2 rounded-lg text-muted hover:bg-bg-soft">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <h3 className="font-head font-extrabold text-lg text-ink mb-1">{cat.name}</h3>
            )}

            <div className="flex items-center gap-2 text-sm text-muted mb-4">
              <Package className="w-3.5 h-3.5" />
              <span>{cat._count?.products ?? 0} produit{(cat._count?.products ?? 0) > 1 ? 's' : ''}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => { setEditId(cat.id); setEditName(cat.name); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line text-muted text-xs font-head font-semibold hover:border-blue hover:text-blue transition-colors"
              >
                <Pencil className="w-3 h-3" /> Modifier
              </button>
              <button
                onClick={() => deleteCategory(cat.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line text-muted text-xs font-head font-semibold hover:border-red hover:text-red transition-colors"
              >
                <Trash2 className="w-3 h-3" /> Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
