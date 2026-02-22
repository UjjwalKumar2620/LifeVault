import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Frontend URL (from Railway env or fallback)
const FRONTEND_URL =
  process.env.FRONTEND_URL || "https://life-vault-dusky.vercel.app";

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://life-vault-dusky.vercel.app"
];

// CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// OpenRouter
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const AI_MODEL = "qwen/qwen3-235b-a22b-thinking-2507";

// In-memory users
const userStore = new Map();


// ---------------- HEALTH ----------------
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "LifeVault backend is running",
    timestamp: new Date().toISOString(),
    users: userStore.size,
  });
});


// ---------------- REGISTER ----------------
app.post("/api/register-user", (req, res) => {
  const { uid, email, name } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ error: "uid and email required" });
  }

  if (!userStore.has(uid)) {
    userStore.set(uid, {
      uid,
      email,
      name: name || "Unknown",
      registeredAt: new Date().toISOString(),
    });

    console.log("Registered:", email);
  }

  res.json({ success: true });
});


// ---------------- AI CHAT ----------------
app.post("/api/ai/chat", async (req, res) => {
  const { uid, messages } = req.body;

  if (!uid || !userStore.has(uid)) {
    return res.status(401).json({
      error: "User not logged in",
    });
  }

  if (!Array.isArray(messages)) {
    return res.status(400).json({
      error: "Messages required",
    });
  }

  if (!OPENROUTER_API_KEY) {
    return res.status(500).json({
      error: "AI key missing",
    });
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": FRONTEND_URL,
          "X-Title": "LifeVault",
        },
        body: JSON.stringify({
          model: AI_MODEL,
          messages,
          max_tokens: 500,
          temperature: 0.5,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();

      console.error("AI error:", err);

      return res.status(502).json({
        error: "AI failed",
      });
    }

    const data = await response.json();

    const aiMessage =
      data.choices?.[0]?.message?.content || "No response";

    res.json({ message: aiMessage });

  } catch (err) {
    console.error("Fetch error:", err);

    res.status(500).json({
      error: "AI server error",
    });
  }
});


// ---------------- 404 ----------------
app.use((req, res) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.url} not found`,
  });
});


// ---------------- ERROR ----------------
app.use((err, _req, res, _next) => {
  console.error(err);

  res.status(500).json({
    error: "Internal server error",
  });
});


// ---------------- START ----------------
app.listen(PORT, () => {
  console.log("🚀 LifeVault Backend Started");
  console.log("Port:", PORT);
  console.log("Frontend:", FRONTEND_URL);
  console.log(
    "OpenRouter:",
    OPENROUTER_API_KEY ? "OK" : "MISSING"
  );
});