import { useState, FormEvent } from "react";

type ChatRole = "user" | "assistant";

type Message = {
  role: ChatRole;
  content: string;
};

export default function ParliosPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: trimmed }];

    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/parlios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history: newMessages,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(
          data?.error || "Erreur serveur lors de l'appel à l'API Parlios."
        );
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (Array.isArray(data.messages)) {
        setMessages(
          data.messages.map((m: any) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content as string,
          }))
        );
      } else if (data.reply) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: String(data.reply) },
        ]);
      }

      setLoading(false);
    } catch (err) {
      console.error("[Parlios UI] Erreur fetch:", err);
      setError("Erreur réseau lors de l'appel à /api/parlios.");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
        background: "linear-gradient(135deg, #020617, #020617, #020617)",
        color: "#e5e7eb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <main
        style={{
          maxWidth: "840px",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <header
          style={{
            marginBottom: "0.5rem",
          }}
        >
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              letterSpacing: "0.03em",
            }}
          >
            Parlios OS — Hub en ligne
          </h1>
          <p
            style={{
              marginTop: "0.25rem",
              fontSize: "0.9rem",
              color: "#9ca3af",
            }}
          >
            Tu parles à Parlios (profil LAB). Le prompt système est chargé depuis{" "}
            <code style={{ fontSize: "0.8rem" }}>memory/parlios_system_prompt_v0.2.md</code>.
          </p>
        </header>

        <section
          style={{
            flex: 1,
            minHeight: "320px",
            borderRadius: "0.75rem",
            border: "1px solid rgba(148, 163, 184, 0.4)",
            padding: "1rem",
            background:
              "radial-gradient(circle at top left, rgba(59,130,246,0.12), transparent 50%), #020617",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              paddingRight: "0.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {messages.length === 0 && (
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#9ca3af",
                }}
              >
                Commence par quelque chose comme :
                <br />
                <code style={{ fontSize: "0.8rem" }}>
                  {"continue la mise en place de Parlios en ligne à partir de ça"}
                </code>
              </div>
            )}

            {messages.map((m, index) => (
              <div
                key={index}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                  padding: "0.6rem 0.85rem",
                  borderRadius:
                    m.role === "user" ? "0.75rem 0 0.75rem 0.75rem" : "0 0.75rem 0.75rem 0.75rem",
                  background:
                    m.role === "user"
                      ? "linear-gradient(135deg, #3b82f6, #22c55e)"
                      : "rgba(15, 23, 42, 0.9)",
                  color: m.role === "user" ? "#f9fafb" : "#e5e7eb",
                  fontSize: "0.9rem",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  border:
                    m.role === "assistant"
                      ? "1px solid rgba(148, 163, 184, 0.35)"
                      : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    opacity: 0.7,
                    marginBottom: "0.15rem",
                  }}
                >
                  {m.role === "user" ? "Toi" : "Parlios"}
                </div>
                {m.content}
              </div>
            ))}

            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  padding: "0.6rem 0.85rem",
                  borderRadius: "0 0.75rem 0.75rem 0.75rem",
                  background: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(148, 163, 184, 0.35)",
                  fontSize: "0.9rem",
                  color: "#9ca3af",
                }}
              >
                Parlios réfléchit…
              </div>
            )}
          </div>

          {error && (
            <div
              style={{
                fontSize: "0.8rem",
                color: "#fecaca",
                background: "rgba(127, 29, 29, 0.35)",
                borderRadius: "0.5rem",
                padding: "0.5rem 0.75rem",
                border: "1px solid rgba(248, 113, 113, 0.5)",
              }}
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: "0.5rem",
              marginTop: "0.25rem",
            }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                loading
                  ? "Parlios est en train de répondre..."
                  : "Écris ici pour parler à Parlios…"
              }
              rows={2}
              style={{
                flex: 1,
                resize: "none",
                borderRadius: "0.75rem",
                border: "1px solid rgba(148, 163, 184, 0.5)",
                padding: "0.6rem 0.8rem",
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                color: "#e5e7eb",
                fontSize: "0.9rem",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                borderRadius: "0.75rem",
                padding: "0.6rem 1rem",
                border: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.03em",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                opacity: loading || !input.trim() ? 0.6 : 1,
                background:
                  "linear-gradient(135deg, #3b82f6, #22c55e, #a855f7)",
                color: "#f9fafb",
                whiteSpace: "nowrap",
              }}
            >
              {loading ? "En cours..." : "Envoyer"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
