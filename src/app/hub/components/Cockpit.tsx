type Kpi = {
  label: string;
  value: string | number;
  trend?: string;
  tone?: "good" | "bad" | "neutral";
};

export default function Cockpit({ kpis }: { kpis: Kpi[] }) {
  return (
    <section className="hub-card hub-card-cockpit">
      <header className="hub-card-header">
        <div>
          <h1 className="hub-title">Cockpit Parlios</h1>
          <p className="hub-subtitle">
            Vue synthèse des agents, des requêtes et de la stabilité du système.
          </p>
        </div>
        <div className="hub-label-live">
          <span className="hub-dot-live" />
          <span>Live</span>
        </div>
      </header>

      <div className="hub-kpi-grid">
        {kpis.map((kpi) => (
          <article key={kpi.label} className="hub-kpi-card">
            <div className="hub-kpi-label">{kpi.label}</div>
            <div className="hub-kpi-value">{kpi.value}</div>
            {kpi.trend && (
              <div
                className={
                  "hub-kpi-trend " +
                  (kpi.tone === "good"
                    ? "hub-kpi-trend-good"
                    : kpi.tone === "bad"
                    ? "hub-kpi-trend-bad"
                    : "")
                }
              >
                {kpi.trend}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
