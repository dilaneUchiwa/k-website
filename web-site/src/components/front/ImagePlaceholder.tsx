import React from 'react';
import { Truck } from 'lucide-react';

interface ImagePlaceholderProps {
  category?: string;
  className?: string;
}

export function ImagePlaceholder({ category, className }: ImagePlaceholderProps) {
  return (
    <div className={`bg-bg-soft flex items-center justify-center ${className}`}>
      <div className="text-center text-muted/30">
        <Truck className="w-16 h-16 mx-auto" />
        {category && <p className="text-xs mt-2">{category}</p>}
      </div>
    </div>
  );
}

export default ImagePlaceholder;
