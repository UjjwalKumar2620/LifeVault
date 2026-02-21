import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Stethoscope, Activity, Users, Clock, Shield, LogIn, UserPlus, Info } from 'lucide-react';
import { CustomCursor } from '../components/CustomCursor';
import { ECGBackground } from '../components/ECGBackground';
import { ServiceCard } from '../components/ServiceCard';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { AuthModal } from '../components/AuthModal';
import { useNavigate } from 'react-router';

export function HomePage() {
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative">
      {/* Floating About Button */}
      <motion.button
        onClick={() => navigate('/about')}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed top-8 right-8 z-50 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold"
      >
        <Info className="w-5 h-5" />
        About
      </motion.button>

      {/* Global Animated Background */}
      <AnimatedBackground />
      
      {/* Custom Healthcare Cursor */}
      <CustomCursor />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
      />

      {/* HERO SECTION - Full Screen */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated ECG Background */}
        <ECGBackground />

        {/* Gradient Glow Behind Title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-[800px] h-[400px] rounded-full opacity-30 blur-[120px]"
            style={{
              background: 'radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Main Heading */}
            <motion.h1
              className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent"
              style={{
                backgroundSize: '200% auto',
              }}
              animate={{
                backgroundPosition: ['0% center', '100% center', '0% center'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              LifeVault
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-xl md:text-2xl text-[#64748B] max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Secure your health data.
              <br />
              Your wellness, protected for life.
            </motion.p>

            {/* Auth Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-12 flex items-center justify-center gap-4 flex-wrap"
            >
              <button
                onClick={() => handleOpenAuth('login')}
                className="cursor-hover group relative px-10 py-5 rounded-full overflow-hidden shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#2563EB] bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-all duration-700" />

                {/* Content */}
                <span className="relative z-10 font-semibold text-white flex items-center gap-2 text-lg">
                  <LogIn className="w-5 h-5" />
                  Log In
                </span>
              </button>

              <button
                onClick={() => handleOpenAuth('signup')}
                className="cursor-hover group relative px-10 py-5 rounded-full overflow-hidden shadow-2xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-500 hover:scale-105"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] via-[#1E40AF] to-[#1E3A8A] bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-all duration-700" />

                {/* Content */}
                <span className="relative z-10 font-semibold text-white flex items-center gap-2 text-lg">
                  <UserPlus className="w-5 h-5" />
                  Sign Up
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-blue-500/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-blue-500 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section className="relative py-32 px-8 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#1E40AF] to-[#2563EB] bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
              Comprehensive healthcare solutions tailored to your needs
            </p>
          </motion.div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={Stethoscope}
              title="Primary Care"
              description="Comprehensive primary healthcare services with experienced physicians dedicated to your wellbeing."
              delay={0.1}
            />
            <ServiceCard
              icon={Activity}
              title="Diagnostic Services"
              description="State-of-the-art diagnostic technology for accurate and timely health assessments."
              delay={0.2}
            />
            <ServiceCard
              icon={Heart}
              title="Cardiology"
              description="Expert cardiac care with advanced monitoring and treatment for heart health."
              delay={0.3}
            />
            <ServiceCard
              icon={Users}
              title="Family Medicine"
              description="Personalized care for the whole family, from children to seniors, all under one roof."
              delay={0.4}
            />
            <ServiceCard
              icon={Clock}
              title="24/7 Emergency"
              description="Round-the-clock emergency services with rapid response and expert critical care."
              delay={0.5}
            />
            <ServiceCard
              icon={Shield}
              title="Preventive Care"
              description="Proactive health programs and screenings to keep you healthy and prevent illness."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative py-16 px-8 bg-blue-50">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-[#64748B] mb-4">
            © 2026 LifeVault. Your health is our heartbeat.
          </p>
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <Heart className="w-5 h-5" fill="#2563EB" />
            <span className="text-sm">Secure healthcare for life</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}