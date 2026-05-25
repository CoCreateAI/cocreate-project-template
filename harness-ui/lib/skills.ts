import { readdir, readFile, stat } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";
import { SKILLS_DIR } from "./paths";

export type SkillSummary = {
  name: string;
  description: string;
  agent?: string;
  allowedTools?: string[];
  context?: string;
  argumentHint?: string;
  hasTrace: boolean;
};

export type SkillDetail = SkillSummary & {
  body: string;
  rawFrontmatter: Record<string, unknown>;
};

async function dirExists(path: string): Promise<boolean> {
  try {
    const s = await stat(path);
    return s.isDirectory();
  } catch {
    return false;
  }
}

function normalizeAllowedTools(value: unknown): string[] | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") return value.split(",").map((s) => s.trim()).filter(Boolean);
  return undefined;
}

export async function listSkills(): Promise<SkillSummary[]> {
  if (!(await dirExists(SKILLS_DIR))) return [];
  const entries = await readdir(SKILLS_DIR, { withFileTypes: true });
  const skills = await Promise.all(
    entries
      .filter((e) => e.isDirectory())
      .map(async (e) => {
        const skillPath = join(SKILLS_DIR, e.name, "SKILL.md");
        try {
          const raw = await readFile(skillPath, "utf-8");
          const { data, content } = matter(raw);
          return {
            name: (data.name as string) ?? e.name,
            description: (data.description as string) ?? "",
            agent: data.agent as string | undefined,
            allowedTools: normalizeAllowedTools(data["allowed-tools"] ?? data.allowedTools),
            context: data.context as string | undefined,
            argumentHint: data["argument-hint"] as string | undefined,
            hasTrace: /Registro de execu[çc][ãa]o/i.test(content)
          } as SkillSummary;
        } catch {
          return null;
        }
      })
  );
  return skills
    .filter((s): s is SkillSummary => s !== null)
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}

export async function getSkill(name: string): Promise<SkillDetail | null> {
  const path = join(SKILLS_DIR, name, "SKILL.md");
  try {
    const raw = await readFile(path, "utf-8");
    const { data, content } = matter(raw);
    return {
      name: (data.name as string) ?? name,
      description: (data.description as string) ?? "",
      agent: data.agent as string | undefined,
      allowedTools: normalizeAllowedTools(data["allowed-tools"] ?? data.allowedTools),
      context: data.context as string | undefined,
      argumentHint: data["argument-hint"] as string | undefined,
      hasTrace: /Registro de execu[çc][ãa]o/i.test(content),
      body: content,
      rawFrontmatter: data
    };
  } catch {
    return null;
  }
}
