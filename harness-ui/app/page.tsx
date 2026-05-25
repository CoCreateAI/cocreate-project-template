import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { listSkills } from "@/lib/skills";
import { listAgents } from "@/lib/agents";
import { getTodayTrace } from "@/lib/traces";
import { getRuntimeState } from "@/lib/runtime";
import { getSetupReport } from "@/lib/setup-status";
import { buildSimpleMethodDiagram } from "@/lib/architecture-diagram";
import { MermaidChart } from "@/components/mermaid-chart";
import { RefreshButton } from "@/components/refresh-button";
import { ProgressBar } from "@/components/progress-bar";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [skills, agents, trace, runtime, setup] = await Promise.all([
    listSkills(),
    listAgents(),
    getTodayTrace(),
    getRuntimeState(),
    getSetupReport()
  ]);

  const chart = buildSimpleMethodDiagram();

  const startedToday = trace.entries.filter((e) => e.type === "INÍCIO").length;
  const finishedToday = trace.entries.filter((e) => e.type === "FIM").length;
  const failedAttempts = trace.entries.filter((e) => e.type === "TENTATIVA" && e.status === "falhou").length;
  const onboardingIncomplete = setup.progress.done < setup.progress.total;

  return (
    <div className="space-y-12">
      {onboardingIncomplete && (
        <section className="relative overflow-hidden rounded-xl border border-brand-accent/40 bg-gradient-to-br from-brand-accent/15 via-brand-accent-deep/10 to-brand-primary/20 p-6 space-y-4">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-brand-accent/30 blur-3xl"
          />
          <div className="relative flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-accent/20 text-brand-accent-soft">
              <Sparkles className="h-5 w-5" aria-hidden />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="chip-accent">primeiro uso</span>
                <span className="text-xs text-text-muted">
                  {setup.progress.done} de {setup.progress.total} passos verificados
                </span>
              </div>
              <h2 className="font-display text-lg font-semibold text-text-primary">Onboarding incompleto</h2>
              <p className="text-sm text-text-secondary">
                O CoCreate Studio tem um passo a passo guiado desde "acabei de clonar" até "primeira spec aprovada e ambiente rodando".
                Cada passo verifica o filesystem para te dizer o que está feito e o que falta.
              </p>
              <div className="pt-2">
                <ProgressBar done={setup.progress.done} total={setup.progress.total} percentage={setup.progress.percentage} />
              </div>
              <div className="pt-3">
                <Link href="/comece-aqui" className="btn-primary">
                  Continuar onboarding
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <header className="relative space-y-4">
        {/* Orb decorativo signature da CoCreate */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-24 h-64 w-64 rounded-full bg-brand-accent/15 blur-3xl"
        />
        <div className="relative flex items-center gap-2">
          <span className="chip-accent">CoCreate Studio</span>
          <span className="chip">v0.1 · MVP</span>
        </div>
        <h1 className="relative font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Painel vivo do método:{" "}
          <span className="text-brand-accent">Spec-Driven Development</span> com{" "}
          <span className="text-brand-mint">Harness Engineering</span>.
        </h1>
        <p className="relative max-w-2xl text-base text-text-secondary">
          Este painel lê o filesystem do template em tempo real. Você não vê o projeto que está sendo construído — vê o{" "}
          <span className="text-brand-accent-soft">runtime</span> que coordena o trabalho: skills, subagents, traces, specs e a
          arquitetura de invocação. Combina Spec-Driven Development (SDD) com Harness Engineering.
        </p>
        <div className="relative flex items-center gap-3 pt-2">
          <RefreshButton />
          {!onboardingIncomplete && (
            <Link
              href="/comece-aqui"
              className="text-xs text-text-muted hover:text-text-primary transition-colors"
            >
              Quer revisar o passo a passo? →
            </Link>
          )}
        </div>
      </header>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Skills" value={skills.length} href="/skills" />
        <Stat label="Subagents" value={agents.length} href="/agents" />
        <Stat label="Execuções hoje" value={`${finishedToday}/${startedToday}`} href="/runtime" hint="finalizadas/iniciadas" />
        <Stat
          label="Pendências"
          value={runtime.pendingValidations.length}
          href="/runtime"
          hint={failedAttempts > 0 ? `${failedAttempts} tentativa(s) falhada(s) hoje` : "specs/ADRs aguardando análise"}
          alert={runtime.pendingValidations.length > 0 || failedAttempts > 0}
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold tracking-tight text-text-primary">Como o método funciona</h2>
          <span className="text-[11px] uppercase tracking-widest text-text-muted">Mermaid · ciclo SDD + Harness</span>
        </div>
        <div className="surface p-6">
          <MermaidChart chart={chart} id="method-overview" title="Como o método funciona" />
        </div>
        <p className="text-xs text-text-muted">
          O método CoCreate em 3 fases: você dá a direção, o ciclo cuida do resto. Para ver a arquitetura da sua{" "}
          <Link href="/projeto" className="text-brand-accent-soft hover:underline">
            solução (negócio e técnica) →
          </Link>
          . Para o diagrama completo do ecossistema, veja o{" "}
          <Link href="/guia" className="text-brand-accent-soft hover:underline">
            Guia de uso
          </Link>
          .
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="surface p-6 space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-300">Como invocar</h3>
          <ul className="space-y-2 text-sm text-ink-200">
            <li>
              <span className="text-ink-400">No Claude Code:</span>{" "}
              <code className="rounded bg-ink-800 px-1.5 py-0.5 font-mono text-xs text-accent-soft">/preparar-missao</code> define a missão da sessão.
            </li>
            <li>
              <span className="text-ink-400">Para missões grandes:</span>{" "}
              <code className="rounded bg-ink-800 px-1.5 py-0.5 font-mono text-xs text-accent-soft">/orquestrar</code> coordena várias skills em paralelo.
            </li>
            <li>
              <span className="text-ink-400">Para implementar:</span>{" "}
              <code className="rounded bg-ink-800 px-1.5 py-0.5 font-mono text-xs text-accent-soft">/executar-tarefa</code> escreve código com loop de correção (3 tentativas).
            </li>
            <li>
              <span className="text-ink-400">Para visualizar histórico:</span>{" "}
              <code className="rounded bg-ink-800 px-1.5 py-0.5 font-mono text-xs text-accent-soft">/status-agentes</code> ou esta UI.
            </li>
          </ul>
        </div>
        <div className="surface p-6 space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-300">Estado de hoje</h3>
          {trace.entries.length === 0 ? (
            <p className="text-sm text-ink-400">
              Nenhuma skill executada hoje ainda. Rode{" "}
              <code className="rounded bg-ink-800 px-1.5 py-0.5 font-mono text-xs text-accent-soft">/preparar-missao</code> para começar.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {trace.entries.slice(-5).reverse().map((e, i) => (
                <li key={i} className="flex items-center gap-2 text-ink-200">
                  <span className="font-mono text-xs text-ink-500">{e.time}</span>
                  <code className="font-mono text-xs text-accent-soft">/{e.skill}</code>
                  <span className="text-ink-400">— {e.type}</span>
                  {e.status && <span className="text-ink-500">({e.status})</span>}
                </li>
              ))}
            </ul>
          )}
          <Link href="/runtime" className="inline-flex text-xs text-accent-soft hover:underline">
            Ver runtime completo →
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  href,
  hint,
  alert
}: {
  label: string;
  value: number | string;
  href: string;
  hint?: string;
  alert?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`surface surface-hover p-5 ${alert ? "border-amber-500/40 hover:border-amber-500/60" : ""}`}
    >
      <p className="text-[11px] uppercase tracking-widest text-text-muted">{label}</p>
      <p
        className={`mt-2 font-display text-3xl font-bold ${
          alert ? "text-amber-300" : "text-text-primary"
        }`}
      >
        {value}
      </p>
      {hint && <p className="mt-1 text-[11px] text-text-muted">{hint}</p>}
    </Link>
  );
}
