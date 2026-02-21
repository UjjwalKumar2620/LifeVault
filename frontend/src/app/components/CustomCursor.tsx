import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* ECG Pulse Line Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-normal"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 10,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {!isHovering ? (
          // ECG Line - Default State
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
            <motion.path
              d="M0,10 L8,10 L10,5 L12,15 L14,8 L16,10 L40,10"
              stroke="#2563EB"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                pathLength: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                filter: 'drop-shadow(0 0 4px rgba(37, 99, 235, 0.8))',
              }}
            />
          </svg>
        ) : (
          // Pulse Ring - Hover State
          <motion.div
            className="relative w-10 h-10 flex items-center justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Outer expanding ring */}
            <motion.div
              className="absolute w-8 h-8 rounded-full border-2 border-blue-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              style={{
                filter: 'drop-shadow(0 0 6px rgba(37, 99, 235, 0.8)) drop-shadow(0 0 12px rgba(59, 130, 246, 0.4))',
              }}
            />
            
            {/* Inner pulse */}
            <motion.div
              className="absolute w-4 h-4 rounded-full bg-blue-500"
              animate={{
                scale: isClicking ? [1, 0.6, 1] : [1, 1.2, 1],
                opacity: [0.9, 0.6, 0.9],
              }}
              transition={{
                duration: isClicking ? 0.3 : 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(37, 99, 235, 0.9)) drop-shadow(0 0 16px rgba(59, 130, 246, 0.5))',
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </>
  );
}