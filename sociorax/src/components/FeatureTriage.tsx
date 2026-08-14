import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface FeatureTriageProps {
  onSelectApp?: (appId: string) => void;
}

export function FeatureTriage({ onSelectApp }: FeatureTriageProps) {
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const chipsMap: { label: string; id: string }[] = [
    { label: 'Motion Tracker', id: 'motion-tracker' },
    { label: 'Photo Compressor', id: 'photo-compressor' },
    { label: 'Prompt Gen Ai', id: 'prompt-generator' },
    { label: 'PDF Scanner', id: 'pdf-scanner' },
    { label: 'QR Scanner', id: 'qr-scanner' },
  ];

  const handleChipClick = (item: { label: string; id: string }) => {
    setActiveChip(item.label);
    if (onSelectApp) {
      onSelectApp(item.id);
    }
  };

  return (
    <section id="solutions" className="w-full px-6 md:px-12 py-20 md:py-28 text-center flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02] text-white">
          Essential Apps & Tools <br />
          For Everyday Tasks
        </h2>

        <p className="mt-6 text-white/60 text-base leading-[1.6] max-w-md mx-auto">
          Sociorax is an all-in-one app platform with useful tools for productivity, creativity, utilities, and everyday tasks. Discover, use, and download powerful apps in one place.
        </p>

        <div className="mt-8 flex flex-col items-center gap-2.5">
          {/* Top row with first 3 chips */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {chipsMap.slice(0, 3).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleChipClick(item)}
                className={`group text-xs font-medium px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer shadow-sm flex items-center gap-1.5 ${
                  activeChip === item.label
                    ? 'bg-white text-black border-white shadow-md'
                    : 'text-white/80 border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>

          {/* Bottom row with side-by-side chips */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {chipsMap.slice(3).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleChipClick(item)}
                className={`group text-xs font-medium px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer shadow-sm flex items-center gap-1.5 ${
                  activeChip === item.label
                    ? 'bg-white text-black border-white shadow-md'
                    : 'text-white/80 border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

