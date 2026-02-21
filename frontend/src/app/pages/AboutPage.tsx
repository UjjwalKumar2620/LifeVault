import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Heart, Users, Shield, Award, Home } from 'lucide-react';
import { useNavigate } from 'react-router';

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Back to Home Button */}
      <motion.button
        onClick={() => navigate('/')}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-8 left-8 z-50 px-6 py-3 bg-white border-2 border-blue-200 text-blue-600 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold"
      >
        <Home className="w-5 h-5" />
        Home
      </motion.button>

      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent">
            About LifeVault
          </h1>
          <p className="text-xl text-[#64748B] max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in comprehensive healthcare management and digital health innovation
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="mb-20 bg-white rounded-3xl p-12 shadow-xl border border-blue-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-[#1E293B]">Our Mission</h2>
          </div>
          <p className="text-lg text-[#64748B] leading-relaxed">
            At LifeVault, we're revolutionizing healthcare by providing a secure, intelligent platform that empowers individuals to take control of their health journey. Our mission is to make quality healthcare accessible, understandable, and actionable for everyone through cutting-edge AI technology and compassionate care.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-lg border border-blue-50"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#1E293B] mb-3">Security First</h3>
            <p className="text-[#64748B] leading-relaxed">
              Your health data is encrypted and protected with bank-level security. We never share your information without explicit consent.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl p-8 shadow-lg border border-blue-50"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#1E293B] mb-3">Patient-Centered</h3>
            <p className="text-[#64748B] leading-relaxed">
              Every feature is designed with you in mind. We listen to feedback and continuously improve to serve you better.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl p-8 shadow-lg border border-blue-50"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <Award className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#1E293B] mb-3">Excellence</h3>
            <p className="text-[#64748B] leading-relaxed">
              We partner with top healthcare providers and use AI to ensure you receive the highest quality care and insights.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl p-8 shadow-lg border border-blue-50"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <Heart className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#1E293B] mb-3">Compassion</h3>
            <p className="text-[#64748B] leading-relaxed">
              Healthcare is personal. We treat every user with empathy, respect, and the dignity they deserve.
            </p>
          </motion.div>
        </div>

        {/* Contact Section */}
        <motion.div
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-12 text-white shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center">Get In Touch</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-blue-100">support@lifevault.health</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-blue-100">+1 (800) LIFEVAULT</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-blue-100">123 Health Street, Medical District</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Support Hours</h3>
              <p className="text-blue-100">24/7 Available</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder:text-blue-100 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder:text-blue-100 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder:text-blue-100 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder:text-blue-100 text-white focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
              />
              <button
                type="submit"
                className="w-full py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}