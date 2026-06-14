import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'TOCHE & FILS — Équipements de Construction',
  description: "Importateur d'engins de chantier et équipements lourds. Bureau au Cameroun et en Chine.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
