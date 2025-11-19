import type { NextApiRequest, NextApiResponse } from "next";
import { buildSystemPrompt } from "../../src/lib/labKernel";
import { callOpenAI } from "../../src/lib/openaiClient";

type ExecutionStep = {
  step: number;
  description: string;
  owner: string;
  notes?: string;
};

type AgentView = {
  summary: string;
  decisions?: string[];
  options_considered?: string[];
  recommended_option?: string;
  deliverables?: string[];
};

type ParliosResponse = {
  execution_plan: ExecutionStep[];
  agents_view: {
    ua: AgentView;
    ma: AgentView;
    map: AgentView;
  };
  deliverable: {
    type: string;
    content: string;
  };
  meta_report: {
    assumptions: string[];
    risks: string[];
    next_moves: string[];
  };
};

type ApiData = {
  answer?: string;
  structured?: ParliosResponse;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "M?thode non autoris?e" });
  }

  const { userMessage } = req.body as { userMessage?: string };

  if (!userMessage || typeof userMessage !== "string" || !userMessage.trim()) {
    return res.status(400).json({ error: "userMessage manquant ou invalide" });
  }

  try {
    const systemPrompt = buildSystemPrompt();

    const raw = await callOpenAI([
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ]);

    let parsed: ParliosResponse | null = null;

    try {
      parsed = JSON.parse(raw) as ParliosResponse;
    } catch (e) {
      console.warn("[Parlios OS] Impossible de parser la r?ponse JSON, fallback texte brut.");
    }

    if (parsed && parsed.deliverable && typeof parsed.deliverable.content === "string") {
      return res.status(200).json({
        answer: parsed.deliverable.content,
        structured: parsed
      });
    }

    // Fallback si le mod?le n'a pas respect? le format JSON
    return res.status(200).json({
      answer: raw
    });
  } catch (err: any) {
    console.error("Erreur /api/agent:", err);
    return res.status(500).json({ error: "Erreur interne agent" });
  }
}
