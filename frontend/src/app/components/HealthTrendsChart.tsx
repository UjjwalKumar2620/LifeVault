import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const bloodPressureData = [
  { date: 'Nov 1', systolic: 118, diastolic: 76 },
  { date: 'Nov 15', systolic: 120, diastolic: 78 },
  { date: 'Dec 1', systolic: 122, diastolic: 80 },
  { date: 'Dec 15', systolic: 119, diastolic: 77 },
  { date: 'Jan 1', systolic: 121, diastolic: 79 },
  { date: 'Jan 15', systolic: 118, diastolic: 76 },
  { date: 'Feb 1', systolic: 117, diastolic: 75 },
  { date: 'Feb 16', systolic: 118, diastolic: 76 },
  { date: 'Mar 1', systolic: 120, diastolic: 78, predicted: true },
  { date: 'Mar 15', systolic: 119, diastolic: 77, predicted: true },
];

const sugarLevelsData = [
  { date: 'Nov 1', level: 92 },
  { date: 'Nov 15', level: 95 },
  { date: 'Dec 1', level: 88 },
  { date: 'Dec 15', level: 91 },
  { date: 'Jan 1', level: 93 },
  { date: 'Jan 15', level: 89 },
  { date: 'Feb 1', level: 90 },
  { date: 'Feb 16', level: 92 },
  { date: 'Mar 1', level: 91, predicted: true },
  { date: 'Mar 15', level: 90, predicted: true },
];

const heartRateData = [
  { date: 'Nov 1', rate: 70 },
  { date: 'Nov 15', rate: 72 },
  { date: 'Dec 1', rate: 71 },
  { date: 'Dec 15', rate: 73 },
  { date: 'Jan 1', rate: 72 },
  { date: 'Jan 15', rate: 70 },
  { date: 'Feb 1', rate: 71 },
  { date: 'Feb 16', rate: 72 },
  { date: 'Mar 1', rate: 71, predicted: true },
  { date: 'Mar 15', rate: 72, predicted: true },
];

const weightData = [
  { date: 'Nov 1', weight: 72.5 },
  { date: 'Nov 15', weight: 72.0 },
  { date: 'Dec 1', weight: 71.5 },
  { date: 'Dec 15', weight: 71.0 },
  { date: 'Jan 1', weight: 70.8 },
  { date: 'Jan 15', weight: 70.5 },
  { date: 'Feb 1', weight: 70.2 },
  { date: 'Feb 16', weight: 70.0 },
  { date: 'Mar 1', weight: 69.8, predicted: true },
  { date: 'Mar 15', weight: 69.5, predicted: true },
];

export function HealthTrendsChart() {
  const [timeRange, setTimeRange] = useState<'3months' | '1year'>('3months');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-[#333333]">Health Trend Analytics</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('3months')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              timeRange === '3months'
                ? 'bg-gradient-to-r from-[#FF4444] to-[#CC3333] text-white shadow-lg shadow-[#FF4444]/20'
                : 'bg-[#F5F5F5] text-[#666666] hover:bg-[#E8E8E8]'
            }`}
          >
            3 Months
          </button>
          <button
            onClick={() => setTimeRange('1year')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              timeRange === '1year'
                ? 'bg-gradient-to-r from-[#FF4444] to-[#CC3333] text-white shadow-lg shadow-[#FF4444]/20'
                : 'bg-[#F5F5F5] text-[#666666] hover:bg-[#E8E8E8]'
            }`}
          >
            1 Year
          </button>
        </div>
      </div>

      {/* Risk Forecast Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-green-800 mb-1">Health Risk Forecast: Low</h4>
            <p className="text-sm text-green-700">All vital trends within healthy ranges. Keep up the good work!</p>
          </div>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Pressure */}
        <div className="bg-white/80 backdrop-blur-lg border border-[#999999]/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-[#333333]">Blood Pressure</h4>
            <span className="text-xs text-green-600 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              -2% this month
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={bloodPressureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" style={{ fontSize: '12px' }} stroke="#999999" />
              <YAxis style={{ fontSize: '12px' }} stroke="#999999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="#FF4444"
                strokeWidth={2}
                dot={{ fill: '#FF4444', r: 4 }}
                name="Systolic"
                strokeDasharray={(entry: any) => (entry.predicted ? '5 5' : '0')}
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke="#999999"
                strokeWidth={2}
                dot={{ fill: '#999999', r: 4 }}
                name="Diastolic"
                strokeDasharray={(entry: any) => (entry.predicted ? '5 5' : '0')}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#999999] mt-2">Dashed lines show AI predictions</p>
        </div>

        {/* Blood Sugar */}
        <div className="bg-white/80 backdrop-blur-lg border border-[#999999]/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-[#333333]">Blood Sugar Levels</h4>
            <span className="text-xs text-green-600 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              Stable
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={sugarLevelsData}>
              <defs>
                <linearGradient id="sugarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" style={{ fontSize: '12px' }} stroke="#999999" />
              <YAxis style={{ fontSize: '12px' }} stroke="#999999" domain={[80, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="level"
                stroke="#FF4444"
                strokeWidth={2}
                fill="url(#sugarGradient)"
                name="Glucose (mg/dL)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#999999] mt-2">Fasting glucose levels</p>
        </div>

        {/* Heart Rate */}
        <div className="bg-white/80 backdrop-blur-lg border border-[#999999]/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-[#333333]">Resting Heart Rate</h4>
            <span className="text-xs text-green-600 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              Excellent
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={heartRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" style={{ fontSize: '12px' }} stroke="#999999" />
              <YAxis style={{ fontSize: '12px' }} stroke="#999999" domain={[65, 75]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#FF4444"
                strokeWidth={2}
                dot={{ fill: '#FF4444', r: 4 }}
                name="BPM"
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#999999] mt-2">Average resting heart rate</p>
        </div>

        {/* Weight */}
        <div className="bg-white/80 backdrop-blur-lg border border-[#999999]/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-[#333333]">Weight Progression</h4>
            <span className="text-xs text-green-600 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              -2.5kg (3 months)
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weightData}>
              <defs>
                <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#999999" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#999999" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" style={{ fontSize: '12px' }} stroke="#999999" />
              <YAxis style={{ fontSize: '12px' }} stroke="#999999" domain={[69, 73]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="weight"
                stroke="#999999"
                strokeWidth={2}
                fill="url(#weightGradient)"
                name="Weight (kg)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#999999] mt-2">Goal: 70kg - Almost there!</p>
        </div>
      </div>
    </div>
  );
}
