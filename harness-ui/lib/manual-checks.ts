import { readFile, writeFile, mkdir } from "fs/promises";
import { dirname, join } from "path";
import { CLAUDE_DIR } from "./paths";

export const MANUAL_CHECK_IDS = [
  "powershell7",
  "node20",
  "git",
  "vscode",
  "claude-code-cli",
  "codex-cli",
  "claude-code-opened"
] as const;

export type ManualCheckId = (typeof MANUAL_CHECK_IDS)[number];

export type ManualCheckVia = "user" | "probe" | "auto";

export type ManualCheckEntry = {
  done: boolean;
  ts?: string;
  via?: ManualCheckVia;
  version?: string;
};

export type ManualChecksFile = {
  manual: Partial<Record<ManualCheckId, ManualCheckEntry>>;
};

const CHECKS_FILE = join(CLAUDE_DIR, "setup-checks.json");

function emptyFile(): ManualChecksFile {
  return { manual: {} };
}

export function isManualCheckId(value: string): value is ManualCheckId {
  return (MANUAL_CHECK_IDS as readonly string[]).includes(value);
}

export async function readChecks(): Promise<ManualChecksFile> {
  try {
    const raw = await readFile(CHECKS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as ManualChecksFile;
    if (!parsed.manual || typeof parsed.manual !== "object") return emptyFile();
    return parsed;
  } catch {
    return emptyFile();
  }
}

export async function writeCheck(id: ManualCheckId, entry: ManualCheckEntry): Promise<ManualChecksFile> {
  const current = await readChecks();
  current.manual[id] = {
    ...entry,
    ts: entry.done ? entry.ts ?? new Date().toISOString() : undefined
  };
  await mkdir(dirname(CHECKS_FILE), { recursive: true });
  await writeFile(CHECKS_FILE, JSON.stringify(current, null, 2) + "\n", "utf-8");
  return current;
}

export async function getCheck(id: ManualCheckId): Promise<ManualCheckEntry | null> {
  const file = await readChecks();
  return file.manual[id] ?? null;
}
