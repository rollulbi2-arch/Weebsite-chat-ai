import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// ==============================
// SERVE FRONTEND
// ==============================
app.use(express.static("public"));

// ==============================
// CONFIG OPENROUTER
// ==============================
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; 
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL_NAME = "xiaomi/mimo-v2-flash";

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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "AI lagi diem bro 🤖";

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.json({ reply: "Server error bro 💀" });
  }
});

// ==============================
// START SERVER
// ==============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🔥 Server jalan di port", PORT);
});
