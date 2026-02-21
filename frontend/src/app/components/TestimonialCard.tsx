import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useState, useRef, MouseEvent } from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  delay?: number;
}

export function TestimonialCard({ quote, author, role, delay = 0 }: TestimonialCardProps) {
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
      className="cursor-hover relative"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-lg border border-[#999999]/20 shadow-lg shadow-[#999999]/5 hover:shadow-xl hover:shadow-[#FF4444]/10 transition-all duration-500 overflow-hidden">
        {/* Moving light effect */}
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle 180px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 68, 68, 0.12) 0%, rgba(153, 153, 153, 0.08) 40%, transparent 70%)`,
          }}
        />
        
        {/* Outer glow ring */}
        <motion.div
          className="absolute -inset-0.5 rounded-3xl opacity-0 hover:opacity-100 blur-lg transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle 160px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 68, 68, 0.25) 0%, rgba(153, 153, 153, 0.15) 50%, transparent 70%)`,
          }}
        />
        
        {/* Quote icon */}
        <div className="absolute -top-4 left-8 z-20">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF4444] to-[#CC3333] flex items-center justify-center shadow-lg shadow-[#FF4444]/30">
            <Quote className="w-6 h-6 text-white" fill="white" />
          </div>
        </div>
        
        {/* Quote text */}
        <p className="relative z-10 text-[#333333] leading-relaxed mb-6 mt-4 italic">
          "{quote}"
        </p>
        
        {/* Author info */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF4444]/20 to-[#999999]/20 flex items-center justify-center">
            <span className="text-[#FF4444] font-semibold text-lg">
              {author.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-[#333333]">{author}</p>
            <p className="text-sm text-[#666666]">{role}</p>
          </div>
        </div>
        
        {/* Decorative accent */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#FF9999]/5 to-transparent rounded-tl-full" />
      </div>
    </motion.div>
  );
}