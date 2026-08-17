export interface AppFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface AppScreenshot {
  title: string;
  caption: string;
  gradient: string;
  mockupType: 'motion' | 'exercise' | 'photo' | 'qr' | 'pdf' | 'prompt' | 'watermark';
}

export interface AppItem {
  id: string;
  slug: string;
  name: string;
  iconTitle: string;
  iconUrl?: string;
  category: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  playStoreUrl: string; // Placeholder for Google Play Store link (e.g., "")
  apkUrl?: string; // Placeholder for direct APK file download link
  rating: string;
  reviewsCount: string;
  downloadSize: string;
  version: string;
  updatedDate: string;
  isComingSoon?: boolean;
  features: AppFeature[];
  screenshots: AppScreenshot[];
  highlights: string[];
}
