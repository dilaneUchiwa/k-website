import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const roles = await prisma.userRole.findMany({
    include: { permissions: true, _count: { select: { users: true } } },
  });
  return NextResponse.json(roles);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const role = await prisma.userRole.create({
    data: {
      name: body.name,
      permissions: body.permissions ? { create: body.permissions } : undefined,
    },
    include: { permissions: true },
  });
  return NextResponse.json(role, { status: 201 });
}
