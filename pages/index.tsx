import { useState } from "react";

type ExecutionStep = {
  step: number;
  description: string;
  owner: string;
  notes?: string;
};

type AgentView = {
  summary: string;
  decisions?: string[];
  options_considered?: string[];
  recommended_option?: string;
  deliverables?: string[];
};

type ParliosResponse = {
  execution_plan: ExecutionStep[];
  agents_view: {
    ua: AgentView;
    ma: AgentView;
    map: AgentView;
  };
  deliverable: {
    type: string;
    content: string;
  };
  meta_report: {
    assumptions: string[];
    risks: string[];
    next_moves: string[];
  };
};

export default function Home() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [structured, setStructured] = useState<ParliosResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setAnswer(null);
    setStructured(null);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: input })
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setAnswer(data.answer ?? null);
        setStructured(data.structured ?? null);
      }
    } catch (err: any) {
      setError("Erreur r?seau: " + (err.message ?? "inconnue"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        gap: "1.5rem",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background: "#020617",
        color: "#e5e7eb"
      }}
    >
      <header>
        <h1 style={{ fontSize: "1.8rem", marginBottom: "0.25rem" }}>
          Parlios OS ? Intelligence Lab Console
        </h1>
        <p style={{ opacity: 0.8, maxWidth: 700 }}>
          Tu parles ici au moteur Parlios OS. Les agents (UA, MA, MAP) sont
          pilot?s par le kernel <code>Parlios-Intelligence-Lab</code> (profil{" "}
          <strong>lab</strong>).
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 3fr)"
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <label style={{ fontWeight: 500 }}>
            Demande ? Parlios OS
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder="Ex: Con?ois-moi un syst?me Parlios pour que des freelances puissent automatiser la prospection, la gestion de clients et le suivi projet avec n8n et Supabase."
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.75rem",
              border: "1px solid #1f2937",
              background: "#020617",
              color: "#e5e7eb",
              resize: "vertical"
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              alignSelf: "flex-start",
              padding: "0.5rem 1.25rem",
              borderRadius: "999px",
              border: "none",
              background: loading ? "#4b5563" : "#22c55e",
              color: "#020617",
              cursor: loading ? "default" : "pointer",
              fontWeight: 600
            }}
          >
            {loading ? "Parlios r?fl?chit..." : "Lancer la requ?te"}
          </button>
          {error && (
            <p style={{ color: "#f97373", fontSize: "0.9rem" }}>
              {error}
            </p>
          )}
        </form>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              borderRadius: "0.75rem",
              border: "1px solid #1f2937",
              padding: "1rem",
              background: "#020617"
            }}
          >
            <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              Deliverable principal
            </h2>
            {!answer && !loading && (
              <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>
                Le r?sultat principal (specs, plan, code...) appara?tra ici.
              </p>
            )}
            {answer && (
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                  fontSize: "0.9rem"
                }}
              >
                {answer}
              </pre>
            )}
          </div>
        </div>
      </section>

      {structured && (
        <section
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "minmax(0, 2.2fr) minmax(0, 2.8fr)"
          }}
        >
          <div
            style={{
              borderRadius: "0.75rem",
              border: "1px solid #1f2937",
              padding: "1rem",
              background: "#020617"
            }}
          >
            <h2 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>
              Plan d&apos;ex?cution (UA / MA / MAP)
            </h2>
            {structured.execution_plan?.length ? (
              <ol style={{ paddingLeft: "1.25rem", fontSize: "0.9rem" }}>
                {structured.execution_plan.map((step) => (
                  <li key={step.step} style={{ marginBottom: "0.5rem" }}>
                    <div>
                      <strong>?tape {step.step}</strong>{" "}
                      <span style={{ opacity: 0.8 }}>({step.owner})</span>
                    </div>
                    <div>{step.description}</div>
                    {step.notes && (
                      <div style={{ opacity: 0.7, fontSize: "0.8rem" }}>
                        Notes: {step.notes}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            ) : (
              <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>
                Aucun plan structur? renvoy? (fallback brut).
              </p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem"
            }}
          >
            <div
              style={{
                borderRadius: "0.75rem",
                border: "1px solid #1f2937",
                padding: "0.75rem",
                background: "#020617"
              }}
            >
              <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>
                Vue Agents (UA / MA / MAP)
              </h3>
              <div style={{ fontSize: "0.85rem", display: "grid", gap: "0.5rem" }}>
                <div>
                  <strong>UA</strong>
                  <div>{structured.agents_view.ua?.summary}</div>
                </div>
                <div>
                  <strong>MA</strong>
                  <div>{structured.agents_view.ma?.summary}</div>
                </div>
                <div>
                  <strong>MAP</strong>
                  <div>{structured.agents_view.map?.summary}</div>
                </div>
              </div>
            </div>

            <div
              style={{
                borderRadius: "0.75rem",
                border: "1px solid #1f2937",
                padding: "0.75rem",
                background: "#020617"
              }}
            >
              <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>
                Meta-report (Hypoth?ses, Risques, Next Moves)
              </h3>
              <div style={{ fontSize: "0.85rem" }}>
                <p>
                  <strong>Hypoth?ses:</strong>
                </p>
                <ul style={{ paddingLeft: "1.2rem" }}>
                  {structured.meta_report.assumptions?.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
                <p style={{ marginTop: "0.5rem" }}>
                  <strong>Risques:</strong>
                </p>
                <ul style={{ paddingLeft: "1.2rem" }}>
                  {structured.meta_report.risks?.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
                <p style={{ marginTop: "0.5rem" }}>
                  <strong>Next moves:</strong>
                </p>
                <ul style={{ paddingLeft: "1.2rem" }}>
                  {structured.meta_report.next_moves?.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
