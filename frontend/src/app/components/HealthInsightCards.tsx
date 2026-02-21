import { motion } from 'motion/react';
import { TrendingUp, AlertCircle, Calendar, Activity, Lightbulb } from 'lucide-react';

interface Insight {
  id: string;
  type: 'warning' | 'info' | 'success' | 'recommendation';
  icon: any;
  title: string;
  message: string;
  action?: string;
}

const insights: Insight[] = [
  {
    id: '1',
    type: 'warning',
    icon: TrendingUp,
    title: 'Blood Pressure Trend',
    message: 'Your BP has increased 12% in the last 2 months. Consider reducing sodium intake.',
    action: 'View Details',
  },
  {
    id: '2',
    type: 'info',
    icon: Calendar,
    title: 'Vitamin Test Due',
    message: 'Based on your history, a vitamin D level check is recommended.',
    action: 'Schedule Test',
  },
  {
    id: '3',
    type: 'recommendation',
    icon: Activity,
    title: 'Annual Checkup',
    message: 'Your yearly physical examination is coming up in 4 weeks.',
    action: 'Book Appointment',
  },
  {
    id: '4',
    type: 'success',
    icon: Lightbulb,
    title: 'Great Progress!',
    message: "You've maintained healthy blood sugar levels for 3 consecutive months.",
  },
];

const typeStyles = {
  warning: {
    gradient: 'from-yellow-50 to-orange-50',
    border: 'border-yellow-200',
    icon: 'text-yellow-600',
    bg: 'bg-yellow-500',
  },
  info: {
    gradient: 'from-blue-50 to-blue-100',
    border: 'border-blue-200',
    icon: 'text-blue-600',
    bg: 'bg-blue-500',
  },
  success: {
    gradient: 'from-green-50 to-green-100',
    border: 'border-green-200',
    icon: 'text-green-600',
    bg: 'bg-green-500',
  },
  recommendation: {
    gradient: 'from-purple-50 to-purple-100',
    border: 'border-purple-200',
    icon: 'text-purple-600',
    bg: 'bg-purple-500',
  },
};

export function HealthInsightCards() {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#333333] flex items-center gap-2">
        <Lightbulb className="w-6 h-6 text-[#FF4444]" />
        AI Health Insights
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const style = typeStyles[insight.type];

          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`bg-gradient-to-br ${style.gradient} border ${style.border} rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all cursor-pointer`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${style.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#333333] mb-2">{insight.title}</h4>
                  <p className="text-sm text-[#666666] mb-3">{insight.message}</p>
                  {insight.action && (
                    <button className={`text-sm font-medium ${style.icon} hover:underline`}>
                      {insight.action} →
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}