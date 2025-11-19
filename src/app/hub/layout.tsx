import '../hub/styles/theme.css';
import React from 'react';

export const metadata = { title: 'Parlios OS Hub', description: 'Cockpit multi-agents — Parlios' };

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="hub-bg">
      <div className="grid-overlay"></div>
      {children}
    </div>
  );
}
