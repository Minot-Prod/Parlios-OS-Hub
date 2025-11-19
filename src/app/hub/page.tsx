import React from "react";
import Sidebar from "./components/Sidebar";
import AssistantPanel from "./components/AssistantPanel";
import AgentGrid from "./components/AgentGrid";
import Cockpit from "./components/Cockpit";
import Timeline from "./components/Timeline";
import MicroFeedback from "./components/MicroFeedback";

export default function Page() {
  return (
    <div className="hub-grid">
      <Sidebar />
      <main style={{ display: "grid", gap: 16 }}>
        <div className="glass section kpi">
          <div className="card"><div>Latency</div><strong>142 ms</strong></div>
          <div className="card"><div>Tokens/min</div><strong>58k</strong></div>
          <div className="card"><div>Agents actifs</div><strong>6</strong></div>
        </div>
        <AssistantPanel />
        <AgentGrid />
        <MicroFeedback />
      </main>
      <aside style={{ display: "grid", gap: 16 }}>
        <Cockpit />
        <Timeline />
      </aside>
    </div>
  );
}
