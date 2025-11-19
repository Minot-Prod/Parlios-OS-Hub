import "../globals.css";
import "./styles/theme.css";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Parlios OS Hub",
  description: "Cockpit central des agents Parlios",
};

export default function HubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="hub-root">
      <div className="hub-background" />
      <div className="hub-shell">
        <aside className="hub-sidebar">
          <Sidebar />
        </aside>
        <main className="hub-main">{children}</main>
      </div>
    </div>
  );
}
