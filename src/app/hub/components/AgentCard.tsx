import AgentAvatar from "./AgentAvatar";
import MicroFeedback from "./MicroFeedback";

export type Agent = {
  id: string;
  name: string;
  role: string;
  status: "idle" | "running" | "error" | "disabled";
  color?: "amber" | "cyan" | "green" | "purple" | "red" | "white";
};

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <article className="agent-card">
      <div className="agent-card-main">
        <AgentAvatar name={agent.name} color={agent.color} />
        <div className="agent-card-text">
          <div className="agent-card-name">{agent.name}</div>
          <div className="agent-card-role">{agent.role}</div>
        </div>
      </div>
      <div className="agent-card-footer">
        <MicroFeedback status={agent.status} />
      </div>
    </article>
  );
}
