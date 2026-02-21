import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'LifeVault backend is running',
    timestamp: new Date().toISOString(),
  });
});

// ─── Example API Routes ────────────────────────────────────────────────────────
// These endpoints complement the Firebase frontend – add your own server-side
// logic here as the project grows.

// Example: User profile endpoint (stub)
app.get('/api/user/:uid', (req, res) => {
  const { uid } = req.params;
  // In a real app you'd query a DB or Firebase Admin SDK here
  res.json({
    uid,
    message: 'Add your server-side user logic here',
  });
});

// Example: Documents endpoint (stub)
app.get('/api/documents', (req, res) => {
  res.json({
    documents: [],
    message: 'Add your server-side documents logic here',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
});

// Global error handler
app.use((err, req, res, _next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 LifeVault Backend running at http://localhost:${PORT}`);
  console.log(`   Health check → http://localhost:${PORT}/api/health`);
  console.log(`   CORS allowed from: ${FRONTEND_URL}\n`);
});
