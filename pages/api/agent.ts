import type { NextApiRequest, NextApiResponse } from "next";
import { buildSystemPrompt } from "../../src/lib/labKernel";
import { callOpenAI } from "../../src/lib/openaiClient";

type Data = {
  answer?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { userMessage } = req.body as { userMessage?: string };

  if (!userMessage || typeof userMessage !== "string" || !userMessage.trim()) {
    return res.status(400).json({ error: "userMessage manquant ou invalide" });
  }

  try {
    const systemPrompt = buildSystemPrompt();

    const answer = await callOpenAI([
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ]);

    return res.status(200).json({ answer });
  } catch (err: any) {
    console.error("Erreur /api/agent:", err);
    return res.status(500).json({ error: "Erreur interne agent" });
  }
}
