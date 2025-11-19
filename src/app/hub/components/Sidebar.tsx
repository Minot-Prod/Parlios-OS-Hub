import React from "react";

export default function Sidebar() {
  const items = [
    { k: "dashboard", label: "Dashboard" },
    { k: "agents", label: "Agents" },
    { k: "memory", label: "Mémoire" },
    { k: "timeline", label: "Timeline IA" },
    { k: "settings", label: "Paramètres" },
  ];
  return (
    <aside className="glass section sidebar">
      <strong>Parlios OS Hub</strong>
      {items.map(i => (
        <div key={i.k} className="item">{i.label}</div>
      ))}
      <div style={{ marginTop: "auto" }} className="note">Vision premium, animée, immersive.</div>
    </aside>
  );
}
