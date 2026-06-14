'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import { usePathname } from 'next/navigation';

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/catalogue': 'Catalogue',
  '/admin/categories': 'Catégories',
  '/admin/medias': 'Médias',
  '/admin/devis': 'Demandes de devis',
  '/admin/messages': 'Messages',
  '/admin/facturation': 'Facturation',
  '/admin/comptabilite': 'Comptabilité',
  '/admin/pages': 'Pages',
  '/admin/utilisateurs': 'Utilisateurs',
  '/admin/parametres': 'Paramètres',
};

export default function AdminShell({
  children,
  userName,
  userRole,
}: {
  children: React.ReactNode;
  userName?: string;
  userRole?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const title = PAGE_TITLES[pathname] || 'Admin';

  return (
    <div className="flex h-screen bg-bg-soft overflow-hidden">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userName={userName}
        userRole={userRole}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        <AdminTopbar title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
