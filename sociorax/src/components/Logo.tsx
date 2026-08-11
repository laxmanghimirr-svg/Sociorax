import React, { useState } from 'react';
import logoAsset from '../assets/images/sociorax_new_logo_1785483404521.jpg';

interface LogoProps {
  className?: string;
  alt?: string;
}

export function Logo({ className = 'w-7 h-7', alt = 'Sociorax Logo' }: LogoProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Fallback chain: Bundled asset -> /logo.png -> /logo.jpg -> /icon.png
  const fallbackSources = [logoAsset, '/logo.png', '/logo.jpg', '/icon.png'];

  const handleError = () => {
    if (srcIndex < fallbackSources.length - 1) {
      setSrcIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    // Graceful SVG fallback in case all image sources fail
    return (
      <div
        className={`shrink-0 aspect-square rounded-xl bg-gradient-to-tr from-purple-600 via-blue-500 to-cyan-400 flex items-center justify-center font-bold text-white text-xs shadow-sm ${className}`}
        aria-label={alt}
      >
        S
      </div>
    );
  }

  return (
    <img
      src={fallbackSources[srcIndex]}
      alt={alt}
      onError={handleError}
      referrerPolicy="no-referrer"
      loading="eager"
      decoding="async"
      className={`shrink-0 aspect-square object-cover rounded-xl shadow-sm ${className}`}
    />
  );
}

export default Logo;
