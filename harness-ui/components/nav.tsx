import Link from "next/link";
import { Sparkles } from "lucide-react";
import { getSetupReport } from "@/lib/setup-status";
import { BrandMark } from "@/components/brand-mark";

const items = [
  { href: "/", label: "Visão geral" },
  { href: "/projeto", label: "Projeto" },
  { href: "/skills", label: "Skills" },
  { href: "/agents", label: "Subagents" },
  { href: "/runtime", label: "Runtime" },
  { href: "/specs", label: "Specs e ADRs" },
  { href: "/guia", label: "Guia de uso" }
];

export async function Nav() {
  let setupIncomplete = false;
  let percentage = 100;
  try {
    const report = await getSetupReport();
    setupIncomplete = report.progress.done < report.progress.total;
    percentage = report.progress.percentage;
  } catch {
    // Se algo falhar, esconde o badge — não trava o nav
  }

  return (
    <nav className="border-b border-border-subtle bg-bg-elevated/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <BrandMark />
        <ul className="flex items-center gap-1">
          <li>
            <Link
              href="/comece-aqui"
              className={`relative inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                setupIncomplete
                  ? "bg-brand-accent/15 text-brand-accent-soft hover:bg-brand-accent/25"
                  : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              <span>Comece aqui</span>
              {setupIncomplete && (
                <span className="ml-1 inline-flex items-center rounded-full bg-brand-accent/30 px-1.5 py-0.5 text-[10px] font-semibold text-brand-accent-soft">
                  {percentage}%
                </span>
              )}
            </Link>
          </li>
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
