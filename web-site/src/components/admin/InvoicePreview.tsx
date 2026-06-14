import React from 'react';

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  unit?: string | null;
}

interface Invoice {
  number: string;
  clientName: string;
  clientEmail?: string | null;
  clientPhone?: string | null;
  clientAddr?: string | null;
  currency: string;
  taxRate: number;
  discount: number;
  notes?: string | null;
  status: string;
  issuedAt: Date | string;
  dueAt?: Date | null;
  items: InvoiceItem[];
}

interface Config {
  showLogo?: boolean;
  showVAT?: boolean;
  showPaymentConditions?: boolean;
}

export default function InvoicePreview({ invoice, config = {} }: { invoice: Partial<Invoice>; config?: Config }) {
  const items = invoice.items || [];
  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const discountAmount = subtotal * ((invoice.discount || 0) / 100);
  const taxAmount = (subtotal - discountAmount) * ((invoice.taxRate || 0) / 100);
  const total = subtotal - discountAmount + taxAmount;
  const currency = invoice.currency || 'XAF';

  const fmt = (n: number) =>
    new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 0 }).format(n);

  return (
    <div className="bg-white rounded-2xl border border-line p-8 font-body text-sm text-ink" style={{ minHeight: 400 }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          {config.showLogo !== false && (
            <div className="font-head font-extrabold text-xl text-navy mb-1">TOCHE & FILS</div>
          )}
          <div className="text-xs text-muted">International Trade Co., LTD</div>
          <div className="text-xs text-muted">Guangzhou, Chine</div>
        </div>
        <div className="text-right">
          <div className="font-head font-extrabold text-2xl text-blue mb-1">FACTURE</div>
          <div className="text-sm font-semibold">{invoice.number || 'F-XXXX'}</div>
          <div className="text-xs text-muted mt-1">
            Émise le : {invoice.issuedAt ? new Date(invoice.issuedAt).toLocaleDateString('fr-FR') : '—'}
          </div>
          {invoice.dueAt && (
            <div className="text-xs text-muted">
              Échéance : {new Date(invoice.dueAt).toLocaleDateString('fr-FR')}
            </div>
          )}
        </div>
      </div>

      {/* Client */}
      <div className="bg-bg-soft rounded-xl p-4 mb-6">
        <div className="text-xs font-head font-bold text-muted uppercase mb-2">Facturé à</div>
        <div className="font-head font-bold text-ink">{invoice.clientName || 'Client'}</div>
        {invoice.clientEmail && <div className="text-xs text-muted">{invoice.clientEmail}</div>}
        {invoice.clientPhone && <div className="text-xs text-muted">{invoice.clientPhone}</div>}
        {invoice.clientAddr && <div className="text-xs text-muted">{invoice.clientAddr}</div>}
      </div>

      {/* Items */}
      <table className="w-full text-xs mb-4">
        <thead>
          <tr className="border-b border-line">
            <th className="text-left pb-2 font-head font-semibold text-muted">Description</th>
            <th className="text-right pb-2 font-head font-semibold text-muted">Qté</th>
            <th className="text-right pb-2 font-head font-semibold text-muted">P.U.</th>
            <th className="text-right pb-2 font-head font-semibold text-muted">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="border-b border-line/50">
              <td className="py-2">{item.description}</td>
              <td className="py-2 text-right">{item.quantity} {item.unit || ''}</td>
              <td className="py-2 text-right">{fmt(item.unitPrice)} {currency}</td>
              <td className="py-2 text-right font-semibold">{fmt(item.quantity * item.unitPrice)} {currency}</td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={4} className="py-4 text-center text-muted">Aucun article</td></tr>
          )}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-56 space-y-1 text-xs">
          <div className="flex justify-between"><span className="text-muted">Sous-total</span><span>{fmt(subtotal)} {currency}</span></div>
          {(invoice.discount || 0) > 0 && (
            <div className="flex justify-between text-red"><span>Remise ({invoice.discount}%)</span><span>-{fmt(discountAmount)} {currency}</span></div>
          )}
          {config.showVAT && (invoice.taxRate || 0) > 0 && (
            <div className="flex justify-between"><span className="text-muted">TVA ({invoice.taxRate}%)</span><span>{fmt(taxAmount)} {currency}</span></div>
          )}
          <div className="flex justify-between font-head font-extrabold text-sm border-t border-line pt-2">
            <span>Total</span><span className="text-blue">{fmt(total)} {currency}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {config.showPaymentConditions && invoice.notes && (
        <div className="mt-6 p-4 bg-bg-soft rounded-xl text-xs text-muted">
          <div className="font-head font-semibold text-ink mb-1">Conditions de paiement</div>
          {invoice.notes}
        </div>
      )}
    </div>
  );
}
