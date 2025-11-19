"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/hub", label: "Dashboard", badge: "LIVE" },
  { href: "/hub/agents", label: "Agents", badge: "4 actifs" },
  { href: "/hub/memoire", label: "Mémoire", badge: "Core" },
  { href: "/hub/timeline", label: "Timeline IA", badge: "Logs" },
  { href: "/hub/settings", label: "Paramètres", badge: "Hub" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebar-card">
      <div className="sidebar-logo">
        <div className="sidebar-logo-title">Parlios OS</div>
        <div className="sidebar-logo-tagline">
          Hub central · Agents · Mémoire · Timeline
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/hub"
              ? pathname === "/hub"
              : pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                "sidebar-link" + (active ? " sidebar-link-active" : "")
              }
            >
              <span className="sidebar-link-dot" />
              <span className="sidebar-link-label">{item.label}</span>
              {item.badge && (
                <span className="sidebar-link-badge">{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-title">Ultimate Agent</div>
        <div className="sidebar-footer-text">
          Interface de contrôle du cerveau Parlios.  
          Toute action ici est loggée et traçable.
        </div>
      </div>
    </div>
  );
}
