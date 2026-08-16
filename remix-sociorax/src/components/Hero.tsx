import React from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  onDownloadClick?: () => void;
}

export function Hero({ onDownloadClick }: HeroProps) {
  const gradientStyle: React.CSSProperties = {
    backgroundImage:
      'linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    filter: 'url(#c3-noise)',
  };

  return (
    <div id="hero" className="relative z-10 w-full pt-16 md:pt-28 pb-20 text-center flex flex-col items-center px-6 md:px-12">
      <div className="flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-7xl font-semibold tracking-tight leading-[0.9] flex flex-col items-center gap-2"
        >
          <span className="text-white">Build Faster</span>
          <span className="animate-shiny block py-1" style={gradientStyle}>
            Launch Smarter
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          className="mt-8 text-white/60 max-w-md text-base leading-[1.5]"
        >
          Your all-in-one app platform with useful tools for productivity, creativity, utilities, and everyday tasks
        </motion.p>
      </div>
    </div>
  );
}


