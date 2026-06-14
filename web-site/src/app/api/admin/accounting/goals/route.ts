import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const goals = await prisma.goal.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(goals);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const goal = await prisma.goal.create({
    data: { ...body, startDate: new Date(body.startDate), endDate: new Date(body.endDate) },
  });
  return NextResponse.json(goal, { status: 201 });
}
