import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import LoginForm from './LoginForm';
import { CheckCircle, Truck } from 'lucide-react';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/admin');

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-[44%] p-12 text-white"
        style={{ background: 'linear-gradient(145deg, #072A4D 0%, #0A5FA8 100%)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-head font-extrabold text-white">TOCHE & FILS</div>
            <div className="text-white/50 text-xs uppercase tracking-wider">Administration</div>
          </div>
        </div>

        <div>
          {/* Globe SVG */}
          <div className="mb-8 opacity-20">
            <svg viewBox="0 0 200 200" className="w-40 h-40" fill="none">
              <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="2" />
              <ellipse cx="100" cy="100" rx="40" ry="80" stroke="white" strokeWidth="2" />
              <ellipse cx="100" cy="100" rx="80" ry="30" stroke="white" strokeWidth="2" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="white" strokeWidth="2" />
              <line x1="100" y1="20" x2="100" y2="180" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          <h1 className="font-head font-extrabold text-3xl leading-tight mb-4">
            Pilotez votre activité depuis un seul espace
          </h1>
          <p className="text-white/60 mb-8">
            Gérez votre catalogue, suivez vos devis et analysez vos performances en temps réel.
          </p>

          <div className="space-y-4">
            {[
              'Gestion complète du catalogue produits',
              'Suivi des devis et messages clients',
              'Comptabilité et facturation intégrées',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-sky flex-none" />
                <span className="text-sm text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-white/30 text-xs">
          © 2024 TOCHE & FILS International Trade Co., LTD
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-head font-extrabold text-navy">TOCHE & FILS</div>
              <div className="text-muted text-xs">Administration</div>
            </div>
          </div>

          <h2 className="font-head font-extrabold text-3xl text-ink mb-2">Connexion</h2>
          <p className="text-muted mb-8">Accédez à votre espace d&apos;administration.</p>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
