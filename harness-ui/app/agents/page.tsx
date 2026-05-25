import Link from "next/link";
import { listAgents } from "@/lib/agents";
import { EmptyState } from "@/components/empty-state";
import { RefreshButton } from "@/components/refresh-button";

export const dynamic = "force-dynamic";

export default async function AgentsPage() {
  const agents = await listAgents();

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="chip mb-2">.claude/agents/</p>
          <h1 className="text-2xl font-semibold tracking-tight text-ink-50">Subagents</h1>
          <p className="mt-1 text-sm text-ink-300">
            Personas especializadas com modelo, tools e comportamento focados. Invocadas internamente por skills via{" "}
            <code className="rounded bg-ink-800 px-1.5 py-0.5 font-mono text-xs">agent: nome</code> no frontmatter.
          </p>
        </div>
        <RefreshButton />
      </header>

      {agents.length === 0 ? (
        <EmptyState
          title="Nenhum subagent encontrado"
          hint="Esperado em .claude/agents/<nome>.md"
          actionLabel=".claude/agents/"
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {agents.map((agent) => (
            <Link key={agent.name} href={`/agents/${agent.name}`} className="surface surface-hover p-5 group">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h2 className="font-mono text-sm font-medium text-accent-soft group-hover:text-accent">{agent.name}</h2>
                  <p className="mt-1.5 text-sm text-ink-200 line-clamp-3">{agent.description}</p>
                </div>
                <span className="text-ink-500 group-hover:text-accent-soft transition-colors">→</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                {agent.model && <span className="chip text-accent-soft">model: {agent.model}</span>}
                {agent.maxTurns !== undefined && <span className="chip">max-turns: {agent.maxTurns}</span>}
                {agent.tools && agent.tools.length > 0 && <span className="chip">{agent.tools.length} tool(s)</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
