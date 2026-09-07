// server/index.js
//
// A tiny local backend whose ONLY job is to classify text as
// "happy" | "sad" | "neutral" using a real model. This exists so the
// Anthropic API key never has to live in the browser — the frontend
// calls this server, this server calls Anthropic.
//
// Run with: npm run server   (or just `npm run dev`, which starts this
// alongside the Vite dev server).

import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = "claude-haiku-4-5-20251001"; // fast + cheap, plenty for a one-word classification

const VALID = new Set(["happy", "sad", "neutral"]);

app.post("/api/classify-emotion", async (req, res) => {
  const text = (req.body?.text ?? "").toString().trim();

  if (!text) {
    return res.status(400).json({ error: "Missing text" });
  }

  if (!API_KEY) {
    return res.status(500).json({
      error: "ANTHROPIC_API_KEY is not set. Add it to a .env file in the project root.",
    });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 6,
        temperature: 0,
        system:
          "You are an emotion classifier. Read the message and decide whether its overall emotional tone is happy, sad, or neutral. Consider the whole message, sarcasm, and mixed signals, not just individual keywords. Respond with exactly one lowercase word — happy, sad, or neutral — and nothing else.",
        messages: [{ role: "user", content: text }],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Anthropic API error:", response.status, detail);
      return res.status(502).json({ error: "Classifier request failed" });
    }

    const data = await response.json();
    const raw = (data?.content?.[0]?.text ?? "").trim().toLowerCase();
    const emotion = VALID.has(raw) ? raw : "neutral";

    return res.json({ emotion });
  } catch (err) {
    console.error("Classifier error:", err);
    return res.status(500).json({ error: "Classifier request failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Emotion classifier server running on http://localhost:${PORT}`);
  if (!API_KEY) {
    console.warn(
      "⚠️  No ANTHROPIC_API_KEY found — the frontend will fall back to the local heuristic classifier."
    );
  }
});
