import React from 'react';
import Link from 'next/link';
import { Package, FileText, MessageSquare, TrendingUp, ArrowRight, Plus } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import StatCard from '@/components/admin/StatCard';

export default async function AdminDashboard() {
  const [productCount, quoteCount, messageCount, recentQuotes] = await Promise.all([
    prisma.product.count({ where: { status: 'ACTIVE' } }),
    prisma.quoteRequest.count({ where: { status: 'NEW' } }),
    prisma.contactMessage.count({ where: { status: 'NEW' } }),
    prisma.quoteRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { product: { select: { name: true } } },
    }),
  ]);

  const monthlyRevenue = await prisma.transaction.aggregate({
    where: {
      type: 'INCOME',
      date: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
    _sum: { amount: true },
  });

  const revenue = monthlyRevenue._sum.amount || 0;

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

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          label="Produits actifs"
          value={productCount}
          icon={<Package className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          label="Devis en attente"
          value={quoteCount}
          icon={<FileText className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          label="Messages non lus"
          value={messageCount}
          icon={<MessageSquare className="w-5 h-5" />}
          color="red"
        />
        <StatCard
          label="Revenu ce mois"
          value={`${new Intl.NumberFormat('fr-FR').format(revenue)} XAF`}
          icon={<TrendingUp className="w-5 h-5" />}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent quotes */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-line">
          <div className="flex items-center justify-between px-6 py-4 border-b border-line">
            <h2 className="font-head font-extrabold text-lg text-ink">Derniers devis</h2>
            <Link href="/admin/devis" className="text-sm font-head font-semibold text-blue hover:text-navy flex items-center gap-1">
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-bg-soft">
                  <th className="text-left px-5 py-3 font-head font-semibold text-muted text-xs uppercase">Client</th>
                  <th className="text-left px-5 py-3 font-head font-semibold text-muted text-xs uppercase">Produit</th>
                  <th className="text-left px-5 py-3 font-head font-semibold text-muted text-xs uppercase">Qté</th>
                  <th className="text-left px-5 py-3 font-head font-semibold text-muted text-xs uppercase">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recentQuotes.map(q => (
                  <tr key={q.id} className="hover:bg-bg-soft/50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-ink">{q.fullName}</td>
                    <td className="px-5 py-3.5 text-muted">{q.productName}</td>
                    <td className="px-5 py-3.5 text-muted">{q.quantity}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-head font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[q.status] || 'bg-bg-soft text-muted'}`}>
                        {STATUS_LABELS[q.status] || q.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentQuotes.length === 0 && (
                  <tr><td colSpan={4} className="px-5 py-8 text-center text-muted">Aucun devis pour le moment</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-5">
          {/* Monthly goal */}
          <div className="bg-white rounded-2xl border border-line p-6">
            <h2 className="font-head font-extrabold text-lg text-ink mb-4">Objectif mensuel</h2>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted">Progression</span>
                <span className="font-head font-semibold text-blue">65%</span>
              </div>
              <div className="h-2.5 bg-line rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-blue rounded-full" />
              </div>
            </div>
            <p className="text-xs text-muted">Objectif : 50 000 000 XAF</p>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-line p-6">
            <h2 className="font-head font-extrabold text-lg text-ink mb-4">Actions rapides</h2>
            <div className="space-y-2">
              <Link href="/admin/catalogue/new" className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl bg-blue/5 text-blue font-head font-semibold text-sm hover:bg-blue/10 transition-colors">
                <Plus className="w-4 h-4" /> Ajouter un produit
              </Link>
              <Link href="/admin/devis" className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl bg-bg-soft text-muted font-head font-semibold text-sm hover:bg-line transition-colors">
                <FileText className="w-4 h-4" /> Voir les devis
              </Link>
              <Link href="/admin/messages" className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl bg-bg-soft text-muted font-head font-semibold text-sm hover:bg-line transition-colors">
                <MessageSquare className="w-4 h-4" /> Voir les messages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
