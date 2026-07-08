import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Clue API
  app.post("/api/clue", async (req, res) => {
    try {
      const { caseId, nodes, edges } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is required");
      }

      const ai = new GoogleGenAI({ apiKey, httpOptions: { headers: { "User-Agent": "aistudio-build" } } });

      const prompt = `You are an elite detective AI system named 'The Red Line'. The user is trying to solve case ${caseId}. 
Current nodes on their board:
${nodes.map((n: any) => `- ${n.data.title}: ${n.data.content}`).join("\\n")}
Current connections: ${edges.length}

Give a very brief, cryptic, and atmospheric 1-2 sentence hint about what to connect next based on the available nodes. Do not give the direct answer. Speak as a serious detective.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });

      res.json({ clue: response.text });
    } catch (error: any) {
      console.error("AI Clue Error:", error);
      
      // Fallback for quota limit reached
      if (error?.status === 429 || error?.message?.includes("429") || error?.message?.includes("quota") || error?.message?.includes("exceeded")) {
        return res.json({ clue: "System override: Network inference is saturated right now. Look closely at the data you just uncovered." });
      }
      
      res.status(500).json({ error: "Failed to generate clue." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
