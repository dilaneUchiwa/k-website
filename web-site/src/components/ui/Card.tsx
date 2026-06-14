import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('bg-white rounded-2xl shadow-sm border border-line p-6', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return <h3 className={cn('font-head font-bold text-lg text-ink', className)}>{children}</h3>;
}

export function CardContent({ children, className }: CardProps) {
  return <div className={className}>{children}</div>;
}

export default Card;
