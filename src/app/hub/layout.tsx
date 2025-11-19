import "../globals.css";
import "./styles/theme.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Parlios Hub",
  description: "Hub IA Parlios",
};

export default function HubLayout({ children }: { children: ReactNode }) {
  return (
    <div className="hub-wrapper">
      {children}
    </div>
  );
}
