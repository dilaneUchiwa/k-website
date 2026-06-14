'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cta' | 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  href?: string;
  as?: 'button' | 'a';
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-head font-semibold rounded-xl border border-transparent transition-all duration-150 cursor-pointer whitespace-nowrap';

  const variants = {
    cta: 'bg-cta text-white hover:bg-cta-dark shadow-[0_8px_20px_rgba(224,90,0,.28)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(224,90,0,.34)]',
    primary: 'bg-blue text-white hover:bg-navy hover:-translate-y-0.5',
    secondary: 'border-blue text-blue bg-transparent hover:bg-blue/10 hover:-translate-y-0.5',
    ghost: 'text-ink bg-transparent hover:bg-black/5',
    danger: 'text-red bg-white border-red/30 hover:bg-red/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-4 text-base',
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], (disabled || loading) && 'opacity-60 cursor-not-allowed', className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
}

export default Button;
