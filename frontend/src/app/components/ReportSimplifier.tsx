import { motion } from 'motion/react';
import { FileText, Upload, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useState } from 'react';

interface LabValue {
  name: string;
  value: string;
  normalRange: string;
  status: 'normal' | 'abnormal' | 'borderline';
  explanation: string;
  risk: 'low' | 'medium' | 'high';
  action: string;
}

const mockLabResults: LabValue[] = [
  {
    name: 'Hemoglobin',
    value: '14.2 g/dL',
    normalRange: '13.5-17.5 g/dL',
    status: 'normal',
    explanation: 'Hemoglobin carries oxygen in your blood. Your level is healthy.',
    risk: 'low',
    action: 'No action needed. Continue healthy diet.',
  },
  {
    name: 'White Blood Cells',
    value: '7,200 /μL',
    normalRange: '4,000-11,000 /μL',
    status: 'normal',
    explanation: 'WBCs fight infection. Your immune system is functioning well.',
    risk: 'low',
    action: 'Maintain current health practices.',
  },
  {
    name: 'Cholesterol (Total)',
    value: '215 mg/dL',
    normalRange: '<200 mg/dL',
    status: 'borderline',
    explanation: 'Slightly elevated cholesterol. Could increase heart disease risk.',
    risk: 'medium',
    action: 'Consider dietary changes. Monitor in 3 months.',
  },
  {
    name: 'LDL Cholesterol',
    value: '135 mg/dL',
    normalRange: '<100 mg/dL',
    status: 'abnormal',
    explanation: 'LDL is "bad" cholesterol. High levels increase heart disease risk.',
    risk: 'high',
    action: 'Recommend consultation with doctor. Lifestyle modifications needed.',
  },
  {
    name: 'HDL Cholesterol',
    value: '62 mg/dL',
    normalRange: '>40 mg/dL',
    status: 'normal',
    explanation: 'HDL is "good" cholesterol. Higher is better for heart health.',
    risk: 'low',
    action: 'Excellent! Keep exercising regularly.',
  },
];

export function ReportSimplifier() {
  const [viewMode, setViewMode] = useState<'simple' | 'detailed'>('simple');
  const [uploadedFile, setUploadedFile] = useState<string | null>('Blood_Test_Feb2026.pdf');

  const statusColors = {
    normal: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: CheckCircle },
    borderline: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', icon: AlertCircle },
    abnormal: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: AlertCircle },
  };

  const riskColors = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600',
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg border border-[#999999]/20 rounded-3xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-[#333333] mb-6">AI Medical Report Simplifier</h3>

      {/* Upload Section */}
      {!uploadedFile ? (
        <div className="border-2 border-dashed border-[#999999]/30 rounded-2xl p-12 text-center hover:border-[#FF4444]/50 transition-all cursor-pointer">
          <Upload className="w-12 h-12 text-[#999999] mx-auto mb-4" />
          <p className="text-[#666666] mb-2">Drop your lab report here or click to upload</p>
          <p className="text-sm text-[#999999]">Supports PDF, JPG, PNG</p>
          <button className="mt-4 px-6 py-2 bg-gradient-to-r from-[#FF4444] to-[#CC3333] text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
            Choose File
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* File Info */}
          <div className="flex items-center justify-between bg-[#F5F5F5] rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#FF4444]" />
              <div>
                <p className="font-medium text-[#333333]">{uploadedFile}</p>
                <p className="text-xs text-[#999999]">Uploaded on Feb 16, 2026</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('simple')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'simple'
                    ? 'bg-gradient-to-r from-[#FF4444] to-[#CC3333] text-white'
                    : 'bg-white text-[#666666]'
                }`}
              >
                Simple
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'detailed'
                    ? 'bg-gradient-to-r from-[#FF4444] to-[#CC3333] text-white'
                    : 'bg-white text-[#666666]'
                }`}
              >
                Detailed
              </button>
            </div>
          </div>

          {/* AI Processing Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#FF4444]/10 to-[#CC3333]/10 border border-[#FF4444]/20 rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF4444] to-[#CC3333] flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Info className="w-5 h-5 text-white" />
                </motion.div>
              </div>
              <div>
                <p className="font-bold text-[#333333]">AI Analysis Complete</p>
                <p className="text-sm text-[#666666]">5 parameters analyzed • 1 requires attention</p>
              </div>
            </div>
          </motion.div>

          {/* Lab Results */}
          <div className="space-y-4">
            {mockLabResults.map((result, index) => {
              const statusStyle = statusColors[result.status];
              const StatusIcon = statusStyle.icon;

              return (
                <motion.div
                  key={result.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${statusStyle.bg} border ${statusStyle.border} rounded-2xl p-5`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <StatusIcon className={`w-5 h-5 ${statusStyle.text}`} />
                      <div>
                        <h4 className="font-bold text-[#333333]">{result.name}</h4>
                        <p className="text-sm text-[#666666]">Normal range: {result.normalRange}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${result.status === 'normal' ? 'text-green-600' : result.status === 'abnormal' ? 'text-red-600' : 'text-yellow-600'}`}>
                        {result.value}
                      </p>
                      <span className={`text-xs font-medium ${statusStyle.text}`}>
                        {result.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {viewMode === 'detailed' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="border-t border-current/10 pt-3 mt-3 space-y-3"
                    >
                      <div>
                        <p className="text-xs text-[#999999] mb-1">What this means:</p>
                        <p className="text-sm text-[#666666]">{result.explanation}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-[#999999] mb-1">Risk Level:</p>
                          <span className={`text-sm font-bold ${riskColors[result.risk]}`}>
                            {result.risk.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="bg-white/50 rounded-xl p-3">
                        <p className="text-xs text-[#999999] mb-1">Suggested Action:</p>
                        <p className="text-sm font-medium text-[#333333]">{result.action}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-[#999999]/10 to-[#666666]/10 border border-[#999999]/20 rounded-2xl p-6">
            <h4 className="font-bold text-[#333333] mb-3">Overall Assessment</h4>
            <p className="text-[#666666] mb-4">
              Your blood work shows mostly healthy results. However, your LDL cholesterol is elevated, which may increase cardiovascular risk. We recommend scheduling a follow-up consultation to discuss lifestyle modifications and potential treatment options.
            </p>
            <button className="w-full py-3 bg-gradient-to-r from-[#FF4444] to-[#CC3333] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
              Book Follow-up Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
