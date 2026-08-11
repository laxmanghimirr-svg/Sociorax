import React from 'react';
import { LogoMark } from './Primitives';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-12 w-full px-6 md:px-12 text-xs text-white/50 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <LogoMark className="w-5 h-5 text-white/80" />
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="text-white/80 font-medium">Sociorax Inc. · Laxman</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div>Email: yuvirock076@gmail.com</div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <a href="#" className="hover:text-white transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Terms of Service
        </a>
      </div>
    </footer>
  );
}
