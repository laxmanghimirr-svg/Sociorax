import React from 'react';
import { motion } from 'motion/react';

interface LogoCloudProps {
  onSelectApp?: (appId: string) => void;
}

export function LogoCloud({ onSelectApp }: LogoCloudProps) {
  const logos = [
    { name: 'Motion Tracker', id: 'motion-tracker' },
    { name: 'Photo Compressor', id: 'photo-compressor' },
    { name: 'QR Scanner', id: 'qr-scanner' },
    { name: 'PDF Scanner', id: 'pdf-scanner' },
    { name: 'Prompt Gen Ai', id: 'prompt-generator' },
  ];

  return (
    <section className="w-full px-6 md:px-12 py-16 md:py-20 text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-xs uppercase tracking-widest text-white/40 font-medium"
      >
        ALL-IN-ONE PLATFORM
      </motion.p>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center justify-center">
        {logos.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => onSelectApp?.(item.id)}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 transition-all cursor-pointer group flex items-center justify-center text-center"
          >
            <span className="text-sm font-semibold tracking-tight text-white/60 group-hover:text-white transition-colors">
              {item.name}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

