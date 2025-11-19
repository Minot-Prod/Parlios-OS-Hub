import React from "react";
import AgentAvatar from "./AgentAvatar";
type Props = { id: string; label: string; role: string; status?: "idle" | "thinking" | "running" | "success" | "error"; avatar?: string };
export default function AgentCard({ id, label, role, status = "idle", avatar = "avatar-cyan.svg" }: Props) {
  return (
    <div className="agent-card">
      <AgentAvatar variant={avatar} />
      <div>
        <div><strong>{label}</strong> <span style={{ opacity: .6 }}>({role})</span></div>
        <div className="agent-status">{status}</div>
      </div>
    </div>
  );
}
