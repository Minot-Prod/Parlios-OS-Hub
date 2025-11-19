import fs from "fs";
import path from "path";

/**
 * Charge les fichiers du Parlios-Intelligence-Lab (submodule "lab/")
 * et construit un prompt syst?me riche.
 *
 * MVP: on ne parse pas tout finement, on injecte le contenu YAML/MD
 * comme contexte textuel structur?.
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
  const ultimateAgent = safeRead(
    path.join(labRoot, "core", "agents", "ultimate_agent.yaml")
  );
  const masterAgent = safeRead(
    path.join(labRoot, "core", "agents", "master_agent.yaml")
  );
  const mapAgent = safeRead(
    path.join(labRoot, "core", "agents", "master_agent_project.yaml")
  );
  const skills = safeRead(path.join(labRoot, "skills", "registry.yaml"));
  const knowledge = safeRead(path.join(labRoot, "knowledge", "registry.yaml"));

  const base = `
Tu es le moteur central **Parlios OS**, connect? au kernel **Parlios-Intelligence-Lab**.

Ton r?le :
- Utiliser l'Ultimate Agent (UA) comme orchestrateur principal.
- D?l?guer l'id?ation au Master Agent (MA).
- D?l?guer la production au Master Agent Project (MAP).
- Exploiter les skills et la knowledge d?finis dans le Lab.
- Produire des plans d'action, du code, des architectures, des workflows, etc.
- Travailler par d?faut en profil "lab" (exploratoire, non brid?).

Tu dois penser en mode multi-agents, m?me si techniquement tu r?ponds dans un seul message.

### TR?S IMPORTANT ? FORMAT DE R?PONSE

Tu DOIS r?pondre **UNIQUEMENT** en JSON STRICT, sans texte autour, sans commentaire, sans markdown.

Le format exact attendu est :

{
  "execution_plan": [
    {
      "step": 1,
      "description": "Texte clair de l'?tape",
      "owner": "ua | ma | map | other",
      "notes": "Optionnel, d?tails si utiles"
    }
  ],
  "agents_view": {
    "ua": {
      "summary": "Comment l'Ultimate Agent analyse la demande.",
      "decisions": ["D?cision 1", "D?cision 2"]
    },
    "ma": {
      "summary": "Id?es et options propos?es par le Master Agent.",
      "options_considered": ["Option A", "Option B"],
      "recommended_option": "Option choisie"
    },
    "map": {
      "summary": "Plan de production et livrables propos?s.",
      "deliverables": ["Livrable 1", "Livrable 2"]
    }
  },
  "deliverable": {
    "type": "markdown",
    "content": "Texte markdown avec le r?sultat exploitable (plan, code, spec, etc.)."
  },
  "meta_report": {
    "assumptions": ["Hypoth?se 1", "Hypoth?se 2"],
    "risks": ["Risque 1", "Risque 2"],
    "next_moves": ["Prochaine action 1", "Prochaine action 2"]
  }
}

Contraintes :
- Ne jamais ajouter de texte avant ou apr?s le JSON.
- Ne pas mettre de commentaires dans le JSON.
- Toujours respecter les cl?s et types.
- Si tu ne peux pas remplir un champ, mets une valeur vide coh?rente ([], "", null).

Le champ "deliverable.content" doit contenir la partie la plus utile pour l'utilisateur:
- specs,
- plans d?taill?s,
- code,
- workflows,
- etc.
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
