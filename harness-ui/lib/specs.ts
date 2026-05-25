import { readdir, readFile, stat } from "fs/promises";
import { join } from "path";
import { SPECS_DIR, ADR_DIR } from "./paths";

export type SpecSummary = {
  filename: string;
  title: string;
  number: number | null;
  isTemplate: boolean;
  status: "rascunho" | "ativa" | "template";
  excerpt: string;
};

async function dirExists(path: string): Promise<boolean> {
  try {
    const s = await stat(path);
    return s.isDirectory();
  } catch {
    return false;
  }
}

function extractTitle(content: string, filename: string): string {
  const firstLine = content.split(/\r?\n/).find((l) => l.startsWith("#"));
  if (firstLine) return firstLine.replace(/^#+\s*/, "").trim();
  return filename.replace(".md", "");
}

function extractExcerpt(content: string): string {
  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    if (line.startsWith("#") || line.startsWith(">")) continue;
    if (line.startsWith("---")) continue;
    return line.length > 200 ? line.slice(0, 200) + "…" : line;
  }
  return "";
}

function parseSpecNumber(filename: string): number | null {
  const m = filename.match(/^spec-(\d+)/i);
  return m ? parseInt(m[1], 10) : null;
}

async function readMdSummary(dir: string, filename: string): Promise<SpecSummary | null> {
  try {
    const raw = await readFile(join(dir, filename), "utf-8");
    const isTemplate = filename.includes(".template.") || filename.toUpperCase().includes("TEMPLATE");
    const isPlaceholder = /\{\{[A-Z_]+\}\}/.test(raw);
    let status: SpecSummary["status"] = "ativa";
    if (isTemplate) status = "template";
    else if (isPlaceholder) status = "rascunho";
    return {
      filename,
      title: extractTitle(raw, filename),
      number: parseSpecNumber(filename),
      isTemplate,
      status,
      excerpt: extractExcerpt(raw)
    };
  } catch {
    return null;
  }
}

export async function listSpecs(): Promise<SpecSummary[]> {
  if (!(await dirExists(SPECS_DIR))) return [];
  const files = await readdir(SPECS_DIR);
  const specs = await Promise.all(
    files.filter((f) => f.endsWith(".md")).map((f) => readMdSummary(SPECS_DIR, f))
  );
  return specs
    .filter((s): s is SpecSummary => s !== null)
    .sort((a, b) => {
      if (a.number !== null && b.number !== null) return a.number - b.number;
      if (a.number !== null) return -1;
      if (b.number !== null) return 1;
      return a.filename.localeCompare(b.filename, "pt-BR");
    });
}

export async function listAdrs(): Promise<SpecSummary[]> {
  if (!(await dirExists(ADR_DIR))) return [];
  const files = await readdir(ADR_DIR);
  const adrs = await Promise.all(
    files.filter((f) => f.endsWith(".md")).map((f) => readMdSummary(ADR_DIR, f))
  );
  return adrs
    .filter((a): a is SpecSummary => a !== null)
    .sort((a, b) => a.filename.localeCompare(b.filename, "pt-BR"));
}
