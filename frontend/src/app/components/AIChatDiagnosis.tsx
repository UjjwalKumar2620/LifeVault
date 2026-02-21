import { motion, AnimatePresence } from 'motion/react';
import {
  Send, Bot, User, AlertCircle, MessageSquare, Clock,
  MapPin, Phone, Loader2, TriangleAlert,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/* ─── OpenRouter config ──────────────────────────────────────── */
const OPENROUTER_API_KEY = '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';
const MODEL = 'qwen/qwen3-235b-a22b-thinking-2507';

const SYSTEM_PROMPT = `You are MedAI, an expert medical AI assistant built into LifeVault, a personal health management app.

Your role:
- Carefully analyze patient-described symptoms
- Ask clarifying questions when needed
- Provide a thoughtful, empathetic diagnosis overview
- Always mention possible causes
- Rate the severity (1–10) explicitly at the end of every response using this exact format: **Severity: X/10**
- If severity is 8, 9, or 10 – STRONGLY urge the patient to see a doctor or visit a clinic immediately
- Never replace a real doctor; always recommend professional consultation for serious symptoms

Formatting rules:
- Keep responses concise and clear (under 200 words)
- Use bullet points for causes/symptoms when listing multiple
- Empathetic, calm tone – patients may be anxious
- Always end with **Severity: X/10** on its own line`;

/* ─── Types ──────────────────────────────────────────────────── */
interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  severity?: number | null;
}

interface HistoryItem {
  id: string;
  title: string;
  time: string;
  messages: Message[];
}

/* ─── Helper: extract severity ───────────────────────────────── */
function parseSeverity(text: string): number | null {
  const match = text.match(/\*{0,2}Severity:\s*(\d+)\s*\/\s*10\*{0,2}/i);
  return match ? parseInt(match[1], 10) : null;
}

/* ─── Urgent Doctor Banner ───────────────────────────────────── */
function UrgentReferral({ severity }: { severity: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="mt-2 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-4"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
          <TriangleAlert className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-red-800 text-sm mb-1">
            ⚠️ High Severity Detected — {severity}/10
          </h4>
          <p className="text-xs text-red-700 mb-3">
            Based on your symptoms, this condition requires immediate medical attention.
            Please do not delay — visit a doctor or clinic right away.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:108"
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-red-500 text-white rounded-xl text-xs font-bold hover:bg-red-600 transition"
            >
              <Phone className="w-3.5 h-3.5" /> Call 108 (Emergency)
            </a>
            <a
              href="https://www.google.com/maps/search/nearest+clinic+or+hospital/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-orange-500 text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition"
            >
              <MapPin className="w-3.5 h-3.5" /> Find Nearest Clinic
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Format AI markdown-lite ────────────────────────────────── */
function FormatContent({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => {
        const html = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        if (line.startsWith('- ') || line.startsWith('• ')) {
          return (
            <li key={i} className="ml-4 list-disc text-sm"
              dangerouslySetInnerHTML={{ __html: html.replace(/^[-•] /, '') }} />
          );
        }
        return <p key={i} className={`text-sm ${line === '' ? 'h-1.5' : ''}`}
          dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export function AIChatDiagnosis() {
  const makeWelcome = (): Message => ({
    id: '0',
    role: 'ai',
    content:
      "Hello! I'm **MedAI**, your personal health assistant. 👋\n\nDescribe your symptoms in detail and I'll help analyse what might be going on.",
    timestamp: new Date(),
    severity: null,
  });

  const [messages, setMessages] = useState<Message[]>([makeWelcome()]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 'h1', title: 'Headache and Fever', time: 'Today 2:30 PM', messages: [] },
    { id: 'h2', title: 'Back Pain Issue', time: 'Today 11:15 AM', messages: [] },
    { id: 'h3', title: 'Stomach Discomfort', time: 'Yesterday', messages: [] },
    { id: 'h4', title: 'Sleep Problems', time: 'Yesterday', messages: [] },
    { id: 'h5', title: 'Cold and Cough', time: 'Feb 18', messages: [] },
    { id: 'h6', title: 'Knee Pain After Exercise', time: 'Feb 17', messages: [] },
  ]);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  /* ── Call OpenRouter ── */
  const callAI = async (userText: string, currentMessages: Message[]): Promise<string> => {
    const apiMessages: { role: string; content: string }[] = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];
    currentMessages.slice(1).forEach((m) => {
      apiMessages.push({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content });
    });
    apiMessages.push({ role: 'user', content: userText });

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://lifevault.app',
        'X-Title': 'LifeVault Medical AI',
      },
      body: JSON.stringify({ model: MODEL, messages: apiMessages, max_tokens: 500, temperature: 0.5 }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `API error ${res.status}`);
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response. Please try again.';
  };

  /* ── Send ── */
  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const aiText = await callAI(text, updatedMessages);
      const sev = parseSeverity(aiText);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', content: aiText, timestamp: new Date(), severity: sev };
      const finalMessages = [...updatedMessages, aiMsg];
      setMessages(finalMessages);

      // Save to history (use first user message as title)
      const title = updatedMessages.find((m) => m.role === 'user')?.content.slice(0, 40) || 'New Chat';
      if (!activeHistoryId) {
        const newId = `live-${Date.now()}`;
        const newItem: HistoryItem = { id: newId, title, time: 'Just now', messages: finalMessages };
        setHistory((prev) => [newItem, ...prev]);
        setActiveHistoryId(newId);
      } else {
        setHistory((prev) =>
          prev.map((h) => h.id === activeHistoryId ? { ...h, messages: finalMessages } : h)
        );
      }
    } catch (err: any) {
      const errMsg: Message = {
        id: (Date.now() + 1).toString(), role: 'ai', timestamp: new Date(), severity: null,
        content: `⚠️ Error: ${err.message}. Please try again.`,
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  /* ── Load a history chat ── */
  const loadHistory = (item: HistoryItem) => {
    if (item.messages.length > 0) {
      setMessages(item.messages);
    } else {
      setMessages([makeWelcome()]);
    }
    setActiveHistoryId(item.id);
    setInput('');
  };

  /* ── New chat ── */
  const newChat = () => {
    setMessages([makeWelcome()]);
    setActiveHistoryId(null);
    setInput('');
    inputRef.current?.focus();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-120px)] min-h-[600px]">

      {/* ── MAIN CHAT ── */}
      <div className="xl:col-span-3 flex flex-col">
        <div className="bg-white/90 backdrop-blur-lg border border-blue-100 rounded-3xl shadow-lg flex flex-col flex-1 overflow-hidden">

          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-blue-50 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-3xl flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold">MedAI · AI Symptom Checker</h3>
              <p className="text-blue-100 text-xs">For guidance only — not a substitute for a doctor</p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white text-xs font-medium">Online</span>
              </div>
              <button
                onClick={newChat}
                className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl transition font-medium"
              >
                + New Chat
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-slate-50/60">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'ai'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-700'
                      : 'bg-gradient-to-br from-gray-400 to-gray-500'
                    }`}>
                    {msg.role === 'ai'
                      ? <Bot className="w-4 h-4 text-white" />
                      : <User className="w-4 h-4 text-white" />}
                  </div>

                  <div className={`flex-1 flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${msg.role === 'ai'
                        ? 'bg-white border border-blue-100 text-gray-800 rounded-tl-sm'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-sm'
                      }`}>
                      <div className="space-y-0.5">
                        <FormatContent text={msg.content} />
                      </div>
                    </div>

                    {/* High severity urgent banner */}
                    {msg.role === 'ai' && msg.severity !== null && msg.severity !== undefined && msg.severity >= 8 && (
                      <div className="max-w-[85%] w-full">
                        <UrgentReferral severity={msg.severity} />
                      </div>
                    )}

                    <p className={`text-xs text-gray-400 mt-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading */}
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-blue-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 shadow-sm">
                  <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                  <span className="text-sm text-gray-500">MedAI is analysing your symptoms…</span>
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-5 py-4 border-t border-gray-100 bg-white rounded-b-3xl flex-shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Describe your symptoms in detail…"
                disabled={loading}
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-400 focus:bg-white outline-none text-gray-800 placeholder:text-gray-400 text-sm transition disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-md hover:shadow-blue-500/30 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── CHAT HISTORY ── */}
      <div className="xl:col-span-1 flex flex-col">
        <div className="bg-white/90 backdrop-blur-lg border border-blue-100 rounded-3xl p-5 shadow-lg flex flex-col flex-1 overflow-hidden">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 flex-shrink-0">
            <MessageSquare className="w-5 h-5 text-blue-600" /> Chat History
          </h4>

          <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => loadHistory(item)}
                className={`w-full text-left px-3 py-3 rounded-xl transition group border ${activeHistoryId === item.id
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-slate-50 hover:bg-blue-50 border-transparent hover:border-blue-100 text-gray-700'
                  }`}
              >
                <p className={`text-sm font-medium truncate ${activeHistoryId === item.id ? 'text-blue-700' : 'group-hover:text-blue-600'}`}>
                  {item.title}
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" /> {item.time}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex-shrink-0">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700">
                MedAI provides general guidance only. Always consult a licensed doctor for medical decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}