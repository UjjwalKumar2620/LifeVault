import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
    User, Droplets, Phone, Heart, Shield, Save, CheckCircle, Edit2, AlertTriangle,
} from "lucide-react";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const BLOOD_GROUPS = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];

const sampleReportsMini = [
    { title: "Complete Blood Count (CBC)", date: "Feb 14, 2026", status: "attention", hospital: "Apollo Hospitals, Mumbai" },
    { title: "Chest X-Ray Report", date: "Jan 28, 2026", status: "normal", hospital: "Fortis Hospital, Delhi" },
    { title: "Diabetes & HbA1c Panel", date: "Jan 10, 2026", status: "critical", hospital: "Max Healthcare, Bangalore" },
    { title: "Thyroid Function Test", date: "Dec 5, 2025", status: "normal", hospital: "Narayana Health, Chennai" },
];

const statusMap: Record<string, string> = {
    normal: "bg-green-100 text-green-700",
    attention: "bg-yellow-100 text-yellow-700",
    critical: "bg-red-100 text-red-700",
};

interface PatientProfile {
    fullName: string;
    bloodGroup: string;
    contact: string;
    emergencyDonation: boolean;
    age: string;
}

const defaultProfile: PatientProfile = {
    fullName: "",
    bloodGroup: "",
    contact: "",
    emergencyDonation: false,
    age: "",
};

export function PatientProfileSection() {
    const [profile, setProfile] = useState<PatientProfile>(defaultProfile);
    const [editing, setEditing] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);

    // Load from Firestore
    useEffect(() => {
        const load = async () => {
            const user = auth.currentUser;
            if (!user) { setLoading(false); return; }
            try {
                const snap = await getDoc(doc(db, "patientProfiles", user.uid));
                if (snap.exists()) {
                    setProfile({ ...defaultProfile, ...snap.data() } as PatientProfile);
                } else {
                    // Pre-fill name from auth
                    setProfile((p) => ({ ...p, fullName: user.displayName || "" }));
                    setEditing(true); // first time — open edit mode
                }
            } catch {
                setEditing(true);
            }
            setLoading(false);
        };
        load();
    }, []);

    const handleSave = async () => {
        const user = auth.currentUser;
        if (!user) return;
        await setDoc(doc(db, "patientProfiles", user.uid), profile, { merge: true });
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const set = (field: keyof PatientProfile, value: any) =>
        setProfile((p) => ({ ...p, [field]: value }));

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-3xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your personal health information</p>
                </div>
                {!editing && (
                    <button
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:border-blue-400 hover:text-blue-600 transition text-sm font-medium"
                    >
                        <Edit2 className="w-4 h-4" /> Edit Profile
                    </button>
                )}
            </div>

            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
            >
                {/* Top Banner */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">
                                {profile.fullName || "Your Name"}
                            </h2>
                            <div className="flex items-center gap-3 mt-1">
                                {profile.bloodGroup && (
                                    <span className="flex items-center gap-1 text-blue-100 text-sm">
                                        <Droplets className="w-3.5 h-3.5" />
                                        {profile.bloodGroup}
                                    </span>
                                )}
                                {profile.age && (
                                    <span className="text-blue-100 text-sm">Age {profile.age}</span>
                                )}
                            </div>
                        </div>
                        {profile.emergencyDonation && (
                            <div className="ml-auto flex items-center gap-1.5 bg-red-500/20 border border-red-400/30 text-red-100 text-xs px-3 py-1.5 rounded-full">
                                <Heart className="w-3.5 h-3.5 fill-current" />
                                Blood Donor
                            </div>
                        )}
                    </div>
                </div>

                {/* Form Fields */}
                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-1.5">
                                <User className="w-3.5 h-3.5" /> Full Name
                            </label>
                            {editing ? (
                                <input
                                    value={profile.fullName}
                                    onChange={(e) => set("fullName", e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition"
                                />
                            ) : (
                                <p className="text-gray-800 font-medium px-1">{profile.fullName || "—"}</p>
                            )}
                        </div>

                        {/* Age */}
                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-1.5">
                                Age
                            </label>
                            {editing ? (
                                <input
                                    value={profile.age}
                                    onChange={(e) => set("age", e.target.value)}
                                    placeholder="e.g. 28"
                                    type="number"
                                    min="0" max="120"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition"
                                />
                            ) : (
                                <p className="text-gray-800 font-medium px-1">{profile.age || "—"}</p>
                            )}
                        </div>

                        {/* Blood Group */}
                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-1.5">
                                <Droplets className="w-3.5 h-3.5 text-red-500" /> Blood Group
                            </label>
                            {editing ? (
                                <div className="flex flex-wrap gap-2">
                                    {BLOOD_GROUPS.map((bg) => (
                                        <button
                                            key={bg}
                                            type="button"
                                            onClick={() => set("bloodGroup", bg)}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition ${profile.bloodGroup === bg
                                                    ? "bg-red-500 text-white border-red-500"
                                                    : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
                                                }`}
                                        >
                                            {bg}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-800 font-bold px-1 text-lg text-red-600">{profile.bloodGroup || "—"}</p>
                            )}
                        </div>

                        {/* Contact */}
                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-1.5">
                                <Phone className="w-3.5 h-3.5" /> Contact Number
                            </label>
                            {editing ? (
                                <input
                                    value={profile.contact}
                                    onChange={(e) => set("contact", e.target.value)}
                                    placeholder="+91 98765 43210"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition"
                                />
                            ) : (
                                <p className="text-gray-800 font-medium px-1">{profile.contact || "—"}</p>
                            )}
                        </div>
                    </div>

                    {/* Emergency Donation Toggle */}
                    <div className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${profile.emergencyDonation
                            ? "bg-red-50 border-red-200"
                            : "bg-gray-50 border-gray-200"
                        }`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${profile.emergencyDonation ? "bg-red-500" : "bg-gray-300"
                            }`}>
                            <Heart className={`w-5 h-5 ${profile.emergencyDonation ? "text-white fill-white" : "text-white"}`} />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-900">Emergency Blood Donation</p>
                            <p className="text-sm text-gray-500 mt-0.5">
                                Allow hospitals to contact you in emergencies when your blood group is needed.
                            </p>
                            {profile.emergencyDonation && (
                                <div className="flex items-center gap-1.5 mt-2 text-xs text-red-600 font-medium">
                                    <AlertTriangle className="w-3.5 h-3.5" />
                                    Your contact info may be shared with verified hospitals
                                </div>
                            )}
                        </div>
                        {editing ? (
                            <button
                                type="button"
                                onClick={() => set("emergencyDonation", !profile.emergencyDonation)}
                                className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${profile.emergencyDonation ? "bg-red-500" : "bg-gray-300"
                                    }`}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${profile.emergencyDonation ? "translate-x-6" : "translate-x-0"
                                        }`}
                                />
                            </button>
                        ) : (
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${profile.emergencyDonation ? "bg-red-100 text-red-600" : "bg-gray-200 text-gray-500"
                                }`}>
                                {profile.emergencyDonation ? "ON" : "OFF"}
                            </span>
                        )}
                    </div>

                    {/* Save / Success */}
                    {editing && (
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition shadow-md"
                            >
                                <Save className="w-4 h-4" /> Save Profile
                            </button>
                            {!profile.fullName && (
                                <button
                                    onClick={() => setEditing(false)}
                                    className="px-6 py-2.5 border border-gray-200 text-gray-500 rounded-xl text-sm hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    )}
                    {saved && (
                        <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-green-600 text-sm font-medium"
                        >
                            <CheckCircle className="w-4 h-4" /> Profile saved successfully!
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* My Reports Summary */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" /> My Health Reports
                </h3>
                <div className="space-y-2">
                    {sampleReportsMini.map((r, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm"
                        >
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{r.title}</p>
                                <p className="text-xs text-gray-400">{r.hospital} · {r.date}</p>
                            </div>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusMap[r.status]}`}>
                                {r.status}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
