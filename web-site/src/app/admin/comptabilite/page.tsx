import React from 'react';
import { prisma } from '@/lib/prisma';
import ComptabiliteClient from './ComptabiliteClient';

export default async function ComptabilitePage() {
  const now = new Date();
  const startH1 = new Date(now.getFullYear(), 0, 1);

  const [incomeAgg, expenseAgg, creditAgg, recentTxs, goals] = await Promise.all([
    prisma.transaction.aggregate({
      where: { type: 'INCOME', date: { gte: startH1 } },
      _sum: { amount: true },
    }),
    prisma.transaction.aggregate({
      where: { type: 'EXPENSE', date: { gte: startH1 } },
      _sum: { amount: true },
    }),
    prisma.credit.aggregate({
      where: { status: 'PENDING' },
      _sum: { amount: true },
    }),
    prisma.transaction.findMany({
      orderBy: { date: 'desc' },
      take: 10,
    }),
    prisma.goal.findMany({ take: 3 }),
  ]);

  const totalIncome = incomeAgg._sum.amount ?? 0;
  const totalExpense = expenseAgg._sum.amount ?? 0;
  const totalCredit = creditAgg._sum.amount ?? 0;
  const netProfit = totalIncome - totalExpense;

  const monthlyData = await Promise.all(
    Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const start = new Date(d.getFullYear(), d.getMonth(), 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      const label = d.toLocaleDateString('fr-FR', { month: 'short' });
      return Promise.all([
        prisma.transaction.aggregate({ where: { type: 'INCOME', date: { gte: start, lte: end } }, _sum: { amount: true } }),
        prisma.transaction.aggregate({ where: { type: 'EXPENSE', date: { gte: start, lte: end } }, _sum: { amount: true } }),
      ]).then(([inc, exp]) => ({
        label,
        income: inc._sum.amount ?? 0,
        expense: exp._sum.amount ?? 0,
      }));
    })
  );

  return (
    <ComptabiliteClient
      totalIncome={totalIncome}
      totalExpense={totalExpense}
      netProfit={netProfit}
      totalCredit={totalCredit}
      monthlyData={monthlyData}
      recentTxs={recentTxs.map(t => ({
        id: t.id,
        date: t.date.toISOString(),
        type: t.type,
        category: t.category,
        description: t.description,
        amount: t.amount,
        currency: t.currency,
      }))}
      goals={goals.map(g => ({
        id: g.id,
        title: g.title,
        targetAmount: g.targetAmount,
        currency: g.currency,
      }))}
    />
  );
}
