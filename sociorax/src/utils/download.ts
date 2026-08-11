import React from 'react';

export type OperatingSystem = 'windows' | 'android' | 'mac' | 'other';

export interface DownloadOption {
  id: 'windows' | 'android';
  label: string;
  sublabel: string;
  version: string;
  fileSize: string;
  fileUrl: string;
  fileName: string;
  extension: '.exe' | '.apk';
}

export const DOWNLOAD_OPTIONS: Record<'windows' | 'android', DownloadOption> = {
  windows: {
    id: 'windows',
    label: 'Download for Windows',
    sublabel: 'Windows 10 & 11 (64-bit .exe)',
    version: '2.4.0',
    fileSize: '15.4 KB',
    fileUrl: '/downloads/Sociorax-Setup-v2.4.0.exe',
    fileName: 'Sociorax-Setup-v2.4.0.exe',
    extension: '.exe',
  },
  android: {
    id: 'android',
    label: 'Download for Android',
    sublabel: 'Android 8.0+ (APK)',
    version: '2.4.0',
    fileSize: '32.6 MB',
    fileUrl: '/downloads/Sociorax-v2.4.0.apk',
    fileName: 'Sociorax-v2.4.0.apk',
    extension: '.apk',
  },
};

/**
 * Detect user's device / platform.
 */
export function detectDeviceOS(): OperatingSystem {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'windows';
  }

  const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';

  if (/android/i.test(ua)) {
    return 'android';
  }

  if (/win/i.test(ua) || /windows/i.test(navigator.platform || '')) {
    return 'windows';
  }

  if (/mac/i.test(ua) || /macintosh/i.test(navigator.platform || '')) {
    return 'mac';
  }

  return 'other';
}

/**
 * Triggers browser download for a specific platform.
 * Verifies file availability beforehand.
 */
export async function executeDownload(
  platformKey: 'windows' | 'android',
  options?: {
    onStart?: () => void;
    onError?: (errorMessage: string) => void;
    onSuccess?: () => void;
  }
) {
  const item = DOWNLOAD_OPTIONS[platformKey];
  if (!item) return;

  options?.onStart?.();

  try {
    // 1. Check file availability with fetch
    let response: Response | null = null;
    try {
      response = await fetch(item.fileUrl, { method: 'HEAD' });
      if (!response.ok) {
        // Fallback to GET check
        response = await fetch(item.fileUrl, { method: 'GET' });
      }
    } catch {
      response = null;
    }

    if (!response || !response.ok) {
      throw new Error(
        `The ${item.label.replace('Download for ', '')} installer (${item.fileName}) is currently unavailable or experiencing server issues. Please try again shortly.`
      );
    }

    // 2. Fetch blob and trigger standard browser download (without auto-installing)
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = blobUrl;
    a.download = item.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Clean up blob memory
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 15000);

    options?.onSuccess?.();
  } catch (err: any) {
    console.error('Download execution failed:', err);
    options?.onError?.(
      err?.message ||
        `Unable to download ${item.fileName}. The file could not be retrieved from the server.`
    );
  }
}
