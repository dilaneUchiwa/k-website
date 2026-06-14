'use client';
import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = 'success', onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl max-w-sm',
        type === 'success' ? 'bg-green text-white' : 'bg-red text-white'
      )}
    >
      {type === 'success' ? <CheckCircle className="w-5 h-5 flex-none" /> : <XCircle className="w-5 h-5 flex-none" />}
      <span className="text-sm font-medium flex-1">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-80 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default Toast;
