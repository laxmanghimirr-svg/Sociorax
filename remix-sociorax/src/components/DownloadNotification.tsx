import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'error' | 'success' | 'info';
  title: string;
  description: string;
}

interface DownloadNotificationProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export function DownloadNotification({ toast, onClose }: DownloadNotificationProps) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 max-w-md w-full p-1 pointer-events-auto"
        >
          <div
            className={`liquid-glass rounded-2xl p-4 border flex items-start gap-3 shadow-2xl backdrop-blur-xl ${
              toast.type === 'error'
                ? 'bg-[#180a0a]/90 border-red-500/30 text-white'
                : toast.type === 'success'
                ? 'bg-[#0a1810]/90 border-emerald-500/30 text-white'
                : 'bg-[#0e1014]/90 border-blue-500/30 text-white'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === 'error' && (
                <AlertCircle className="w-5 h-5 text-red-400" />
              )}
              {toast.type === 'success' && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              )}
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <h4 className="text-sm font-semibold text-white">{toast.title}</h4>
              <p className="text-xs text-white/70 mt-1 leading-relaxed">
                {toast.description}
              </p>
            </div>

            <button
              onClick={onClose}
              className="shrink-0 text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
