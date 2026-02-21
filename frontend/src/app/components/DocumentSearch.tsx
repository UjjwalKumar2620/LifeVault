import { motion } from 'motion/react';
import { FileText, Calendar, User, Upload, Pill, Download, AlertTriangle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface Report {
  id: string;
  title: string;
  type: string;
  doctor: string;
  date: string;
  uploadDate: string;
  medications: Medication[];
}

const uploadedReports: Report[] = [
  {
    id: '1',
    title: 'Blood_Test_Feb2026.pdf',
    type: 'Lab Report',
    doctor: 'Dr. Sarah Chen',
    date: '2026-02-16',
    uploadDate: '2026-02-16',
    medications: [
      { name: 'Iron Supplement', dosage: '65mg', frequency: 'Once daily', duration: '3 months' },
      { name: 'Vitamin B12', dosage: '1000mcg', frequency: 'Once daily', duration: 'Ongoing' },
    ],
  },
  {
    id: '2',
    title: 'Prescription_Dr_Johnson.pdf',
    type: 'Prescription',
    doctor: 'Dr. Michael Johnson',
    date: '2026-02-10',
    uploadDate: '2026-02-10',
    medications: [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: 'Ongoing' },
      { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', duration: 'Ongoing' },
      { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at bedtime', duration: 'Ongoing' },
    ],
  },
  {
    id: '3',
    title: 'Heart_Checkup_Report.pdf',
    type: 'Medical Record',
    doctor: 'Dr. Emily Roberts',
    date: '2026-01-28',
    uploadDate: '2026-01-29',
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: 'Ongoing' },
    ],
  },
  {
    id: '4',
    title: 'Allergy_Test_Results.pdf',
    type: 'Lab Report',
    doctor: 'Dr. Sarah Chen',
    date: '2025-12-15',
    uploadDate: '2025-12-15',
    medications: [
      { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily as needed', duration: 'Seasonal' },
      { name: 'Montelukast', dosage: '10mg', frequency: 'Once daily at night', duration: '6 months' },
    ],
  },
];

export function DocumentSearch() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#1E293B]">Upload New Report</h3>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Report
          </button>
        </div>
        <p className="text-sm text-[#64748B]">
          Upload your medical reports, prescriptions, and test results. Our AI will automatically extract medications and important information.
        </p>
      </div>

      {/* Uploaded Reports */}
      <div className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-3xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-[#1E293B] mb-6 flex items-center gap-3">
          <FileText className="w-7 h-7 text-blue-600" />
          My Uploaded Reports
        </h3>

        <div className="space-y-4">
          {uploadedReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              {/* Report Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#1E293B] text-lg mb-2">{report.title}</h4>
                  <div className="flex flex-wrap gap-3 text-sm text-[#64748B]">
                    <span className="flex items-center gap-1 px-3 py-1 bg-white rounded-full">
                      <FileText className="w-3 h-3" />
                      {report.type}
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1 bg-white rounded-full">
                      <User className="w-3 h-3" />
                      {report.doctor}
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1 bg-white rounded-full">
                      <Calendar className="w-3 h-3" />
                      {new Date(report.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setSelectedReport(selectedReport === report.id ? null : report.id)
                    }
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:scale-105 transition-all"
                  >
                    {selectedReport === report.id ? 'Hide' : 'View'}
                  </button>
                  <button className="px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-all">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Extracted Medications */}
              {selectedReport === report.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-blue-200"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Pill className="w-5 h-5 text-blue-600" />
                    <h5 className="font-bold text-[#1E293B]">
                      Medications Prescribed ({report.medications.length})
                    </h5>
                    <span className="ml-auto text-xs text-[#64748B] flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      AI Extracted
                    </span>
                  </div>

                  <div className="space-y-3">
                    {report.medications.map((med, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                            <Pill className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h6 className="font-bold text-[#1E293B] mb-2">{med.name}</h6>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-[#64748B] text-xs">Dosage</p>
                                <p className="text-[#1E293B] font-medium">{med.dosage}</p>
                              </div>
                              <div>
                                <p className="text-[#64748B] text-xs">Frequency</p>
                                <p className="text-[#1E293B] font-medium">{med.frequency}</p>
                              </div>
                              <div>
                                <p className="text-[#64748B] text-xs">Duration</p>
                                <p className="text-[#1E293B] font-medium">{med.duration}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Medication Alert */}
                  <div className="mt-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h6 className="font-bold text-amber-900 mb-1">Important Reminder</h6>
                        <p className="text-sm text-amber-800">
                          Always take medications as prescribed by your doctor. Set reminders to
                          never miss a dose. Consult your doctor before stopping any medication.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
