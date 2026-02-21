import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { User, Heart, Activity, Calendar, FileText, Settings, LogOut, Shield, Mail, Phone, AlertTriangle, Mic, Layout } from 'lucide-react';
import { CustomCursor } from '../components/CustomCursor';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { HealthScore } from '../components/HealthScore';
import { HealthTimeline } from '../components/HealthTimeline';
import { HealthTrendsChart } from '../components/HealthTrendsChart';
import { AIChatDiagnosis } from '../components/AIChatDiagnosis';
import { ReportSimplifier } from '../components/ReportSimplifier';
import { FamilyHealthNetwork } from '../components/FamilyHealthNetwork';
import { EmergencyMode } from '../components/EmergencyMode';
import { HealthInsightCards } from '../components/HealthInsightCards';
import { DocumentSearch } from '../components/DocumentSearch';
import { RiskHeatmap } from '../components/RiskHeatmap';
import { SmartAppointments } from '../components/SmartAppointments';
import { ActivitySecurityPanel } from '../components/ActivitySecurityPanel';
import { useEffect, useState } from 'react';

type ViewMode = 'clinical' | 'simple' | 'analytics';

export function ProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    loginMethod: 'email',
  });
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState<ViewMode>('simple');
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('lifevault_user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      // If no user data, redirect to home
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('lifevault_user');
    navigate('/');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'timeline', label: 'Medical History', icon: Calendar },
    { id: 'analytics', label: 'Health Trends', icon: Activity },
    { id: 'ai-chat', label: 'AI Diagnosis', icon: Heart },
    { id: 'reports', label: 'Report Analyzer', icon: FileText },
    { id: 'family', label: 'Family Health', icon: User },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'search', label: 'Document Search', icon: FileText },
    { id: 'risk-map', label: 'Risk Heatmap', icon: AlertTriangle },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] overflow-x-hidden relative">
      {/* Global Animated Background */}
      <AnimatedBackground />
      
      {/* Custom Healthcare Cursor */}
      <CustomCursor />

      {/* Emergency Mode */}
      <EmergencyMode isOpen={emergencyMode} onClose={() => setEmergencyMode(false)} />

      {/* Header */}
      <motion.header
        className="relative z-10 bg-white/80 backdrop-blur-lg border-b border-[#999999]/20 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 cursor-hover"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF4444] to-[#CC3333] flex items-center justify-center shadow-lg shadow-[#FF4444]/20">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#999999] via-[#FF4444] to-[#CC3333] bg-clip-text text-transparent">
                LifeVault
              </span>
            </button>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* View Mode Selector */}
              <div className="hidden md:flex items-center gap-2 bg-[#F5F5F5] rounded-xl p-1">
                <button
                  onClick={() => setViewMode('simple')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'simple'
                      ? 'bg-white text-[#FF4444] shadow-sm'
                      : 'text-[#666666] hover:text-[#FF4444]'
                  }`}
                >
                  Simple
                </button>
                <button
                  onClick={() => setViewMode('clinical')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'clinical'
                      ? 'bg-white text-[#FF4444] shadow-sm'
                      : 'text-[#666666] hover:text-[#FF4444]'
                  }`}
                >
                  Clinical
                </button>
                <button
                  onClick={() => setViewMode('analytics')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'analytics'
                      ? 'bg-white text-[#FF4444] shadow-sm'
                      : 'text-[#666666] hover:text-[#FF4444]'
                  }`}
                >
                  Analytics
                </button>
              </div>

              {/* Voice Control */}
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`p-2 rounded-lg transition-all ${
                  voiceEnabled
                    ? 'bg-[#FF4444] text-white shadow-lg shadow-[#FF4444]/20'
                    : 'bg-[#F5F5F5] text-[#666666] hover:bg-white'
                }`}
                title="Voice Control"
              >
                <Mic className="w-5 h-5" />
              </button>

              {/* Emergency Button */}
              <button
                onClick={() => setEmergencyMode(true)}
                className="cursor-hover px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium shadow-lg shadow-red-600/20 transition-all flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4" />
                <span className="hidden md:inline">Emergency</span>
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="cursor-hover px-4 py-2 text-[#666666] hover:text-[#FF4444] transition-colors duration-300 font-medium flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#666666] to-[#FF4444] bg-clip-text text-transparent">
            Welcome back, {userData.name || 'User'}!
          </h1>
          <p className="text-lg text-[#666666]">
            {viewMode === 'simple' && 'Your health dashboard at a glance'}
            {viewMode === 'clinical' && 'Professional health data overview'}
            {viewMode === 'analytics' && 'Advanced health analytics & insights'}
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#FF4444] to-[#CC3333] text-white shadow-lg shadow-[#FF4444]/20'
                      : 'bg-white/80 text-[#666666] hover:bg-white hover:text-[#FF4444] border border-[#999999]/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Health Insights */}
              <HealthInsightCards />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Health Score */}
                <div className="lg:col-span-1">
                  <HealthScore />
                </div>

                {/* Quick Stats */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Heart Rate */}
                    <div className="bg-white/80 backdrop-blur-lg border border-[#999999]/20 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF4444] to-[#CC3333] flex items-center justify-center shadow-lg shadow-[#FF4444]/20">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs text-[#999999] font-medium">LIVE</span>
                      </div>
                      <p className="text-[#666666] text-sm mb-2">Heart Rate</p>
                      <p className="text-4xl font-bold text-[#333333]">72 <span className="text-xl text-[#999999]">bpm</span></p>
                      <p className="text-xs text-[#999999] mt-2">Normal range</p>
                    </div>

                    {/* Activity */}
                    <div className="bg-white/80 backdrop-blur-lg border border-[#999999]/20 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#999999] to-[#666666] flex items-center justify-center shadow-lg shadow-[#999999]/20">
                          <Activity className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs text-[#999999] font-medium">TODAY</span>
                      </div>
                      <p className="text-[#666666] text-sm mb-2">Steps</p>
                      <p className="text-4xl font-bold text-[#333333]">8,432</p>
                      <p className="text-xs text-[#999999] mt-2">Goal: 10,000 steps</p>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white/80 backdrop-blur-lg border border-[#999999]/20 rounded-3xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-[#333333] mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 pb-4 border-b border-[#999999]/10">
                        <div className="w-10 h-10 rounded-lg bg-[#FF4444]/10 flex items-center justify-center flex-shrink-0">
                          <Heart className="w-5 h-5 text-[#FF4444]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[#333333] font-medium">Blood Pressure Recorded</p>
                          <p className="text-sm text-[#999999] mt-1">120/80 mmHg - Normal range</p>
                          <p className="text-xs text-[#999999] mt-2">2 hours ago</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#999999]/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-[#999999]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[#333333] font-medium">Lab Results Available</p>
                          <p className="text-sm text-[#999999] mt-1">Blood work from Feb 14</p>
                          <p className="text-xs text-[#999999] mt-2">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && <HealthTimeline />}
          {activeTab === 'analytics' && <HealthTrendsChart />}
          {activeTab === 'ai-chat' && <AIChatDiagnosis />}
          {activeTab === 'reports' && <ReportSimplifier />}
          {activeTab === 'family' && <FamilyHealthNetwork />}
          {activeTab === 'appointments' && <SmartAppointments />}
          {activeTab === 'search' && <DocumentSearch />}
          {activeTab === 'risk-map' && <RiskHeatmap />}
          {activeTab === 'security' && <ActivitySecurityPanel />}
        </motion.div>
      </div>

      {/* Voice Indicator */}
      {voiceEnabled && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className="bg-gradient-to-r from-[#FF4444] to-[#CC3333] rounded-full p-6 shadow-2xl shadow-[#FF4444]/40">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Mic className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          <p className="text-center text-sm text-[#666666] mt-2">Listening...</p>
        </motion.div>
      )}
    </div>
  );
}
