type Status = "idle" | "running" | "error" | "disabled";

export default function MicroFeedback({ status }: { status: Status }) {
  const label =
    status === "running"
      ? "En cours"
      : status === "idle"
      ? "Prêt"
      : status === "error"
      ? "Erreur"
      : "Off";

  return (
    <div className={`microfeedback microfeedback-${status}`}>
      <span className="microfeedback-dot" />
      <span className="microfeedback-label">{label}</span>
    </div>
  );
}
