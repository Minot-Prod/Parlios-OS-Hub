import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn(
    "[Parlios OS] OPENAI_API_KEY non défini. Configure .env.local avant de lancer en prod."
  );
}

const client = new OpenAI({
  apiKey
});

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function callOpenAI(messages: ChatMessage[]): Promise<string> {
  const response = await client.chat.completions.create({
    model: "gpt-4.1", // adapte selon ton plan
    messages,
    temperature: 0.3
  });

  const choice = response.choices?.[0]?.message?.content ?? "";
  return choice;
}
