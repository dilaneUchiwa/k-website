import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());
  const month = searchParams.get('month');

  const startDate = month
    ? new Date(year, parseInt(month) - 1, 1)
    : new Date(year, 0, 1);
  const endDate = month
    ? new Date(year, parseInt(month), 0, 23, 59, 59)
    : new Date(year, 11, 31, 23, 59, 59);

  const transactions = await prisma.transaction.findMany({
    where: { date: { gte: startDate, lte: endDate } },
    orderBy: { date: 'asc' },
  });

  const income = transactions.filter(t => t.type === 'INCOME').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'EXPENSE').reduce((s, t) => s + t.amount, 0);

  // Group by month
  const monthly: Record<string, { income: number; expense: number }> = {};
  for (const t of transactions) {
    const key = `${t.date.getFullYear()}-${String(t.date.getMonth() + 1).padStart(2, '0')}`;
    if (!monthly[key]) monthly[key] = { income: 0, expense: 0 };
    if (t.type === 'INCOME') monthly[key].income += t.amount;
    else monthly[key].expense += t.amount;
  }

  return NextResponse.json({
    income,
    expense,
    balance: income - expense,
    monthly,
    transactions,
  });
}
