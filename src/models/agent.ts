export type AgentStatus = "idle" | "thinking" | "running" | "success" | "error";

export type Agent = {
  id: string;
  label: string;
  role: string;
  description?: string;
  status?: AgentStatus;
  lastRunAt?: string;
};

export type AgentsState = {
  agents: Agent[];
  activeAgentId?: string;
  // Compat: on tolère les deux pour s'aligner avec agentOrchestrator
  lastUpdated?: string;
  lastUpdatedAt?: string;
};
