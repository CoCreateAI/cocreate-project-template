import { getSetupReport, type StackDetection } from "@/lib/setup-status";
import { SetupStep } from "@/components/setup-step";
import { CodeBlock } from "@/components/code-block";
import { ProgressBar } from "@/components/progress-bar";
import { RefreshButton } from "@/components/refresh-button";
import { ManualCheckToggle } from "@/components/manual-check-toggle";
import { AutoRefresh } from "@/components/auto-refresh";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ComeceAqui() {
  const report = await getSetupReport();

  const manualEntry = (id: keyof typeof report.manual) => report.manual[id] ?? null;
  const manualDone = (id: keyof typeof report.manual) => Boolean(report.manual[id]?.done);

  const node20Status = report.prerequisites.nodeOk ? "done" : "current";
  const powershell7Status = manualDone("powershell7") ? "done" : "manual";
  const claudeCliStatus = manualDone("claude-code-cli") ? "done" : "manual";
  const vscodeStatus = manualDone("vscode") ? "done" : "manual";
  const gitStatus = manualDone("git") ? "done" : "manual";

  const harnessInstalledStatus = report.harness.nodeModules ? "done" : "current";
  const hooksStatus = report.prerequisites.settingsJson ? "done" : "manual";

  const claudeOpenedStatus = manualDone("claude-code-opened") ? "done" : "manual";
  const perfilStatus = report.onboarding.perfilProjeto ? "done" : "current";
  const processarStatus = report.specs.constitutionExists
    ? "done"
    : report.onboarding.perfilProjeto
    ? "current"
    : "pending";
  const missaoStatus = report.development.tracesToday
    ? "done"
    : report.specs.constitutionExists
    ? "current"
    : "pending";

  const envStatus = report.development.envFile ? "done" : report.development.envExample ? "current" : "pending";
  const backendStatus = report.development.backend.ok ? "done" : "pending";
  const frontendStatus = report.development.frontend.ok ? "done" : "pending";

  return (
    <article className="space-y-10">
      <AutoRefresh intervalMs={5000} />

      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="chip">guia passo a passo</span>
          <span className="chip text-accent-soft">verificação automática + tracker manual</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-ink-50 sm:text-4xl">Comece aqui</h1>
        <p className="max-w-2xl text-base text-ink-300">
          Acabou de clonar o repositório e nunca trabalhou com este template? Siga este guia. Os passos com verificação automática
          atualizam sozinhos a cada 5 segundos. Os passos manuais ganham botão <span className="text-accent-soft">"Validar agora"</span> (tenta detectar
          via comando no servidor) ou <span className="text-emerald-300">"Já tenho instalado"</span> (você marca, fica salvo em{" "}
          <code className="rounded bg-ink-800 px-1 font-mono text-xs">.claude/setup-checks.json</code>).
        </p>
        <div className="pt-2">
          <ProgressBar done={report.progress.done} total={report.progress.total} percentage={report.progress.percentage} />
        </div>
        <div className="pt-2">
          <RefreshButton label="Recheckar agora" />
        </div>
      </header>

      <FaseHeader
        numero="Fase 1"
        titulo="Ambiente da máquina"
        descricao="Pré-requisitos antes de abrir qualquer terminal no projeto. Use o botão Validar para detectar via comando ou marque manualmente."
      />

      <SetupStep
        number="1.1"
        title="Node.js 20 ou superior"
        status={node20Status}
        detail={report.prerequisites.nodeDetail}
      >
        <p className="text-sm text-ink-300">
          O CoCreate Studio (este dashboard) e o frontend do projeto rodam em Node. Se você está vendo esta página, provavelmente já tem Node instalado
          (foi assim que `npm run dev` funcionou). O check verifica se a versão é &gt;= 20.
        </p>
        <a
          href="https://nodejs.org/pt-br/download"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-accent-soft hover:underline"
        >
          nodejs.org/pt-br/download ↗
        </a>
        <ManualCheckToggle id="node20" initial={manualEntry("node20")} probeOnly label="Node 20+" />
      </SetupStep>

      <SetupStep
        number="1.2"
        title="PowerShell 7+ (Windows)"
        status={powershell7Status}
        detail="Windows 10/11 vem com PowerShell 5.1 (comando powershell.exe). O PowerShell 7+ é uma instalação separada e responde a 'pwsh'. Os hooks da camada Harness foram configurados pra usar pwsh por padrão."
      >
        <div className="rounded-md border border-ink-800 bg-ink-950 p-3 space-y-2 text-xs">
          <p className="text-ink-300">Você tem 2 opções:</p>
          <ol className="space-y-1 text-ink-300 list-decimal pl-4">
            <li>
              <strong className="text-ink-100">Instalar PowerShell 7+</strong> (recomendado) — botão "Validar agora" abaixo confirma
            </li>
            <li>
              <strong className="text-ink-100">Editar <code className="rounded bg-ink-800 px-1 font-mono">.claude/settings.json</code></strong> trocando{" "}
              <code className="rounded bg-ink-800 px-1 font-mono">pwsh</code> por{" "}
              <code className="rounded bg-ink-800 px-1 font-mono">powershell</code> — funciona com 5.1 (já instalado por padrão no Windows)
            </li>
          </ol>
        </div>
        <a
          href="https://github.com/PowerShell/PowerShell/releases/latest"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-accent-soft hover:underline"
        >
          Baixar PowerShell 7+ ↗
        </a>
        <ManualCheckToggle id="powershell7" initial={manualEntry("powershell7")} label="PowerShell 7+" />
      </SetupStep>

      <SetupStep
        number="1.3"
        title="Claude Code CLI"
        status={claudeCliStatus}
        detail="A IA executora deste template. Sem ele, as skills (/iniciar-projeto, /executar-tarefa, etc.) não funcionam."
      >
        <div className="rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-xs text-accent-soft">
          <strong>Dica:</strong> se você está usando este template via Claude Code agora mesmo (digitar / no terminal abre as skills), já tem
          instalado. Clique "Validar agora" para confirmar.
        </div>
        <a
          href="https://docs.claude.com/en/docs/claude-code/setup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-accent-soft hover:underline"
        >
          Documentação oficial de instalação ↗
        </a>
        <ManualCheckToggle id="claude-code-cli" initial={manualEntry("claude-code-cli")} label="Claude Code CLI" />
      </SetupStep>

      <SetupStep
        number="1.4"
        title="VSCode"
        status={vscodeStatus}
        detail="Editor recomendado para trabalhar com este template. Você provavelmente já tem se está lendo isso pelo browser na sua máquina."
      >
        <a
          href="https://code.visualstudio.com/download"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-accent-soft hover:underline"
        >
          Baixar VSCode ↗
        </a>
        <ManualCheckToggle id="vscode" initial={manualEntry("vscode")} label="VSCode" />
      </SetupStep>

      <SetupStep
        number="1.5"
        title="Git"
        status={gitStatus}
        detail="Você provavelmente já tem (foi assim que clonou o repositório). Validar agora roda 'git --version' para confirmar."
      >
        <a
          href="https://git-scm.com/downloads"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-accent-soft hover:underline"
        >
          Baixar Git ↗
        </a>
        <ManualCheckToggle id="git" initial={manualEntry("git")} label="Git" />
      </SetupStep>

      <FaseHeader
        numero="Fase 2"
        titulo="Setup do CoCreate Studio (este painel)"
        descricao="Este dashboard. Se você está lendo isso, parte já está pronta automaticamente."
      />

      <SetupStep
        number="2.1"
        title="CoCreate Studio rodando"
        status="done"
        detail="Se você não estivesse rodando o dashboard, esta página nem abriria. Pulou esta etapa automaticamente."
      >
        <div className="rounded-md border border-brand-mint/30 bg-brand-mint/5 px-3 py-2 text-xs text-text-secondary">
          <strong className="text-brand-mint">Porta canônica: 3001</strong> · sempre{" "}
          <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-[10px] text-brand-mint">http://localhost:3001</code>.
          Útil quando você roda vários projetos em paralelo — sempre vem aqui que é o CoCreate Studio deste projeto.
        </div>
      </SetupStep>

      <SetupStep
        number="2.2"
        title="node_modules instalados (harness-ui)"
        status={harnessInstalledStatus}
        detail={
          report.harness.nodeModules
            ? "Dependências do dashboard instaladas. Tudo pronto."
            : "Aparentemente o npm install ainda não rodou nesta pasta. Estranho — você está vendo este app rodando."
        }
      >
        {!report.harness.nodeModules && (
          <CodeBlock code={"cd harness-ui\nnpm install\nnpm run dev"} label="Setup do dashboard" />
        )}
      </SetupStep>

      <SetupStep
        number="2.3"
        title="Hooks da camada Harness configurados"
        status={hooksStatus}
        detail={
          report.prerequisites.settingsJson
            ? "Arquivo .claude/settings.json existe. Hooks PostToolUse e Stop configurados. Vão disparar na próxima vez que você abrir o Claude Code neste projeto."
            : "Arquivo .claude/settings.json não foi encontrado. Verifique se o template não está corrompido."
        }
      >
        <p className="text-xs text-ink-400">
          Hooks registram quando uma spec é editada (em <code className="rounded bg-ink-800 px-1 font-mono">.claude/pending-validations.md</code>) e geram lembretes no fim da sessão. Veja na aba{" "}
          <Link href="/runtime" className="text-accent-soft hover:underline">Runtime</Link> deste dashboard para acompanhar.
        </p>
      </SetupStep>

      <FaseHeader
        numero="Fase 3"
        titulo="Onboarding do projeto no Claude Code"
        descricao="Agora você abre o Claude Code no projeto (não neste app — em outro terminal) e roda 3 skills em sequência."
      />

      <SetupStep
        number="3.1"
        title="Abra o Claude Code no projeto"
        status={claudeOpenedStatus}
        detail="No VSCode, abra um terminal integrado (Ctrl+`) na raiz do projeto e digite:"
      >
        <CodeBlock code={"claude"} label="Abrir Claude Code no projeto" />
        <p className="text-xs text-ink-400">
          Vai aparecer o prompt do Claude Code. Tudo que começa com / é uma skill.
        </p>
        <ManualCheckToggle id="claude-code-opened" initial={manualEntry("claude-code-opened")} manualOnly label="Claude Code aberto" />
      </SetupStep>

      <SetupStep
        number="3.2"
        title="Rode /iniciar-projeto (GATILHO ZERO)"
        status={perfilStatus}
        detail={
          report.onboarding.perfilProjeto
            ? "Briefing inicial detectado em docs/raw/00-perfil-projeto.md. Onboarding já foi feito."
            : "Skill que conduz 5 fases de perguntas guiadas: perfil + tipo de projeto + escopo + macro processo + análise estratégica (riscos + compliance)."
        }
      >
        {!report.onboarding.perfilProjeto && (
          <>
            <CodeBlock code={"/iniciar-projeto"} label="Comando no Claude Code" language="claude-code" />
            <div className="rounded-md border border-ink-800 bg-ink-950 p-3 text-xs space-y-1">
              <p className="text-ink-400">A skill vai perguntar sequencialmente:</p>
              <ul className="space-y-0.5 text-ink-300">
                <li>· Fase 1 — perfil do usuário (quem é você, papel, contexto)</li>
                <li>· Fase 2 — tipo de projeto (interno/externo, B2B/B2C, estágio)</li>
                <li>· Fase 3 — escopo inicial (problema, sucesso, fora do escopo)</li>
                <li>· Fase 4 — macro processo (Mermaid + descrição)</li>
                <li>· Fase 5 — análise estratégica (riscos + compliance + mitigações)</li>
              </ul>
            </div>
          </>
        )}
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3 pt-2">
          <StatusInline label="docs/raw/00-perfil-projeto.md" ok={report.onboarding.perfilProjeto} />
          <StatusInline label="docs/macro-processo.md" ok={report.onboarding.macroProcesso} />
          <StatusInline label="docs/analise-estrategica.md" ok={report.onboarding.analiseEstrategica} />
        </div>
      </SetupStep>

      <SetupStep
        number="3.3"
        title="Rode /processar-contexto (GATILHO 1)"
        status={processarStatus}
        detail={
          report.specs.constitutionExists
            ? `${report.specs.nonTemplateCount} spec(s) ativa(s) detectada(s) em docs/specs/.`
            : "Com o briefing pronto, esta skill gera a constitution (spec-000) e a primeira spec de feature (spec-001)."
        }
      >
        {!report.specs.constitutionExists && (
          <CodeBlock code={"/processar-contexto"} label="Comando no Claude Code" language="claude-code" />
        )}
        <StatusInline label="docs/specs/spec-000-*.md (constitution)" ok={report.specs.constitutionExists} />
        <StatusInline label="CLAUDE.md sem placeholders {{...}}" ok={report.onboarding.claudeMdFilled} />
      </SetupStep>

      <SetupStep
        number="3.4"
        title="Rode /preparar-missao para começar a trabalhar"
        status={missaoStatus}
        detail={
          report.development.tracesToday
            ? "Há atividade registrada hoje em .claude/traces/. A sessão está ativa."
            : "A partir daqui, toda sessão começa com /preparar-missao. A skill analisa sua direção, define a missão e recomenda modo Rápido ou Orquestrado."
        }
      >
        {!report.development.tracesToday && (
          <CodeBlock
            code={"/preparar-missao\n# ou com uma direção explicita:\n/preparar-missao adicionar endpoint de health check no backend"}
            label="Comando no Claude Code"
            language="claude-code"
          />
        )}
        <p className="text-xs text-ink-400">
          Trace de hoje fica em <code className="rounded bg-ink-800 px-1 font-mono">.claude/traces/YYYY-MM-DD.md</code>. Veja na aba{" "}
          <Link href="/runtime" className="text-accent-soft hover:underline">Runtime</Link> deste dashboard.
        </p>
      </SetupStep>

      <FaseHeader
        numero="Fase 4"
        titulo="Desenvolvimento do projeto"
        descricao="Com specs aprovadas, configure o ambiente do projeto em si. Detector cobre ~30 frameworks (Python, Node, Go, Rust, Ruby, PHP, Java, .NET, Flutter)."
      />

      <SetupStep
        number="4.1"
        title="Configure o .env do projeto"
        status={envStatus}
        detail={
          report.development.envFile
            ? "Arquivo .env existe. Confira se está com os valores corretos para o ambiente atual."
            : report.development.envExample
            ? "Template .env.example existe na raiz. Copie e preencha com os valores reais."
            : "Sem .env.example. A constitution (spec-000) deveria ter sugerido o que precisa configurar."
        }
      >
        {report.development.envExample && !report.development.envFile && (
          <CodeBlock code={"Copy-Item .env.example .env\nnotepad .env"} label="Copiar e editar (Windows PowerShell)" />
        )}
        <p className="text-xs text-ink-400">
          NUNCA commite o <code className="rounded bg-ink-800 px-1 font-mono">.env</code> — o template já tem em <code className="rounded bg-ink-800 px-1 font-mono">.gitignore</code>.
        </p>
      </SetupStep>

      <SetupStep
        number="4.2"
        title="Inicialize o backend"
        status={backendStatus}
        detail={
          report.development.backend.ok
            ? stackSummary("Backend", report.development.backend)
            : "Sem backend detectado em src/backend/, src/api/, src/server/, raiz ou variantes. Use /executar-tarefa descrevendo o que precisa criar."
        }
      >
        {!report.development.backend.ok && (
          <CodeBlock
            code={"/executar-tarefa inicializar backend conforme spec-000 (stack definida na constitution)"}
            label="Comando no Claude Code"
            language="claude-code"
          />
        )}
        {report.development.backend.ok && <StackDetails detection={report.development.backend} />}
      </SetupStep>

      <SetupStep
        number="4.3"
        title="Inicialize o frontend"
        status={frontendStatus}
        detail={
          report.development.frontend.ok
            ? stackSummary("Frontend", report.development.frontend)
            : "Sem frontend detectado em src/frontend/, src/web/, src/client/, src/app/ ou variantes. Detector cobre Next, React, Vue, Svelte, Astro, Nuxt, Remix, Angular, Solid, Qwik, React Native, Expo, Electron, Streamlit, Gradio, Reflex, Dash, Panel, e Flutter."
        }
      >
        {!report.development.frontend.ok && (
          <CodeBlock code={"/executar-tarefa inicializar frontend conforme spec-000"} label="Comando no Claude Code" language="claude-code" />
        )}
        {report.development.frontend.ok && <StackDetails detection={report.development.frontend} />}
      </SetupStep>

      <FaseHeader
        numero="Próximos passos"
        titulo="O ciclo continua"
        descricao="Daqui em diante, o template está vivo. Continue usando as skills conforme a necessidade."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ProximoCard
          title="Implementar features"
          skill="/executar-tarefa"
          description="Com loop de correção: até 3 tentativas em testes falhados antes de pedir ajuda. Nunca silencia testes."
        />
        <ProximoCard
          title="Coordenar trabalho complexo"
          skill="/orquestrar"
          description="Para missões multi-área (3+ skills). Coordena execução em paralelo sem sobrepor arquivos."
        />
        <ProximoCard
          title="Validar coerência"
          skill="/analisar-coerencia"
          description="Antes de fechar uma missão grande, valida specs vs código. Prioriza pendências registradas pelo hook."
        />
        <ProximoCard
          title="Registrar lições"
          skill="/licoes-aprendidas"
          description="Após erros ou descobertas não-óbvias. Consome TENTATIVAS falhadas do trace automaticamente."
        />
      </div>

      <section className="surface p-6 space-y-3">
        <h2 className="text-lg font-semibold text-ink-50">Sempre que quiser ver o estado, abra as abas deste dashboard</h2>
        <div className="rounded-md border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-xs text-amber-300">
          <strong>Não são comandos do Claude Code.</strong> São páginas do CoCreate Studio (este app, rodando em
          <code className="ml-1 rounded bg-ink-800 px-1 font-mono">http://localhost:3001</code>). Use o menu no topo da página
          ou clique nos links abaixo.
        </div>
        <ul className="space-y-2 text-sm text-ink-200">
          <li>· <Link href="/" className="text-accent-soft hover:underline">Visão geral</Link> — pulso (skills, subagents, execuções hoje, pendências)</li>
          <li>· <Link href="/runtime" className="text-accent-soft hover:underline">Runtime</Link> — timeline detalhada do que aconteceu hoje (auto-refresh 5s)</li>
          <li>· <Link href="/specs" className="text-accent-soft hover:underline">Specs e ADRs</Link> — status de cada spec e ADR</li>
          <li>· <Link href="/skills" className="text-accent-soft hover:underline">Skills</Link> e <Link href="/agents" className="text-accent-soft hover:underline">Subagents</Link> — referência rápida do que cada um faz</li>
          <li>· <Link href="/guia" className="text-accent-soft hover:underline">Guia de uso</Link> — explicação metodológica do SDD + Harness</li>
        </ul>
        <p className="text-[11px] text-ink-500 pt-1">
          Slash commands de verdade (que você digita no terminal do Claude Code) começam com <code className="rounded bg-ink-800 px-1 font-mono text-accent-soft">/</code> e
          são as <strong>skills</strong>: <code className="font-mono text-accent-soft">/iniciar-projeto</code>,
          <code className="ml-1 font-mono text-accent-soft">/preparar-missao</code>,
          <code className="ml-1 font-mono text-accent-soft">/executar-tarefa</code>,
          <code className="ml-1 font-mono text-accent-soft">/orquestrar</code>, etc. Veja a lista completa na aba{" "}
          <Link href="/skills" className="text-accent-soft hover:underline">Skills</Link>.
        </p>
      </section>
    </article>
  );
}

function stackSummary(prefix: string, det: StackDetection): string {
  const parts = [prefix, "detectado:", det.framework ?? "desconhecido"];
  if (det.language && det.language !== det.framework) parts.push(`(${det.language})`);
  if (det.manifestFile) parts.push(`· ${det.manifestFile}`);
  return parts.join(" ");
}

function StackDetails({ detection }: { detection: StackDetection }) {
  if (!detection.allDeps || detection.allDeps.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-1">
      <span className="text-[10px] uppercase tracking-widest text-ink-500">deps detectadas:</span>
      {detection.allDeps.map((d) => (
        <span key={d} className="chip font-mono">{d}</span>
      ))}
    </div>
  );
}

function FaseHeader({ numero, titulo, descricao }: { numero: string; titulo: string; descricao: string }) {
  return (
    <div className="pt-4 space-y-1">
      <p className="text-[11px] uppercase tracking-widest text-accent-soft">{numero}</p>
      <h2 className="text-xl font-semibold tracking-tight text-ink-50">{titulo}</h2>
      <p className="text-sm text-ink-400">{descricao}</p>
    </div>
  );
}

function StatusInline({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span
        className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
          ok ? "bg-emerald-500/20 text-emerald-300" : "bg-ink-800 text-ink-500"
        }`}
      >
        {ok ? "✓" : "○"}
      </span>
      <code className={`font-mono ${ok ? "text-ink-300" : "text-ink-500"}`}>{label}</code>
    </div>
  );
}

function ProximoCard({ title, skill, description }: { title: string; skill: string; description: string }) {
  return (
    <div className="surface p-5 space-y-2">
      <h3 className="text-sm font-semibold text-ink-50">{title}</h3>
      <code className="inline-block rounded bg-ink-800 px-2 py-1 font-mono text-xs text-accent-soft">{skill}</code>
      <p className="text-xs text-ink-300">{description}</p>
    </div>
  );
}
