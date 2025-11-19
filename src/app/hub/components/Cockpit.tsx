import React from "react";
export default function Cockpit() {
  return (
    <div className="glass section cockpit">
      <div>
        <h3>Cockpit</h3>
        <div style={{ opacity: .7 }}>Activité live lors de l’envoi d’un prompt (placeholder V1)</div>
      </div>
      <div style={{ display: "grid", gap: "10px" }}>
        <div><small>UA</small><div className="progress"><span /></div></div>
        <div><small>MA</small><div className="progress"><span /></div></div>
        <div><small>MAP</small><div className="progress"><span /></div></div>
      </div>
    </div>
  );
}
