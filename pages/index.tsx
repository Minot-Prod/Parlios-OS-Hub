import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: input })
      });

      const data = await res.json();
      setResponse(data.answer ?? JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponse("Erreur: " + (err.message ?? "inconnue"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Parlios OS — LAB Console</h1>
      <p style={{ maxWidth: "600px", textAlign: "center", marginBottom: "1.5rem" }}>
        Tu parles ici au moteur Parlios OS. Le kernel d&apos;intelligence est chargé depuis
        <code style={{ marginLeft: 4 }}>Parlios-Intelligence-Lab</code>.
      </p>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "600px" }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Décris une tâche que tu veux confier à Parlios OS..."
          rows={5}
          style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "0.75rem",
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            border: "none",
            background: "#111827",
            color: "white",
            cursor: "pointer"
          }}
        >
          {loading ? "Parlios réfléchit..." : "Lancer la requête"}
        </button>
      </form>
      {response && (
        <pre style={{
          marginTop: "1.5rem",
          width: "100%",
          maxWidth: "800px",
          padding: "1rem",
          background: "#111827",
          color: "#e5e7eb",
          borderRadius: "8px",
          whiteSpace: "pre-wrap"
        }}>
          {response}
        </pre>
      )}
    </main>
  );
}
