import React from "react";
import Sidebar from "./components/Sidebar";
import AssistantPanel from "./components/AssistantPanel";
import AgentGrid from "./components/AgentGrid";
import Cockpit from "./components/Cockpit";
import Timeline from "./components/Timeline";
import MicroFeedback from "./components/MicroFeedback";

export default function HubPage() {
  return (
    <div className="hub-grid">
      {/* Sidebar gauche */}
      <Sidebar />

      {/* Colonne centrale */}
      <main style={{ display: "grid", gap: 16 }}>
        {/* KPIs haut de page */}
        <section className="glass section kpi">
          <div className="card">
            <div>Latency moyenne</div>
            <strong>142 ms</strong>
          </div>
          <div className="card">
            <div>Tokens/min</div>
            <strong>58k</strong>
          </div>
          <div className="card">
            <div>Agents actifs</div>
            <strong>6</strong>
          </div>
        </section>

        {/* Assistant central */}
        <AssistantPanel />

        {/* Grille d’agents */}
        <AgentGrid />

        {/* Micro feedback utilisateur */}
        <MicroFeedback />
      </main>

      {/* Colonne droite : cockpit + timeline */}
      <aside style={{ display: "grid", gap: 16 }}>
        <Cockpit />
        <Timeline />
      </aside>
    </div>
  );
}
