import React from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}

export function Select({ label, error, required, options, className, id, ...props }: SelectProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="block font-head font-semibold text-sm text-gray-700 mb-1.5">
          {label} {required && <span className="text-cta">*</span>}
        </label>
      )}
      <select
        id={inputId}
        className={cn(
          'w-full px-3.5 py-3 border border-line rounded-[10px] font-body text-sm text-ink bg-white transition-all appearance-none',
          'focus:outline-none focus:border-blue focus:ring-4 focus:ring-blue/10',
          'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' fill=\'none\' stroke=\'%236B7280\' stroke-width=\'2\' viewBox=\'0 0 24 24\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_12px_center]',
          'pr-10',
          error && 'border-red',
          className
        )}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red">{error}</p>}
    </div>
  );
}

export default Select;
