import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(_request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const quotes = await prisma.quoteRequest.findMany({
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });

  const headers = ['Date', 'Nom', 'Email', 'Téléphone', 'Pays', 'Produit', 'Quantité', 'Statut', 'Message'];
  const rows = quotes.map(q => [
    q.createdAt.toLocaleDateString('fr-FR'),
    q.fullName,
    q.email,
    q.phone || '',
    q.country || '',
    q.productName,
    q.quantity.toString(),
    q.status,
    q.message || '',
  ]);

  const csv = [headers, ...rows].map(row => row.map(v => `"${v.replace(/"/g, '""')}"`).join(',')).join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="devis-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  });
}
