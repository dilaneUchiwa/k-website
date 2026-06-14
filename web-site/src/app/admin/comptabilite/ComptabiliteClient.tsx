'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Plus, X } from 'lucide-react';

type Tx = { id: string; date: string; type: string; category: string; description: string; amount: number; currency: string };
type Goal = { id: string; title: string; targetAmount: number; currency: string };
type MonthData = { label: string; income: number; expense: number };

function fmt(n: number, currency = 'XAF') {
  if (currency === 'XAF') return n.toLocaleString('fr-FR') + ' FCFA';
  return n.toLocaleString('en-US') + ' ' + currency;
}

function pct(current: number, target: number) {
  if (!target) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}

export default function ComptabiliteClient({
  totalIncome, totalExpense, netProfit, totalCredit, monthlyData, recentTxs, goals,
}: {
  totalIncome: number; totalExpense: number; netProfit: number; totalCredit: number;
  monthlyData: MonthData[]; recentTxs: Tx[]; goals: Goal[];
}) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ type: 'INCOME', category: '', amount: '', currency: 'XAF', description: '', date: '' });
  const [saving, setSaving] = useState(false);

  const maxVal = Math.max(...monthlyData.flatMap(m => [m.income, m.expense]), 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/admin/accounting/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: Number(form.amount) }),
      });
      setShowModal(false);
      window.location.reload();
    } finally {
      setSaving(false);
    }
  };

  const stats = [
    { label: 'Revenus YTD', value: fmt(totalIncome), icon: TrendingUp, color: 'text-green', bg: 'bg-green/10' },
    { label: 'Dépenses YTD', value: fmt(totalExpense), icon: TrendingDown, color: 'text-red', bg: 'bg-red/10' },
    { label: 'Bénéfice net', value: fmt(netProfit), icon: DollarSign, color: netProfit >= 0 ? 'text-blue' : 'text-red', bg: 'bg-blue/10' },
    { label: 'Crédits actifs', value: fmt(totalCredit), icon: CreditCard, color: 'text-amber', bg: 'bg-amber/10' },
  ];

  const inputCls = 'w-full px-3 py-2 border border-line rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/30';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-head font-extrabold text-2xl text-ink">Comptabilité</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue text-white font-head font-semibold px-4 py-2 rounded-xl hover:bg-navy transition-all text-sm">
          <Plus className="w-4 h-4" /> Nouvelle écriture
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-2xl border border-line p-5">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="font-head font-extrabold text-xl text-ink">{s.value}</div>
              <div className="text-muted text-sm mt-1">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-line p-6">
        <h2 className="font-head font-bold text-lg text-ink mb-6">Revenus & dépenses (6 mois)</h2>
        <div className="flex items-end gap-4 h-48">
          {monthlyData.map(m => (
            <div key={m.label} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-1 items-end" style={{ height: '160px' }}>
                <div
                  className="flex-1 bg-blue rounded-t-md"
                  style={{ height: `${(m.income / maxVal) * 100}%`, minHeight: m.income > 0 ? '4px' : '0' }}
                  title={`Revenus: ${fmt(m.income)}`}
                />
                <div
                  className="flex-1 bg-red/60 rounded-t-md"
                  style={{ height: `${(m.expense / maxVal) * 100}%`, minHeight: m.expense > 0 ? '4px' : '0' }}
                  title={`Dépenses: ${fmt(m.expense)}`}
                />
              </div>
              <span className="text-xs text-muted font-head">{m.label}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-1.5 text-xs text-muted"><div className="w-3 h-3 rounded-sm bg-blue" /> Revenus</div>
          <div className="flex items-center gap-1.5 text-xs text-muted"><div className="w-3 h-3 rounded-sm bg-red/60" /> Dépenses</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-line overflow-hidden">
          <div className="p-5 border-b border-line">
            <h2 className="font-head font-bold text-lg text-ink">Dernières écritures</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-bg-soft text-muted text-xs font-head font-semibold">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Catégorie</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-right">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recentTxs.length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-6 text-center text-muted">Aucune écriture</td></tr>
                )}
                {recentTxs.map(tx => (
                  <tr key={tx.id} className="hover:bg-bg-soft transition-colors">
                    <td className="px-4 py-3 text-muted">{new Date(tx.date).toLocaleDateString('fr-FR')}</td>
                    <td className="px-4 py-3 font-head font-semibold text-ink">{tx.category}</td>
                    <td className="px-4 py-3 text-muted truncate max-w-[150px]">{tx.description}</td>
                    <td className={`px-4 py-3 text-right font-head font-bold ${tx.type === 'INCOME' ? 'text-green' : 'text-red'}`}>
                      {tx.type === 'INCOME' ? '+' : '-'}{fmt(tx.amount, tx.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white rounded-2xl border border-line p-5">
          <h2 className="font-head font-bold text-lg text-ink mb-5">Objectifs</h2>
          <div className="space-y-5">
            {goals.length === 0 && <p className="text-muted text-sm">Aucun objectif défini</p>}
            {goals.map(g => (
              <div key={g.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-head font-semibold text-ink">{g.title}</span>
                  <span className="text-sm text-muted">{fmt(g.targetAmount, g.currency)}</span>
                </div>
                <div className="w-full bg-line rounded-full h-2 mb-1">
                  <div className="bg-blue h-2 rounded-full" style={{ width: '0%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-head font-extrabold text-xl text-ink">Nouvelle écriture</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-muted" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-head font-semibold text-ink mb-1">Type *</label>
                  <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className={inputCls}>
                    <option value="INCOME">Revenu</option>
                    <option value="EXPENSE">Dépense</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-head font-semibold text-ink mb-1">Devise *</label>
                  <select value={form.currency} onChange={e => setForm(p => ({ ...p, currency: e.target.value }))} className={inputCls}>
                    <option value="XAF">XAF (FCFA)</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="CNY">CNY</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-head font-semibold text-ink mb-1">Catégorie *</label>
                <input required value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className={inputCls} placeholder="Vente engin, Fret, Salaire..." />
              </div>
              <div>
                <label className="block text-sm font-head font-semibold text-ink mb-1">Montant *</label>
                <input required type="number" min="0" step="0.01" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} className={inputCls} placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-head font-semibold text-ink mb-1">Description</label>
                <input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className={inputCls} placeholder="Description..." />
              </div>
              <div>
                <label className="block text-sm font-head font-semibold text-ink mb-1">Date *</label>
                <input required type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className={inputCls} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-line text-muted font-head font-semibold py-2.5 rounded-xl hover:bg-bg-soft transition-all text-sm">Annuler</button>
                <button type="submit" disabled={saving} className="flex-1 bg-blue text-white font-head font-semibold py-2.5 rounded-xl hover:bg-navy transition-all text-sm disabled:opacity-60">
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
