import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Stethoscope, HeartPulse } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
  onSwitchMode: () => void;
}

export function AuthModal({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState<"patient" | "doctor">("patient");
  const [error, setError] = useState("");

  const handleBack = () => {
    onClose();
    navigate("/");
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(
        doc(db, "users", user.uid),
        { name: user.displayName, email: user.email, userType, createdAt: new Date() },
        { merge: true }
      );
      onClose();
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "signup") {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", cred.user.uid), {
          name, email, userType, createdAt: new Date(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back Arrow */}
              <button
                onClick={handleBack}
                className="absolute top-5 left-5 flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Home
              </button>

              <div className="p-8 pt-14">
                <h2 className="text-3xl font-bold mb-1 text-gray-900">
                  {mode === "login" ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  {mode === "login" ? "Sign in to access your health vault" : "Secure your health records today"}
                </p>

                {/* Role Selector */}
                <div className="flex gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setUserType("patient")}
                    className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${userType === "patient"
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-200 bg-gray-50 text-gray-500 hover:border-blue-300"
                      }`}
                  >
                    <HeartPulse className="w-6 h-6" />
                    <span className="text-sm font-semibold">Patient</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("doctor")}
                    className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${userType === "doctor"
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-200 bg-gray-50 text-gray-500 hover:border-blue-300"
                      }`}
                  >
                    <Stethoscope className="w-6 h-6" />
                    <span className="text-sm font-semibold">Doctor</span>
                  </button>
                </div>

                {/* Google Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full mb-5 px-6 py-3.5 bg-white border border-gray-200 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm font-medium text-gray-700"
                >
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Continue with Google as {userType === "patient" ? "Patient" : "Doctor"}
                </button>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 font-medium">OR</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {mode === "signup" && (
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-400 transition"
                      required
                    />
                  )}
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-400 transition"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-400 transition"
                    required
                  />

                  {error && (
                    <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-blue-500/30 hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    {mode === "login" ? "Log In" : "Sign Up"} as {userType === "patient" ? "Patient" : "Doctor"}
                  </button>
                </form>

                <p className="mt-5 text-center text-sm text-gray-500">
                  {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                  <button onClick={onSwitchMode} className="text-blue-600 font-semibold hover:underline">
                    {mode === "login" ? "Sign Up" : "Log In"}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}