import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { FileText, Edit3 } from 'lucide-react';
import Link from 'next/link';

const pages = [
  { key: 'home', label: 'Accueil', desc: 'Bannière héros, section stats, produits vedettes', href: '/fr' },
  { key: 'about', label: 'À propos', desc: 'Histoire, valeurs et présence Cameroun-Chine', href: '/fr/apropos' },
  { key: 'services', label: 'Services', desc: '7 services d\'import-export et accompagnement', href: '/fr/services' },
  { key: 'contact', label: 'Contact', desc: 'Formulaire et informations de contact', href: '/fr/contact' },
];

export default async function PagesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  return (
    <div className="space-y-6">
      <h1 className="font-head font-extrabold text-2xl text-ink">Gestion des pages</h1>
      <p className="text-muted">Modifiez le contenu des pages publiques du site vitrine.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {pages.map(page => (
          <div key={page.key} className="bg-white rounded-2xl border border-line p-6 flex gap-5 items-start">
            <div className="w-11 h-11 rounded-xl bg-blue/10 flex items-center justify-center flex-none">
              <FileText className="w-5 h-5 text-blue" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-head font-extrabold text-lg text-ink mb-1">{page.label}</h2>
              <p className="text-sm text-muted mb-4">{page.desc}</p>
              <div className="flex gap-3">
                <button className="flex items-center gap-1.5 bg-blue text-white font-head font-semibold px-4 py-2 rounded-xl hover:bg-navy transition-all text-sm">
                  <Edit3 className="w-4 h-4" /> Éditer
                </button>
                <Link
                  href={page.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 border border-line text-muted font-head font-semibold px-4 py-2 rounded-xl hover:bg-bg-soft transition-all text-sm"
                >
                  Voir
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber/10 border border-amber/30 rounded-2xl p-5">
        <p className="text-sm text-amber font-head font-semibold mb-1">Éditeur de contenu</p>
        <p className="text-sm text-amber/80">
          L&apos;éditeur de contenu complet (textes, images, SEO) sera disponible dans une prochaine version. Pour le moment, le contenu peut être mis à jour directement via la base de données ou le fichier de traduction.
        </p>
      </div>
    </div>
  );
}
