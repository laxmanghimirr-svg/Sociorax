import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureTriage } from './components/FeatureTriage';
import { LogoCloud } from './components/LogoCloud';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { AppDetailPage } from './components/AppDetailPage';
import { DownloadModal } from './components/DownloadModal';
import { DownloadNotification, ToastMessage } from './components/DownloadNotification';
import { executeDownload, DOWNLOAD_OPTIONS } from './utils/download';
import { getAppById } from './data/appsData';

export default function App() {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [downloadingPlatform, setDownloadingPlatform] = useState<'windows' | 'android' | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync state with URL hash (e.g. #app/photo-compressor or #photo-compressor)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('app/')) {
        const appId = hash.replace('app/', '');
        if (getAppById(appId)) {
          setSelectedAppId(appId);
        }
      } else if (getAppById(hash)) {
        setSelectedAppId(hash);
      } else if (!hash || hash === 'hero' || hash === 'solutions' || hash === 'features') {
        setSelectedAppId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleSelectApp = (appId: string) => {
    setSelectedAppId(appId);
    window.location.hash = `app/${appId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setSelectedAppId(null);
    window.location.hash = 'hero';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDownload = () => {
    setDownloadModalOpen(true);
  };

  const handleDirectDownload = async (platform: 'windows' | 'android') => {
    setToast(null);
    await executeDownload(platform, {
      onStart: () => setDownloadingPlatform(platform),
      onError: (msg) => {
        setDownloadingPlatform(null);
        setToast({
          id: Date.now().toString(),
          type: 'error',
          title: 'Download Unavailable',
          description: msg,
        });
      },
      onSuccess: () => {
        setDownloadingPlatform(null);
        const item = DOWNLOAD_OPTIONS[platform];
        setToast({
          id: Date.now().toString(),
          type: 'success',
          title: 'Download Started',
          description: `${item.fileName} is downloading. Check your browser's download manager.`,
        });
      },
    });
  };

  const activeApp = selectedAppId ? getAppById(selectedAppId) : undefined;

  return (
    <div className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#0c0c0c] text-white">
      {/* 1st div inside root: Global background video */}
      <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
      </div>

      {/* 2nd div inside root: Global Root SVG noise filter container */}
      <div className="hidden pointer-events-none" aria-hidden="true">
        <svg className="hidden">
          <filter id="c3-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0"
            />
            <feComposite in2="SourceGraphic" operator="in" result="noise" />
            <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
          </filter>
        </svg>
      </div>

      {/* 3rd div inside root: Main Page Content */}
      <div className="relative z-10 flex flex-col min-h-screen w-full pb-12">
        <Navbar
          onDownloadClick={handleOpenDownload}
          onGoHome={handleGoHome}
          onSelectApp={handleSelectApp}
          isAppDetailView={!!activeApp}
        />

        {activeApp ? (
          <AppDetailPage
            app={activeApp}
            onBack={handleGoHome}
            onOpenDownloadModal={handleOpenDownload}
          />
        ) : (
          <>
            <Hero onDownloadClick={handleOpenDownload} />
            <FeatureTriage onSelectApp={handleSelectApp} />
            <LogoCloud onSelectApp={handleSelectApp} />
            <Testimonials onSelectApp={handleSelectApp} />
          </>
        )}

        <Footer />
      </div>

      {/* Interactive Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        onError={(msg) =>
          setToast({
            id: Date.now().toString(),
            type: 'error',
            title: 'Download Unavailable',
            description: msg,
          })
        }
      />

      {/* Toast Notification */}
      <DownloadNotification
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}


