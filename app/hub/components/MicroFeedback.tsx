"use client";
import React, { useState } from "react";
export default function MicroFeedback() {
  const [v, setV] = useState<null | boolean>(null);
  return (
    <div className="glass section" style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
      <span>Micro-feedback</span>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn" onClick={() => setV(true)}>👍</button>
        <button className="btn" onClick={() => setV(false)}>👎</button>
      </div>
      {v !== null && <span style={{ opacity: .7 }}>Merci !</span>}
    </div>
  );
}
