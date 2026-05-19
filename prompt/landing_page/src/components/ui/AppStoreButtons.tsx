import { motion } from 'framer-motion';

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a1.99 1.99 0 0 1-.374-1.16V2.974c0-.43.15-.83.373-1.16zm3.196 20.095l9.85-5.71-4.03-4.03-5.82 9.74zm12.27-8.455l2.77-1.6c.57-.33.91-.94.91-1.6s-.34-1.27-.91-1.6l-2.77-1.6-4.39 4.39 4.39 4.41zM6.805 2.914l5.82 9.74 4.03-4.03-9.85-5.71z" />
    </svg>
  );
}

type AppStoreButtonsProps = {
  variant?: 'dark' | 'light';
  className?: string;
};

export function AppStoreButtons({ variant = 'dark', className = '' }: AppStoreButtonsProps) {
  const base =
    variant === 'dark'
      ? 'bg-gray-900 text-white hover:bg-gray-800'
      : 'bg-white text-gray-900 hover:bg-orange-50 border border-gray-200';

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <motion.a
        href="#download"
        aria-label="Download on the App Store"
        className={`inline-flex items-center gap-3 rounded-2xl px-5 py-3 text-left shadow-card transition-colors ${base}`}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <AppleIcon />
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] opacity-80">Download on the</span>
          <span className="text-sm font-semibold">App Store</span>
        </span>
      </motion.a>
      <motion.a
        href="#download"
        aria-label="Get it on Google Play"
        className={`inline-flex items-center gap-3 rounded-2xl px-5 py-3 text-left shadow-card transition-colors ${base}`}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <PlayIcon />
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] opacity-80">Get it on</span>
          <span className="text-sm font-semibold">Google Play</span>
        </span>
      </motion.a>
    </div>
  );
}
