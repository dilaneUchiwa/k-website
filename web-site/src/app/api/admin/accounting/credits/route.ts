import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const credits = await prisma.credit.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(credits);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const credit = await prisma.credit.create({
    data: { ...body, dueDate: body.dueDate ? new Date(body.dueDate) : null },
  });
  return NextResponse.json(credit, { status: 201 });
}
