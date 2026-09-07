export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { text } = req.body || {};
  const trimmed = (text ?? "").toString().trim();

  if (!trimmed) {
    res.status(400).json({ error: "Missing text" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "ANTHROPIC_API_KEY is not set" });
    return;
  }

  const VALID = new Set(["happy", "sad", "neutral"]);
  const MODEL = "claude-haiku-4-5-20251001";

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 6,
        temperature: 0,
        system:
          "You are an emotion classifier. Read the message and decide whether its overall emotional tone is happy, sad, or neutral. Consider the whole message, sarcasm, and mixed signals, not just individual keywords. Respond with exactly one lowercase word — happy, sad, or neutral — and nothing else.",
        messages: [{ role: "user", content: trimmed }],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Anthropic API error:", response.status, detail);
      res.status(502).json({ error: "Classifier request failed" });
      return;
    }

    const data = await response.json();
    const raw = (data?.content?.[0]?.text ?? "").trim().toLowerCase();
    const emotion = VALID.has(raw) ? raw : "neutral";

    res.status(200).json({ emotion });
  } catch (err) {
    console.error("Classifier error:", err);
    res.status(500).json({ error: "Classifier request failed" });
  }
}