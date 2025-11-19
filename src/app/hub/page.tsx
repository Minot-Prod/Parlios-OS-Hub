import Cockpit from "./components/Cockpit";
import AgentGrid from "./components/AgentGrid";
import AssistantPanel from "./components/AssistantPanel";
import Timeline from "./components/Timeline";

export default function HubPage() {
  const kpis = [
    { label: "Agents actifs", value: 4, trend: "+2", tone: "good" },
    { label: "Requêtes / 24h", value: 128, trend: "+37%", tone: "neutral" },
    { label: "Succès automations", value: "93%", trend: "+4%", tone: "good" },
    { label: "Erreurs critiques", value: 1, trend: "-2", tone: "bad" },
  ];

  return (
    <div className="hub-main-grid">
      <section className="hub-col-left">
        <Cockpit kpis={kpis} />
        <AgentGrid />
      </section>

      <section className="hub-col-right">
        <AssistantPanel />
        <Timeline />
      </section>
    </div>
  );
}
