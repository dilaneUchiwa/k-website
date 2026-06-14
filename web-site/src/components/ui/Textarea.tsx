import React from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export function Textarea({ label, error, required, className, id, ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="block font-head font-semibold text-sm text-gray-700 mb-1.5">
          {label} {required && <span className="text-cta">*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(
          'w-full px-3.5 py-3 border border-line rounded-[10px] font-body text-sm text-ink bg-white transition-all min-h-[100px] resize-vertical',
          'focus:outline-none focus:border-blue focus:ring-4 focus:ring-blue/10',
          error && 'border-red',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red">{error}</p>}
    </div>
  );
}

export default Textarea;
