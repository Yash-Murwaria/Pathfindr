import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// ✅ Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ✅ Serve static files from current directory
app.use(express.static(__dirname));

// ✅ Check API key
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ CHAT ROUTE
app.post("/chat", async (req, res) => {

  try {

    console.log("📩 Incoming request:", req.body);

    const { message, context } = req.body;

    if (!message) {
      return res.json({
        reply: "No message received ❌"
      });
    }

    // ✅ PROMPT
    const prompt = `
You are Pathfindr AI, a smart career guidance assistant.

Student Context:
${context}

User Question:
${message}

Give clear, simple and helpful career guidance.
`;

    // ✅ MODEL
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.0-flash",
    });

    // ✅ GEMINI RESPONSE
    const result = await model.generateContent(prompt);

    // ✅ TEXT
    const reply = result.response.text();

    console.log("✅ AI Reply:", reply);

    // ✅ SEND TO FRONTEND
    res.json({
      reply: reply
    });

  } catch (error) {

    console.error("❌ BACKEND ERROR:", error);

    res.status(500).json({
      reply: "Backend failed ❌"
    });
  }
});

// ✅ START SERVER
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
  console.log("Open http://localhost:3000/chat.html to start chatting!");
});