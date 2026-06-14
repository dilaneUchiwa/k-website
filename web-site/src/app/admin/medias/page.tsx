'use client';

import React, { useState, useRef } from 'react';
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react';

export default function MediasPage() {
  const [images, setImages] = useState<{ name: string; dataUrl: string }[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = e => {
        setImages(prev => [...prev, { name: file.name, dataUrl: e.target?.result as string }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-head font-extrabold text-2xl text-ink">Médiathèque</h1>
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 bg-blue text-white font-head font-semibold px-4 py-2 rounded-xl hover:bg-navy transition-all text-sm"
        >
          <Upload className="w-4 h-4" /> Importer des images
        </button>
      </div>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-line rounded-2xl p-12 text-center cursor-pointer hover:border-blue hover:bg-blue/5 transition-all"
      >
        <Upload className="w-10 h-10 text-muted mx-auto mb-3" />
        <p className="font-head font-semibold text-ink mb-1">Glissez-déposez des images ici</p>
        <p className="text-sm text-muted">ou cliquez pour sélectionner des fichiers (JPG, PNG, WebP)</p>
        <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={e => handleFiles(e.target.files)} />
      </div>

      {images.length === 0 && (
        <div className="bg-white rounded-2xl border border-line p-12 text-center">
          <ImageIcon className="w-12 h-12 text-muted/40 mx-auto mb-3" />
          <p className="text-muted">Aucune image importée pour l&apos;instant</p>
        </div>
      )}

      {images.length > 0 && (
        <div className="bg-white rounded-2xl border border-line p-6">
          <p className="text-sm text-muted mb-4">{images.length} image{images.length > 1 ? 's' : ''}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images.map((img, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden border border-line aspect-square bg-bg-soft">
                <img src={img.dataUrl} alt={img.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => setImages(prev => prev.filter((_, j) => j !== i))}
                    className="w-8 h-8 rounded-lg bg-red text-white flex items-center justify-center hover:bg-red/80 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
