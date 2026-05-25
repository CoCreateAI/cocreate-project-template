import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import { Nav } from "@/components/nav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap"
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "CoCreate Studio — SDD + Harness Engineering",
  description:
    "Painel vivo do método CoCreate AI: skills, subagents, traces, specs e arquitetura de invocação. Spec-Driven Development com Harness Engineering.",
  keywords: [
    "CoCreate",
    "CoCreate Studio",
    "Spec-Driven Development",
    "SDD",
    "Harness Engineering",
    "Claude Code",
    "IA corporativa"
  ],
  authors: [{ name: "CoCreate AI", url: "https://www.cocreateai.com.br" }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${ibmPlex.variable}`}>
      <body className="font-sans antialiased">
        <Nav />
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
        <footer className="border-t border-border-subtle bg-bg-base/80">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-2 px-6 py-6 text-[11px] text-text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span className="font-display font-semibold text-text-secondary">
                CoCreate <span className="text-brand-accent">Studio</span>
              </span>{" "}
              · Spec-Driven Development com Harness Engineering. Ferramenta local de desenvolvimento, não vai para produção.
            </p>
            <p>
              Produto da{" "}
              <a
                href="https://www.cocreateai.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-accent hover:underline"
              >
                CoCreate AI
              </a>{" "}
              · ADR-002
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
