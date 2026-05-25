import { readFile } from "fs/promises";
import {
  PENDING_VALIDATIONS,
  MISSAO_ATUAL,
  ULTIMA_ORQUESTRACAO,
  SESSION_END_HINT
} from "./paths";

export type PendingValidation = { timestamp: string; path: string };

export type RuntimeState = {
  pendingValidations: PendingValidation[];
  missaoAtual: string | null;
  ultimaOrquestracao: string | null;
  sessionEndHint: string | null;
};

async function readFileOrNull(path: string): Promise<string | null> {
  try {
    const content = await readFile(path, "utf-8");
    return content.trim() ? content : null;
  } catch {
    return null;
  }
}

function parsePending(content: string | null): PendingValidation[] {
  if (!content) return [];
  const items: PendingValidation[] = [];
  for (const line of content.split(/\r?\n/)) {
    const m = line.match(/^-\s*\[([^\]]+)\]\s+(.+)$/);
    if (m) items.push({ timestamp: m[1].trim(), path: m[2].trim() });
  }
  return items;
}

export async function getRuntimeState(): Promise<RuntimeState> {
  const [pendingRaw, missao, ultima, hint] = await Promise.all([
    readFileOrNull(PENDING_VALIDATIONS),
    readFileOrNull(MISSAO_ATUAL),
    readFileOrNull(ULTIMA_ORQUESTRACAO),
    readFileOrNull(SESSION_END_HINT)
  ]);

  return {
    pendingValidations: parsePending(pendingRaw),
    missaoAtual: missao,
    ultimaOrquestracao: ultima,
    sessionEndHint: hint
  };
}
