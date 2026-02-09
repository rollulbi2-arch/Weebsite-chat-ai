import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// ==============================
// CONFIG OPENROUTER
// ==============================
const OPENROUTER_API_KEY =
  "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";

const OPENROUTER_URL =
  "https://openrouter.ai/api/v1/chat/completions";

const MODEL_NAME =
  "xiaomi/mimo-v2-flash";

// ==============================
// CHAT ENDPOINT
// ==============================
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.json({ reply: "Pesan kosong bro 😑" });
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost", // optional tapi direkomendasi OpenRouter
        "X-Title": "AI Chat Bro"
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();

    // safety check
    const reply =
      data?.choices?.[0]?.message?.content ??
      "AI gak jawab apa-apa bro 🤖";

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.json({ reply: "Server error bro 💀" });
  }
});

// ==============================
// START SERVER
// ==============================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🔥 Server jalan di http://localhost:${PORT}`);
});