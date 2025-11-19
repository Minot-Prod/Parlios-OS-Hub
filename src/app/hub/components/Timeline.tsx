import React from "react";
export default function Timeline() {
  const rows = [
    { t: "08:40", d: "UA → parsing objectif" },
    { t: "08:41", d: "MA → dispatch sous-tâches" },
    { t: "08:42", d: "MAP → graph de plan" },
    { t: "08:43", d: "KB → enrichissement mémoire" },
  ];
  return (
    <div className="glass section">
      <h3>Timeline IA</h3>
      <div className="timeline">
        {rows.map((r, i) => (
          <div className="row" key={i}>
            <div style={{ opacity: .6 }}>{r.t}</div>
            <div>{r.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
