'use client';

import React, { useState } from 'react';
import { Mail, MailOpen, X } from 'lucide-react';

interface Message {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: Date | string;
}

export default function MessagesClient({ messages: initial }: { messages: Message[] }) {
  const [messages, setMessages] = useState(initial);
  const [selected, setSelected] = useState<Message | null>(null);

  const markRead = async (id: string) => {
    await fetch(`/api/admin/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'READ' }),
    });
    setMessages(m => m.map(item => item.id === id ? { ...item, status: 'READ' } : item));
    if (selected?.id === id) setSelected(s => s ? { ...s, status: 'READ' } : null);
  };

  const unreadCount = messages.filter(m => m.status === 'NEW').length;

  return (
    <>
      <div className="max-w-3xl space-y-4">
        {unreadCount > 0 && (
          <p className="text-sm text-muted">{unreadCount} message{unreadCount > 1 ? 's' : ''} non lu{unreadCount > 1 ? 's' : ''}</p>
        )}

        <div className="bg-white rounded-2xl border border-line divide-y divide-line overflow-hidden">
          {messages.map(msg => (
            <div
              key={msg.id}
              onClick={() => { setSelected(msg); if (msg.status === 'NEW') markRead(msg.id); }}
              className={`flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-bg-soft transition-colors ${msg.status === 'NEW' ? 'bg-blue/2' : ''}`}
            >
              <div className={`mt-0.5 ${msg.status === 'NEW' ? 'text-blue' : 'text-muted'}`}>
                {msg.status === 'NEW' ? <Mail className="w-5 h-5" /> : <MailOpen className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`font-head font-semibold text-sm ${msg.status === 'NEW' ? 'text-ink' : 'text-muted'}`}>
                    {msg.fullName}
                  </span>
                  {msg.status === 'NEW' && (
                    <span className="text-[10px] font-head font-bold px-1.5 py-0.5 rounded-full bg-blue text-white">Nouveau</span>
                  )}
                  <span className="ml-auto text-xs text-muted">
                    {new Date(msg.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <p className="text-sm font-medium text-ink truncate">{msg.subject}</p>
                <p className="text-xs text-muted truncate">{msg.message}</p>
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="py-16 text-center text-muted">Aucun message</div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-line">
              <h2 className="font-head font-extrabold text-xl text-ink">{selected.subject}</h2>
              <button onClick={() => setSelected(null)} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-bg-soft">
                <X className="w-5 h-5 text-muted" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-head font-semibold text-muted uppercase">De</label>
                  <p className="font-semibold text-ink">{selected.fullName}</p>
                </div>
                <div>
                  <label className="text-xs font-head font-semibold text-muted uppercase">Email</label>
                  <p className="text-ink">{selected.email}</p>
                </div>
                {selected.phone && (
                  <div>
                    <label className="text-xs font-head font-semibold text-muted uppercase">Téléphone</label>
                    <p className="text-ink">{selected.phone}</p>
                  </div>
                )}
                <div>
                  <label className="text-xs font-head font-semibold text-muted uppercase">Date</label>
                  <p className="text-ink">{new Date(selected.createdAt).toLocaleDateString('fr-FR', { dateStyle: 'long' })}</p>
                </div>
              </div>
              <div>
                <label className="text-xs font-head font-semibold text-muted uppercase">Message</label>
                <p className="text-sm text-muted bg-bg-soft rounded-xl p-4 mt-1 leading-relaxed">{selected.message}</p>
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue/5 text-blue font-head font-semibold text-sm hover:bg-blue/10 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Répondre par email
              </a>
              {selected.status === 'NEW' && (
                <button
                  onClick={() => markRead(selected.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green/5 text-green font-head font-semibold text-sm hover:bg-green/10 transition-colors"
                >
                  <MailOpen className="w-4 h-4" />
                  Marquer comme lu
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
