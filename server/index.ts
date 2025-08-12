// server/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();
const app = express();
const port = 3001;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.get("/api/health", (_, res) => {
  res.json({ ok: true, env: !!process.env.OPENAI_API_KEY });
});

app.post("/api/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const message = response.choices?.[0]?.message?.content ?? "";
    res.json({ reply: message });
  } catch (err) {
    console.error("OpenAI API Error:", err);
    res.status(500).json({ error: "OpenAI API request failed" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
