import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    MessageCircle, FileText, Activity, ChevronRight, Send,
    Paperclip, User, Stethoscope, Phone, Mail, MapPin, Award,
    LogOut, Home, CheckCheck, Clock, AlertCircle, CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

/* ─── Sample Data ──────────────────────────────────────────── */

interface SharedReport {
    title: string;
    hospital: string;
    date: string;
    status: "normal" | "attention" | "critical";
    summary: string;
}

interface ChatMessage {
    id: string;
    from: "patient" | "doctor";
    text?: string;
    time: string;
    type: "text" | "report" | "symptom";
    report?: SharedReport;
    symptoms?: string[];
    read: boolean;
}

interface Patient {
    id: string;
    name: string;
    age: number;
    avatar: string;
    lastMsg: string;
    lastTime: string;
    unread: number;
    bloodGroup: string;
    messages: ChatMessage[];
}

const patients: Patient[] = [
    {
        id: "p1",
        name: "Ravi Sharma",
        age: 38,
        avatar: "RS",
        bloodGroup: "B+",
        lastMsg: "Please check my CBC report",
        lastTime: "10:24 AM",
        unread: 2,
        messages: [
            {
                id: "m1", from: "patient", type: "text",
                text: "Good morning Doctor, I have been feeling very tired lately.",
                time: "9:55 AM", read: true,
            },
            {
                id: "m2", from: "patient", type: "symptom",
                symptoms: ["Persistent fatigue", "Dizziness", "Shortness of breath", "Low appetite"],
                time: "10:00 AM", read: true,
            },
            {
                id: "m3", from: "doctor", type: "text",
                text: "Hello Ravi, these symptoms may indicate anaemia. Please share your latest blood test report.",
                time: "10:15 AM", read: true,
            },
            {
                id: "m4", from: "patient", type: "report",
                report: {
                    title: "Complete Blood Count (CBC)",
                    hospital: "Apollo Hospitals, Mumbai",
                    date: "Feb 14, 2026",
                    status: "attention",
                    summary: "Haemoglobin: 10.8 g/dL (low). WBC normal. Platelets normal. MCV elevated.",
                },
                time: "10:24 AM", read: false,
                text: "Please check my CBC report",
            },
        ],
    },
    {
        id: "p2",
        name: "Anjali Mehta",
        age: 52,
        avatar: "AM",
        bloodGroup: "O+",
        lastMsg: "Doctor, my sugar levels are high again",
        lastTime: "Yesterday",
        unread: 0,
        messages: [
            {
                id: "m1", from: "patient", type: "symptom",
                symptoms: ["Increased thirst", "Frequent urination", "Blurred vision", "Fatigue"],
                time: "Jan 20, 9:00 AM", read: true,
            },
            {
                id: "m2", from: "patient", type: "text",
                text: "Doctor, my sugar levels are high again. Should I increase Metformin?",
                time: "Jan 20, 9:05 AM", read: true,
            },
            {
                id: "m3", from: "patient", type: "report",
                report: {
                    title: "Diabetes & HbA1c Panel",
                    hospital: "Max Healthcare, Bangalore",
                    date: "Jan 10, 2026",
                    status: "critical",
                    summary: "HbA1c: 8.2% — diabetic range. Fasting glucose: 172 mg/dL. Immediate attention required.",
                },
                time: "Jan 20, 9:10 AM", read: true,
                text: "Attached my HbA1c report",
            },
            {
                id: "m4", from: "doctor", type: "text",
                text: "Anjali, your HbA1c is quite elevated. I'm adjusting your Metformin to 1000 mg twice daily. Please follow strict dietary guidelines and come for a follow-up in 2 weeks.",
                time: "Jan 20, 11:30 AM", read: true,
            },
        ],
    },
    {
        id: "p3",
        name: "Suresh Nair",
        age: 45,
        avatar: "SN",
        bloodGroup: "A−",
        lastMsg: "Attached my X-Ray",
        lastTime: "Feb 19",
        unread: 1,
        messages: [
            {
                id: "m1", from: "patient", type: "text",
                text: "Doctor, I have chest pain when I breathe deeply. Started 3 days ago.",
                time: "Feb 19, 2:00 PM", read: true,
            },
            {
                id: "m2", from: "patient", type: "symptom",
                symptoms: ["Chest pain on deep breath", "Mild cough", "Low-grade fever (99°F)"],
                time: "Feb 19, 2:02 PM", read: true,
            },
            {
                id: "m3", from: "patient", type: "report",
                report: {
                    title: "Chest X-Ray Report",
                    hospital: "Fortis Hospital, Delhi",
                    date: "Jan 28, 2026",
                    status: "normal",
                    summary: "Lungs appear clear. No consolidation or pleural effusion detected. Heart size normal.",
                },
                time: "Feb 19, 2:10 PM", read: false,
                text: "Attached my X-Ray",
            },
        ],
    },
];

/* ─── Status Config ──────────────────────────────────────────── */
const statusCfg = {
    normal: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", border: "border-green-200", label: "Normal" },
    attention: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", label: "Needs Attention" },
    critical: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", label: "Critical" },
};

/* ─── Doctor Profile ─────────────────────────────────────────── */
function DoctorProfile() {
    const user = auth.currentUser;
    const navigate = useNavigate();
    const handleLogout = async () => { await signOut(auth); navigate("/"); };

    return (
        <div className="flex-1 overflow-y-auto p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Doctor Profile</h2>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Banner */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Stethoscope className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">{user?.displayName || "Doctor"}</h3>
                            <p className="text-blue-100 text-sm mt-0.5">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="p-6 space-y-4">
                    {[
                        { icon: Mail, label: "Email", value: user?.email || "—" },
                        { icon: Award, label: "Specialisation", value: "General Physician" },
                        { icon: MapPin, label: "Hospital", value: "City Medical Centre" },
                        { icon: Phone, label: "Contact", value: "+91 98765 00000" },
                    ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Icon className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium">{label}</p>
                                <p className="text-sm font-semibold text-gray-800">{value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="px-6 pb-6">
                    <div className="grid grid-cols-3 gap-3 mb-5">
                        {[["12", "Patients Today"], ["48", "Total Patients"], ["4.9★", "Rating"]].map(([val, lbl]) => (
                            <div key={lbl} className="text-center bg-blue-50 rounded-xl py-3 border border-blue-100">
                                <p className="text-lg font-bold text-blue-700">{val}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{lbl}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition text-sm font-medium">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─── Chat View ──────────────────────────────────────────────── */
function ChatView({ patient }: { patient: Patient }) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>(patient.messages);

    const send = () => {
        if (!input.trim()) return;
        setMessages((m) => [
            ...m,
            { id: `d-${Date.now()}`, from: "doctor", type: "text", text: input, time: "Just now", read: true },
        ]);
        setInput("");
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gray-100 bg-white flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm">
                    {patient.avatar}
                </div>
                <div>
                    <p className="font-semibold text-gray-900">{patient.name}</p>
                    <p className="text-xs text-gray-400">Age {patient.age} · Blood group {patient.bloodGroup}</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-gray-50/60">
                {messages.map((msg) => {
                    const isDoc = msg.from === "doctor";

                    /* Shared Report Bubble */
                    if (msg.type === "report" && msg.report) {
                        const cfg = statusCfg[msg.report.status];
                        const StatusIcon = cfg.icon;
                        return (
                            <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                className={`flex ${isDoc ? "justify-end" : "justify-start"}`}>
                                <div className="max-w-sm">
                                    {msg.text && (
                                        <p className={`text-xs mb-1.5 ${isDoc ? "text-right text-gray-400" : "text-gray-400"}`}>
                                            {msg.text}
                                        </p>
                                    )}
                                    <div className={`rounded-2xl border overflow-hidden shadow-sm ${cfg.bg} ${cfg.border}`}>
                                        <div className="px-4 pt-4 pb-2 flex items-start gap-3">
                                            <div className={`w-9 h-9 rounded-lg ${cfg.bg} border ${cfg.border} flex items-center justify-center flex-shrink-0`}>
                                                <FileText className={`w-4 h-4 ${cfg.color}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-900 text-sm leading-tight">{msg.report.title}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{msg.report.hospital} · {msg.report.date}</p>
                                            </div>
                                            <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color} border ${cfg.border} whitespace-nowrap`}>
                                                <StatusIcon className="w-3 h-3" /> {cfg.label}
                                            </span>
                                        </div>
                                        <p className="px-4 pb-4 text-xs text-gray-600">{msg.report.summary}</p>
                                    </div>
                                    <p className={`text-xs mt-1 text-gray-300 ${isDoc ? "text-right" : ""}`}>{msg.time}</p>
                                </div>
                            </motion.div>
                        );
                    }

                    /* Symptom Bubble */
                    if (msg.type === "symptom" && msg.symptoms) {
                        return (
                            <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                className="flex justify-start">
                                <div className="max-w-sm bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3 shadow-sm">
                                    <p className="text-xs font-semibold text-orange-600 mb-2 flex items-center gap-1">
                                        <Activity className="w-3 h-3" /> Symptoms Reported
                                    </p>
                                    <ul className="space-y-1">
                                        {msg.symptoms.map((s, i) => (
                                            <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" /> {s}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-xs mt-2 text-gray-300">{msg.time}</p>
                                </div>
                            </motion.div>
                        );
                    }

                    /* Text Bubble */
                    return (
                        <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            className={`flex ${isDoc ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-sm px-4 py-3 rounded-2xl shadow-sm text-sm ${isDoc
                                    ? "bg-blue-600 text-white rounded-br-sm"
                                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                                }`}>
                                <p>{msg.text}</p>
                                <p className={`text-xs mt-1 ${isDoc ? "text-blue-200" : "text-gray-300"} flex items-center gap-1 ${isDoc ? "justify-end" : ""}`}>
                                    {msg.time}
                                    {isDoc && <CheckCheck className={`w-3 h-3 ${msg.read ? "text-blue-200" : "text-blue-400"}`} />}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Reply Bar */}
            <div className="px-4 py-3 border-t border-gray-100 bg-white flex items-center gap-3">
                <button className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 transition">
                    <Paperclip className="w-5 h-5" />
                </button>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder={`Reply to ${patient.name}…`}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 transition"
                />
                <button
                    onClick={send}
                    disabled={!input.trim()}
                    className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 transition"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

/* ─── Doctor Dashboard ───────────────────────────────────────── */
export function DoctorDashboard() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<Patient | null>(null);
    const [view, setView] = useState<"chat" | "profile">("chat");
    const handleLogout = async () => { await signOut(auth); navigate("/"); };
    const user = auth.currentUser;

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">

            {/* LEFT SIDEBAR */}
            <div className="w-72 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
                {/* Logo */}
                <div className="p-5 border-b border-gray-100">
                    <button onClick={() => navigate("/")} className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                            <Stethoscope className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-gray-800 group-hover:text-blue-600 transition">LifeVault</span>
                        <span className="ml-auto text-xs font-semibold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Doctor</span>
                    </button>
                </div>

                {/* Nav */}
                <div className="px-4 py-3 space-y-1">
                    <button
                        onClick={() => { setView("chat"); setSelected(null); }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${view === "chat" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                    >
                        <MessageCircle className="w-4 h-4" /> Patient Messages
                    </button>
                    <button
                        onClick={() => setView("profile")}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${view === "profile" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                    >
                        <User className="w-4 h-4" /> My Profile
                    </button>
                </div>

                {/* Patient List */}
                {view === "chat" && (
                    <>
                        <p className="px-5 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-widest">Patients</p>
                        <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-1">
                            {patients.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => setSelected(p)}
                                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition ${selected?.id === p.id
                                            ? "bg-blue-50 border border-blue-200"
                                            : "hover:bg-gray-50"
                                        }`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                        {p.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                                            <span className="text-xs text-gray-400 flex-shrink-0 ml-1">{p.lastTime}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 truncate mt-0.5">{p.lastMsg}</p>
                                    </div>
                                    {p.unread > 0 && (
                                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">
                                            {p.unread}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {/* Bottom */}
                <div className="p-4 border-t border-gray-100 space-y-1">
                    <button onClick={() => navigate("/")} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition">
                        <Home className="w-4 h-4" /> Home
                    </button>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-red-50 hover:text-red-500 transition">
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <AnimatePresence mode="wait">
                    {view === "profile" ? (
                        <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                            className="flex-1 overflow-y-auto">
                            <DoctorProfile />
                        </motion.div>
                    ) : selected ? (
                        <motion.div key={selected.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                            className="flex flex-col flex-1 overflow-hidden">
                            <ChatView patient={selected} />
                        </motion.div>
                    ) : (
                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="flex-1 flex flex-col items-center justify-center text-center px-8">
                            <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center mb-5">
                                <MessageCircle className="w-10 h-10 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Select a Patient</h3>
                            <p className="text-gray-400 text-sm max-w-xs">
                                Choose a patient from the list to view their messages, shared reports, and symptoms.
                            </p>
                            <div className="mt-6 grid grid-cols-3 gap-3 w-full max-w-xs">
                                {["3 Patients", "2 Unread", "1 Critical"].map((s) => (
                                    <div key={s} className="bg-white border border-gray-100 rounded-xl py-3 text-center shadow-sm">
                                        <p className="text-xs font-semibold text-gray-700">{s}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
