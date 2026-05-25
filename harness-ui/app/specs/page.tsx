import { listSpecs, listAdrs } from "@/lib/specs";
import { EmptyState } from "@/components/empty-state";
import { RefreshButton } from "@/components/refresh-button";
import { StatusBadge } from "@/components/status-badge";

export const dynamic = "force-dynamic";

export default async function SpecsPage() {
  const [specs, adrs] = await Promise.all([listSpecs(), listAdrs()]);

  return (
    <div className="space-y-12">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="chip mb-2">docs/specs/ + docs/adr/</p>
          <h1 className="text-2xl font-semibold tracking-tight text-ink-50">Specs e ADRs</h1>
          <p className="mt-1 text-sm text-ink-300">
            Especificações Spec-Driven Development (SDD) e Architecture Decision Records do projeto.
          </p>
        </div>
        <RefreshButton />
      </header>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-300">Specs ({specs.length})</h2>
        {specs.length === 0 ? (
          <EmptyState
            title="Nenhuma spec ainda"
            hint="Esperado em docs/specs/spec-NNN-titulo.md"
            actionLabel="/processar-contexto"
            actionHint="Rode após /iniciar-projeto para gerar a constitution"
          />
        ) : (
          <div className="surface divide-y divide-ink-800">
            {specs.map((spec) => (
              <SpecRow key={spec.filename} spec={spec} />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-300">ADRs ({adrs.length})</h2>
        {adrs.length === 0 ? (
          <EmptyState title="Nenhum ADR ainda" hint="Esperado em docs/adr/adr-NNN-titulo.md" />
        ) : (
          <div className="surface divide-y divide-ink-800">
            {adrs.map((adr) => (
              <SpecRow key={adr.filename} spec={adr} />
            ))}
          </div>
        )}
      </section>

      <p className="text-[11px] text-ink-500">
        Status é inferido: <code className="rounded bg-ink-800 px-1 font-mono">template</code> para arquivos *.template.md,{" "}
        <code className="rounded bg-ink-800 px-1 font-mono">rascunho</code> se tem placeholders <code className="rounded bg-ink-800 px-1 font-mono">&#123;&#123;PLACEHOLDER&#125;&#125;</code> ou{" "}
        <code className="rounded bg-ink-800 px-1 font-mono">ativa</code> caso contrário.
      </p>
    </div>
  );
}

function SpecRow({
  spec
}: {
  spec: { filename: string; title: string; number: number | null; status: string; excerpt: string };
}) {
  return (
    <div className="p-4 space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          {spec.number !== null && <span className="font-mono text-xs text-ink-500">#{String(spec.number).padStart(3, "0")}</span>}
          <h3 className="font-medium text-ink-100">{spec.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={spec.status} />
          <code className="font-mono text-[10px] text-ink-500">{spec.filename}</code>
        </div>
      </div>
      {spec.excerpt && <p className="text-sm text-ink-300">{spec.excerpt}</p>}
    </div>
  );
}
