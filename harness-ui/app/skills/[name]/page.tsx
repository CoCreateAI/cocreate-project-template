import Link from "next/link";
import { notFound } from "next/navigation";
import { getSkill } from "@/lib/skills";
import { lastUsageOfSkill } from "@/lib/traces";
import { Markdown } from "@/components/markdown";
import { RefreshButton } from "@/components/refresh-button";
import { StatusBadge } from "@/components/status-badge";

export const dynamic = "force-dynamic";

export default async function SkillDetailPage({ params }: { params: { name: string } }) {
  const skill = await getSkill(params.name);
  if (!skill) notFound();
  const lastUsage = await lastUsageOfSkill(skill.name);

  return (
    <div className="space-y-8">
      <Link href="/skills" className="text-xs text-ink-400 hover:text-ink-100">← Voltar para Skills</Link>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {skill.agent && <span className="chip text-accent-soft">delega para subagent: {skill.agent}</span>}
          {skill.context && <span className="chip">context: {skill.context}</span>}
          {skill.argumentHint && <span className="chip">args: {skill.argumentHint}</span>}
        </div>
        <h1 className="font-mono text-3xl font-semibold tracking-tight text-accent-soft">/{skill.name}</h1>
        <p className="text-base text-ink-200">{skill.description}</p>
        <div className="pt-2">
          <RefreshButton />
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="surface p-5 space-y-2">
          <p className="text-[11px] uppercase tracking-widest text-ink-400">Tools permitidas</p>
          {skill.allowedTools && skill.allowedTools.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {skill.allowedTools.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-400">Sem restrição declarada (herda padrão do projeto)</p>
          )}
        </div>
        <div className="surface p-5 space-y-2">
          <p className="text-[11px] uppercase tracking-widest text-ink-400">Último uso registrado</p>
          {lastUsage ? (
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-ink-500">{lastUsage.time}</span>
                <span className="text-ink-200">{lastUsage.type}</span>
                {lastUsage.status && <StatusBadge status={lastUsage.status} />}
              </div>
              {lastUsage.missao && <p className="text-xs text-ink-300">{lastUsage.missao}</p>}
              {lastUsage.proximoPasso && (
                <p className="text-xs text-ink-400">Próximo passo: {lastUsage.proximoPasso}</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-ink-400">Sem registro nos traces. Skill nunca foi executada hoje (ou não escreve trace).</p>
          )}
        </div>
      </section>

      <section className="surface p-6">
        <p className="mb-4 text-[11px] uppercase tracking-widest text-ink-400">Corpo da skill (SKILL.md)</p>
        <Markdown>{skill.body}</Markdown>
      </section>
    </div>
  );
}
