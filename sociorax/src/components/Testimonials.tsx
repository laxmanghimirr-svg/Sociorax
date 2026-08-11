import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface FeatureCardItem {
  appId: string;
  iconTitle: string;
  description: string;
  subtitle1: string;
  subtitle2: string;
}

interface TestimonialsProps {
  onSelectApp?: (appId: string) => void;
}

const items: FeatureCardItem[] = [
  {
    appId: 'motion-tracker',
    iconTitle: '🏃 Motion Tracker',
    description:
      'Monitor every step of your fitness journey with real-time activity tracking, detailed movement analytics, distance measurement, calorie estimation, and progress insights. Designed to help you stay motivated and achieve your health goals with accuracy and ease.',
    subtitle1: 'Motion Tracker',
    subtitle2: 'Real-Time Activity Monitoring',
  },
  {
    appId: 'photo-compressor',
    iconTitle: '🖼️ Photo Compressor',
    description:
      'Compress high-resolution images in seconds while maintaining exceptional quality. Optimised for faster uploads, reduced storage usage, and seamless sharing across websites, social media, and messaging platforms.',
    subtitle1: 'Photo Compressor',
    subtitle2: 'Fast • Efficient • Lossless Quality',
  },
  {
    appId: 'qr-scanner',
    iconTitle: '📱 QR Scanner',
    description:
      'Scan QR codes instantly with advanced recognition technology. Open websites, connect to Wi-Fi networks, save contacts, access event details, and decode multiple QR formats quickly, securely, and effortlessly.',
    subtitle1: 'QR Scanner',
    subtitle2: 'Fast & Secure Scanning',
  },
  {
    appId: 'pdf-scanner',
    iconTitle: '📄 PDF Scanner',
    description:
      'Transform paper documents into professional-quality PDF files using intelligent edge detection, automatic enhancement, and crystal-clear scanning. Organise, save, and share documents with confidence.',
    subtitle1: 'PDF Scanner',
    subtitle2: 'Smart Document Scanning',
  },
  {
    appId: 'prompt-generator',
    iconTitle: '✨ Prompt Generator',
    description:
      "Generate powerful AI prompts for writing, coding, design, marketing, education, and creative projects. Create professional prompts in seconds to maximise productivity across today's leading AI platforms.",
    subtitle1: 'Prompt Generator',
    subtitle2: 'AI-Powered Creativity',
  },
];

export function Testimonials({ onSelectApp }: TestimonialsProps) {
  return (
    <section id="features" className="w-full px-6 md:px-12 py-20 md:py-28 border-t border-white/10">
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={`${item.subtitle1}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: 'easeOut' }}
            onClick={() => onSelectApp?.(item.appId)}
            className="liquid-glass rounded-2xl p-6 border border-white/10 flex flex-col justify-between cursor-pointer group hover:border-white/30 hover:bg-white/[0.03] transition-all duration-300"
          >
            <div>
              <div className="text-lg font-bold text-white mb-3 flex items-center justify-between">
                <span>{item.iconTitle}</span>
                <span className="text-xs font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              <blockquote className="text-sm text-white/80 leading-[1.6]">
                "{item.description}"
              </blockquote>
            </div>
            <figcaption className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {item.subtitle1}
                </span>
                <span className="text-xs text-white/50">{item.subtitle2}</span>
              </div>
              <span className="text-xs font-medium text-white/70 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/10 group-hover:border-blue-400/40 group-hover:text-white transition-all">
                View App →
              </span>
            </figcaption>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

