import React from 'react';

interface SectionHeadProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHead({ eyebrow, title, subtitle, center = false }: SectionHeadProps) {
  return (
    <div className={center ? 'text-center' : ''}>
      {eyebrow && (
        <div className="font-head font-bold text-xs tracking-[0.14em] uppercase text-blue mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="font-head font-extrabold text-3xl md:text-4xl text-ink leading-tight mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted text-lg max-w-xl">{subtitle}</p>
      )}
    </div>
  );
}

export default SectionHead;
