import React from "react";

export default function Cockpit() {
  return (
    <section className="glass section cockpit">
      <header style={{ marginBottom: 12 }}>
        <h2>Cockpit Parlios</h2>
        <p style={{ fontSize: 12, opacity: 0.7 }}>
          Vue d’ensemble des opérations IA (placeholder, version statique).
        </p>
      </header>

      <div style={{ display: "grid", gap: 8 }}>
        <div className="card">
          <div>Dernier déploiement</div>
          <strong>Netlify · OK</strong>
        </div>
        <div className="card">
          <div>Statut Hub</div>
          <strong>Stable</strong>
        </div>
        <div className="card">
          <div>Mode</div>
          <strong>Preview</strong>
        </div>
      </div>
    </section>
  );
}
