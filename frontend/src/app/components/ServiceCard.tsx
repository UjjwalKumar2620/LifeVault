import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { useState, useRef, MouseEvent } from 'react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function ServiceCard({ icon: Icon, title, description, delay = 0 }: ServiceCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className="cursor-hover group relative"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {/* Glassmorphism card */}
      <div className="relative overflow-hidden rounded-3xl p-8 h-full">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl" />
        
        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-3xl border border-blue-200 shadow-xl shadow-blue-100/50" />
        
        {/* Hover gradient effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        
        {/* Moving light effect that follows cursor */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle 200px at ${mousePosition.x}% ${mousePosition.y}%, rgba(37, 99, 235, 0.15) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)`,
          }}
        />
        
        {/* Outer glow ring around card */}
        <motion.div
          className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle 180px at ${mousePosition.x}% ${mousePosition.y}%, rgba(37, 99, 235, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)`,
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon container */}
          <motion.div
            className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30"
            whileHover={{ 
              scale: 1.1, 
              rotate: 5,
              transition: { duration: 0.3 }
            }}
          >
            <Icon className="w-8 h-8 text-white" strokeWidth={2} />
          </motion.div>
          
          {/* Title */}
          <h3 className="text-2xl font-semibold mb-3 text-[#1E293B] group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-[#64748B] leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-bl-full opacity-50" />
      </div>
    </motion.div>
  );
}