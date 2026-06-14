'use client';

import { motion } from 'framer-motion';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section
      className="py-20 text-white overflow-hidden relative"
      style={{ background: 'linear-gradient(115deg, #063D6E 0%, #0A5FA8 100%)' }}
    >
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="max-w-[1280px] mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          className="font-head font-bold text-xs tracking-[0.14em] uppercase text-sky mb-4"
        >
          {eyebrow}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease }}
          className="font-head font-extrabold text-4xl md:text-5xl text-white leading-tight mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease }}
            className="text-[#c2dcf0] text-lg max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
