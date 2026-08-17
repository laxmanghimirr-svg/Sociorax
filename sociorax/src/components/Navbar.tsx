import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ChevronDown, ExternalLink, Sparkles, Smartphone, Monitor } from 'lucide-react';
import { LogoMark } from './Primitives';
import { APPS_DATA } from '../data/appsData';
import { AppItem } from '../types/app';

interface NavbarProps {
  onDownloadClick?: () => void;
  onGoHome?: () => void;
  onSelectApp?: (appId: string) => void;
  isAppDetailView?: boolean;
}

export function Navbar({ onDownloadClick, onGoHome, onSelectApp, isAppDetailView }: NavbarProps) {
  const [downloadsMenuOpen, setDownloadsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDownloadsMenuOpen(false);
      }
    };

    if (downloadsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [downloadsMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setDownloadsMenuOpen(false);
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
    setDownloadsMenuOpen(false);
    if (isAppDetailView && onGoHome) {
      onGoHome();
    } else {
      const element = document.getElementById('hero');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleAppClick = (appId: string) => {
    setDownloadsMenuOpen(false);
    if (onSelectApp) {
      onSelectApp(appId);
    }
  };

  const handleDirectDownload = (e: React.MouseEvent, app: AppItem) => {
    e.stopPropagation();
    if (app.apkUrl) {
      const link = document.createElement('a');
      link.href = app.apkUrl;
      link.download = `${app.name.replace(/\s+/g, '_')}.apk`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (app.playStoreUrl) {
      window.open(app.playStoreUrl, '_blank', 'noopener,noreferrer');
    } else if (onDownloadClick) {
      onDownloadClick();
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full pt-4 pb-4 bg-[#0c0c0c]/85 backdrop-blur-md border-b border-white/5"
    >
      <div className="w-full px-6 md:px-12 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <a
          href="#hero"
          onClick={handleBrandClick}
          className="flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity cursor-pointer"
          title="Sociorax"
        >
          <LogoMark className="w-8 h-8" />
          <span className="font-bold text-xl tracking-tight text-white">Sociorax</span>
        </a>

        {/* Center & Right: Navigation Links with Downloads Dropdown */}
        <div className="flex items-center gap-6 md:gap-8">
          <nav className="flex items-center gap-6 md:gap-8 text-sm text-white/70 py-0">
            <a
              href="#solutions"
              onClick={(e) => handleNavClick(e, 'solutions')}
              className="hover:text-white transition-colors duration-200 cursor-pointer font-medium"
            >
              Solutions
            </a>

            <a
              href="#features"
              onClick={(e) => handleNavClick(e, 'features')}
              className="hidden sm:inline-block hover:text-white transition-colors duration-200 cursor-pointer font-medium"
            >
              Features & Apps
            </a>

            {/* Downloads Button (Same design as Solution button with dropdown indicator) */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setDownloadsMenuOpen(!downloadsMenuOpen)}
                className={`flex items-center gap-1.5 font-medium transition-colors duration-200 cursor-pointer text-sm ${
                  downloadsMenuOpen ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
                title="View All Apps & Download Links"
              >
                <span>Downloads</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    downloadsMenuOpen ? 'rotate-180 text-white' : 'text-white/60'
                  }`}
                />
              </button>

              {/* Dropdown Menu showing App Names with side Download Buttons */}
              <AnimatePresence>
                {downloadsMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 32,
                      mass: 0.8,
                    }}
                    className="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 top-full mt-3 w-[330px] sm:w-[380px] max-h-[75vh] overflow-y-auto overscroll-contain bg-[#121214]/92 backdrop-blur-2xl border border-white/[0.09] rounded-2xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8),0_0_1px_1px_rgba(255,255,255,0.08)] p-2.5 z-50 flex flex-col gap-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                  >
                    {/* Apps List: Each showing App Name & Side Download Button where link is placed */}
                    <div className="flex flex-col gap-1">
                      {APPS_DATA.map((app) => {
                        return (
                          <motion.div
                            key={app.id}
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            onClick={() => handleAppClick(app.id)}
                            className="group/item flex items-center justify-between p-2.5 rounded-xl bg-transparent hover:bg-white/[0.05] border border-transparent hover:border-white/[0.08] transition-all duration-300 ease-out cursor-pointer"
                          >
                            {/* App Icon & Name */}
                            <div className="flex items-center gap-3 min-w-0 pr-2">
                              {app.iconUrl ? (
                                <img
                                  src={app.iconUrl}
                                  alt={app.name}
                                  className="w-9 h-9 rounded-xl object-contain bg-black/40 border border-white/[0.08] p-1 shrink-0 shadow-sm transition-transform duration-300 group-hover/item:scale-105"
                                />
                              ) : (
                                <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white shrink-0 shadow-sm transition-transform duration-300 group-hover/item:scale-105">
                                  <Sparkles className="w-4 h-4 text-blue-400" />
                                </div>
                              )}
                              <div className="min-w-0">
                                <div className="text-[13px] font-medium text-white/90 group-hover/item:text-blue-400 transition-colors duration-200 truncate">
                                  {app.name}
                                </div>
                                <div className="text-[11px] text-white/40 group-hover/item:text-white/60 transition-colors duration-200 truncate">
                                  {app.category}
                                </div>
                              </div>
                            </div>

                            {/* Side Download Button where link is placed */}
                            <div className="shrink-0 flex items-center">
                              {app.isComingSoon ? (
                                <span className="text-[11px] text-white/40 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06]">
                                  Coming Soon
                                </span>
                              ) : (
                                <a
                                  href={app.apkUrl || app.playStoreUrl || '#'}
                                  onClick={(e) => handleDirectDownload(e, app)}
                                  download={app.apkUrl ? `${app.name.replace(/\s+/g, '_')}.apk` : undefined}
                                  target={app.apkUrl ? '_self' : '_blank'}
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.06] hover:bg-blue-600/90 text-white/80 hover:text-white text-xs font-medium rounded-xl border border-white/[0.08] hover:border-blue-400/50 shadow-sm hover:shadow-[0_0_16px_rgba(59,130,246,0.35)] transition-all duration-300 ease-out cursor-pointer active:scale-95"
                                  title={`Download ${app.name} APK / Installer`}
                                >
                                  <Download className="w-3.5 h-3.5 text-blue-400 group-hover/item:text-blue-300 group-hover:text-white transition-colors duration-200" />
                                  <span>Download</span>
                                </a>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}


