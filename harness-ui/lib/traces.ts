import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { TRACES_DIR, todayTraceFile } from "./paths";

export type TraceEntry = {
  time: string;
  skill: string;
  type: "INÍCIO" | "FIM" | "TENTATIVA" | "OUTRO";
  status?: "ok" | "parcial" | "erro" | "passou" | "falhou";
  missao?: string;
  arquivosTocados?: string;
  proximoPasso?: string;
  hipotese?: string;
  acao?: string;
  falha?: string;
  tentativaIndex?: string;
  rawBody: string;
};

export type TraceFile = {
  date: string;
  exists: boolean;
  entries: TraceEntry[];
};

function parseEntry(headerLine: string, body: string): TraceEntry | null {
  const m = headerLine.match(/^###\s*\[(\d{2}:\d{2})\]\s+([\w-]+)\s+—\s+(.+?)$/);
  if (!m) return null;
  const [, time, skill, kindRaw] = m;
  let type: TraceEntry["type"] = "OUTRO";
  let tentativaIndex: string | undefined;
  if (/^IN[IÍ]CIO/i.test(kindRaw)) type = "INÍCIO";
  else if (/^FIM/i.test(kindRaw)) type = "FIM";
  else if (/^TENTATIVA/i.test(kindRaw)) {
    type = "TENTATIVA";
    const tm = kindRaw.match(/TENTATIVA\s+(\d+\/\d+)/i);
    if (tm) tentativaIndex = tm[1];
  }

  const fields: Record<string, string> = {};
  for (const line of body.split(/\r?\n/)) {
    const fm = line.match(/^\*\*([^*]+)\*\*:\s*(.+)$/);
    if (fm) fields[fm[1].trim().toLowerCase()] = fm[2].trim();
  }

  const status = (fields["status"] ?? fields["resultado"]) as TraceEntry["status"] | undefined;

  return {
    time,
    skill,
    type,
    status,
    missao: fields["missão"] ?? fields["missao"],
    arquivosTocados: fields["arquivos tocados"],
    proximoPasso: fields["próximo passo sugerido"] ?? fields["proximo passo sugerido"],
    hipotese: fields["hipótese"] ?? fields["hipotese"],
    acao: fields["ação"] ?? fields["acao"],
    falha: fields["falha"],
    tentativaIndex,
    rawBody: body.trim()
  };
}

function parseTrace(content: string): TraceEntry[] {
  const sections = content.split(/(?=^###\s*\[)/m);
  const entries: TraceEntry[] = [];
  for (const section of sections) {
    const lines = section.split(/\r?\n/);
    const header = lines[0];
    if (!header.startsWith("###")) continue;
    const body = lines.slice(1).join("\n");
    const entry = parseEntry(header, body);
    if (entry) entries.push(entry);
  }
  return entries;
}

export async function getTodayTrace(): Promise<TraceFile> {
  const file = todayTraceFile();
  const dateStr = file.split(/[/\\]/).pop()!.replace(".md", "");
  try {
    const content = await readFile(file, "utf-8");
    return { date: dateStr, exists: true, entries: parseTrace(content) };
  } catch {
    return { date: dateStr, exists: false, entries: [] };
  }
}

export async function listTraceDates(): Promise<string[]> {
  try {
    const files = await readdir(TRACES_DIR);
    return files
      .filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
      .map((f) => f.replace(".md", ""))
      .sort()
      .reverse();
  } catch {
    return [];
  }
}

export async function getTraceByDate(date: string): Promise<TraceFile> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { date, exists: false, entries: [] };
  const file = join(TRACES_DIR, `${date}.md`);
  try {
    const content = await readFile(file, "utf-8");
    return { date, exists: true, entries: parseTrace(content) };
  } catch {
    return { date, exists: false, entries: [] };
  }
}

export async function lastUsageOfSkill(skillName: string): Promise<TraceEntry | null> {
  const dates = await listTraceDates();
  for (const date of dates) {
    const trace = await getTraceByDate(date);
    const reversed = [...trace.entries].reverse();
    const hit = reversed.find((e) => e.skill === skillName);
    if (hit) return hit;
  }
  return null;
}
