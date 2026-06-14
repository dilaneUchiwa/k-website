import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AdminShell from './AdminShell';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // No session: render children as-is (login page handles its own UI + redirect to /admin if authed)
  // The middleware already blocks non-authenticated access to all /admin/* except /admin/login
  if (!session) {
    return <>{children}</>;
  }

  return (
    <AdminShell
      userName={(session.user as any)?.name}
      userRole={(session.user as any)?.role}
    >
      {children}
    </AdminShell>
  );
}
