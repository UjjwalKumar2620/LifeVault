import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load .env for local dev — Railway injects env vars directly, so this is a no-op in production
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3001;
const allowedOrigins = [
  "http://localhost:5173",
  "https://life-vault-dusky.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const AI_MODEL = 'qwen/qwen3-235b-a22b-thinking-2507';

// ─── In-Memory User Store ───────────────────────────────────────────────────
// Maps uid → { uid, email, name, registeredAt }
// Replace with a real DB (e.g. Firestore Admin / Postgres) when ready.
const userStore = new Map();

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'LifeVault backend is running',
    timestamp: new Date().toISOString(),
    users: userStore.size,
  });
});

// ─── Register User ────────────────────────────────────────────────────────────
// Called from the frontend immediately after Firebase login/signup.
// Body: { uid, email, name }
app.post('/api/register-user', (req, res) => {
  const { uid, email, name } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ error: 'uid and email are required' });
  }

  if (!userStore.has(uid)) {
    userStore.set(uid, { uid, email, name: name || 'Unknown', registeredAt: new Date().toISOString() });
    console.log(`✅ Registered new user: ${email} (${uid})`);
  } else {
    console.log(`ℹ️  User already registered: ${email} (${uid})`);
  }

  return res.json({ success: true, message: 'User registered successfully' });
});

// ─── AI Chat Endpoint ─────────────────────────────────────────────────────────
// Body: { uid, messages: [{ role, content }] }
// The OpenRouter key is used server-side only — never sent to the frontend.
app.post('/api/ai/chat', async (req, res) => {
  const { uid, messages } = req.body;

  // 1. Guard: user must be registered
  if (!uid || !userStore.has(uid)) {
    return res.status(401).json({
      error: 'User not found. Please log in again.',
    });
  }

  // 2. Validate messages
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  // 3. Validate API key
  if (!OPENROUTER_API_KEY) {
    console.error('❌ OPENROUTER_API_KEY is not set in environment');
    return res.status(500).json({ error: 'AI service is not configured. Contact support.' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': FRONTEND_URL,
        'X-Title': 'LifeVault Medical AI',
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages,
        max_tokens: 500,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error('OpenRouter error:', errData);
      return res.status(502).json({
        error: errData?.error?.message || 'AI service returned an error. Please try again.',
      });
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content;

    if (!aiMessage) {
      return res.status(502).json({ error: 'Empty response from AI. Please try again.' });
    }

    return res.json({ message: aiMessage });

  } catch (err) {
    console.error('AI fetch error:', err);
    return res.status(500).json({ error: 'Failed to reach AI service. Please try again.' });
  }
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 LifeVault Backend running at http://localhost:${PORT}`);
  console.log(`   Health check  → http://localhost:${PORT}/api/health`);
  console.log(`   Register user → POST http://localhost:${PORT}/api/register-user`);
  console.log(`   AI chat       → POST http://localhost:${PORT}/api/ai/chat`);
  console.log(`   CORS allowed from: ${FRONTEND_URL}`);
  console.log(`   OpenRouter key: ${OPENROUTER_API_KEY ? '✅ configured' : '❌ MISSING'}\n`);
});
