import React from 'react';
import { motion } from 'motion/react';
import { LogoMark } from './Primitives';

interface NavbarProps {
  onDownloadClick?: () => void;
  onGoHome?: () => void;
  isAppDetailView?: boolean;
}

export function Navbar({ onDownloadClick, onGoHome, isAppDetailView }: NavbarProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (isAppDetailView && onGoHome) {
      onGoHome();
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isAppDetailView && onGoHome) {
      onGoHome();
    } else {
      const element = document.getElementById('hero');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full pt-4 pb-4 bg-[#0c0c0c]/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="w-full px-6 md:px-12 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <a href="#hero" onClick={handleBrandClick} className="flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity cursor-pointer" title="Sociorax">
          <LogoMark className="w-8 h-8" />
          <span className="font-bold text-xl tracking-tight text-white">Sociorax</span>
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70 py-0">
          <a
            href="#solutions"
            onClick={(e) => handleNavClick(e, 'solutions')}
            className="hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Solutions
          </a>
          <a
            href="#features"
            onClick={(e) => handleNavClick(e, 'features')}
            className="hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Features & Apps
          </a>
        </nav>
      </div>
    </motion.header>
  );
}

