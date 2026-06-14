import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const template = await prisma.invoiceTemplate.update({
    where: { id: params.id },
    data: { name: body.name, config: JSON.stringify(body.config || {}) },
  });
  return NextResponse.json({ template });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await prisma.invoiceTemplate.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
