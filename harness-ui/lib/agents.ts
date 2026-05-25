import { readdir, readFile, stat } from "fs/promises";
import { join, basename } from "path";
import matter from "gray-matter";
import { AGENTS_DIR } from "./paths";

export type AgentSummary = {
  name: string;
  description: string;
  model?: string;
  maxTurns?: number;
  tools?: string[];
};

export type AgentDetail = AgentSummary & {
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

function normalizeTools(value: unknown): string[] | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") return value.split(",").map((s) => s.trim()).filter(Boolean);
  return undefined;
}

export async function listAgents(): Promise<AgentSummary[]> {
  if (!(await dirExists(AGENTS_DIR))) return [];
  const files = await readdir(AGENTS_DIR);
  const agents = await Promise.all(
    files
      .filter((f) => f.endsWith(".md"))
      .map(async (f) => {
        try {
          const raw = await readFile(join(AGENTS_DIR, f), "utf-8");
          const { data } = matter(raw);
          return {
            name: (data.name as string) ?? basename(f, ".md"),
            description: (data.description as string) ?? "",
            model: data.model as string | undefined,
            maxTurns: data["max-turns"] as number | undefined,
            tools: normalizeTools(data.tools)
          } as AgentSummary;
        } catch {
          return null;
        }
      })
  );
  return agents
    .filter((a): a is AgentSummary => a !== null)
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}

export async function getAgent(name: string): Promise<AgentDetail | null> {
  const path = join(AGENTS_DIR, `${name}.md`);
  try {
    const raw = await readFile(path, "utf-8");
    const { data, content } = matter(raw);
    return {
      name: (data.name as string) ?? name,
      description: (data.description as string) ?? "",
      model: data.model as string | undefined,
      maxTurns: data["max-turns"] as number | undefined,
      tools: normalizeTools(data.tools),
      body: content,
      rawFrontmatter: data
    };
  } catch {
    return null;
  }
}
