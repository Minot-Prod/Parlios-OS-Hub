type Event = {
  id: number;
  label: string;
  time: string;
  type: "deploy" | "agent" | "qa" | "ops";
};

const EVENTS: Event[] = [
  {
    id: 1,
    label: "Déploiement Hub sur Netlify (App Router)",
    time: "Aujourd’hui · 05:58",
    type: "deploy",
  },
  {
    id: 2,
    label: "UA : Snapshot Parlios Hub mis à jour",
    time: "Aujourd’hui · 05:10",
    type: "agent",
  },
  {
    id: 3,
    label: "QA Guardian : build Next validé",
    time: "Aujourd’hui · 04:51",
    type: "qa",
  },
  {
    id: 4,
    label: "Ops Agent : secrets & Netlify.toml vérifiés",
    time: "Aujourd’hui · 04:20",
    type: "ops",
  },
];

export default function Timeline() {
  return (
    <section className="hub-card hub-card-timeline">
      <header className="hub-card-header">
        <div>
          <h2 className="hub-title-sm">Timeline IA</h2>
          <p className="hub-subtitle-sm">
            Traçabilité des actions importantes faites par les agents.
          </p>
        </div>
      </header>

      <ol className="timeline-list">
        {EVENTS.map((e) => (
          <li key={e.id} className={`timeline-item timeline-${e.type}`}>
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-label">{e.label}</div>
              <div className="timeline-time">{e.time}</div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
