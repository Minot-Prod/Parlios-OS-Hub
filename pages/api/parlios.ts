import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import OpenAI from "openai";

type ChatRole = "system" | "user" | "assistant";

type HistoryMessage = {
  role: ChatRole;
  content: string;
};

type ParliosRequestBody = {
  message?: string;
  history?: HistoryMessage[];
};

type ParliosResponseBody =
  | { reply: string; messages: HistoryMessage[] }
  | { error: string };

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function loadSystemPrompt(): string {
  const configuredPath =
    process.env.PARLIOS_SYSTEM_PROMPT_FILE || "memory/parlios_system_prompt_v0.2.md";

  const fullPath = path.join(process.cwd(), configuredPath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(
      `Impossible de trouver le prompt système Parlios à l'emplacement: ${fullPath}`
    );
  }

  return fs.readFileSync(fullPath, "utf8");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ParliosResponseBody>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Méthode non autorisée. Utilise POST." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res
      .status(500)
      .json({ error: "OPENAI_API_KEY manquant côté serveur (check .env.local)." });
  }

  const model = process.env.PARLIOS_OPENAI_MODEL || "gpt-4.1";

  let body: ParliosRequestBody;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "Body JSON invalide." });
  }

  const userMessage = (body && body.message ? body.message : "").trim();

  if (!userMessage) {
    return res
      .status(400)
      .json({ error: "Champ 'message' manquant ou vide dans le body." });
  }

  const history = Array.isArray(body.history) ? body.history : [];

  let systemPrompt: string;
  try {
    systemPrompt = loadSystemPrompt();
  } catch (err: any) {
    console.error("[Parlios API] Erreur prompt système:", err);
    return res
      .status(500)
      .json({ error: "Impossible de charger le prompt système Parlios." });
  }

  const messages: HistoryMessage[] = [
    {
      role: "system",
      content: systemPrompt,
    },
    ...history.map((m) => ({
      role: m.role,
      content: m.content,
    })),
    {
      role: "user",
      content: userMessage,
    },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
    });

    const choice = completion.choices[0];
    const reply = choice?.message?.content ?? "";

    const updatedHistory: HistoryMessage[] = [
      ...history,
      { role: "user", content: userMessage },
      { role: "assistant", content: reply },
    ];

    return res.status(200).json({
      reply,
      messages: updatedHistory,
    });
  } catch (err: any) {
    console.error("[Parlios API] Erreur OpenAI:", err);
    return res
      .status(500)
      .json({ error: "Erreur lors de l'appel au modèle OpenAI pour Parlios." });
  }
}
