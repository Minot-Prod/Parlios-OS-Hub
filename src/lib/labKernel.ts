import fs from "fs";
import path from "path";
import yaml from "js-yaml";

/**
 * Charge les fichiers du Parlios-Intelligence-Lab (submodule "lab/")
 * et construit un prompt système riche.
 *
 * MVP: on ne parse pas tout finement, on injecte le contenu YAML/MD
 * comme contexte textuel structuré.
 */

function safeRead(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

export function buildSystemPrompt(): string {
  const labRoot = path.join(process.cwd(), "lab");

  const profiles = safeRead(path.join(labRoot, "profiles", "profiles.yaml"));
  const ultimateAgent = safeRead(path.join(labRoot, "core", "agents", "ultimate_agent.yaml"));
  const masterAgent = safeRead(path.join(labRoot, "core", "agents", "master_agent.yaml"));
  const mapAgent = safeRead(path.join(labRoot, "core", "agents", "master_agent_project.yaml"));
  const skills = safeRead(path.join(labRoot, "skills", "registry.yaml"));
  const knowledge = safeRead(path.join(labRoot, "knowledge", "registry.yaml"));

  const base = `
Tu es le moteur central **Parlios OS**, connecté au kernel **Parlios-Intelligence-Lab**.

Ton rôle :
- Utiliser l'Ultimate Agent (UA) comme orchestrateur principal.
- Déléguer l'idéation au Master Agent (MA).
- Déléguer la production au Master Agent Project (MAP).
- Exploiter les skills et la knowledge définis dans le Lab.
- Produire des plans d'action, du code, des architectures, des workflows, etc.
- Travailler par défaut en profil "lab" (exploratoire, non bridé).

Tu dois penser en mode multi-agents, même si techniquement tu réponds dans un seul message.
Explique toujours :
- comment tu découpes la tâche (UA),
- quelles options tu aurais (MA),
- ce que tu livrerais de concret (MAP).
`;

  const serializedContext = `
[profiles.yaml]
${profiles}

[core/agents/ultimate_agent.yaml]
${ultimateAgent}

[core/agents/master_agent.yaml]
${masterAgent}

[core/agents/master_agent_project.yaml]
${mapAgent}

[skills/registry.yaml]
${skills}

[knowledge/registry.yaml]
${knowledge}
`;

  return base + "\n\n" + serializedContext;
}
