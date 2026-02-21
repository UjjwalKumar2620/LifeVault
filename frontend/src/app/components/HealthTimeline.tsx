import { motion } from 'motion/react';
import { Calendar, FileText, Pill, Activity, ChevronDown, Filter } from 'lucide-react';
import { useState } from 'react';

interface TimelineEvent {
  id: string;
  date: string;
  type: 'appointment' | 'diagnosis' | 'prescription' | 'lab';
  title: string;
  doctor?: string;
  severity?: 'low' | 'medium' | 'high';
  bodySystem?: string;
  details: string;
  aiSummary: string;
  attachments?: string[];
}

const mockEvents: TimelineEvent[] = [
  {
    id: '1',
    date: '2026-02-14',
    type: 'lab',
    title: 'Complete Blood Count Test',
    doctor: 'Dr. Sarah Chen',
    severity: 'low',
    bodySystem: 'Blood',
    details: 'Regular checkup blood work. All values within normal range.',
    aiSummary: 'Blood test results show healthy levels across all parameters. No action needed.',
    attachments: ['CBC_Report_Feb2026.pdf'],
  },
  {
    id: '2',
    date: '2026-02-10',
    type: 'prescription',
    title: 'Vitamin D Supplement Prescribed',
    doctor: 'Dr. Sarah Chen',
    severity: 'low',
    bodySystem: 'Endocrine',
    details: 'Prescribed Vitamin D3 1000 IU daily for 3 months.',
    aiSummary: 'Preventive supplementation to maintain optimal vitamin D levels.',
  },
  {
    id: '3',
    date: '2026-01-28',
    type: 'appointment',
    title: 'Annual Physical Examination',
    doctor: 'Dr. Sarah Chen',
    severity: 'low',
    bodySystem: 'General',
    details: 'Comprehensive physical examination. Blood pressure: 118/76. Heart rate: 72 bpm. Weight: 70kg.',
    aiSummary: 'Overall excellent health. All vital signs within optimal range.',
  },
  {
    id: '4',
    date: '2025-12-15',
    type: 'diagnosis',
    title: 'Seasonal Allergies',
    doctor: 'Dr. Michael Johnson',
    severity: 'medium',
    bodySystem: 'Respiratory',
    details: 'Diagnosed with seasonal allergic rhinitis. Symptoms include sneezing and nasal congestion.',
    aiSummary: 'Common seasonal condition. Managed with antihistamines during allergy season.',
  },
  {
    id: '5',
    date: '2025-11-02',
    type: 'lab',
    title: 'Lipid Panel Test',
    doctor: 'Dr. Sarah Chen',
    severity: 'low',
    bodySystem: 'Cardiovascular',
    details: 'Cholesterol screening. Total cholesterol: 185 mg/dL. HDL: 58 mg/dL. LDL: 110 mg/dL.',
    aiSummary: 'Cholesterol levels are healthy. Continue current lifestyle habits.',
    attachments: ['Lipid_Panel_Nov2025.pdf'],
  },
];

const typeIcons = {
  appointment: Calendar,
  diagnosis: Activity,
  prescription: Pill,
  lab: FileText,
};

const typeColors = {
  appointment: 'from-blue-500 to-blue-600',
  diagnosis: 'from-blue-600 to-blue-700',
  prescription: 'from-blue-400 to-blue-500',
  lab: 'from-blue-500 to-blue-600',
};

const severityColors = {
  low: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  high: 'bg-red-100 text-red-700 border-red-200',
};

export function HealthTimeline() {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterBodySystem, setFilterBodySystem] = useState<string>('all');

  const filteredEvents = mockEvents.filter((event) => {
    if (filterType !== 'all' && event.type !== filterType) return false;
    if (filterBodySystem !== 'all' && event.bodySystem !== filterBodySystem) return false;
    return true;
  });

  return (
    <div className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-3xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-[#1E293B]">Medical History Timeline</h3>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-[#64748B] hover:text-blue-600 transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filterType === 'all'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-blue-50 text-[#64748B] hover:bg-blue-100'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterType('appointment')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filterType === 'appointment'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-blue-50 text-[#64748B] hover:bg-blue-100'
          }`}
        >
          Appointments
        </button>
        <button
          onClick={() => setFilterType('diagnosis')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filterType === 'diagnosis'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/30'
              : 'bg-blue-50 text-[#64748B] hover:bg-blue-100'
          }`}
        >
          Diagnoses
        </button>
        <button
          onClick={() => setFilterType('prescription')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filterType === 'prescription'
              ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg shadow-blue-400/30'
              : 'bg-blue-50 text-[#64748B] hover:bg-blue-100'
          }`}
        >
          Prescriptions
        </button>
        <button
          onClick={() => setFilterType('lab')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filterType === 'lab'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-blue-50 text-[#64748B] hover:bg-blue-100'
          }`}
        >
          Lab Reports
        </button>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-300 to-transparent" />

        {/* Events */}
        <div className="space-y-6">
          {filteredEvents.map((event, index) => {
            const Icon = typeIcons[event.type];
            const isExpanded = expandedEvent === event.id;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-16"
              >
                {/* Timeline Node */}
                <div className={`absolute left-0 w-12 h-12 rounded-full bg-gradient-to-br ${typeColors[event.type]} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Event Card */}
                <div className="bg-blue-50/50 rounded-2xl p-5 hover:shadow-lg transition-shadow border border-blue-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-[#1E293B]">{event.title}</h4>
                        {event.severity && (
                          <span className={`text-xs px-2 py-1 rounded-full border ${severityColors[event.severity]}`}>
                            {event.severity}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#64748B]">
                        {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        {event.doctor && ` • ${event.doctor}`}
                        {event.bodySystem && ` • ${event.bodySystem}`}
                      </p>
                    </div>
                    <button
                      onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <ChevronDown className={`w-5 h-5 text-[#64748B] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* AI Summary Badge */}
                  <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-3 mb-3">
                    <p className="text-xs text-[#64748B] mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      AI Summary
                    </p>
                    <p className="text-sm text-[#1E293B]">{event.aiSummary}</p>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-blue-200 pt-3 mt-3"
                    >
                      <p className="text-sm text-[#64748B] mb-3">{event.details}</p>
                      {event.attachments && event.attachments.length > 0 && (
                        <div>
                          <p className="text-xs text-[#64748B] mb-2">Attachments:</p>
                          {event.attachments.map((attachment) => (
                            <button
                              key={attachment}
                              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-1"
                            >
                              <FileText className="w-4 h-4" />
                              {attachment}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}