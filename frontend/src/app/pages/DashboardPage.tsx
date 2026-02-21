import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  History,
  TrendingUp,
  Brain,
  FileSearch,
  Users,
  AlertCircle,
  Menu,
  X,
  LogOut,
  User,
  MapPin,
  Video,
  Heart,
  Home,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { auth, db } from '../../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import ReportsPage from './ReportsPage';
import { HealthTimeline } from '../components/HealthTimeline';
import { HealthTrendsChart } from '../components/HealthTrendsChart';
import { AIChatDiagnosis } from '../components/AIChatDiagnosis';
import { ReportSimplifier } from '../components/ReportSimplifier';
import { FamilyHealthNetwork } from '../components/FamilyHealthNetwork';
import { EmergencyMode } from '../components/EmergencyMode';
import { LocateServices } from '../components/LocateServices';
import { ConnectDoctor } from '../components/ConnectDoctor';
import { PatientProfileSection } from '../components/PatientProfileSection';
import { DoctorDashboard } from '../components/DoctorDashboard';

type DashboardSection =
  | 'reports'
  | 'history'
  | 'trends'
  | 'diagnosis'
  | 'analyzer'
  | 'family'
  | 'emergency'
  | 'locate'
  | 'connect'
  | 'profile';

export function DashboardPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<DashboardSection>('reports');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState<'patient' | 'doctor' | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    setUserName(user.displayName || user.email?.split('@')[0] || 'User');
    // Fetch role from Firestore
    getDoc(doc(db, 'users', user.uid)).then((snap) => {
      const data = snap.data();
      setRole(data?.userType === 'doctor' ? 'doctor' : 'patient');
    }).catch(() => setRole('patient'));
  }, []);

  // Show loading until role is determined
  if (role === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Doctor gets a completely different dashboard
  if (role === 'doctor') {
    return <DoctorDashboard />;
  }

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const navItems: [DashboardSection, string, any][] = [
    ['reports', 'Reports', FileText],
    ['history', 'Medical History', History],
    ['trends', 'Health Trends', TrendingUp],
    ['diagnosis', 'AI Diagnosis', Brain],
    ['analyzer', 'Report Analyzer', FileSearch],
    ['family', 'Family Health', Users],
    ['locate', 'Locate Services', MapPin],
    ['connect', 'Connect Doctor', Video],
    ['emergency', 'Emergency', AlertCircle],
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'reports': return <ReportsPage />;
      case 'history': return <HealthTimeline />;
      case 'trends': return <HealthTrendsChart />;
      case 'diagnosis': return <AIChatDiagnosis />;
      case 'analyzer': return <ReportSimplifier />;
      case 'family': return <FamilyHealthNetwork />;
      case 'locate': return <LocateServices />;
      case 'connect': return <ConnectDoctor />;
      case 'emergency': return <EmergencyMode />;
      case 'profile': return <PatientProfileSection />;
      default: return <ReportsPage />;
    }
  };

  const isCollapsed = !isMobile && sidebarCollapsed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30 flex relative">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-20"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        animate={{
          x: isMobile ? (sidebarOpen ? 0 : '-100%') : 0,
          width: isCollapsed ? '72px' : '280px',
        }}
        transition={{ duration: 0.3 }}
        className="fixed lg:relative h-screen bg-white border-r border-gray-100 shadow-xl z-30 flex flex-col"
      >
        {/* Sidebar Top */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          {!isCollapsed && (
            <button onClick={() => navigate('/')} className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-bold text-gray-800 group-hover:text-blue-600 transition">LifeVault</span>
            </button>
          )}
          <button
            onClick={() => isMobile ? setSidebarOpen(false) : setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition"
          >
            {isMobile ? <X className="w-5 h-5" /> : (isCollapsed ? <Menu className="w-5 h-5" /> : <Menu className="w-5 h-5" />)}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => { setActiveSection(id); setSidebarOpen(false); }}
              title={isCollapsed ? label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeSection === id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom — Profile + Logout */}
        <div className="p-4 border-t border-gray-100 space-y-1">
          {/* Profile */}
          <button
            onClick={() => { setActiveSection('profile'); setSidebarOpen(false); }}
            title={isCollapsed ? 'My Profile' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeSection === 'profile'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              } ${isCollapsed ? 'justify-center' : ''}`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${activeSection === 'profile' ? 'bg-white/20' : 'bg-blue-100'
              }`}>
              <User className={`w-4 h-4 ${activeSection === 'profile' ? 'text-white' : 'text-blue-600'}`} />
            </div>
            {!isCollapsed && (
              <div className="text-left">
                <p className="text-sm font-semibold leading-tight">
                  {userName || 'My Profile'}
                </p>
                <p className="text-xs opacity-60">View profile</p>
              </div>
            )}
          </button>

          {/* Home */}
          <button
            onClick={() => navigate('/')}
            title={isCollapsed ? 'Home' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition ${isCollapsed ? 'justify-center' : ''}`}
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm">Home</span>}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            title={isCollapsed ? 'Logout' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-500 transition ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile top bar */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-100 z-10 flex items-center px-4">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition">
            <Menu className="w-5 h-5" />
          </button>
          <span className="ml-3 font-bold text-gray-800">LifeVault</span>
        </div>
      )}

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto relative z-10 ${isMobile ? 'pt-14' : ''}`}>
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          <motion.div
            key={activeSection}
            style={{ position: 'relative', zIndex: 20 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </main>
    </div>
  );
}