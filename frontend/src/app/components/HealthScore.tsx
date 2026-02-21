import { motion } from 'motion/react';
import { Trophy, TrendingUp, Calendar, Pill, Activity } from 'lucide-react';

export function HealthScore() {
  const score = 78;
  const streak = 12;

  return (
    <div className="bg-white/80 backdrop-blur-lg border border-[#999999]/20 rounded-3xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-[#333333] mb-6">Personal Health Score</h3>
      
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-48 h-48">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="#E5E7EB"
              strokeWidth="12"
              fill="none"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="88"
              stroke="url(#scoreGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: `0 ${2 * Math.PI * 88}` }}
              animate={{ strokeDasharray: `${(score / 100) * 2 * Math.PI * 88} ${2 * Math.PI * 88}` }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF4444" />
                <stop offset="100%" stopColor="#CC3333" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Score */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-5xl font-bold bg-gradient-to-r from-[#FF4444] to-[#CC3333] bg-clip-text text-transparent"
            >
              {score}
            </motion.div>
            <span className="text-sm text-[#999999] mt-1">Health Score</span>
          </div>
        </div>
      </div>

      {/* Score Factors */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#F5F5F5] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-[#FF4444]" />
            <span className="text-xs text-[#999999]">Vitals</span>
          </div>
          <p className="text-2xl font-bold text-[#333333]">92%</p>
        </div>
        
        <div className="bg-[#F5F5F5] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-[#FF4444]" />
            <span className="text-xs text-[#999999]">Appointments</span>
          </div>
          <p className="text-2xl font-bold text-[#333333]">85%</p>
        </div>
        
        <div className="bg-[#F5F5F5] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Pill className="w-4 h-4 text-[#FF4444]" />
            <span className="text-xs text-[#999999]">Medication</span>
          </div>
          <p className="text-2xl font-bold text-[#333333]">73%</p>
        </div>
        
        <div className="bg-[#F5F5F5] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[#FF4444]" />
            <span className="text-xs text-[#999999]">Improvement</span>
          </div>
          <p className="text-2xl font-bold text-[#33CC33]">+8%</p>
        </div>
      </div>

      {/* Streak */}
      <div className="bg-gradient-to-r from-[#FF4444]/10 to-[#CC3333]/10 rounded-xl p-4 border border-[#FF4444]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-[#FF4444]" />
            <div>
              <p className="text-sm text-[#666666]">Current Streak</p>
              <p className="text-2xl font-bold text-[#333333]">{streak} days</p>
            </div>
          </div>
          <div className="text-3xl">🔥</div>
        </div>
      </div>
    </div>
  );
}