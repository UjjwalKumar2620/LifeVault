import { useState, useRef, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface GlowButtonProps {
  children: React.ReactNode;
  icon?: LucideIcon;
}

export function GlowButton({ children, icon: Icon }: GlowButtonProps) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      className="cursor-hover group relative px-10 py-5 rounded-full overflow-hidden shadow-2xl shadow-blue-500/30 hover:shadow-blue-600/50 transition-all duration-500 hover:scale-105"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-all duration-700" />

      {/* Moving Light Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 150px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(59, 130, 246, 0.2) 30%, transparent 70%)`,
        }}
      />

      {/* Outer Glow Ring that follows cursor */}
      <motion.div
        className="absolute -inset-1 opacity-0 group-hover:opacity-100 rounded-full blur-xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 120px at ${mousePosition.x}% ${mousePosition.y}%, rgba(37, 99, 235, 0.6) 0%, rgba(59, 130, 246, 0.4) 40%, transparent 70%)`,
        }}
      />

      {/* Button Text */}
      <span className="relative z-10 text-white font-semibold text-lg flex items-center gap-3">
        {children}
        {Icon && <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />}
      </span>
    </button>
  );
}