import Link from "next/link";
import { listSkills } from "@/lib/skills";
import { listAgents } from "@/lib/agents";
import { buildEcosystemDiagram } from "@/lib/architecture-diagram";
import { MermaidChart } from "@/components/mermaid-chart";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Guia de uso — CoCreate Studio"
};

export default async function GuiaPage() {
  const [skills, agents] = await Promise.all([listSkills(), listAgents()]);
  const ecosystemChart = buildEcosystemDiagram(
    skills.map((s) => s.name),
    agents.map((a) => a.name)
  );
  return (
    <article className="space-y-12">
      <header className="space-y-3">
        <p className="chip">guia</p>
        <h1 className="text-2xl font-semibold tracking-tight text-ink-50">Como usar este template</h1>
        <p className="text-sm text-ink-300">
          Fluxo de trabalho do <span className="text-accent-soft">cocreate-project-template</span> com Spec-Driven Development (SDD) e camada Harness.
        </p>
      </header>

      {/* Porta canônica — informação fixa para projetos paralelos */}
      <section className="rounded-xl border border-brand-mint/30 bg-brand-mint/5 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-mint/15 font-display text-base font-bold text-brand-mint">
            :
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base font-semibold text-text-primary">Porta canônica</h2>
              <span className="chip-mint">3001</span>
            </div>
            <p className="text-sm text-text-secondary">
              O CoCreate Studio sempre roda em{" "}
              <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs text-brand-mint">http://localhost:3001</code>.
              Convenção fixa do template — útil quando você tem vários projetos abertos em paralelo e precisa saber rapidamente qual dashboard pertence a qual projeto.
            </p>
            <details className="text-xs text-text-muted">
              <summary className="cursor-pointer text-text-secondary hover:text-text-primary transition-colors">
                Como mudar a porta (se conflitar com outro serviço)
              </summary>
              <div className="mt-2 space-y-1 pl-2">
                <p>
                  Edite <code className="rounded bg-bg-elevated px-1 font-mono">harness-ui/package.json</code>, scripts{" "}
                  <code className="rounded bg-bg-elevated px-1 font-mono">dev</code> e{" "}
                  <code className="rounded bg-bg-elevated px-1 font-mono">start</code>, trocando{" "}
                  <code className="rounded bg-bg-elevated px-1 font-mono">-p 3001</code> pelo número desejado.
                </p>
                <p>Mantenha o padrão 3001 sempre que possível — assim você ou seu time não precisa procurar.</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      <Section
        n="0"
        title="Pré-requisito: leia o ADR-002"
        body="O template combina SDD (specs como verdade) com a camada Harness (hooks, traces, loop de correção). Sem essa fundação, várias decisões parecem arbitrárias. Está em docs/adr/adr-002-harness-engineering-complemento-sdd.md."
      />

      <Section
        n="1"
        title="GATILHO ZERO — /iniciar-projeto"
        body="Antes de qualquer código ou spec, rode /iniciar-projeto no Claude Code. A skill conduz 5 fases de perguntas guiadas:"
        bullets={[
          "Fase 1 — Perfil do Usuário (quem está conduzindo o projeto)",
          "Fase 2 — Tipo de Projeto (interno/externo, B2B/B2C, estágio, deadline)",
          "Fase 3 — Escopo Inicial (problema, sucesso, fora do escopo)",
          "Fase 4 — Macro Processo do Negócio (Mermaid + descrição)",
          "Fase 5 — Análise Estratégica (riscos + compliance + dependências + top 5 mitigações)"
        ]}
        outputs={[
          "docs/raw/00-perfil-projeto.md",
          "docs/macro-processo.md",
          "docs/analise-estrategica.md",
          "CLAUDE.md preenchido (Perfil + Tipo + Stakeholders)"
        ]}
      />

      <Section
        n="2"
        title="GATILHO 1 — /processar-contexto"
        body="Com o briefing estruturado em docs/raw/, esta skill gera a constitution (spec-000) e a primeira spec de feature (spec-001). Também propõe estrutura de pastas e preenche placeholders restantes."
        outputs={["docs/specs/spec-000-constitution.md", "docs/specs/spec-001-*.md", "docs/adr/adr-NNN-*.md (decisões identificadas)"]}
      />

      <Section
        n="3"
        title="Início de sessão — /preparar-missao"
        body="Em toda nova sessão, rode /preparar-missao com uma direção (texto ou voz). Subagent Opus analisa, define a missão, atualiza CLAUDE.md e recomenda Modo Rápido (1-2 skills) ou Modo Orquestrado (3+ skills em paralelo)."
      />

      <Section
        n="4"
        title="Execução — /executar-tarefa ou /orquestrar"
        body="Para tarefas simples, /executar-tarefa implementa direto com loop de correção (até 3 tentativas em testes falhados). Para missões complexas multi-área, /orquestrar coordena várias skills em paralelo sem sobreposição de arquivos."
      />

      <Section
        n="5"
        title="Validação contínua (camada Harness)"
        body="Sempre que você editar uma spec/ADR/CLAUDE.md, o hook post-spec-edit registra em .claude/pending-validations.md. Antes de fechar a missão, rode /analisar-coerencia: a skill prioriza as pendências registradas pelo hook."
      />

      <Section
        n="6"
        title="Fim de sessão — /licoes-aprendidas"
        body="Skill consome o trace do dia, identifica TENTATIVAS falhadas no loop de correção, e propõe entradas em docs/licoes-aprendidas.md (Regra de Diamante). Refina o CLAUDE.md com padrões emergentes."
      />

      <section className="surface p-6 space-y-4">
        <h2 className="text-lg font-semibold text-ink-50">Modos de execução</h2>
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-ink-400">
            <tr className="border-b border-ink-800">
              <th className="py-2 pr-4">Critério</th>
              <th className="py-2 pr-4">Modo Rápido</th>
              <th className="py-2">Modo Orquestrado</th>
            </tr>
          </thead>
          <tbody className="text-ink-200">
            <tr className="border-b border-ink-800/50">
              <td className="py-2 pr-4 text-ink-400">Áreas tocadas</td>
              <td className="py-2 pr-4">1-2</td>
              <td className="py-2">3+</td>
            </tr>
            <tr className="border-b border-ink-800/50">
              <td className="py-2 pr-4 text-ink-400">Skills necessárias</td>
              <td className="py-2 pr-4">1-2</td>
              <td className="py-2">3+</td>
            </tr>
            <tr className="border-b border-ink-800/50">
              <td className="py-2 pr-4 text-ink-400">Risco de conflito</td>
              <td className="py-2 pr-4">Baixo</td>
              <td className="py-2">Alto</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 text-ink-400">Fluxo</td>
              <td className="py-2 pr-4">/preparar-missao → execução direta</td>
              <td className="py-2">/preparar-missao → /orquestrar → consolidação</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="surface p-6 space-y-3">
        <h2 className="text-lg font-semibold text-ink-50">Onde olhar este dashboard durante o trabalho</h2>
        <ul className="space-y-2 text-sm text-ink-200">
          <li>
            <Link href="/" className="text-accent-soft hover:underline">Visão geral</Link>: pega o pulso. Quantas skills rodaram hoje, quantas pendências, tem tentativa falhada.
          </li>
          <li>
            <Link href="/runtime" className="text-accent-soft hover:underline">Runtime</Link>: timeline detalhada do que cada skill fez. Útil quando coordena vários chats em paralelo.
          </li>
          <li>
            <Link href="/specs" className="text-accent-soft hover:underline">Specs e ADRs</Link>: estado das specs (rascunho com placeholder vs ativa).
          </li>
          <li>
            <Link href="/skills" className="text-accent-soft hover:underline">Skills</Link>: explora o que cada skill faz e quando foi usada pela última vez.
          </li>
        </ul>
      </section>

      <section className="surface p-6 space-y-3">
        <h2 className="text-lg font-semibold text-ink-50">Para o curso SDD</h2>
        <p className="text-sm text-ink-300">
          O CoCreate Studio é material pedagógico. Alunos do curso clonam o template e abrem este dashboard ao lado do Claude Code para ver, em tempo real, como skills e subagents interagem. O diagrama Mermaid da home é regenerado a cada refresh com base nas skills cadastradas, então funciona como documentação viva.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-text-primary">Arquitetura completa do ecossistema</h2>
          <span className="text-[11px] uppercase tracking-widest text-text-muted">referência avançada</span>
        </div>
        <p className="text-sm text-text-secondary">
          O diagrama abaixo mostra todos os fluxos entre você, Claude Code, CoCreate Studio (este painel), as skills agrupadas em 5 categorias, subagents, MCPs, camada Harness (hooks, traces, pendências) e camada compartilhada (specs, ADRs, raw, perguntas). Use a tela cheia para explorar.
        </p>
        <div className="surface p-6">
          <MermaidChart chart={ecosystemChart} id="ecosystem-detail" title="Arquitetura completa do ecossistema" />
        </div>
        <p className="text-[11px] text-text-muted">
          Regenerado a cada refresh a partir de <code className="font-mono">.claude/skills/</code> e <code className="font-mono">.claude/agents/</code>.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-text-primary">Quer usar Codex CLI no lugar do Claude Code?</h2>
          <span className="chip">alternativa</span>
        </div>
        <p className="text-sm text-text-secondary">
          O template é <strong>otimizado para Claude Code</strong> (CLI da Anthropic), que é a recomendação principal. Mas tudo o que está em{" "}
          <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs">docs/</code> é compartilhado e funciona em qualquer cliente — incluindo o Codex CLI (OpenAI), como rota alternativa ou backup.
        </p>
        <div className="surface p-6 space-y-4">
          <h3 className="font-display text-sm font-semibold text-text-primary">Passo a passo para adaptar ao Codex</h3>
          <ol className="space-y-3 text-sm text-text-secondary">
            <li className="flex gap-3">
              <span className="font-mono text-brand-accent-soft shrink-0">1.</span>
              <span>
                <strong className="text-text-primary">Leia o AGENTS.md na raiz do projeto</strong> — é o equivalente do CLAUDE.md para Codex. Ele aponta as diferenças operacionais e o que está portado vs. ainda não.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-brand-accent-soft shrink-0">2.</span>
              <span>
                <strong className="text-text-primary">Configure o Codex</strong>: copie{" "}
                <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs">.codex/config.toml.example</code> para{" "}
                <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs">~/.codex/config.toml</code> ou{" "}
                <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs">.codex/config.toml</code> local e ajuste paths/MCPs.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-brand-accent-soft shrink-0">3.</span>
              <span>
                <strong className="text-text-primary">Invocação por matching natural</strong>: no Codex você não digita{" "}
                <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs">/iniciar-projeto</code> — descreve em linguagem natural ("vamos iniciar este projeto") e a skill correspondente em{" "}
                <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs">.codex/skills/</code> ativa.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-brand-accent-soft shrink-0">4.</span>
              <span>
                <strong className="text-text-primary">Limitações conhecidas</strong>: hooks da camada Harness são exclusivos do Claude Code. No Codex, valide manualmente rodando{" "}
                <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs">/analisar-coerencia</code> após editar specs. Detalhes em AGENTS.md.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-brand-accent-soft shrink-0">5.</span>
              <span>
                <strong className="text-text-primary">Roadmap</strong>: nem todas as 14 skills do Claude foram portadas para Codex ainda. Hoje, no Codex, você tem{" "}
                <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs">iniciar-projeto</code>,{" "}
                <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs">processar-contexto</code> e{" "}
                <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs">preparar-missao</code>. Para o restante, opere direto seguindo as regras do CLAUDE.md.
              </span>
            </li>
          </ol>
          <p className="border-t border-border-subtle pt-3 text-xs text-text-muted">
            <strong className="text-text-secondary">Recomendação:</strong> use Claude Code como principal. O Codex serve quando você não tem acesso ao Claude Code ou prefere a stack OpenAI por algum motivo específico (compliance, integração existente). A metodologia SDD + Harness independe do cliente — a casca é só o runner.
          </p>
        </div>
      </section>
    </article>
  );
}

function Section({ n, title, body, bullets, outputs }: { n: string; title: string; body: string; bullets?: string[]; outputs?: string[] }) {
  return (
    <section className="border-l-2 border-accent/40 pl-5 space-y-3">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-accent-soft">{n}</span>
        <h2 className="text-lg font-semibold text-ink-50">{title}</h2>
      </div>
      <p className="text-sm text-ink-300">{body}</p>
      {bullets && (
        <ul className="space-y-1 text-sm text-ink-200">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2"><span className="text-ink-500">›</span><span>{b}</span></li>
          ))}
        </ul>
      )}
      {outputs && (
        <div className="space-y-1 text-xs">
          <p className="uppercase tracking-widest text-ink-500">Gera</p>
          <ul className="space-y-0.5 font-mono text-ink-300">
            {outputs.map((o, i) => <li key={i}>· {o}</li>)}
          </ul>
        </div>
      )}
    </section>
  );
}
