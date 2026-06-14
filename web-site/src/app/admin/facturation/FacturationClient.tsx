'use client';

import React, { useState } from 'react';
import { Plus, Eye, Settings } from 'lucide-react';
import InvoicePreview from '@/components/admin/InvoicePreview';

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  unit?: string | null;
}

interface Invoice {
  id: string;
  number: string;
  clientName: string;
  clientEmail?: string | null;
  currency: string;
  taxRate: number;
  discount: number;
  notes?: string | null;
  status: string;
  issuedAt: Date | string;
  dueAt?: Date | null;
  items: InvoiceItem[];
}

const STATUS_COLORS: Record<string, string> = {
  DRAFT: 'bg-muted/10 text-muted',
  SENT: 'bg-sky/10 text-sky',
  PAID: 'bg-green/10 text-green',
  CANCELLED: 'bg-red/10 text-red',
};

const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Brouillon',
  SENT: 'Envoyée',
  PAID: 'Payée',
  CANCELLED: 'Annulée',
};

export default function FacturationClient({ invoices }: { invoices: Invoice[] }) {
  const [preview, setPreview] = useState<Invoice | null>(null);
  const [config, setConfig] = useState({ showLogo: true, showVAT: true, showPaymentConditions: true });
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="flex items-center gap-2 px-4 py-2 border border-line rounded-xl text-sm font-head font-semibold text-muted hover:border-blue hover:text-blue transition-colors"
        >
          <Settings className="w-4 h-4" />
          Modèle
        </button>
        <a
          href="/admin/facturation/new"
          className="flex items-center gap-2 bg-blue text-white font-head font-semibold px-5 py-2 rounded-xl hover:bg-navy transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Nouvelle facture
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice list */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-line overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-soft">
                    <th className="text-left px-5 py-3 font-head font-semibold text-muted text-xs uppercase">N°</th>
                    <th className="text-left px-5 py-3 font-head font-semibold text-muted text-xs uppercase">Client</th>
                    <th className="text-left px-5 py-3 font-head font-semibold text-muted text-xs uppercase">Montant</th>
                    <th className="text-left px-5 py-3 font-head font-semibold text-muted text-xs uppercase">Statut</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {invoices.map(inv => {
                    const total = inv.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
                    return (
                      <tr key={inv.id} className="hover:bg-bg-soft/50 transition-colors">
                        <td className="px-5 py-3.5 font-mono text-ink font-semibold">{inv.number}</td>
                        <td className="px-5 py-3.5 text-ink">{inv.clientName}</td>
                        <td className="px-5 py-3.5 text-ink font-semibold">
                          {new Intl.NumberFormat('fr-FR').format(total)} {inv.currency}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs font-head font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[inv.status] || 'bg-bg-soft text-muted'}`}>
                            {STATUS_LABELS[inv.status] || inv.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <button
                            onClick={() => setPreview(inv)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line text-muted text-xs font-head font-semibold hover:border-blue hover:text-blue transition-colors"
                          >
                            <Eye className="w-3 h-3" /> Aperçu
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {invoices.length === 0 && (
                    <tr><td colSpan={5} className="px-5 py-12 text-center text-muted">Aucune facture</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-5">
          {/* Config */}
          {showConfig && (
            <div className="bg-white rounded-2xl border border-line p-5 space-y-4">
              <h3 className="font-head font-extrabold text-lg text-ink">Configuration du modèle</h3>
              {[
                { key: 'showLogo', label: 'Afficher le logo' },
                { key: 'showVAT', label: 'Afficher la TVA' },
                { key: 'showPaymentConditions', label: 'Conditions de paiement' },
              ].map(opt => (
                <label key={opt.key} className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setConfig(c => ({ ...c, [opt.key]: !c[opt.key as keyof typeof c] }))}
                    className={`w-10 h-5.5 rounded-full transition-colors relative ${config[opt.key as keyof typeof config] ? 'bg-blue' : 'bg-line'}`}
                    style={{ height: 22 }}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${config[opt.key as keyof typeof config] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-sm font-head font-semibold text-ink">{opt.label}</span>
                </label>
              ))}
            </div>
          )}

          {/* Preview */}
          {preview && (
            <div>
              <h3 className="font-head font-extrabold text-lg text-ink mb-3">Aperçu — {preview.number}</h3>
              <div className="scale-75 origin-top-left" style={{ width: '133%' }}>
                <InvoicePreview invoice={preview} config={config} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
