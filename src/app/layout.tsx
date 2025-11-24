// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ER Simulator – Emergency Medicine Training That Feels Real",
  description:
    "AI-powered emergency medicine simulations with live vitals, voice, and adaptive cases. Built for PAs, physicians, residents, and EM clinicians.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <div className="bg-amber-900/30 text-amber-100 border-b border-amber-500/30 text-xs sm:text-sm px-4 py-2 text-center">
          ER Simulator is an educational simulation tool for licensed clinicians only. It does not provide medical, legal, or practice advice. Always follow your formal training, supervising teams, local laws, and hospital protocols before making real patient decisions.
        </div>
        {children}
      </body>
    </html>
  );
}