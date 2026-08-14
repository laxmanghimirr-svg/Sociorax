import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Star,
  Download,
  Share2,
  Check,
  Shield,
  Smartphone,
  Activity,
  Zap,
  MapPin,
  BatteryCharging,
  BarChart3,
  Dumbbell,
  Timer,
  Target,
  PlusCircle,
  Award,
  WifiOff,
  Sliders,
  Layers,
  Maximize2,
  ShieldCheck,
  FileImage,
  Eye,
  QrCode,
  ShieldAlert,
  Wifi,
  Sparkles,
  Clock,
  Image as ImageIcon,
  Crop,
  Wand2,
  FileText,
  Copy,
  Edit3,
  Lock,
  Cpu,
  Terminal,
  BookOpen,
  ClipboardCopy,
  FolderHeart,
} from 'lucide-react';
import { AppItem } from '../types/app';
import { AppMockup } from './AppMockup';
import { LogoMark } from './Primitives';
import { AppRating } from './AppRating';
import {
  UserRating,
  subscribeAppRatings,
  calculateRatingStats,
} from '../services/ratingService';

interface AppDetailPageProps {
  app: AppItem;
  onBack: () => void;
  onOpenDownloadModal?: () => void;
}

export function AppDetailPage({ app, onBack, onOpenDownloadModal }: AppDetailPageProps) {
  const [copied, setCopied] = useState(false);
  const [reviews, setReviews] = useState<UserRating[]>([]);
  const [reviewsStatus, setReviewsStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  const isComingSoon = app.isComingSoon || app.downloadSize === 'Coming Soon';

  const setupSubscription = useCallback(() => {
    setReviewsStatus('loading');
    setReviewsError(null);

    const unsubscribe = subscribeAppRatings(
      app.id,
      (fetched) => {
        const appReviews = fetched.filter((r) => r.appId === app.id);
        setReviews(appReviews);
        setReviewsStatus('success');
      },
      (err) => {
        console.error(`Error subscribing to reviews for ${app.id}:`, err);
        setReviewsError(err.message || 'Failed to load reviews');
        setReviewsStatus('error');
      }
    );

    return unsubscribe;
  }, [app.id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const unsubscribe = setupSubscription();
    return () => unsubscribe();
  }, [setupSubscription]);

  const stats = calculateRatingStats(reviews);

  let displayRating = 'No rating yet';
  let displayReviewsCount = 'No reviews yet';

  if (isComingSoon) {
    displayRating = 'Soon';
    displayReviewsCount = '0';
  } else if (reviewsStatus === 'loading') {
    displayRating = 'Loading...';
    displayReviewsCount = 'Loading reviews...';
  } else if (reviewsStatus === 'error') {
    displayRating = 'Error';
    displayReviewsCount = 'Unable to load reviews';
  } else if (reviewsStatus === 'success') {
    displayRating = stats.averageRating;
    displayReviewsCount = stats.displayReviewsCount;
  }

  const displaySize = isComingSoon ? 'Coming Soon' : app.downloadSize;

  // Helper to map string icon names to Lucide icon components
  const renderIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-blue-400" };
    switch (iconName) {
      case 'Activity': return <Activity {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'MapPin': return <MapPin {...props} />;
      case 'BatteryCharging': return <BatteryCharging {...props} />;
      case 'BarChart3': return <BarChart3 {...props} />;
      case 'Dumbbell': return <Dumbbell {...props} />;
      case 'Timer': return <Timer {...props} />;
      case 'Target': return <Target {...props} />;
      case 'PlusCircle': return <PlusCircle {...props} />;
      case 'Award': return <Award {...props} />;
      case 'WifiOff': return <WifiOff {...props} />;
      case 'Sliders': return <Sliders {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Maximize2': return <Maximize2 {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'FileImage': return <FileImage {...props} />;
      case 'Eye': return <Eye {...props} />;
      case 'QrCode': return <QrCode {...props} />;
      case 'ShieldAlert': return <ShieldAlert {...props} />;
      case 'Wifi': return <Wifi {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Clock': return <Clock {...props} />;
      case 'ImageIcon': return <ImageIcon {...props} />;
      case 'Crop': return <Crop {...props} />;
      case 'Wand2': return <Wand2 {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'Copy': return <Copy {...props} />;
      case 'Edit3': return <Edit3 {...props} />;
      case 'Lock': return <Lock {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Terminal': return <Terminal {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      case 'ClipboardCopy': return <ClipboardCopy {...props} />;
      case 'FolderHeart': return <FolderHeart {...props} />;
      default: return <Zap {...props} />;
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: app.name,
          text: app.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const apkLink = app.apkUrl || '#';

  const handleApkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!app.apkUrl && onOpenDownloadModal) {
      e.preventDefault();
      onOpenDownloadModal();
    }
  };

  const mockupType = app.screenshots[0]?.mockupType || 'motion';
  const playStoreLink =
    app.playStoreUrl && app.playStoreUrl.trim().length > 0
      ? app.playStoreUrl
      : `https://play.google.com/store/apps/details?id=com.sociorax.${app.slug.replace(/-/g, '')}`;
  const hasPlayStoreUrl = true;

  return (
    <div className="min-h-screen text-slate-100 pb-20 pt-20 md:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back Navigation Button */}
      <button
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-full border border-white/10 transition-all cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Store</span>
      </button>

      {/* Main App Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* App Info Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-start gap-5">
            <div className="relative shrink-0">
              {app.iconUrl ? (
                <img
                  src={app.iconUrl}
                  alt={`${app.name} Icon`}
                  className="w-20 h-20 md:w-24 md:h-24 object-contain rounded-2xl shadow-2xl border border-white/10"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-white/10 flex items-center justify-center p-4 shadow-2xl">
                  <LogoMark className="w-full h-full text-blue-400" />
                </div>
              )}
            </div>

            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                  {app.category}
                </span>
                <span className="text-[11px] font-medium text-white/60 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                  v{app.version}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight truncate">
                {app.name}
              </h1>

              <p className="text-xs text-white/60 font-medium truncate">
                Developed by Sociorax Inc.
              </p>
            </div>
          </div>

          <p className="text-sm md:text-base text-white/80 leading-relaxed font-normal">
            {app.shortDescription}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 liquid-glass rounded-2xl border border-white/10">
            <div className="text-center space-y-1">
              <div className="text-xs text-white/50 font-medium">Rating</div>
              {!isComingSoon ? (
                <div className="flex items-center justify-center gap-1 font-bold text-amber-400 text-xs md:text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{displayRating}</span>
                </div>
              ) : (
                <div className="font-bold text-blue-400 text-xs md:text-sm">
                  Soon
                </div>
              )}
            </div>

            <div className="text-center space-y-1 border-x border-white/10 px-2">
              <div className="text-xs text-white/50 font-medium">Size</div>
              <div className="font-bold text-white text-xs md:text-sm">
                {displaySize}
              </div>
            </div>

            <div className="text-center space-y-1">
              <div className="text-xs text-white/50 font-medium">Reviews</div>
              <div className="font-bold text-emerald-400 text-xs md:text-sm truncate">
                {displayReviewsCount}
              </div>
            </div>
          </div>

          {/* Download Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {!isComingSoon ? (
              <a
                href={apkLink}
                download={app.apkUrl ? `${app.slug}.apk` : undefined}
                onClick={handleApkClick}
                target={apkLink.startsWith('http') ? '_blank' : undefined}
                rel={apkLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-2xl shadow-xl hover:shadow-blue-500/25 transition-all cursor-pointer group"
              >
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                <span>Download APK ({app.downloadSize})</span>
              </a>
            ) : (
              <div className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-2xl border border-blue-500/30">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Coming Soon</span>
              </div>
            )}

            {hasPlayStoreUrl && (
              <a
                href={playStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-2xl border border-white/10 transition-all cursor-pointer hover:border-emerald-500/40 hover:text-emerald-300"
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Get it on Google Play</span>
              </a>
            )}

            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center p-3.5 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-2xl border border-white/10 transition-all cursor-pointer"
              title="Share App"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Privacy & Safety Guarantee */}
          <div className="flex items-center gap-2 text-[11px] text-white/50 pt-1">
            <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Direct & Official Package • Safe Direct Download</span>
          </div>
        </div>

        {/* Interactive App Mockup Preview */}
        <div className="lg:col-span-5 flex justify-center">
          <AppMockup type={mockupType} title={app.name} />
        </div>
      </div>

      {/* Detailed Overview Section */}
      <section className="mt-16">
        <div className="liquid-glass rounded-3xl p-6 md:p-8 border border-white/10 space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">
            About {app.name}
          </h2>
          <p className="text-xs md:text-sm text-white/70 leading-relaxed whitespace-pre-line">
            {app.longDescription}
          </p>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="mt-12 md:mt-16">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
          Key Features & Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {app.features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="liquid-glass p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 shrink-0">
                {renderIcon(feature.iconName)}
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Specifications & Compatibility Sidebar */}
      <section className="mt-12 md:mt-16">
        <div className="liquid-glass rounded-3xl p-6 md:p-8 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-4">
            Technical Specifications
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-xs">
            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
              <span className="text-white/40 block">Version</span>
              <span className="font-semibold text-white">{app.version}</span>
            </div>

            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
              <span className="text-white/40 block">Updated</span>
              <span className="font-semibold text-white">{app.updatedDate}</span>
            </div>

            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
              <span className="text-white/40 block">Download Size</span>
              <span className="font-semibold text-white">{displaySize}</span>
            </div>

            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
              <span className="text-white/40 block">Category</span>
              <span className="font-semibold text-white truncate block">{app.category}</span>
            </div>

            {!isComingSoon ? (
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="text-white/40 block">Rating</span>
                <span className="font-semibold text-amber-400">★ {displayRating}</span>
              </div>
            ) : (
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="text-white/40 block">Status</span>
                <span className="font-semibold text-blue-400">Coming Soon</span>
              </div>
            )}

            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
              <span className="text-white/40 block">Developer</span>
              <span className="font-semibold text-white">Sociorax Inc.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Firebase Ratings & Reviews Component */}
      <section className="mt-12 md:mt-16">
        <AppRating
          app={app}
          reviews={reviews}
          reviewsStatus={reviewsStatus}
          reviewsError={reviewsError}
          onRetry={setupSubscription}
        />
      </section>

      {/* Bottom Call To Action */}
      <section className="mt-12 md:mt-16 text-center">
        <div className="liquid-glass rounded-3xl p-8 md:p-12 border border-white/15 flex flex-col items-center space-y-6">
          {app.iconUrl ? (
            <img
              src={app.iconUrl}
              alt={`${app.name} Logo`}
              className="w-12 h-12 object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          ) : (
            <LogoMark className="w-12 h-12" />
          )}
          <div className="space-y-2 max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Get Started with {app.name} Today
            </h2>
            <p className="text-xs text-white/60">
              Experience maximum efficiency, speed, and privacy on your device.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full max-w-md">
            {!isComingSoon && (
              <a
                href={apkLink}
                download={app.apkUrl ? `${app.slug}.apk` : undefined}
                onClick={handleApkClick}
                target={apkLink.startsWith('http') ? '_blank' : undefined}
                rel={apkLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-2xl text-xs shadow-xl cursor-pointer transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download {app.name} APK</span>
              </a>
            )}

            {hasPlayStoreUrl && (
              <a
                href={playStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl text-xs border border-white/15 transition-all cursor-pointer hover:border-emerald-400/40"
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Get it on Google Play</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
