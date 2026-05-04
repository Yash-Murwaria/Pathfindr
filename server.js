import axios from "axios";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


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




// ✅ CHAT ROUTE
app.post("/chat", async (req, res) => {

  try {

    console.log("📩 Incoming request:", req.body);

    const { message, context, history} = req.body;

    if (!message) {
      return res.json({
        reply: "No message received ❌"
      });
    }
const lowerMsg = message.toLowerCase().trim();

const greetings = [
  "hi",
  "hello",
  "hey",
  "hii"
];

// ONLY exact greetings
if (greetings.includes(lowerMsg)) {
  return res.json({
    reply: "Hi! 👋 How can I help you with your career or studies today?"
  });
}
    // ✅ PROMPT
  const prompt = `
You are Pathfindr AI, a friendly and intelligent career counselor.
CONSTRAINTS:
- Answer DIRECTLY. Do NOT use internal reasoning or long thinking blocks.
- Keep responses under 3-4 sentences unless the user asks for detail.
- Use the student's Marks, Scores, and Interests to give ACCURATE advice.
- If the user just says "hi", just say "Hi! How can I help you today?"

Conversation History:
${JSON.stringify(history)}

Student Profile:
${context}

Current User Message:
${message}
`;

const response = await axios.post(
  "https://api.openhorizon.devwtf.in/v1/chat",
  {
    model: "openhorizon/deepscaler:latest",
    prompt: prompt,
    max_tokens: 500,
    temperature: 0.7
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.OPENHORIZON_API_KEY}`,
      "Content-Type": "application/json"
    },
    timeout: 45000 // 45 seconds timeout
  }
);
console.log("API RESPONSE:", response.data);

let reply =
  response.data.message ||
  response.data.reply ||
  response.data.content ||
  JSON.stringify(response.data);

// Remove <think>...</think>
reply = reply
  .replace(/<think>[\s\S]*?<\/think>/g, "")
  .replace(/^"+|"+$/g, "")
  .replace(/\\"/g, '"')
  .replace(/\\n/g, "\n")
  .replace(/\\/g, "")
  .trim();

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