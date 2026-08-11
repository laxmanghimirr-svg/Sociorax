import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Monitor, Smartphone, Sparkles, Loader2 } from 'lucide-react';
import { LogoMark } from './Primitives';
import { detectDeviceOS, executeDownload, DOWNLOAD_OPTIONS, OperatingSystem } from '../utils/download';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onError?: (msg: string) => void;
}

export function DownloadModal({ isOpen, onClose, onError }: DownloadModalProps) {
  const [downloadingPlatform, setDownloadingPlatform] = useState<'windows' | 'android' | null>(null);
  const [userOS, setUserOS] = useState<OperatingSystem>('windows');

  useEffect(() => {
    if (isOpen) {
      setUserOS(detectDeviceOS());
    }
  }, [isOpen]);

  const handleDownload = async (platform: 'windows' | 'android') => {
    await executeDownload(platform, {
      onStart: () => setDownloadingPlatform(platform),
      onError: (err) => {
        setDownloadingPlatform(null);
        if (onError) onError(err);
      },
      onSuccess: () => {
        setDownloadingPlatform(null);
        onClose();
      },
    });
  };

  const isWindowsRecommended = userOS === 'windows' || userOS === 'mac' || userOS === 'other';
  const isAndroidRecommended = userOS === 'android';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            className="relative z-10 w-full max-w-md bg-[#12141a] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <LogoMark className="w-7 h-7 text-white" />
                <span className="font-semibold text-sm text-white">Download Sociorax</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-white/70 mb-6 leading-relaxed">
              Select your platform below to start downloading Sociorax. Your browser will save the official package directly.
            </p>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {/* Windows Option */}
              <button
                onClick={() => handleDownload('windows')}
                disabled={downloadingPlatform !== null}
                className={`relative w-full p-3.5 rounded-xl border transition-all flex items-center justify-between group text-left ${
                  isWindowsRecommended
                    ? 'bg-blue-600/20 hover:bg-blue-600/30 border-blue-500/40 ring-1 ring-blue-500/30'
                    : 'bg-white/5 hover:bg-white/10 border-white/15'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Monitor className={`w-5 h-5 ${isWindowsRecommended ? 'text-blue-300' : 'text-white/80'}`} />
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Download for Windows
                    </div>
                    <div className="text-[10px] text-white/50">
                      {DOWNLOAD_OPTIONS.windows.sublabel} · {DOWNLOAD_OPTIONS.windows.fileSize}
                    </div>
                  </div>
                </div>
                {downloadingPlatform === 'windows' ? (
                  <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing...</span>
                  </div>
                ) : (
                  <Download className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-y-0.5 transition-all" />
                )}
              </button>

              {/* Android Option */}
              <button
                onClick={() => handleDownload('android')}
                disabled={downloadingPlatform !== null}
                className={`relative w-full p-3.5 rounded-xl border transition-all flex items-center justify-between group text-left ${
                  isAndroidRecommended
                    ? 'bg-emerald-600/20 hover:bg-emerald-600/30 border-emerald-500/40 ring-1 ring-emerald-500/30'
                    : 'bg-white/5 hover:bg-white/10 border-white/15'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className={`w-5 h-5 ${isAndroidRecommended ? 'text-emerald-300' : 'text-white/80'}`} />
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Download for Android
                    </div>
                    <div className="text-[10px] text-white/50">
                      {DOWNLOAD_OPTIONS.android.sublabel} · {DOWNLOAD_OPTIONS.android.fileSize}
                    </div>
                  </div>
                </div>
                {downloadingPlatform === 'android' ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing...</span>
                  </div>
                ) : (
                  <Download className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-y-0.5 transition-all" />
                )}
              </button>
            </div>

            {/* Footer attribution */}
            <div className="pt-3 border-t border-white/10 text-center">
              <span className="text-[11px] text-white/50 tracking-wide font-medium">
                Sociorax v2.4.0 · Safe & Verified Package
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
