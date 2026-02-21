import { motion } from 'motion/react';
import { Shield, Monitor, Download, MapPin, Clock, AlertTriangle } from 'lucide-react';

interface ActivityLog {
  id: string;
  action: string;
  device: string;
  location: string;
  timestamp: string;
  status: 'success' | 'warning';
}

const activityLogs: ActivityLog[] = [
  {
    id: '1',
    action: 'Logged in',
    device: 'Chrome on MacBook Pro',
    location: 'San Francisco, CA',
    timestamp: '2 hours ago',
    status: 'success',
  },
  {
    id: '2',
    action: 'Downloaded lab report',
    device: 'Safari on iPhone 15',
    location: 'San Francisco, CA',
    timestamp: '5 hours ago',
    status: 'success',
  },
  {
    id: '3',
    action: 'Viewed medical records',
    device: 'Chrome on MacBook Pro',
    location: 'San Francisco, CA',
    timestamp: '1 day ago',
    status: 'success',
  },
  {
    id: '4',
    action: 'Login attempt',
    device: 'Unknown device',
    location: 'Los Angeles, CA',
    timestamp: '3 days ago',
    status: 'warning',
  },
  {
    id: '5',
    action: 'Updated profile',
    device: 'Chrome on MacBook Pro',
    location: 'San Francisco, CA',
    timestamp: '5 days ago',
    status: 'success',
  },
];

const dataAccessed = [
  { type: 'Medical Records', count: 12, lastAccess: '2 hours ago' },
  { type: 'Lab Reports', count: 5, lastAccess: '5 hours ago' },
  { type: 'Prescriptions', count: 3, lastAccess: '2 days ago' },
  { type: 'Appointments', count: 8, lastAccess: '1 day ago' },
];

const downloads = [
  { file: 'Blood_Test_Feb2026.pdf', date: 'Feb 16, 2026', size: '245 KB' },
  { file: 'Annual_Physical_Jan2026.pdf', date: 'Jan 28, 2026', size: '512 KB' },
  { file: 'Prescription_VitaminD.pdf', date: 'Feb 10, 2026', size: '128 KB' },
];

export function ActivitySecurityPanel() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-[#333333] flex items-center gap-3">
        <Shield className="w-7 h-7 text-[#FF4444]" />
        Activity & Security
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Login History */}
        <div className="bg-white/80 backdrop-blur-lg border border-[#999999]/20 rounded-3xl p-6 shadow-lg">
          <h4 className="font-bold text-[#333333] mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#FF4444]" />
            Login History
          </h4>
          <div className="space-y-4">
            {activityLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl ${
                  log.status === 'warning'
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'bg-[#F5F5F5]'
                }`}
              >
                <div className="flex items-start gap-3">
                  {log.status === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Monitor className="w-5 h-5 text-[#FF4444] flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-[#333333]">{log.action}</p>
                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-[#666666]">
                      <span className="flex items-center gap-1">
                        <Monitor className="w-3 h-3" />
                        {log.device}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {log.location}
                      </span>
                    </div>
                    <p className="text-xs text-[#999999] mt-1">{log.timestamp}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data Accessed */}
        <div className="bg-white/80 backdrop-blur-lg border border-[#999999]/20 rounded-3xl p-6 shadow-lg">
          <h4 className="font-bold text-[#333333] mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#FF4444]" />
            Data Accessed
          </h4>
          <div className="space-y-3">
            {dataAccessed.map((data, index) => (
              <motion.div
                key={data.type}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-xl"
              >
                <div>
                  <p className="font-medium text-[#333333]">{data.type}</p>
                  <p className="text-xs text-[#999999] mt-1">Last access: {data.lastAccess}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#FF4444]">{data.count}</p>
                  <p className="text-xs text-[#666666]">times</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Download Logs */}
      <div className="bg-white/80 backdrop-blur-lg border border-[#999999]/20 rounded-3xl p-6 shadow-lg">
        <h4 className="font-bold text-[#333333] mb-6 flex items-center gap-2">
          <Download className="w-5 h-5 text-[#FF4444]" />
          Report Download History
        </h4>
        <div className="space-y-3">
          {downloads.map((download, index) => (
            <motion.div
              key={download.file}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-xl hover:bg-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF4444] to-[#CC3333] flex items-center justify-center">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#333333]">{download.file}</p>
                  <p className="text-xs text-[#666666]">{download.date} • {download.size}</p>
                </div>
              </div>
              <button className="text-sm text-[#FF4444] hover:text-[#CC3333] font-medium">
                View
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security Status */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-3xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-green-800 mb-2">Account Security: Strong</h4>
            <p className="text-sm text-green-700 mb-4">
              Your account is secure. All recent activity appears normal.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white text-green-700 rounded-full text-xs font-medium">
                ✓ Two-Factor Enabled
              </span>
              <span className="px-3 py-1 bg-white text-green-700 rounded-full text-xs font-medium">
                ✓ Strong Password
              </span>
              <span className="px-3 py-1 bg-white text-green-700 rounded-full text-xs font-medium">
                ✓ Verified Email
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
