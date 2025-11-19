"use client";

import { useState } from "react";

type Message = {
  id: number;
  from: "user" | "agent";
  text: string;
};

export default function AssistantPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "agent",
      text: "Hub chargé. Prêt à router tes demandes vers les agents Parlios.",
    },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const nextId = messages.length ? messages[messages.length - 1].id + 1 : 1;
    setMessages((m) => [
      ...m,
      { id: nextId, from: "user", text: input.trim() },
      {
        id: nextId + 1,
        from: "agent",
        text:
          "Requête reçue. (Mock) L’Ultimate Agent route ça vers le bon agent. " +
          "Ce bloc sera plus tard connecté à l’API Parlios.",
      },
    ]);
    setInput("");
  };

  return (
    <section className="hub-card hub-card-assistant">
      <header className="hub-card-header">
        <div>
          <h2 className="hub-title-sm">Assistant central</h2>
          <p className="hub-subtitle-sm">
            Point d’entrée unique vers les agents. Plus tard relié à l’API Hub.
          </p>
        </div>
      </header>

      <div className="assistant-messages">
        {messages.map((m) => (
          <div
            key={m.id}
            className={
              "assistant-message assistant-message-" +
              (m.from === "user" ? "user" : "agent")
            }
          >
            <p>{m.text}</p>
          </div>
        ))}
      </div>

      <div className="assistant-input-row">
        <input
          className="assistant-input"
          placeholder="Décris une action à déléguer aux agents…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button className="assistant-send" type="button" onClick={send}>
          Envoyer
        </button>
      </div>
    </section>
  );
}
