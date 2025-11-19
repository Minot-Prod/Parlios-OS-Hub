import React from "react";
import AgentCard from "./AgentCard";

type AgentMeta = {
  id: string;
  label: string;
  role: string;
  status: "idle" | "thinking" | "running" | "success" | "error";
  avatar: string;
};

const AGENTS: AgentMeta[] = [
  { id: "ua",  label: "Ultimate Agent", role: "UA",  status: "idle",     avatar: "avatar-white.svg" },
  { id: "ma",  label: "Master Agent",   role: "MA",  status: "thinking", avatar: "avatar-purple.svg" },
  { id: "map", label: "MAP",            role: "MAP", status: "running",  avatar: "avatar-cyan.svg" },
  { id: "vs",  label: "Vision Synth",   role: "VS",  status: "idle",     avatar: "avatar-green.svg" },
  { id: "kb",  label: "KnowledgeCore",  role: "KB",  status: "success",  avatar: "avatar-amber.svg" },
  { id: "io",  label: "I/O Ops",        role: "IO",  status: "error",    avatar: "avatar-red.svg" },
];

export default function AgentGrid() {
  return (
    <div className="glass section">
      <h3>Grille d’agents</h3>
      <div className="agent-grid">
        {AGENTS.map(a => (
          <AgentCard
            key={a.id}
            id={a.id}
            label={a.label}
            role={a.role}
            status={a.status}
            avatar={a.avatar}
          />
        ))}
      </div>
    </div>
  );
}
