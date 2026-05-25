import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";

export const dynamic = "force-dynamic";

const execFileAsync = promisify(execFile);
const IS_WINDOWS = process.platform === "win32";

// Whitelist hardcoded — bin e args nunca vêm do client.
// shell: true no Windows é seguro porque o comando é totalmente fixo aqui.

type ProbeCandidate = { bin: string; args: string[] };

type ProbeDef = {
  candidates: ProbeCandidate[];
  validate?: (stdout: string) => { ok: boolean; reason?: string; version?: string };
};

const PWSH_ARGS = ["-NoProfile", "-Command", "$PSVersionTable.PSVersion.ToString()"];

const PROBES: Record<string, ProbeDef> = {
  powershell7: {
    candidates: [
      { bin: "pwsh", args: PWSH_ARGS },
      { bin: "C:\\Program Files\\PowerShell\\7\\pwsh.exe", args: PWSH_ARGS },
      { bin: "C:\\Program Files (x86)\\PowerShell\\7\\pwsh.exe", args: PWSH_ARGS }
    ],
    validate: (stdout) => {
      const v = stdout.trim();
      const major = parseInt(v.split(".")[0] ?? "0", 10);
      if (major >= 7) return { ok: true, version: v };
      return { ok: false, reason: `PowerShell ${v} detectado (precisa de 7+)`, version: v };
    }
  },
  node20: {
    candidates: [
      { bin: process.execPath, args: ["--version"] }, // garantido — o próprio Node do servidor
      { bin: "node", args: ["--version"] }
    ],
    validate: (stdout) => {
      const v = stdout.trim().replace("v", "");
      const major = parseInt(v.split(".")[0] ?? "0", 10);
      if (major >= 20) return { ok: true, version: v };
      return { ok: false, reason: `Node ${v} (precisa de 20+)`, version: v };
    }
  },
  git: {
    candidates: [
      { bin: "git", args: ["--version"] },
      { bin: "C:\\Program Files\\Git\\cmd\\git.exe", args: ["--version"] },
      { bin: "C:\\Program Files (x86)\\Git\\cmd\\git.exe", args: ["--version"] }
    ],
    validate: (stdout) => {
      const m = stdout.trim().match(/git version (\S+)/);
      return { ok: true, version: m?.[1] ?? stdout.trim() };
    }
  },
  vscode: {
    candidates: [
      { bin: "code", args: ["--version"] },
      ...(process.env.LOCALAPPDATA
        ? [
            {
              bin: `${process.env.LOCALAPPDATA}\\Programs\\Microsoft VS Code\\bin\\code.cmd`,
              args: ["--version"]
            }
          ]
        : []),
      { bin: "C:\\Program Files\\Microsoft VS Code\\bin\\code.cmd", args: ["--version"] }
    ],
    validate: (stdout) => ({ ok: true, version: stdout.split(/\r?\n/)[0]?.trim() })
  },
  "claude-code-cli": {
    candidates: [
      { bin: "claude", args: ["--version"] },
      ...(process.env.APPDATA
        ? [
            { bin: `${process.env.APPDATA}\\npm\\claude.cmd`, args: ["--version"] },
            { bin: `${process.env.APPDATA}\\npm\\claude.ps1`, args: ["--version"] }
          ]
        : []),
      ...(process.env.HOME
        ? [{ bin: `${process.env.HOME}/.npm-global/bin/claude`, args: ["--version"] }]
        : [])
    ],
    validate: (stdout) => ({ ok: true, version: stdout.trim() })
  },
  "codex-cli": {
    candidates: [
      { bin: "codex", args: ["--version"] },
      ...(process.env.APPDATA
        ? [{ bin: `${process.env.APPDATA}\\npm\\codex.cmd`, args: ["--version"] }]
        : []),
      ...(process.env.HOME
        ? [{ bin: `${process.env.HOME}/.npm-global/bin/codex`, args: ["--version"] }]
        : [])
    ],
    validate: (stdout) => ({ ok: true, version: stdout.trim() })
  }
};

type TryResult =
  | { ok: true; stdout: string; bin: string }
  | { ok: false; errors: Array<{ bin: string; error: string }> };

async function tryCandidates(probe: ProbeDef): Promise<TryResult> {
  const errors: Array<{ bin: string; error: string }> = [];
  for (const c of probe.candidates) {
    try {
      const { stdout } = await execFileAsync(c.bin, c.args, {
        timeout: 3000,
        windowsHide: true,
        shell: IS_WINDOWS // resolve PATHEXT (.exe, .cmd, .bat) no Windows
      });
      return { ok: true, stdout, bin: c.bin };
    } catch (err) {
      const e = err as { code?: string; message?: string };
      let msg = e.message ?? "Falha ao executar";
      if (e.code === "ENOENT") msg = "não encontrado";
      if (e.code === "ETIMEDOUT") msg = "timeout";
      errors.push({ bin: c.bin, error: msg });
    }
  }
  return { ok: false, errors };
}

export async function GET(_req: Request, { params }: { params: { tool: string } }) {
  const probe = PROBES[params.tool];
  if (!probe) {
    return NextResponse.json({ ok: false, error: "Probe desconhecido" }, { status: 404 });
  }

  const result = await tryCandidates(probe);

  if (!result.ok) {
    const tried = result.errors.map((e) => `${e.bin} (${e.error})`).join("; ");
    return NextResponse.json({
      ok: false,
      error: `Não encontrei em nenhum caminho conhecido. Tentado: ${tried}. Se está instalado em local atípico, use 'Já tenho instalado'.`
    });
  }

  const validated = probe.validate ? probe.validate(result.stdout) : { ok: true };
  if (!validated.ok) {
    return NextResponse.json({
      ok: false,
      error: validated.reason ?? "Versão inadequada",
      version: validated.version
    });
  }
  return NextResponse.json({ ok: true, version: validated.version, foundAt: result.bin });
}
