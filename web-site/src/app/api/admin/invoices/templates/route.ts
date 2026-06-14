import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const templates = await prisma.invoiceTemplate.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json(templates);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const template = await prisma.invoiceTemplate.create({
    data: { name: body.name, config: JSON.stringify(body.config || {}) },
  });
  return NextResponse.json(template, { status: 201 });
}
