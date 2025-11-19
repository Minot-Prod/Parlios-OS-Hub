import AgentCard, { Agent } from "./AgentCard";

const AGENTS: Agent[] = [
  {
    id: "ua",
    name: "Ultimate Agent",
    role: "Orchestrateur global · Synthèse & arbitrage",
    status: "running",
    color: "cyan",
  },
  {
    id: "ma",
    name: "Master Agent",
    role: "Idéation, exploration, génération de pistes",
    status: "idle",
    color: "purple",
  },
  {
    id: "qa",
    name: "QA Guardian",
    role: "Contrôle qualité, tests & monitoring",
    status: "idle",
    color: "green",
  },
  {
    id: "ops",
    name: "Ops Agent",
    role: "CI/CD, secrets, n8n, déploiements",
    status: "running",
    color: "amber",
  },
];

export default function AgentGrid() {
  return (
    <section className="hub-card hub-card-agents">
      <header className="hub-card-header">
        <div>
          <h2 className="hub-title-sm">Agents Parlios</h2>
          <p className="hub-subtitle-sm">
            État opérationnel des principaux agents IA du Hub.
          </p>
        </div>
      </header>

      <div className="agent-grid">
        {AGENTS.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </section>
  );
}
