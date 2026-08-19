import { AppItem } from '../types/app';
import motionTrackerLogo from '../assets/images/Motion tracker.png';
import photoCompressorLogo from '../assets/images/Photo compress.png';
import promptGeneratorLogo from '../assets/images/prompt gen ai.png';
import pdfScannerLogo from '../assets/images/pdf scanner.png';
import qrScannerLogo from '../assets/images/qr scanner.png';
import removeAiWatermarkLogo from '../assets/images/remove_ai_watermark_1786967367537.jpg';

export const APPS_DATA: AppItem[] = [
  {
    id: 'motion-tracker',
    slug: 'motion-tracker',
    name: 'Motion Tracker',
    iconTitle: '🏃 Motion Tracker',
    iconUrl: motionTrackerLogo,
    category: 'Fitness & Health',
    tagline: 'Real-Time Activity & Precision Movement Analytics',
    shortDescription:
      'Monitor every step of your fitness journey with real-time activity tracking, detailed movement analytics, distance measurement, calorie estimation, and progress insights.',
    longDescription:
      'Motion Tracker is your ultimate intelligent fitness companion engineered for high-precision movement detection and daily activity analytics. Leveraging advanced sensor fusion algorithms, Motion Tracker captures steps, pace, elevation change, active calories burned, and movement intensity without draining your battery. Whether you are running, cycling, hiking, or walking, gain instant visual feedback on your performance and build lasting health habits.',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sociorax.motiontracker', // Example Play Store link
    apkUrl: 'https://github.com/laxmanghimirr-svg/Motion-Tracker/releases/download/v1.0.0/Motion-Tracker.apk',
    rating: '',
    reviewsCount: '',
    downloadSize: '42.3 MB',
    version: '2.4.0',
    updatedDate: 'July 2026',
    highlights: [
      'Real-time GPS & motion sensor tracking',
      'Intelligent calorie & active minutes estimation',
      'Custom route mapping with elevation profiles',
      'Ultra-low battery background sensor mode',
      'Comprehensive weekly & monthly health reports',
    ],
    features: [
      {
        title: 'Precision Sensor Fusion',
        description: 'Combines accelerometer, gyroscope, and GPS data for pinpoint accuracy in step counting and stride measurement.',
        iconName: 'Activity',
      },
      {
        title: 'Live Pace & Distance',
        description: 'Track your speed, split times, and distance milestones with audio feedback and haptic alerts.',
        iconName: 'Zap',
      },
      {
        title: 'Route Mapping & GPS',
        description: 'Visualize your running and cycling paths on high-resolution interactive satellite maps.',
        iconName: 'MapPin',
      },
      {
        title: 'Battery Saver Engine',
        description: 'Advanced background execution optimized to minimize power consumption during all-day recording.',
        iconName: 'BatteryCharging',
      },
      {
        title: 'Health Dashboard',
        description: 'Interactive chart visualizations showing daily trends, heart rate zones, and active streak goals.',
        iconName: 'BarChart3',
      },
      {
        title: 'Export & Backup',
        description: 'Export your workout data to GPX, CSV, or sync directly with native health frameworks.',
        iconName: 'Share2',
      },
    ],
    screenshots: [
      {
        title: 'Live Tracking Dashboard',
        caption: 'View real-time distance, current pace, and active calories with fluid animation.',
        gradient: 'from-blue-600/30 to-indigo-900/40',
        mockupType: 'motion',
      },
      {
        title: 'GPS Path & Elevation',
        caption: 'Interactive satellite map displaying your exact workout path and altitude changes.',
        gradient: 'from-cyan-500/20 to-blue-800/40',
        mockupType: 'motion',
      },
      {
        title: 'Weekly Performance Analytics',
        caption: 'Comprehensive charts comparing your step volume and workout intensity over time.',
        gradient: 'from-blue-700/30 to-purple-900/40',
        mockupType: 'motion',
      },
    ],
  },

  {
    id: 'photo-compressor',
    slug: 'photo-compressor',
    name: 'Photo Compressor',
    iconTitle: '🖼️ Photo Compressor',
    iconUrl: photoCompressorLogo,
    category: 'Utilities & Media',
    tagline: 'Fast, Efficient & Lossless Image Optimization',
    shortDescription:
      'Compress high-resolution images in seconds while maintaining exceptional visual quality. Optimized for faster uploads, reduced storage, and instant sharing.',
    longDescription:
      'Photo Compressor gives you complete control over your photo library storage. Using cutting-edge spatial compression algorithms, it reduces image file sizes by up to 90% with zero noticeable loss in visual clarity. Perfect for freeing up phone storage, speeding up website upload times, sending emails, and optimizing photos for social media. Includes batch compression, EXIF data stripping, custom resolution resizing, and target file size sliders.',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sociorax.photocompress',
    apkUrl: 'https://github.com/laxmanghimirr-svg/photo-compress/releases/download/v1.0.0/photo.Compress.apk',
    rating: '',
    reviewsCount: '',
    downloadSize: '26.3 MB',
    version: '2.5.2',
    updatedDate: 'July 2026',
    highlights: [
      'Compress photos up to 90% smaller without quality loss',
      'Batch processing for hundreds of images simultaneously',
      'Target file size slider (e.g. under 500 KB)',
      'Custom width & height aspect ratio resizer',
      'Privacy focused: 100% on-device local compression',
    ],
    features: [
      {
        title: 'Lossless Compression Engine',
        description: 'Advanced algorithms shrink image size while preserving razor-sharp details and vibrant colors.',
        iconName: 'Sliders',
      },
      {
        title: 'Batch Image Processing',
        description: 'Select hundreds of photos from your gallery and compress them all in a single tap.',
        iconName: 'Layers',
      },
      {
        title: 'Target File Size Mode',
        description: 'Set an exact max file size constraint (e.g. 200 KB) and let the engine optimize automatically.',
        iconName: 'Maximize2',
      },
      {
        title: 'EXIF Metadata Stripper',
        description: 'Optionally erase private location GPS tags and camera details before sharing online.',
        iconName: 'ShieldCheck',
      },
      {
        title: 'Multi-Format Support',
        description: 'Convert between PNG, JPEG, WebP, and HEIC formats effortlessly.',
        iconName: 'FileImage',
      },
      {
        title: 'Before vs After Slider',
        description: 'Compare compressed output against the original image at 100% zoom side-by-side.',
        iconName: 'Eye',
      },
    ],
    screenshots: [
      {
        title: 'Before & After Comparison',
        caption: 'Interactive slider showing 85% file size reduction with zero visual distortion.',
        gradient: 'from-purple-600/20 to-blue-900/40',
        mockupType: 'photo',
      },
      {
        title: 'Batch Compression Studio',
        caption: 'Process multiple albums at once with live storage savings metrics.',
        gradient: 'from-blue-600/30 to-indigo-900/40',
        mockupType: 'photo',
      },
      {
        title: 'Format & EXIF Controls',
        caption: 'Customize output dimensions, target file size, and metadata privacy settings.',
        gradient: 'from-indigo-600/20 to-purple-900/40',
        mockupType: 'photo',
      },
    ],
  },

  {
    id: 'qr-scanner',
    slug: 'qr-scanner',
    name: 'QR Scanner',
    iconTitle: '📱 QR Scanner',
    iconUrl: qrScannerLogo,
    category: 'Productivity & Utilities',
    tagline: 'Lightning Fast & Secure Code Scanning Engine',
    shortDescription:
      'Scan QR codes instantly with advanced recognition technology. Open websites, connect to Wi-Fi networks, save contacts, access events, and decode multi-format barcodes.',
    longDescription:
      'QR Scanner is built for speed, safety, and modern utility. Powered by instant camera auto-focus and neural pattern detection, it reads standard QR codes, barcodes, Wi-Fi credentials, vCards, event passes, and payment codes in milliseconds—even in low-light conditions with built-in flashlight support. Features built-in URL safety preview to shield you from phishing links before opening.',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sociorax.qrscan',
    apkUrl: 'https://github.com/laxmanghimirr-svg/QR-Scan/releases/download/v1.0.0/QR-Scan.apk',
    rating: '',
    reviewsCount: '',
    downloadSize: '4.55 MB',
    version: '2.2.0',
    updatedDate: 'July 2026',
    highlights: [
      'Sub-100ms ultra-fast camera code recognition',
      'Automated Wi-Fi auto-connect & contact card saving',
      'Phishing URL security shield & link preview',
      'Flashlight support for dark environment scanning',
      'Custom QR code generator for links, text, and Wi-Fi',
    ],
    features: [
      {
        title: 'Instant Scan Lens',
        description: 'Detects codes instantly from any angle or distance with automatic continuous focus.',
        iconName: 'QrCode',
      },
      {
        title: 'URL Security Shield',
        description: 'Checks links against known threat databases before launching external browser tabs.',
        iconName: 'ShieldAlert',
      },
      {
        title: 'Wi-Fi & Contact Auto-Connect',
        description: 'Connect directly to Wi-Fi networks or import business vCards straight into your contacts.',
        iconName: 'Wifi',
      },
      {
        title: 'Custom QR Generator',
        description: 'Create custom QR codes with personalized colors, logos, and links for your business.',
        iconName: 'Sparkles',
      },
      {
        title: 'History & Favorites',
        description: 'Keep a searchable history log of every code scanned for easy retrieval later.',
        iconName: 'Clock',
      },
      {
        title: 'Gallery Image Scanner',
        description: 'Scan barcodes and QR codes directly from photos saved in your phone gallery.',
        iconName: 'Image',
      },
    ],
    screenshots: [
      {
        title: 'Instant Scanner Lens',
        caption: 'Precision viewfinder overlay with real-time target bounding box and dark mode flash.',
        gradient: 'from-emerald-600/20 to-teal-900/40',
        mockupType: 'qr',
      },
      {
        title: 'Scan Results & Security',
        caption: 'Clean action modal with web page preview, safe link verification, and one-tap actions.',
        gradient: 'from-teal-600/30 to-blue-900/40',
        mockupType: 'qr',
      },
      {
        title: 'Custom QR Creator',
        caption: 'Generate branded QR codes for social profiles, Wi-Fi keys, and business cards.',
        gradient: 'from-cyan-600/20 to-emerald-900/40',
        mockupType: 'qr',
      },
    ],
  },

  {
    id: 'pdf-scanner',
    slug: 'pdf-scanner',
    name: 'PDF Scanner',
    iconTitle: '📄 PDF Scanner',
    iconUrl: pdfScannerLogo,
    category: 'Business & Office',
    tagline: 'Smart Document Digitization & Crystal-Clear PDF Creation',
    shortDescription:
      'Transform paper documents into professional-quality PDF files using intelligent edge detection, automatic color enhancement, and clear scanning.',
    longDescription:
      'PDF Scanner replaces bulky desktop scanners with an intelligent pocket document studio. Capture receipts, contracts, whiteboard notes, book pages, and ID cards with automatic border detection, perspective correction, and shadow removal. Includes built-in OCR (Optical Character Recognition) to search, copy, and extract text from scanned documents in over 30 languages, plus e-signature sign-and-send capabilities.',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sociorax.pdfscanner',
    apkUrl: 'https://github.com/laxmanghimirr-svg/PDF-Scanner/releases/download/v1.0.0/PDF-Scan.apk',
    rating: '',
    reviewsCount: '',
    downloadSize: '37.5 MB',
    version: '1.0.0',
    updatedDate: 'August 2026',
    isComingSoon: false,
    highlights: [
      'Automatic perspective edge cropping & flattening',
      'Smart filters: Magic Color, Black & White, Grayscale',
      'On-device OCR text extraction in 30+ languages',
      'Multi-page PDF compilation & page reordering',
      'E-signature integration & password encryption',
    ],
    features: [
      {
        title: 'Automatic Edge Detection',
        description: 'Identifies document borders instantly and crops away unnecessary background surfaces.',
        iconName: 'Crop',
      },
      {
        title: 'Magic Color Enhancement',
        description: 'Removes shadows, brightens white backgrounds, and sharpens text readability.',
        iconName: 'Wand2',
      },
      {
        title: 'OCR Text Recognition',
        description: 'Extract editable text from scanned pages with high recognition accuracy.',
        iconName: 'FileText',
      },
      {
        title: 'Multi-Page Document Manager',
        description: 'Scan dozens of pages sequentially and reorder or merge them into a single PDF.',
        iconName: 'Copy',
      },
      {
        title: 'E-Sign & Annotate',
        description: 'Add digital signatures, stamps, watermark protection, and handwritten notes.',
        iconName: 'Edit3',
      },
      {
        title: 'Encrypted Cloud Storage',
        description: 'Password protect sensitive PDF files with 256-bit AES encryption before exporting.',
        iconName: 'Lock',
      },
    ],
    screenshots: [
      {
        title: 'Smart Edge Viewfinder',
        caption: 'Auto-detecting document contours in real-time with automatic shutter trigger.',
        gradient: 'from-amber-600/20 to-stone-900/40',
        mockupType: 'pdf',
      },
      {
        title: 'Filter & Enhancement Studio',
        caption: 'Apply Magic Color and Black & White filters for clean printing.',
        gradient: 'from-orange-600/30 to-amber-900/40',
        mockupType: 'pdf',
      },
      {
        title: 'OCR & Signature Suite',
        caption: 'Extract text, search keywords inside document scans, and place digital signatures.',
        gradient: 'from-amber-700/20 to-yellow-900/40',
        mockupType: 'pdf',
      },
    ],
  },

  {
    id: 'prompt-generator',
    slug: 'prompt-generator',
    name: 'Prompt Gen Ai',
    iconTitle: '✨ Prompt Gen Ai',
    iconUrl: promptGeneratorLogo,
    category: 'AI & Productivity',
    tagline: 'Craft Perfect AI Prompts for Maximum Creative Output',
    shortDescription:
      'Generate powerful AI prompts for writing, coding, design, marketing, education, and creative projects in seconds.',
    longDescription:
      'Prompt Gen Ai unlocks the full capability of leading artificial intelligence platforms like Gemini, ChatGPT, Claude, and Midjourney. By utilizing structured prompt engineering templates—including persona framing, task breakdown, constraints, output formatting, and context injection—it formats raw ideas into optimized prompts. Includes a prompt history vault, variable fill-in wizards, and 500+ curated community templates.',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sociorax.promptgen',
    apkUrl: 'https://github.com/laxmanghimirr-svg/Prompt-Gen-AI/releases/download/v1.0.0/Prompt-Gen-AI.apk',
    rating: '',
    reviewsCount: '',
    downloadSize: '40.1 MB',
    version: '2.6.0',
    updatedDate: 'July 2026',
    highlights: [
      'Structured prompt engineering wizard for LLMs & Image AI',
      'Persona, context, task & constraint framing options',
      'One-click prompt copying & direct AI tool launcher',
      '500+ built-in templates for coding, copy, art & research',
      'Personal prompt vault with tagging and quick search',
    ],
    features: [
      {
        title: 'Structured Prompt Builder',
        description: 'Input your topic and automatically format it into role-playing, constraint-driven prompts.',
        iconName: 'Sparkles',
      },
      {
        title: 'LLM & Image AI Modes',
        description: 'Switch between Text AI generation modes and Midjourney / Stable Diffusion style parameter builders.',
        iconName: 'Cpu',
      },
      {
        title: 'Variable Fill-in Templates',
        description: 'Use dynamic bracket variables like {Topic}, {Tone}, and {Length} for repeatable workflows.',
        iconName: 'Terminal',
      },
      {
        title: '500+ Curated Preset Vault',
        description: 'Browse categorized prompt templates for software development, copywriting, marketing, and design.',
        iconName: 'BookOpen',
      },
      {
        title: 'One-Tap Copy & Export',
        description: 'Copy formatted prompts instantly to your clipboard or send directly to native AI apps.',
        iconName: 'ClipboardCopy',
      },
      {
        title: 'Custom Prompt Library',
        description: 'Organize your best-performing prompts with tags, notes, and instant search.',
        iconName: 'FolderHeart',
      },
    ],
    screenshots: [
      {
        title: 'Prompt Creation Studio',
        caption: 'Customize persona, tone, task output constraints, and target AI model in seconds.',
        gradient: 'from-violet-600/30 to-fuchsia-900/40',
        mockupType: 'prompt',
      },
      {
        title: 'Curated Template Library',
        caption: 'Explore 500+ verified prompts for coding, graphic design, and marketing copy.',
        gradient: 'from-fuchsia-600/20 to-purple-900/40',
        mockupType: 'prompt',
      },
      {
        title: 'Live Output Tester',
        caption: 'Preview prompt structure and test prompt variations with variable tags.',
        gradient: 'from-purple-600/30 to-pink-900/40',
        mockupType: 'prompt',
      },
    ],
  },

  {
    id: 'remove-ai-watermark',
    slug: 'remove-ai-watermark',
    name: 'Remove AI Watermark',
    iconTitle: '🪄 Remove AI Watermark',
    iconUrl: removeAiWatermarkLogo,
    category: 'AI & Media Utilities',
    tagline: 'Instantly Erase AI Watermarks, Logos & Overlays with Lossless Quality',
    shortDescription:
      'Effortlessly remove AI watermarks, text stamps, stock logos, date stamps, and unwanted overlays from images with intelligent neural inpainting and zero quality loss.',
    longDescription:
      'Remove AI Watermark is a state-of-the-art visual inpainting tool engineered to cleanly erase watermarks, AI model signatures, stock photo overlays, date stamps, and unwanted photo artifacts. Powered by deep neural context synthesis, it intelligently analyzes surrounding textures, lighting, and color gradients to reconstruct background pixels with flawless fidelity—eliminating blurriness and smudged edges. Perfect for restoring AI-generated artwork, cleaning social media images, and perfecting design assets in seconds with 100% on-device privacy.',
    playStoreUrl: '',
    apkUrl: '',
    rating: '',
    reviewsCount: '',
    downloadSize: 'Soon',
    version: '1.0.0',
    updatedDate: 'August 2026',
    isComingSoon: true,
    highlights: [
      'Deep neural inpainting with seamless texture & color reconstruction',
      'One-tap automatic AI watermark & logo detection',
      'Lossless 4K preservation with zero blur, smearing, or pixelation',
      'Precision brush & smart lasso tools with magnetic edge-snapping',
      'Batch processing for clearing watermarks from multiple images at once',
      '100% on-device privacy — no images uploaded to external servers',
    ],
    features: [
      {
        title: 'Intelligent Neural Inpainting',
        description: 'Advanced deep learning models reconstruct underlying background textures, patterns, and lighting with seamless accuracy.',
        iconName: 'Wand2',
      },
      {
        title: 'Auto AI Stamp Detection',
        description: 'Instantly detects and isolates watermark stamps from Midjourney, DALL-E, Imagen, Stable Diffusion, and stock photo libraries.',
        iconName: 'Sparkles',
      },
      {
        title: 'Precision Brush & Lasso Tool',
        description: 'Fine-tune your removal area with adjustable brush sizes, magnetic edge contouring, and smart lasso selection.',
        iconName: 'Sliders',
      },
      {
        title: 'Lossless 4K Output',
        description: 'Retains original ultra-high resolution, sharp edges, and EXIF camera metadata without compression artifacts.',
        iconName: 'Maximize2',
      },
      {
        title: 'Batch Processing Studio',
        description: 'Clean watermarks and logos from dozens of photos in a single tap with synchronized removal templates.',
        iconName: 'Layers',
      },
      {
        title: '100% On-Device Privacy',
        description: 'All inpainting calculations run locally on your device hardware, keeping your personal photos completely private.',
        iconName: 'ShieldCheck',
      },
    ],
    screenshots: [
      {
        title: 'AI Watermark Remover Studio',
        caption: 'Automatic detection and instant neural inpainting erasing unwanted overlays.',
        gradient: 'from-cyan-600/30 to-blue-900/40',
        mockupType: 'watermark',
      },
      {
        title: 'Before & After Inspection',
        caption: 'Interactive side-by-side comparison showing crystal-clear reconstructed background.',
        gradient: 'from-blue-600/30 to-indigo-900/40',
        mockupType: 'watermark',
      },
      {
        title: 'Precision Selection Tools',
        caption: 'Custom brush and smart lasso tools with live edge detection for pixel-perfect cleanup.',
        gradient: 'from-indigo-600/30 to-purple-900/40',
        mockupType: 'watermark',
      },
    ],
  },
];

export function getAppById(id: string): AppItem | undefined {
  return APPS_DATA.find((app) => app.id === id || app.slug === id);
}
