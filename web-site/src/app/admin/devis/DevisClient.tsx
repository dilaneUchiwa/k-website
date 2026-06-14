'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, Download } from 'lucide-react';
import DevisModal from '@/components/admin/DevisModal';

interface QuoteRequest {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  country?: string | null;
  productName: string;
  quantity: number;
  message?: string | null;
  status: string;
  createdAt: Date | string;
}

const STATUS_LABELS: Record<string, string> = {
  NEW: 'Nouveau',
  PROCESSING: 'En traitement',
  PROCESSED: 'Traité',
};

const STATUS_COLORS: Record<string, string> = {
  NEW: 'bg-sky/10 text-sky',
  PROCESSING: 'bg-amber/10 text-amber',
  PROCESSED: 'bg-green/10 text-green',
};

const FILTERS = [
  { key: 'all', label: 'Tous' },
  { key: 'new', label: 'Nouveaux' },
  { key: 'processing', label: 'En traitement' },
  { key: 'processed', label: 'Traités' },
];

export default function DevisClient({ quotes: initial, filter }: { quotes: QuoteRequest[]; filter: string }) {
  const [quotes, setQuotes] = useState(initial);
  const [selected, setSelected] = useState<QuoteRequest | null>(null);

  const handleStatusChange = (id: string, status: string) => {
    setQuotes(q => q.map(item => item.id === id ? { ...item, status } : item));
    if (selected?.id === id) setSelected(s => s ? { ...s, status } : null);
  };

  const exportCSV = () => {
    const headers = ['Date', 'Client', 'Email', 'Téléphone', 'Pays', 'Produit', 'Quantité', 'Statut'];
    const rows = quotes.map(q => [
      new Date(q.createdAt).toLocaleDateString('fr-FR'),
      q.fullName,
      q.email,
      q.phone || '',
      q.country || '',
      q.productName,
      q.quantity,
      STATUS_LABELS[q.status] || q.status,
    ]);
    const csv = [headers, ...rows].map(r => r.join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'devis.csv';
    a.click();
  };

  return (
    <>
      <div className="space-y-5">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map(f => (
              <Link
                key={f.key}
                href={`/admin/devis?filter=${f.key}`}
                className={`px-4 py-2 rounded-xl font-head font-semibold text-sm transition-colors ${
                  filter === f.key ? 'bg-blue text-white' : 'bg-white border border-line text-muted hover:border-blue hover:text-blue'
                }`}
              >
                {f.label}
              </Link>
            ))}
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 border border-line rounded-xl text-sm font-head font-semibold text-muted hover:border-blue hover:text-blue transition-colors"
          >
            <Download className="w-4 h-4" />
            Exporter CSV
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-line overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-bg-soft">
                  <th className="text-left px-5 py-3 font-head font-semibold text-muted text-xs uppercase">Date</th>
                  <th className="text-left px-5 py-3 font-head font-semibold text-muted text-xs uppercase">Client</th>
                  <th className="text-left px-5 py-3 font-head font-semibold text-muted text-xs uppercase">Produit</th>
                  <th className="text-left px-5 py-3 font-head font-semibold text-muted text-xs uppercase">Qté</th>
                  <th className="text-left px-5 py-3 font-head font-semibold text-muted text-xs uppercase">Pays</th>
                  <th className="text-left px-5 py-3 font-head font-semibold text-muted text-xs uppercase">Statut</th>
                  <th className="text-left px-5 py-3 font-head font-semibold text-muted text-xs uppercase"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {quotes.map(q => (
                  <tr key={q.id} className="hover:bg-bg-soft/50 transition-colors">
                    <td className="px-5 py-3.5 text-muted text-xs">{new Date(q.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td className="px-5 py-3.5 font-medium text-ink">{q.fullName}</td>
                    <td className="px-5 py-3.5 text-muted">{q.productName}</td>
                    <td className="px-5 py-3.5 text-muted">{q.quantity}</td>
                    <td className="px-5 py-3.5 text-muted">{q.country || '—'}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-head font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[q.status] || 'bg-bg-soft text-muted'}`}>
                        {STATUS_LABELS[q.status] || q.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => setSelected(q)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line text-muted text-xs font-head font-semibold hover:border-blue hover:text-blue transition-colors"
                      >
                        <Eye className="w-3 h-3" /> Voir
                      </button>
                    </td>
                  </tr>
                ))}
                {quotes.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-12 text-center text-muted">Aucun devis</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected && (
        <DevisModal quote={selected} onClose={() => setSelected(null)} onStatusChange={handleStatusChange} />
      )}
    </>
  );
}
