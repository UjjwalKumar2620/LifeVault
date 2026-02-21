import { motion } from 'motion/react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Main Heartbeat ECG Pattern - Horizontal Continuous Waves */}
      <div className="absolute inset-0 opacity-[0.18]">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={`heartbeat-${index}`}
            className="absolute w-[200%]"
            style={{
              top: `${10 + index * 15}%`,
              left: '-50%',
            }}
            animate={{
              x: ['0%', '25%'],
            }}
            transition={{
              duration: 25 + index * 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <svg
              width="100%"
              height="100"
              viewBox="0 0 2000 100"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id={`heartbeat-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={index % 2 === 0 ? "#FF4444" : "#999999"} />
                  <stop offset="50%" stopColor={index % 2 === 0 ? "#999999" : "#FF4444"} />
                  <stop offset="100%" stopColor={index % 2 === 0 ? "#FF4444" : "#999999"} />
                </linearGradient>
              </defs>
              
              {/* Repeating ECG heartbeat pattern */}
              <path
                d={`
                  M0,50 L80,50 
                  L90,30 L100,70 L110,40 L120,50 
                  L300,50
                  L310,30 L320,70 L330,40 L340,50
                  L520,50
                  L530,30 L540,70 L550,40 L560,50
                  L740,50
                  L750,30 L760,70 L770,40 L780,50
                  L960,50
                  L970,30 L980,70 L990,40 L1000,50
                  L1180,50
                  L1190,30 L1200,70 L1210,40 L1220,50
                  L1400,50
                  L1410,30 L1420,70 L1430,40 L1440,50
                  L1620,50
                  L1630,30 L1640,70 L1650,40 L1660,50
                  L1840,50
                  L1850,30 L1860,70 L1870,40 L1880,50
                  L2000,50
                `}
                stroke={`url(#heartbeat-gradient-${index})`}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Larger, More Prominent Center Heartbeat */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.25]">
        <motion.div
          className="w-full"
          animate={{
            x: ['-50%', '0%', '-50%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg
            width="200%"
            height="200"
            viewBox="0 0 2000 200"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            className="w-full"
          >
            <defs>
              <linearGradient id="main-heartbeat" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#999999" stopOpacity="0.6" />
                <stop offset="25%" stopColor="#FF4444" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FF6B6B" stopOpacity="1" />
                <stop offset="75%" stopColor="#FF4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#999999" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            
            <path
              d={`
                M0,100 L150,100 
                L165,60 L180,140 L195,70 L210,100 
                L400,100
                L415,60 L430,140 L445,70 L460,100
                L650,100
                L665,60 L680,140 L695,70 L710,100
                L900,100
                L915,60 L930,140 L945,70 L960,100
                L1150,100
                L1165,60 L1180,140 L1195,70 L1210,100
                L1400,100
                L1415,60 L1430,140 L1445,70 L1460,100
                L1650,100
                L1665,60 L1680,140 L1695,70 L1710,100
                L1900,100
                L1915,60 L1930,140 L1945,70 L1960,100
                L2000,100
              `}
              stroke="url(#main-heartbeat)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 opacity-[0.06]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#999999" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Soft Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F5]/80 via-transparent to-[#F5F5F5]/80" />
    </div>
  );
}