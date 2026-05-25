import { join } from "path";

// O harness-ui roda como sub-app dentro do template.
// process.cwd() = <template-root>/harness-ui
// PROJECT_ROOT = <template-root>
export const PROJECT_ROOT = join(process.cwd(), "..");

export const CLAUDE_DIR = join(PROJECT_ROOT, ".claude");
export const SKILLS_DIR = join(CLAUDE_DIR, "skills");
export const AGENTS_DIR = join(CLAUDE_DIR, "agents");
export const TRACES_DIR = join(CLAUDE_DIR, "traces");
export const HOOKS_DIR = join(CLAUDE_DIR, "hooks");

export const PENDING_VALIDATIONS = join(CLAUDE_DIR, "pending-validations.md");
export const MISSAO_ATUAL = join(CLAUDE_DIR, "missao-atual.md");
export const ULTIMA_ORQUESTRACAO = join(CLAUDE_DIR, "ultima-orquestracao.md");
export const SESSION_END_HINT = join(CLAUDE_DIR, "session-end-hint.md");

export const DOCS_DIR = join(PROJECT_ROOT, "docs");
export const SPECS_DIR = join(DOCS_DIR, "specs");
export const ADR_DIR = join(DOCS_DIR, "adr");

export const CLAUDE_MD = join(PROJECT_ROOT, "CLAUDE.md");
export const AGENTS_MD = join(PROJECT_ROOT, "AGENTS.md");
export const MAPA_PROJETO = join(DOCS_DIR, "mapa-projeto.md");

export function todayTraceFile(): string {
  const d = new Date();
  const ts = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return join(TRACES_DIR, `${ts}.md`);
}
