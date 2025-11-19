"use client";
import React, { useState } from "react";

export default function AssistantPanel() {
  console.log("🔥 AssistantPanel MONTÉ !");

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  async function runPrompt() {
    if (!prompt.trim()) return;
    try {
      setLoading(true);
      setResponse("");
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.reply || "(Pas de réponse)");
    } catch (e) {
      setResponse("Erreur lors de l'appel à l'agent.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass section assistant">
      <h3>Assistant central</h3>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Décris ton objectif, le Hub orchestre les agents..."
      />

      <button type="button" onClick={runPrompt}>
        {loading ? "UA en cours..." : "Lancer"}
      </button>

      <div style={{ marginTop: "12px", color: "cyan" }}>
        {response}
      </div>
    </div>
  );
}
