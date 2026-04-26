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
  console.log("📩 Incoming request:", req.body);
  try {
    const { message, context } = req.body;

    if (!message) {
      console.log("⚠️ No message in request body");
      return res.json({ reply: "No message received ❌" });
    }

    const model = genAI.getGenerativeModel({
    
    });

    const prompt = `
You are a smart career guidance AI.

Student Data:
${context || "No data provided"}

User Question:
${message}

Give clear, helpful, practical advice in simple language.
`;

    console.log("🤖 Sending prompt to Gemini...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("✅ Gemini responded successfully");

    res.json({ reply: text });

  } catch (err) {
    console.error("❌ BACKEND ERROR:", err);
    res.status(500).json({ reply: "Server error ❌", error: err.message });
  }
});

// ✅ START SERVER
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
  console.log("Open http://localhost:3000/chat.html to start chatting!");
});