import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'new' | 'progress' | 'done' | 'active' | 'archived' | 'draft' | 'sent' | 'paid' | 'cancelled' | 'default';
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  new: 'bg-blue/10 text-blue border-blue/20',
  progress: 'bg-amber/10 text-amber border-amber/20',
  done: 'bg-green/10 text-green border-green/20',
  active: 'bg-green/10 text-green border-green/20',
  archived: 'bg-gray-100 text-gray-500 border-gray-200',
  draft: 'bg-gray-100 text-gray-600 border-gray-200',
  sent: 'bg-blue/10 text-blue border-blue/20',
  paid: 'bg-green/10 text-green border-green/20',
  cancelled: 'bg-red/10 text-red border-red/20',
  default: 'bg-gray-100 text-gray-600 border-gray-200',
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border font-head',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
