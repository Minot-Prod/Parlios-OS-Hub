import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "Tu es l’Ultimate Agent Parlios, chef d’orchestre des agents IA du Hub." },
        { role: "user", content: prompt },
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0]?.message?.content ?? "(Pas de réponse de l’agent)",
    });
  } catch (e) {
    console.error("API ERROR:", e);
    return NextResponse.json(
      { error: "Server Agent Error" },
      { status: 500 }
    );
  }
}
