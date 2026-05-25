import Link from "next/link";
import { listSkills } from "@/lib/skills";
import { EmptyState } from "@/components/empty-state";
import { RefreshButton } from "@/components/refresh-button";

export const dynamic = "force-dynamic";

export default async function SkillsPage() {
  const skills = await listSkills();

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="chip mb-2">.claude/skills/</p>
          <h1 className="text-2xl font-semibold tracking-tight text-ink-50">Skills</h1>
          <p className="mt-1 text-sm text-ink-300">
            Workflows invocáveis via slash command no Claude Code. {skills.length} skill{skills.length === 1 ? "" : "s"} cadastrada{skills.length === 1 ? "" : "s"}.
          </p>
        </div>
        <RefreshButton />
      </header>

      {skills.length === 0 ? (
        <EmptyState
          title="Nenhuma skill encontrada"
          hint="Esperado em .claude/skills/<nome>/SKILL.md"
          actionLabel=".claude/skills/"
          actionHint="Pasta não existe ou está vazia"
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {skills.map((skill) => (
            <Link key={skill.name} href={`/skills/${skill.name}`} className="surface surface-hover p-5 group">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h2 className="font-mono text-sm font-medium text-accent-soft group-hover:text-accent">/{skill.name}</h2>
                  <p className="mt-1.5 text-sm text-ink-200 line-clamp-3">{skill.description}</p>
                </div>
                <span className="text-ink-500 group-hover:text-accent-soft transition-colors">→</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                {skill.agent && <span className="chip text-accent-soft">agent: {skill.agent}</span>}
                {skill.context && <span className="chip">context: {skill.context}</span>}
                {skill.hasTrace && <span className="chip text-emerald-300/80">registra trace</span>}
                {skill.allowedTools && skill.allowedTools.length > 0 && (
                  <span className="chip">{skill.allowedTools.length} tool(s)</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
