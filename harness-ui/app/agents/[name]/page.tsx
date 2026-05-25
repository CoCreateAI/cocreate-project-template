import Link from "next/link";
import { notFound } from "next/navigation";
import { getAgent } from "@/lib/agents";
import { Markdown } from "@/components/markdown";
import { RefreshButton } from "@/components/refresh-button";

export const dynamic = "force-dynamic";

export default async function AgentDetailPage({ params }: { params: { name: string } }) {
  const agent = await getAgent(params.name);
  if (!agent) notFound();

  return (
    <div className="space-y-8">
      <Link href="/agents" className="text-xs text-ink-400 hover:text-ink-100">← Voltar para Subagents</Link>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {agent.model && <span className="chip text-accent-soft">model: {agent.model}</span>}
          {agent.maxTurns !== undefined && <span className="chip">max-turns: {agent.maxTurns}</span>}
        </div>
        <h1 className="font-mono text-3xl font-semibold tracking-tight text-accent-soft">{agent.name}</h1>
        <p className="text-base text-ink-200">{agent.description}</p>
        <div className="pt-2">
          <RefreshButton />
        </div>
      </header>

      <section className="surface p-5 space-y-2">
        <p className="text-[11px] uppercase tracking-widest text-ink-400">Tools permitidas</p>
        {agent.tools && agent.tools.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {agent.tools.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-400">Sem restrição declarada</p>
        )}
      </section>

      <section className="surface p-6">
        <p className="mb-4 text-[11px] uppercase tracking-widest text-ink-400">Definição do subagent</p>
        <Markdown>{agent.body}</Markdown>
      </section>
    </div>
  );
}
