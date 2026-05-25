import Link from "next/link";
import { readIdentity } from "@/lib/identity";
import { getBusinessArchitecture, getTechnicalArchitecture } from "@/lib/mermaid-extract";
import { IdentityShowcase } from "@/components/identity-showcase";
import { IdentityForm } from "@/components/identity-form";
import { ArchitectureSection } from "@/components/architecture-section";
import { EmptyState } from "@/components/empty-state";
import { RefreshButton } from "@/components/refresh-button";

export const dynamic = "force-dynamic";

export default async function ProjetoPage() {
  const [identity, business, technical] = await Promise.all([
    readIdentity(),
    getBusinessArchitecture(),
    getTechnicalArchitecture()
  ]);

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="chip-accent">Projeto</span>
          <span className="chip">solução em construção</span>
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          A solução que você está construindo
        </h1>
        <p className="max-w-2xl text-base text-text-secondary">
          Identidade visual (logo + cores que ficam salvos para a skill{" "}
          <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs text-brand-accent-soft">/executar-tarefa</code>{" "}
          usar quando criar o frontend), visão de negócio (extraída de{" "}
          <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs">docs/macro-processo.md</code>) e visão técnica
          (extraída das specs ativas em <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs">docs/specs/</code>).
        </p>
        <div className="pt-2">
          <RefreshButton label="Recarregar" />
        </div>
      </header>

      {/* SEÇÃO 1: IDENTIDADE VISUAL */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-display text-xl font-semibold text-text-primary">1 · Identidade visual</h2>
          <p className="text-sm text-text-secondary">
            Logo + paleta + tipografia. Essas escolhas viram input para a skill que gera o frontend.
          </p>
        </div>
        <IdentityShowcase identity={identity} />
        <IdentityForm initial={identity} />
      </section>

      {/* SEÇÃO 2: VISÃO DE NEGÓCIO */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-display text-xl font-semibold text-text-primary">2 · Visão de negócio</h2>
          <p className="text-sm text-text-secondary">
            Macro processo do negócio. Diagramas extraídos de{" "}
            <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs">docs/macro-processo.md</code>.
          </p>
        </div>
        {business.exists && !business.isPlaceholder && business.blocks.length > 0 ? (
          <ArchitectureSection
            title="Macro processo"
            blocks={business.blocks}
            source={business.source}
            idPrefix="biz"
          />
        ) : business.exists && business.isPlaceholder ? (
          <EmptyState
            title="Macro processo ainda em placeholder"
            hint="docs/macro-processo.md existe mas tem {{PLACEHOLDERS}} não preenchidos."
            actionLabel="/iniciar-projeto"
            actionHint="Rode a Fase 4 da skill para preencher"
          />
        ) : business.exists && business.blocks.length === 0 ? (
          <EmptyState
            title="Sem diagramas Mermaid no macro-processo.md"
            hint="O arquivo existe mas não tem blocos ```mermaid```. Adicione um diagrama no formato `flowchart TD` ou similar."
          />
        ) : (
          <EmptyState
            title="Macro processo ainda não foi definido"
            hint="A visão de negócio aparece aqui depois que a Fase 4 de /iniciar-projeto for executada."
            actionLabel="/iniciar-projeto"
            actionHint="Roda no Claude Code para começar"
          />
        )}
      </section>

      {/* SEÇÃO 3: VISÃO TÉCNICA */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-display text-xl font-semibold text-text-primary">3 · Visão técnica</h2>
          <p className="text-sm text-text-secondary">
            Arquitetura técnica da solução. Diagramas extraídos das specs ativas em{" "}
            <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs">docs/specs/</code>.
          </p>
        </div>
        {technical.length > 0 ? (
          <div className="space-y-8">
            {technical.map((spec) => (
              <div key={spec.filename} className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-base font-semibold text-text-primary">{spec.title}</h3>
                  <code className="font-mono text-[10px] text-text-muted">docs/specs/{spec.filename}</code>
                </div>
                <ArchitectureSection
                  title={`${spec.blocks.length} diagrama(s)`}
                  blocks={spec.blocks}
                  idPrefix={`tech-${spec.filename.replace(/\W+/g, "_")}`}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nenhuma spec ativa com diagrama Mermaid"
            hint="A visão técnica aparece aqui quando suas specs em docs/specs/ tiverem blocos ```mermaid``` (erDiagram, flowchart, sequenceDiagram, etc.)."
            actionLabel="/processar-contexto"
            actionHint="Roda no Claude Code para gerar specs com diagramas"
          />
        )}
      </section>

      <section className="surface p-6 space-y-3">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-text-secondary">
          Para uma visão geral do método CoCreate
        </h3>
        <p className="text-sm text-text-secondary">
          Esta aba é sobre a SOLUÇÃO que você está construindo. Para entender o ciclo do método em si,{" "}
          <Link href="/" className="text-brand-accent-soft hover:underline">
            volte à Visão geral
          </Link>{" "}
          ou veja o{" "}
          <Link href="/guia" className="text-brand-accent-soft hover:underline">
            Guia de uso
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
