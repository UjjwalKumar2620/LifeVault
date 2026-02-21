import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  addDoc, collection, getDocs, query, where, serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db } from "../../firebase";
import {
  FileText, Upload, ChevronDown, ChevronUp, Pill, Hospital,
  Calendar, CheckCircle, Clock, AlertCircle, Plus, Image, X,
  ZoomIn, Download,
} from "lucide-react";

interface Medication {
  name: string;
  dose: string;
  frequency: string;
  duration: string;
}

interface SampleReport {
  id: string;
  title: string;
  type: string;
  date: string;
  source: string;
  doctor: string;
  status: "normal" | "attention" | "critical";
  summary: string;
  medications: Medication[];
  image: string;        // path relative to /public
  imageLabel: string;   // short description for the thumbnail
}

const sampleReports: SampleReport[] = [
  {
    id: "sr-1",
    title: "Complete Blood Count (CBC)",
    type: "Blood Test",
    date: "Feb 14, 2026",
    source: "Apollo Hospitals, Mumbai",
    doctor: "Dr. Priya Sharma",
    status: "attention",
    summary:
      "Haemoglobin slightly low at 11.2 g/dL. WBC count within normal range. LDL cholesterol borderline high at 215 mg/dL. Platelets normal.",
    medications: [
      { name: "Iron Supplement (Ferrous Sulfate)", dose: "325 mg", frequency: "Twice daily", duration: "3 months" },
      { name: "Atorvastatin", dose: "10 mg", frequency: "Once daily at bedtime", duration: "Ongoing" },
      { name: "Vitamin C", dose: "500 mg", frequency: "Once daily", duration: "3 months" },
    ],
    image: "/reports/report1.png",
    imageLabel: "Ishnavi Clinic Prescription",
  },
  {
    id: "sr-2",
    title: "Chest X-Ray Report",
    type: "Radiology",
    date: "Jan 28, 2026",
    source: "Fortis Hospital, Delhi",
    doctor: "Dr. Rajesh Gupta",
    status: "normal",
    summary:
      "Lungs appear clear with no signs of consolidation or pleural effusion. Heart size normal. No abnormality detected.",
    medications: [],
    image: "/reports/report2.png",
    imageLabel: "A.B Hospital Report",
  },
  {
    id: "sr-3",
    title: "Diabetes & HbA1c Panel",
    type: "Blood Test",
    date: "Jan 10, 2026",
    source: "Max Healthcare, Bangalore",
    doctor: "Dr. Lakshmi Venkat",
    status: "critical",
    summary:
      "HbA1c: 8.2% (elevated — diabetic range). Fasting glucose: 172 mg/dL. Requires immediate dietary modification and medication adjustment.",
    medications: [
      { name: "Metformin HCl", dose: "500 mg", frequency: "Twice daily with meals", duration: "Ongoing" },
      { name: "Glimepiride", dose: "1 mg", frequency: "Once daily before breakfast", duration: "Ongoing" },
      { name: "Vitamin B12", dose: "1000 mcg", frequency: "Once daily", duration: "6 months" },
    ],
    image: "/reports/report3.png",
    imageLabel: "Evergreen Wellness Center Certificate",
  },
  {
    id: "sr-4",
    title: "Thyroid Function Test",
    type: "Endocrinology",
    date: "Dec 5, 2025",
    source: "Narayana Health, Chennai",
    doctor: "Dr. Suresh Iyer",
    status: "normal",
    summary:
      "TSH: 2.4 mIU/L (normal). T3 and T4 within reference range. Thyroid function appears healthy.",
    medications: [],
    image: "/reports/report4.png",
    imageLabel: "D.P.K Hospital Prescription",
  },
];

const statusConfig = {
  normal: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", border: "border-green-200", label: "Normal" },
  attention: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", label: "Needs Attention" },
  critical: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", label: "Critical" },
};

/* ─── Lightbox ─────────────────────────────────────────────── */
function Lightbox({ src, label, onClose }: { src: string; label: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Image className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-800">{label}</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={src}
                download
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 transition"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="overflow-y-auto flex-1 flex items-center justify-center bg-gray-100 p-4">
            <img
              src={src}
              alt={label}
              className="max-w-full rounded-xl shadow-lg object-contain"
              style={{ maxHeight: "75vh" }}
            />
          </div>

          {/* Bottom hint */}
          <p className="text-xs text-center text-gray-400 py-2 flex-shrink-0">
            Press <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono">Esc</kbd> or click outside to close
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const storage = getStorage();

  const uploadReport = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const user = auth.currentUser;
    if (!user) { alert("Not logged in"); return; }
    const fileRef = ref(storage, `reports/${user.uid}/${file.name}`);
    await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(fileRef);
    await addDoc(collection(db, "reports"), {
      userId: user.uid, title: file.name, fileUrl, createdAt: serverTimestamp(),
    });
    alert("Report uploaded ✅");
    fetchReports();
  };

  const fetchReports = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const q = query(collection(db, "reports"), where("userId", "==", user.uid));
    const snapshot = await getDocs(q);
    setReports(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => { fetchReports(); }, []);

  const toggle = (id: string) => setExpanded(expanded === id ? null : id);

  return (
    <div className="space-y-6">
      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          label={lightbox.label}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Reports</h1>
          <p className="text-gray-500 text-sm mt-1">All your medical reports in one place</p>
        </div>
        <div className="flex gap-3">
          <input ref={fileInputRef} type="file" accept="application/pdf,image/*" onChange={uploadReport} className="hidden" />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm font-semibold shadow-md"
          >
            <Plus className="w-4 h-4" /> Upload Report
          </button>
        </div>
      </div>

      {/* Sample Reports */}
      <div className="space-y-4">
        {sampleReports.map((report, i) => {
          const cfg = statusConfig[report.status];
          const StatusIcon = cfg.icon;
          const isOpen = expanded === report.id;

          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Report Header Row */}
              <button
                onClick={() => toggle(report.id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                    <FileText className={`w-5 h-5 ${cfg.color}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{report.title}</p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Hospital className="w-3 h-3" /> {report.source}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" /> {report.date}
                      </span>
                      <span className="text-xs text-gray-400">by {report.doctor}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {cfg.label}
                  </span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">{report.type}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </button>

              {/* Expanded Detail */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-gray-100 px-5 py-5 space-y-5">

                      {/* Two-column: detail + image thumbnail */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Left — summary + meds */}
                        <div className="md:col-span-2 space-y-4">
                          {/* Summary */}
                          <div className={`rounded-xl p-4 border ${cfg.border} ${cfg.bg}`}>
                            <p className={`text-xs font-semibold mb-1 ${cfg.color}`}>Doctor's Summary</p>
                            <p className="text-sm text-gray-700">{report.summary}</p>
                          </div>

                          {/* Medications */}
                          {report.medications.length > 0 ? (
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <Pill className="w-4 h-4 text-blue-500" />
                                <p className="text-sm font-semibold text-gray-800">Medications Prescribed</p>
                              </div>
                              <div className="space-y-2">
                                {report.medications.map((med, mi) => (
                                  <div key={mi} className="flex items-start justify-between bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                                    <div>
                                      <p className="text-sm font-semibold text-gray-900">{med.name}</p>
                                      <p className="text-xs text-gray-500 mt-0.5">{med.frequency} · {med.duration}</p>
                                    </div>
                                    <span className="text-sm font-bold text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-lg ml-3 whitespace-nowrap">
                                      {med.dose}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                              <CheckCircle className="w-4 h-4" />
                              No medications prescribed — all clear!
                            </div>
                          )}
                        </div>

                        {/* Right — Report Image Thumbnail */}
                        <div className="flex flex-col gap-2">
                          <p className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                            <Image className="w-3.5 h-3.5" /> Report Document
                          </p>
                          <button
                            onClick={() => setLightbox({ src: report.image, label: report.imageLabel })}
                            className="group relative rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-blue-400 transition-all bg-gray-50 aspect-[3/4] w-full"
                          >
                            <img
                              src={report.image}
                              alt={report.imageLabel}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-3 shadow-lg">
                                <ZoomIn className="w-5 h-5 text-blue-600" />
                              </div>
                            </div>
                          </button>
                          <p className="text-xs text-center text-gray-400">Click to view full report</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Uploaded Reports from Firebase */}
      {reports.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Upload className="w-4 h-4" /> Your Uploaded Reports
          </h2>
          <div className="space-y-3">
            {reports.map((r) => (
              <div key={r.id} className="p-4 bg-white border border-gray-200 rounded-xl flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-gray-800">{r.title}</span>
                </div>
                <a href={r.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm font-semibold">
                  View →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}