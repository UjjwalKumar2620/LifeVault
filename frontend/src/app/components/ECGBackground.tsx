import { motion } from 'motion/react';

export function ECGBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {/* Multiple ECG waves moving across the screen */}
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-full"
          style={{
            top: `${30 + index * 15}%`,
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 15 + index * 3,
            repeat: Infinity,
            ease: 'linear',
            delay: index * 2,
          }}
        >
          <svg
            width="100%"
            height="60"
            viewBox="0 0 1200 60"
            fill="none"
            preserveAspectRatio="none"
            className="w-full"
          >
            <defs>
              <linearGradient id={`ecg-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0" />
                <stop offset="20%" stopColor="#3B82F6" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8" />
                <stop offset="80%" stopColor="#1E40AF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            <motion.path
              d="M0,30 L200,30 L220,10 L240,50 L260,20 L280,30 L300,30 L320,15 L340,45 L360,25 L380,30 L600,30 L620,10 L640,50 L660,20 L680,30 L700,30 L720,15 L740,45 L760,25 L780,30 L1000,30 L1020,10 L1040,50 L1060,20 L1080,30 L1200,30"
              stroke={`url(#ecg-gradient-${index})`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                pathLength: [0, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                pathLength: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                opacity: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            />
          </svg>
        </motion.div>
      ))}
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5F5F5]/50 to-[#F5F5F5]" />
    </div>
  );
}