import { getTodayTrace, listTraceDates } from "@/lib/traces";
import { getRuntimeState } from "@/lib/runtime";
import { EmptyState } from "@/components/empty-state";
import { RefreshButton } from "@/components/refresh-button";
import { StatusBadge } from "@/components/status-badge";
import { Markdown } from "@/components/markdown";
import { AutoRefresh } from "@/components/auto-refresh";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function RuntimePage() {
  const [trace, runtime, dates] = await Promise.all([
    getTodayTrace(),
    getRuntimeState(),
    listTraceDates()
  ]);

  const datesWithoutToday = dates.filter((d) => d !== trace.date);

  return (
    <div className="space-y-10">
      <AutoRefresh intervalMs={5000} />
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="chip mb-2">.claude/traces/ + pending-validations.md</p>
          <h1 className="text-2xl font-semibold tracking-tight text-ink-50">Runtime — o que está acontecendo agora</h1>
          <p className="mt-1 text-sm text-ink-300">
            Estado vivo do agente: trace de hoje, pendências de validação, missão em andamento e lembretes de sessões anteriores.
          </p>
        </div>
        <RefreshButton />
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-300">Trace de hoje · {trace.date}</h2>
        {!trace.exists || trace.entries.length === 0 ? (
          <EmptyState
            title="Nenhuma execução registrada hoje"
            hint="Quando uma skill (não-readonly) é executada, ela escreve em .claude/traces/YYYY-MM-DD.md"
            actionLabel="/preparar-missao"
            actionHint="Rode no Claude Code para começar"
          />
        ) : (
          <div className="surface divide-y divide-ink-800">
            {trace.entries.map((entry, i) => (
              <div key={i} className="flex items-start gap-4 p-4">
                <span className="font-mono text-xs text-ink-500 w-12 shrink-0">{entry.time}</span>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <code className="font-mono text-sm font-medium text-accent-soft">/{entry.skill}</code>
                    <span className="chip">{entry.type}</span>
                    {entry.tentativaIndex && <span className="chip">{entry.tentativaIndex}</span>}
                    {entry.status && <StatusBadge status={entry.status} />}
                  </div>
                  {entry.missao && <p className="text-sm text-ink-200">{entry.missao}</p>}
                  {entry.falha && (
                    <p className="text-xs text-red-300">
                      <span className="text-ink-400">Falha:</span> {entry.falha}
                    </p>
                  )}
                  {entry.hipotese && (
                    <p className="text-xs text-amber-300">
                      <span className="text-ink-400">Hipótese:</span> {entry.hipotese}
                    </p>
                  )}
                  {entry.acao && (
                    <p className="text-xs text-ink-300">
                      <span className="text-ink-400">Ação:</span> {entry.acao}
                    </p>
                  )}
                  {entry.arquivosTocados && (
                    <p className="text-xs text-ink-400">
                      <span className="text-ink-500">Arquivos:</span> {entry.arquivosTocados}
                    </p>
                  )}
                  {entry.proximoPasso && (
                    <p className="text-xs text-ink-400">
                      <span className="text-ink-500">Próximo passo:</span> {entry.proximoPasso}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-300">
          Pendências de validação ({runtime.pendingValidations.length})
        </h2>
        {runtime.pendingValidations.length === 0 ? (
          <p className="text-sm text-ink-400">
            Nada pendente. O hook <code className="rounded bg-ink-800 px-1 font-mono text-xs">post-spec-edit</code> registra aqui sempre que uma spec, ADR ou contexto é editado.
          </p>
        ) : (
          <div className="surface divide-y divide-ink-800">
            {runtime.pendingValidations.map((p, i) => (
              <div key={i} className="flex items-center justify-between gap-4 p-3 text-sm">
                <code className="font-mono text-xs text-ink-200">{p.path}</code>
                <span className="text-[10px] text-ink-500">{p.timestamp}</span>
              </div>
            ))}
            <div className="p-3 text-xs text-ink-400">
              Rode <code className="rounded bg-ink-800 px-1.5 py-0.5 font-mono text-accent-soft">/analisar-coerencia</code> no Claude Code para processar esta fila.
            </div>
          </div>
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Block title="Missão atual" content={runtime.missaoAtual} emptyHint=".claude/missao-atual.md não existe ou está vazio. Criado por /orquestrar." />
        <Block title="Última orquestração" content={runtime.ultimaOrquestracao} emptyHint=".claude/ultima-orquestracao.md não existe. Criado ao final de /orquestrar." />
      </section>

      {runtime.sessionEndHint && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-300">Lembrete da última sessão</h2>
          <div className="surface border-amber-500/30 p-5">
            <Markdown>{runtime.sessionEndHint}</Markdown>
          </div>
        </section>
      )}

      {datesWithoutToday.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-300">Histórico de traces</h2>
          <div className="flex flex-wrap gap-2">
            {datesWithoutToday.slice(0, 14).map((date) => (
              <Link
                key={date}
                href={`/runtime?date=${date}`}
                className="chip hover:border-accent hover:text-accent-soft transition-colors"
              >
                {date}
              </Link>
            ))}
          </div>
          <p className="text-[11px] text-ink-500">
            O MVP mostra apenas o trace de hoje em detalhe. Navegação por data fica para próxima rodada.
          </p>
        </section>
      )}
    </div>
  );
}

function Block({ title, content, emptyHint }: { title: string; content: string | null; emptyHint: string }) {
  return (
    <div className="surface p-5 space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-300">{title}</h3>
      {content ? <Markdown>{content}</Markdown> : <p className="text-xs text-ink-500">{emptyHint}</p>}
    </div>
  );
}
