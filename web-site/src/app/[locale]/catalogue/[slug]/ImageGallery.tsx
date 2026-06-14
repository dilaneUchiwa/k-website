'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductImage {
  id: string;
  url: string;
  alt?: string | null;
  order: number;
}

export default function ImageGallery({ images, productName }: { images: ProductImage[]; productName: string }) {
  const [selected, setSelected] = useState(0);
  const currentImage = images[selected];

  return (
    <div>
      {/* Main image */}
      <div className="relative w-full aspect-[4/3] bg-bg-soft rounded-2xl overflow-hidden border border-line mb-4">
        {currentImage ? (
          <Image
            src={currentImage.url}
            alt={currentImage.alt || productName}
            fill
            className="object-contain p-6"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted">
            <svg viewBox="0 0 24 24" className="w-24 h-24 opacity-20" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 flex-wrap">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                i === selected ? 'border-blue shadow-sm' : 'border-line hover:border-blue/40'
              }`}
            >
              <Image src={img.url} alt={img.alt || productName} fill className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
