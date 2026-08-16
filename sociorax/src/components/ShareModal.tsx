import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Code2,
  Check,
  Mail,
  Bluetooth,
  Radio,
  QrCode,
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  url?: string;
  iconUrl?: string;
}

export function ShareModal({
  isOpen,
  onClose,
  title,
  description = 'Check out this app on Sociorax!',
  url,
}: ShareModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [bluetoothStatus, setBluetoothStatus] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const shareUrl =
    url || (typeof window !== 'undefined' ? window.location.href : 'https://sociorax.com');
  const encodedUrl = encodeURIComponent(shareUrl);
  const shareText = `Check out ${title} on Sociorax - ${description}`;
  const encodedText = encodeURIComponent(shareText);

  useEffect(() => {
    if (isOpen) {
      setCopiedLink(false);
      setCopiedEmbed(false);
      setShowEmbedModal(false);
      setBluetoothStatus(null);
      // Wait for DOM to render then check scroll state
      setTimeout(checkScrollButtons, 100);
    }
  }, [isOpen]);

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 240;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(checkScrollButtons, 350);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleCopyEmbed = async () => {
    try {
      const embedCode = `<iframe src="${shareUrl}" width="100%" height="600" frameborder="0" title="${title} - Sociorax"></iframe>`;
      await navigator.clipboard.writeText(embedCode);
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2200);
    } catch (err) {
      console.error('Failed to copy embed code:', err);
    }
  };

  const handleBluetoothShare = async () => {
    setBluetoothStatus('Searching for nearby devices...');
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Share ${title} via Bluetooth / Quick Share`,
          text: `${title} - ${description}`,
          url: shareUrl,
        });
        setBluetoothStatus(null);
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') {
          setBluetoothStatus(null);
          return;
        }
      }
    }

    if (typeof navigator !== 'undefined' && 'bluetooth' in navigator) {
      try {
        // @ts-ignore
        const device = await (navigator as any).bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: ['generic_access'],
        });
        if (device) {
          setBluetoothStatus(`Paired with ${device.name || 'Device'}`);
          setTimeout(() => setBluetoothStatus(null), 3000);
        }
      } catch (err: any) {
        setBluetoothStatus('Link copied. Ready to beam over Bluetooth.');
        handleCopyLink();
        setTimeout(() => setBluetoothStatus(null), 3000);
      }
    } else {
      setBluetoothStatus('Link copied. Ready to beam over Bluetooth / Quick Share.');
      handleCopyLink();
      setTimeout(() => setBluetoothStatus(null), 3000);
    }
  };

  const shareItems = [
    {
      id: 'embed',
      name: 'Embed',
      bg: 'bg-white text-zinc-900',
      icon: <Code2 className="w-6 h-6 stroke-[2.2]" />,
      action: () => setShowEmbedModal(true),
    },
    {
      id: 'messages',
      name: 'Messages',
      bg: 'bg-white text-blue-500',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="24" fill="#1A73E8" />
          <path
            d="M34 23.5C34 28.1944 29.5228 32 24 32C22.3787 32 20.8465 31.6748 19.4849 31.0933L14 33L15.6888 28.7231C14.6294 27.2474 14 25.4497 14 23.5C14 18.8056 18.4772 15 24 15C29.5228 15 34 18.8056 34 23.5Z"
            fill="white"
          />
        </svg>
      ),
      url: `sms:?body=${encodeURIComponent(`Check out ${title} on Sociorax: ${shareUrl}`)}`,
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      bg: 'bg-[#25D366]',
      icon: (
        <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    },
    {
      id: 'facebook',
      name: 'Facebook',
      bg: 'bg-[#1877F2]',
      icon: (
        <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      id: 'x',
      name: 'X',
      bg: 'bg-black border border-white/20',
      icon: (
        <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      bg: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
      icon: (
        <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      action: () => {
        handleCopyLink();
        window.open('https://instagram.com', '_blank');
      },
    },
    {
      id: 'bluetooth',
      name: 'Bluetooth',
      bg: 'bg-gradient-to-tr from-[#0051D5] to-[#0A84FF]',
      icon: <Bluetooth className="w-6 h-6 text-white stroke-[2.2]" />,
      action: handleBluetoothShare,
    },
    {
      id: 'quickshare',
      name: 'Nearby',
      bg: 'bg-gradient-to-tr from-[#0F9D58] to-[#34A853]',
      icon: <Radio className="w-6 h-6 text-white stroke-[2.2]" />,
      action: handleBluetoothShare,
    },
    {
      id: 'email',
      name: 'Email',
      bg: 'bg-gradient-to-tr from-[#EA4335] to-[#FF6B6B]',
      icon: <Mail className="w-6 h-6 text-white" />,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
        `Hi,\n\nTake a look at ${title} on Sociorax:\n${description}\n\nLink: ${shareUrl}`
      )}`,
    },
    {
      id: 'telegram',
      name: 'Telegram',
      bg: 'bg-[#2AABEE]',
      icon: (
        <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      ),
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      id: 'reddit',
      name: 'Reddit',
      bg: 'bg-[#FF4500]',
      icon: (
        <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.702zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      ),
      url: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedText}`,
    },
    {
      id: 'qr',
      name: 'QR Code',
      bg: 'bg-zinc-800 border border-white/20',
      icon: <QrCode className="w-6 h-6 text-white stroke-[2.2]" />,
      action: () => {
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodedUrl}&bgcolor=181a20&color=ffffff&margin=12`;
        window.open(qrUrl, '_blank');
      },
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* YouTube-style Share Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative z-10 w-full max-w-[510px] bg-[#212121] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl text-white select-none"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base sm:text-lg font-medium text-white tracking-tight">
                Share
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {/* Horizontal Scrollable Icons Row with Arrow Navigation */}
            <div className="relative group/scroll mb-6">
              {/* Left Scroll Button */}
              {canScrollLeft && (
                <button
                  type="button"
                  onClick={() => handleScroll('left')}
                  className="absolute -left-3 top-6 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#303030] hover:bg-[#3f3f3f] text-white flex items-center justify-center shadow-lg border border-white/10 cursor-pointer transition-all active:scale-95"
                  title="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Scrollable Container */}
              <div
                ref={scrollContainerRef}
                onScroll={checkScrollButtons}
                className="flex items-start gap-4 overflow-x-auto scrollbar-none py-1 px-1 scroll-smooth no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {shareItems.map((item) => {
                  const content = (
                    <div className="flex flex-col items-center gap-2 text-center shrink-0 w-[60px] group cursor-pointer">
                      <div
                        className={`w-14 h-14 rounded-full ${item.bg} flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105 group-active:scale-95`}
                      >
                        {item.icon}
                      </div>
                      <span className="text-xs font-normal text-zinc-300 group-hover:text-white truncate max-w-[62px]">
                        {item.name}
                      </span>
                    </div>
                  );

                  if (item.action) {
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={item.action}
                        className="bg-transparent border-0 p-0 focus:outline-none shrink-0"
                      >
                        {content}
                      </button>
                    );
                  }

                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus:outline-none shrink-0"
                    >
                      {content}
                    </a>
                  );
                })}
              </div>

              {/* Right Scroll Button */}
              {canScrollRight && (
                <button
                  type="button"
                  onClick={() => handleScroll('right')}
                  className="absolute -right-3 top-6 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#303030] hover:bg-[#3f3f3f] text-white flex items-center justify-center shadow-lg border border-white/10 cursor-pointer transition-all active:scale-95"
                  title="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Bluetooth Status if active */}
            {bluetoothStatus && (
              <div className="mb-4 p-2.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-xs text-blue-300 flex items-center justify-between">
                <span>{bluetoothStatus}</span>
                <Bluetooth className="w-4 h-4 text-blue-400 animate-pulse" />
              </div>
            )}

            {/* Bottom YouTube-style Link Box with Copy Button */}
            <div className="w-full bg-[#0f0f0f] border border-[#303030] rounded-xl p-1.5 pl-4 flex items-center justify-between gap-3">
              <span className="text-xs sm:text-sm text-zinc-200 truncate font-normal select-all">
                {shareUrl}
              </span>

              <button
                type="button"
                onClick={handleCopyLink}
                className="shrink-0 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <span>Copy</span>
                )}
              </button>
            </div>

            {/* Embed Code Sub-Modal overlay if Embed clicked */}
            {showEmbedModal && (
              <div className="absolute inset-0 bg-[#212121] rounded-2xl p-5 flex flex-col z-30">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-blue-400" />
                    <span>Embed Web App</span>
                  </h4>
                  <button
                    onClick={() => setShowEmbedModal(false)}
                    className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 bg-[#0f0f0f] border border-[#303030] rounded-xl p-3 text-xs font-mono text-zinc-300 overflow-y-auto mb-4 select-all">
                  {`<iframe src="${shareUrl}" width="100%" height="600" frameborder="0" title="${title} - Sociorax"></iframe>`}
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setShowEmbedModal(false)}
                    className="px-4 py-2 rounded-full text-xs text-zinc-400 hover:text-white hover:bg-white/10"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCopyEmbed}
                    className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5"
                  >
                    {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : null}
                    <span>{copiedEmbed ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
