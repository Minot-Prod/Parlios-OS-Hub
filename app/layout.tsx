import "./globals.css";

export const metadata = {
  title: "Parlios Hub",
  description: "Pilotage IA Parlios",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='fr'>
      <body>{children}</body>
    </html>
  );
}
