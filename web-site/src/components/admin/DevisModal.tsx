'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Clock, RotateCcw } from 'lucide-react';

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

interface Props {
  quote: QuoteRequest;
  onClose: () => void;
  onStatusChange?: (id: string, status: string) => void;
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

export default function DevisModal({ quote, onClose, onStatusChange }: Props) {
  const [loading, setLoading] = useState(false);

  const changeStatus = async (status: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/quotes/${quote.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok && onStatusChange) {
        onStatusChange(quote.id, status);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-line">
          <div>
            <h2 className="font-head font-extrabold text-xl text-ink">Demande de devis</h2>
            <span className={`text-xs font-head font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[quote.status] || 'bg-bg-soft text-muted'}`}>
              {STATUS_LABELS[quote.status] || quote.status}
            </span>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-bg-soft">
            <X className="w-5 h-5 text-muted" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-head font-semibold text-muted uppercase">Client</label>
              <p className="font-semibold text-ink">{quote.fullName}</p>
            </div>
            <div>
              <label className="text-xs font-head font-semibold text-muted uppercase">Email</label>
              <p className="text-ink">{quote.email}</p>
            </div>
            <div>
              <label className="text-xs font-head font-semibold text-muted uppercase">Téléphone</label>
              <p className="text-ink">{quote.phone || '—'}</p>
            </div>
            <div>
              <label className="text-xs font-head font-semibold text-muted uppercase">Pays</label>
              <p className="text-ink">{quote.country || '—'}</p>
            </div>
            <div>
              <label className="text-xs font-head font-semibold text-muted uppercase">Produit</label>
              <p className="text-ink">{quote.productName}</p>
            </div>
            <div>
              <label className="text-xs font-head font-semibold text-muted uppercase">Quantité</label>
              <p className="text-ink">{quote.quantity}</p>
            </div>
          </div>
          {quote.message && (
            <div>
              <label className="text-xs font-head font-semibold text-muted uppercase">Message</label>
              <p className="text-sm text-muted bg-bg-soft rounded-xl p-3 mt-1">{quote.message}</p>
            </div>
          )}
          <div>
            <label className="text-xs font-head font-semibold text-muted uppercase">Date</label>
            <p className="text-ink">{new Date(quote.createdAt).toLocaleDateString('fr-FR', { dateStyle: 'long' })}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 px-6 pb-6">
          {quote.status !== 'PROCESSING' && (
            <button
              onClick={() => changeStatus('PROCESSING')}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber/10 text-amber font-head font-semibold text-sm hover:bg-amber/20 transition-colors disabled:opacity-60"
            >
              <Clock className="w-4 h-4" />
              En traitement
            </button>
          )}
          {quote.status !== 'PROCESSED' && (
            <button
              onClick={() => changeStatus('PROCESSED')}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green/10 text-green font-head font-semibold text-sm hover:bg-green/20 transition-colors disabled:opacity-60"
            >
              <CheckCircle className="w-4 h-4" />
              Marquer traité
            </button>
          )}
          {quote.status !== 'NEW' && (
            <button
              onClick={() => changeStatus('NEW')}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-soft text-muted font-head font-semibold text-sm hover:bg-line transition-colors disabled:opacity-60"
            >
              <RotateCcw className="w-4 h-4" />
              Remettre en nouveau
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
