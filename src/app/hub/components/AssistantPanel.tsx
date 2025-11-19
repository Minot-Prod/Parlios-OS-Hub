"use client";
import React, { useState } from "react";

export default function AssistantPanel() {
  const [prompt, setPrompt] = useState("");
  const send = () => {
    // TODO: brancher orchestrateur
    console.log("prompt", prompt);
  };
  const actions = [
    "Plan sprint","Générer tickets","Synthèse meeting",
    "Eval agents","Nettoyer mémoire","Exporter log"
  ];
  return (
    <div className="glass section assistant">
      <h3>Assistant central</h3>
      <div className="quick-actions">
        {actions.map(a => (
          <button key={a} className="btn" onClick={() => setPrompt(p => `${a}: ${p}`)}>{a}</button>
        ))}
      </div>
      <textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Décris ton objectif, le Hub orchestre les agents..."
      />
      <div style={{ display: "flex", gap: "8px" }}>
        <button className="btn primary" onClick={send}>Lancer</button>
        <button className="btn" onClick={() => setPrompt("")}>Reset</button>
      </div>
    </div>
  );
}
