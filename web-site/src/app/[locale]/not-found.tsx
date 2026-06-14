import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div
          className="w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #0A5FA8, #2E9CDB)' }}
        >
          <span className="font-head font-extrabold text-white text-3xl">404</span>
        </div>
        <h1 className="font-head font-extrabold text-3xl text-ink mb-4">Page introuvable</h1>
        <p className="text-muted mb-8">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/fr"
            className="flex items-center gap-2 bg-blue text-white font-head font-semibold px-6 py-3 rounded-xl hover:bg-navy transition-colors"
          >
            <Home className="w-4 h-4" />
            Accueil
          </Link>
          <Link
            href="/fr/catalogue"
            className="flex items-center gap-2 border border-line text-muted font-head font-semibold px-6 py-3 rounded-xl hover:border-blue hover:text-blue transition-colors"
          >
            Catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
