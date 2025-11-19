"use client";
import React from "react";
import Link from "next/link";

const ITEMS = [
  { k: "dashboard", label: "Dashboard", href: "/hub" },
  { k: "agents",    label: "Agents",    href: "/hub/agents" },
  { k: "memory",    label: "Mémoire",   href: "/hub/memoire" },
  { k: "timeline",  label: "Timeline IA", href: "/hub/timeline" },
  { k: "settings",  label: "Paramètres", href: "/hub/settings" },
];

export default function Sidebar() {
  return (
    <aside className="glass section sidebar">
      <strong>Parlios OS Hub</strong>
      {ITEMS.map((i) => (
        <Link key={i.k} href={i.href} className="item">
          {i.label}
        </Link>
      ))}
      <div style={{ marginTop: "auto" }} className="note">
        Vision premium, animée, immersive.
      </div>
    </aside>
  );
}
