'use client';

import React, { useState } from 'react';
import { Users, Shield, Plus, Trash2, UserCheck, UserX } from 'lucide-react';

type User = { id: string; name: string; email: string; role: string; active: boolean; createdAt: string };
type Role = { id: string; name: string; userCount: number; permCount: number };

export default function UtilisateursClient({ users, roles }: { users: User[]; roles: Role[] }) {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: '' });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-head font-extrabold text-2xl text-ink">Utilisateurs & rôles</h1>
        <button
          onClick={() => setShowInvite(true)}
          className="flex items-center gap-2 bg-blue text-white font-head font-semibold px-4 py-2 rounded-xl hover:bg-navy transition-all text-sm"
        >
          <Plus className="w-4 h-4" /> Inviter un collaborateur
        </button>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-2xl border border-line overflow-hidden">
        <div className="p-5 border-b border-line">
          <h2 className="font-head font-bold text-lg text-ink">Utilisateurs ({users.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg-soft text-muted text-xs font-head font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Nom</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Rôle</th>
                <th className="px-4 py-3 text-left">Statut</th>
                <th className="px-4 py-3 text-left">Créé le</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-bg-soft transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue/10 flex items-center justify-center font-head font-bold text-blue text-sm">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-head font-semibold text-ink">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 bg-blue/10 text-blue text-xs font-head font-semibold px-2.5 py-1 rounded-full">
                      <Shield className="w-3 h-3" /> {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {u.active ? (
                      <span className="inline-flex items-center gap-1 bg-green/10 text-green text-xs font-head font-semibold px-2.5 py-1 rounded-full">
                        <UserCheck className="w-3 h-3" /> Actif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-red/10 text-red text-xs font-head font-semibold px-2.5 py-1 rounded-full">
                        <UserX className="w-3 h-3" /> Inactif
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted text-xs">{new Date(u.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-red hover:text-red/80 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Roles */}
      <div className="bg-white rounded-2xl border border-line p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-head font-bold text-lg text-ink">Rôles & permissions</h2>
          <button className="flex items-center gap-1.5 border border-line text-muted font-head font-semibold px-3 py-1.5 rounded-lg hover:bg-bg-soft transition-all text-sm">
            <Plus className="w-4 h-4" /> Rôle personnalisé
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {roles.map(r => (
            <div key={r.id} className="border border-line rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-blue/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue" />
                </div>
                <div>
                  <div className="font-head font-extrabold text-sm text-ink">{r.name}</div>
                  <div className="text-xs text-muted">{r.userCount} utilisateur{r.userCount > 1 ? 's' : ''}</div>
                </div>
              </div>
              <div className="text-xs text-muted">{r.permCount} permission{r.permCount > 1 ? 's' : ''}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowInvite(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 p-6" onClick={e => e.stopPropagation()}>
            <h2 className="font-head font-extrabold text-xl text-ink mb-5">Inviter un collaborateur</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-head font-semibold text-ink mb-1">Nom</label>
                <input
                  value={inviteForm.name}
                  onChange={e => setInviteForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-line rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/30"
                  placeholder="Nom complet"
                />
              </div>
              <div>
                <label className="block text-sm font-head font-semibold text-ink mb-1">Email</label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={e => setInviteForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-line rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/30"
                  placeholder="email@exemple.com"
                />
              </div>
              <div>
                <label className="block text-sm font-head font-semibold text-ink mb-1">Rôle</label>
                <select
                  value={inviteForm.role}
                  onChange={e => setInviteForm(p => ({ ...p, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-line rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/30"
                >
                  <option value="">Sélectionner un rôle</option>
                  {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowInvite(false)} className="flex-1 border border-line text-muted font-head font-semibold py-2.5 rounded-xl hover:bg-bg-soft transition-all text-sm">Annuler</button>
              <button className="flex-1 bg-blue text-white font-head font-semibold py-2.5 rounded-xl hover:bg-navy transition-all text-sm">Envoyer l&apos;invitation</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
