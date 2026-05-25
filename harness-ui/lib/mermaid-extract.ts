import { readFile, readdir, stat } from "fs/promises";
import { join, basename } from "path";
import { DOCS_DIR, SPECS_DIR } from "./paths";

export type MermaidBlock = {
  source: string;
  index: number;
  /** Heading mais próximo acima do bloco (se houver) — usado como título do diagrama */
  context?: string;
};

export type SpecMermaid = {
  filename: string;
  title: string;
  blocks: MermaidBlock[];
};

/**
 * Extrai todos os blocos ```mermaid ... ``` de um markdown.
 * Para cada bloco, tenta encontrar o heading mais próximo acima como label.
 */
export function extractMermaidBlocks(markdown: string): MermaidBlock[] {
  const blocks: MermaidBlock[] = [];
  const regex = /```mermaid\s*\n([\s\S]*?)\n```/g;
  let match;
  let index = 0;
  while ((match = regex.exec(markdown)) !== null) {
    const source = match[1].trim();
    if (!source) continue;
    const beforeText = markdown.slice(0, match.index);
    // Procura heading (#, ##, ###) mais próximo acima
    const headings = [...beforeText.matchAll(/^(#{1,6})\s+(.+?)\s*$/gm)];
    const nearestHeading = headings.length > 0 ? headings[headings.length - 1] : null;
    blocks.push({
      source,
      index,
      context: nearestHeading?.[2]?.trim()
    });
    index++;
  }
  return blocks;
}

async function exists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Lê docs/macro-processo.md e retorna os blocos Mermaid.
 * Se o arquivo ainda for template ou estiver com placeholders, retorna empty + flag isPlaceholder.
 */
export async function getBusinessArchitecture(): Promise<{
  exists: boolean;
  isPlaceholder: boolean;
  blocks: MermaidBlock[];
  source?: string;
}> {
  const path = join(DOCS_DIR, "macro-processo.md");
  if (!(await exists(path))) return { exists: false, isPlaceholder: false, blocks: [] };
  try {
    const content = await readFile(path, "utf-8");
    const isPlaceholder = /\{\{[A-Z_]+\}\}/.test(content);
    const blocks = extractMermaidBlocks(content);
    return { exists: true, isPlaceholder, blocks, source: "docs/macro-processo.md" };
  } catch {
    return { exists: false, isPlaceholder: false, blocks: [] };
  }
}

/**
 * Percorre docs/specs/, ignora templates, extrai blocos Mermaid de cada spec.
 */
export async function getTechnicalArchitecture(): Promise<SpecMermaid[]> {
  if (!(await exists(SPECS_DIR))) return [];
  let files: string[];
  try {
    files = await readdir(SPECS_DIR);
  } catch {
    return [];
  }
  const specFiles = files.filter(
    (f) => f.endsWith(".md") && !f.includes(".template.") && !f.toUpperCase().includes("TEMPLATE")
  );
  const results: SpecMermaid[] = [];
  for (const filename of specFiles) {
    try {
      const content = await readFile(join(SPECS_DIR, filename), "utf-8");
      const blocks = extractMermaidBlocks(content);
      if (blocks.length === 0) continue;
      // Extrai título: primeiro heading nível 1
      const titleMatch = content.match(/^#\s+(.+?)\s*$/m);
      const title = titleMatch?.[1] ?? basename(filename, ".md");
      results.push({ filename, title, blocks });
    } catch {
      // ignore
    }
  }
  return results.sort((a, b) => a.filename.localeCompare(b.filename, "pt-BR"));
}
