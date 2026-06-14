import React from 'react';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import UtilisateursClient from './UtilisateursClient';

export default async function UtilisateursPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const [users, roles] = await Promise.all([
    prisma.user.findMany({
      include: { role: { include: { permissions: true } } },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.userRole.findMany({
      include: { permissions: true, _count: { select: { users: true } } },
    }),
  ]);

  return (
    <UtilisateursClient
      users={users.map(u => ({
        id: u.id,
        name: u.name ?? '',
        email: u.email,
        role: u.role?.name ?? 'Aucun',
        active: u.active,
        createdAt: u.createdAt.toISOString(),
      }))}
      roles={roles.map(r => ({
        id: r.id,
        name: r.name,
        userCount: r._count.users,
        permCount: r.permissions.length,
      }))}
    />
  );
}
