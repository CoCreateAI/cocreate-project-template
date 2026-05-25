import { access, readFile, readdir } from "fs/promises";
import { join } from "path";
import {
  PROJECT_ROOT,
  CLAUDE_DIR,
  SPECS_DIR,
  DOCS_DIR,
  CLAUDE_MD,
  todayTraceFile
} from "./paths";
import { readChecks, type ManualChecksFile } from "./manual-checks";

export type CheckStatus = "done" | "pending" | "unknown";

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function fileHasPlaceholders(path: string): Promise<boolean> {
  try {
    const content = await readFile(path, "utf-8");
    return /\{\{[A-Z_]+\}\}/.test(content);
  } catch {
    return true;
  }
}

async function nodeModulesInstalled(): Promise<boolean> {
  return exists(join(process.cwd(), "node_modules"));
}

async function settingsJsonExists(): Promise<boolean> {
  return exists(join(CLAUDE_DIR, "settings.json"));
}

async function hasNonTemplateSpec(): Promise<{ ok: boolean; count: number }> {
  try {
    const files = await readdir(SPECS_DIR);
    const nonTemplate = files.filter(
      (f) => f.endsWith(".md") && !f.includes(".template.") && !f.includes("TEMPLATE")
    );
    return { ok: nonTemplate.length > 0, count: nonTemplate.length };
  } catch {
    return { ok: false, count: 0 };
  }
}

async function tracesTodayExist(): Promise<boolean> {
  return exists(todayTraceFile());
}

// ============ Stack detection ============

export type StackDetection = {
  ok: boolean;
  framework?: string;
  language?: string;
  manifestFile?: string;
  manifestPath?: string;
  allDeps?: string[];
};

type FrameworkMatcher = {
  framework: string;
  language: string;
  deps: string[];
};

// Ordem importa: matches mais específicos primeiro
const BACKEND_NODE: FrameworkMatcher[] = [
  { framework: "NestJS", language: "Node", deps: ["@nestjs/core"] },
  { framework: "Fastify", language: "Node", deps: ["fastify"] },
  { framework: "Hono", language: "Node", deps: ["hono"] },
  { framework: "Koa", language: "Node", deps: ["koa"] },
  { framework: "Hapi", language: "Node", deps: ["@hapi/hapi", "hapi"] },
  { framework: "AdonisJS", language: "Node", deps: ["@adonisjs/core", "adonisjs"] },
  { framework: "Sails", language: "Node", deps: ["sails"] },
  { framework: "Restify", language: "Node", deps: ["restify"] },
  { framework: "Express", language: "Node", deps: ["express"] }
];

const BACKEND_PYTHON: FrameworkMatcher[] = [
  { framework: "FastAPI", language: "Python", deps: ["fastapi"] },
  { framework: "Django", language: "Python", deps: ["django"] },
  { framework: "Flask", language: "Python", deps: ["flask"] },
  { framework: "Streamlit", language: "Python", deps: ["streamlit"] },
  { framework: "Gradio", language: "Python", deps: ["gradio"] },
  { framework: "Dash", language: "Python", deps: ["dash"] },
  { framework: "Panel", language: "Python", deps: ["panel"] },
  { framework: "Litestar", language: "Python", deps: ["litestar"] },
  { framework: "Sanic", language: "Python", deps: ["sanic"] },
  { framework: "Tornado", language: "Python", deps: ["tornado"] },
  { framework: "Quart", language: "Python", deps: ["quart"] },
  { framework: "Robyn", language: "Python", deps: ["robyn"] },
  { framework: "Falcon", language: "Python", deps: ["falcon"] },
  { framework: "Bottle", language: "Python", deps: ["bottle"] },
  { framework: "Pyramid", language: "Python", deps: ["pyramid"] }
];

const FRONTEND_NODE: FrameworkMatcher[] = [
  { framework: "Next.js", language: "Node", deps: ["next"] },
  { framework: "Nuxt", language: "Node", deps: ["nuxt"] },
  { framework: "SvelteKit", language: "Node", deps: ["@sveltejs/kit"] },
  { framework: "Astro", language: "Node", deps: ["astro"] },
  { framework: "Remix", language: "Node", deps: ["@remix-run/react", "@remix-run/node"] },
  { framework: "Gatsby", language: "Node", deps: ["gatsby"] },
  { framework: "Qwik", language: "Node", deps: ["@builder.io/qwik"] },
  { framework: "SolidStart", language: "Node", deps: ["@solidjs/start"] },
  { framework: "Angular", language: "Node", deps: ["@angular/core"] },
  { framework: "React Native", language: "Node", deps: ["react-native"] },
  { framework: "Expo", language: "Node", deps: ["expo"] },
  { framework: "Electron", language: "Node", deps: ["electron"] },
  { framework: "Vue", language: "Node", deps: ["vue"] },
  { framework: "Svelte", language: "Node", deps: ["svelte"] },
  { framework: "SolidJS", language: "Node", deps: ["solid-js"] },
  { framework: "React + Vite", language: "Node", deps: ["vite"] },
  { framework: "React", language: "Node", deps: ["react"] }
];

const FRONTEND_PYTHON: FrameworkMatcher[] = [
  { framework: "Streamlit", language: "Python", deps: ["streamlit"] },
  { framework: "Gradio", language: "Python", deps: ["gradio"] },
  { framework: "Reflex", language: "Python", deps: ["reflex"] },
  { framework: "Dash", language: "Python", deps: ["dash"] },
  { framework: "Panel", language: "Python", deps: ["panel"] }
];

async function parsePackageJson(path: string): Promise<string[]> {
  try {
    const pkg = JSON.parse(await readFile(path, "utf-8"));
    const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}), ...(pkg.peerDependencies ?? {}) };
    return Object.keys(deps);
  } catch {
    return [];
  }
}

async function parseRequirementsTxt(path: string): Promise<string[]> {
  try {
    const content = await readFile(path, "utf-8");
    return content
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"))
      .map((l) => l.split(/[=<>!~ ;\[]/)[0].toLowerCase().trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

async function parsePyprojectToml(path: string): Promise<string[]> {
  try {
    const content = await readFile(path, "utf-8");
    const deps: string[] = [];
    // Poetry style: [tool.poetry.dependencies]
    const poetryMatch = content.match(/\[tool\.poetry\.dependencies\]([\s\S]*?)(?:\[|$)/);
    if (poetryMatch) {
      for (const line of poetryMatch[1].split(/\r?\n/)) {
        const m = line.match(/^([a-zA-Z0-9_\-]+)\s*=/);
        if (m && m[1] !== "python") deps.push(m[1].toLowerCase());
      }
    }
    // PEP 621 style: dependencies = ["foo>=1.0", ...]
    const pep621Match = content.match(/^dependencies\s*=\s*\[([\s\S]*?)\]/m);
    if (pep621Match) {
      const items = pep621Match[1].match(/"([^"]+)"/g) ?? [];
      for (const item of items) {
        const name = item.replace(/"/g, "").split(/[=<>!~ ;\[]/)[0].toLowerCase().trim();
        if (name) deps.push(name);
      }
    }
    return [...new Set(deps)];
  } catch {
    return [];
  }
}

function matchFirst(deps: string[], matchers: FrameworkMatcher[]): FrameworkMatcher | null {
  const set = new Set(deps.map((d) => d.toLowerCase()));
  for (const m of matchers) {
    if (m.deps.some((d) => set.has(d.toLowerCase()))) return m;
  }
  return null;
}

function intersect(deps: string[], matchers: FrameworkMatcher[]): string[] {
  const set = new Set(deps.map((d) => d.toLowerCase()));
  const found = new Set<string>();
  for (const m of matchers) {
    for (const d of m.deps) {
      if (set.has(d.toLowerCase())) found.add(d);
    }
  }
  return [...found];
}

async function detectAtLocation(
  location: string,
  nodeMatchers: FrameworkMatcher[],
  pythonMatchers: FrameworkMatcher[]
): Promise<StackDetection | null> {
  // Node
  const pkgJson = join(location, "package.json");
  if (await exists(pkgJson)) {
    const deps = await parsePackageJson(pkgJson);
    const match = matchFirst(deps, nodeMatchers);
    return {
      ok: true,
      framework: match?.framework ?? "Node.js (genérico)",
      language: "Node",
      manifestFile: "package.json",
      manifestPath: pkgJson,
      allDeps: intersect(deps, nodeMatchers)
    };
  }
  // Python
  for (const manifest of ["pyproject.toml", "requirements.txt"]) {
    const path = join(location, manifest);
    if (await exists(path)) {
      const deps =
        manifest === "pyproject.toml" ? await parsePyprojectToml(path) : await parseRequirementsTxt(path);
      const match = matchFirst(deps, pythonMatchers);
      return {
        ok: true,
        framework: match?.framework ?? "Python (genérico)",
        language: "Python",
        manifestFile: manifest,
        manifestPath: path,
        allDeps: intersect(deps, pythonMatchers)
      };
    }
  }
  // Outras linguagens (sem parsing de deps, só marca presença)
  const others: Array<{ file: string; framework: string; language: string }> = [
    { file: "go.mod", framework: "Go", language: "Go" },
    { file: "Cargo.toml", framework: "Rust", language: "Rust" },
    { file: "Gemfile", framework: "Ruby", language: "Ruby" },
    { file: "composer.json", framework: "PHP", language: "PHP" },
    { file: "pom.xml", framework: "Java (Maven)", language: "Java" },
    { file: "build.gradle", framework: "Java (Gradle)", language: "Java" },
    { file: "build.gradle.kts", framework: "Kotlin (Gradle)", language: "Kotlin" },
    { file: "pubspec.yaml", framework: "Flutter/Dart", language: "Dart" }
  ];
  for (const o of others) {
    const path = join(location, o.file);
    if (await exists(path)) {
      return { ok: true, framework: o.framework, language: o.language, manifestFile: o.file, manifestPath: path };
    }
  }
  // .NET (varre por *.csproj)
  try {
    const files = await readdir(location);
    const csproj = files.find((f) => f.endsWith(".csproj"));
    if (csproj) return { ok: true, framework: ".NET", language: "C#", manifestFile: csproj, manifestPath: join(location, csproj) };
  } catch {
    // ignore
  }
  return null;
}

async function detectBackend(): Promise<StackDetection> {
  const candidates = [
    join(PROJECT_ROOT, "src", "backend"),
    join(PROJECT_ROOT, "src", "api"),
    join(PROJECT_ROOT, "src", "server"),
    join(PROJECT_ROOT, "backend"),
    join(PROJECT_ROOT, "api"),
    join(PROJECT_ROOT, "server")
  ];
  for (const c of candidates) {
    if (!(await exists(c))) continue;
    const det = await detectAtLocation(c, BACKEND_NODE, BACKEND_PYTHON);
    if (det) return det;
  }
  // Fallback: raiz (monorepo simples ou backend único na raiz)
  const rootDet = await detectAtLocation(PROJECT_ROOT, BACKEND_NODE, BACKEND_PYTHON);
  if (rootDet) return rootDet;
  return { ok: false };
}

async function detectFrontend(): Promise<StackDetection> {
  const candidates = [
    join(PROJECT_ROOT, "src", "frontend"),
    join(PROJECT_ROOT, "src", "web"),
    join(PROJECT_ROOT, "src", "client"),
    join(PROJECT_ROOT, "src", "app"),
    join(PROJECT_ROOT, "frontend"),
    join(PROJECT_ROOT, "web"),
    join(PROJECT_ROOT, "client")
  ];
  for (const c of candidates) {
    if (!(await exists(c))) continue;
    const det = await detectAtLocation(c, FRONTEND_NODE, FRONTEND_PYTHON);
    if (det) return det;
  }
  return { ok: false };
}

// ============ Report ============

export type SetupReport = {
  nodeVersion: string;
  prerequisites: {
    nodeOk: boolean;
    nodeDetail: string;
    settingsJson: boolean;
  };
  harness: {
    nodeModules: boolean;
    appRunning: boolean;
  };
  onboarding: {
    perfilProjeto: boolean;
    macroProcesso: boolean;
    analiseEstrategica: boolean;
    claudeMdFilled: boolean;
  };
  specs: {
    constitutionExists: boolean;
    nonTemplateCount: number;
  };
  development: {
    envExample: boolean;
    envFile: boolean;
    backend: StackDetection;
    frontend: StackDetection;
    tracesToday: boolean;
  };
  manual: ManualChecksFile["manual"];
  progress: {
    done: number;
    total: number;
    percentage: number;
  };
};

export async function getSetupReport(): Promise<SetupReport> {
  const nodeMajor = parseInt(process.version.replace("v", "").split(".")[0] ?? "0", 10);
  const nodeOk = nodeMajor >= 20;

  const [
    settingsJson,
    nodeModules,
    perfilProjeto,
    macroProcessoExists,
    macroProcessoFilled,
    analiseEstrategicaExists,
    analiseEstrategicaFilled,
    claudeMdHasPlaceholders,
    specsInfo,
    envExample,
    envFile,
    backend,
    frontend,
    tracesToday,
    checksFile
  ] = await Promise.all([
    settingsJsonExists(),
    nodeModulesInstalled(),
    exists(join(DOCS_DIR, "raw", "00-perfil-projeto.md")),
    exists(join(DOCS_DIR, "macro-processo.md")),
    fileHasPlaceholders(join(DOCS_DIR, "macro-processo.md")).then((p) => !p),
    exists(join(DOCS_DIR, "analise-estrategica.md")),
    fileHasPlaceholders(join(DOCS_DIR, "analise-estrategica.md")).then((p) => !p),
    fileHasPlaceholders(CLAUDE_MD),
    hasNonTemplateSpec(),
    exists(join(PROJECT_ROOT, ".env.example")),
    exists(join(PROJECT_ROOT, ".env")),
    detectBackend(),
    detectFrontend(),
    tracesTodayExist(),
    readChecks()
  ]);

  const macroProcesso = macroProcessoExists && macroProcessoFilled;
  const analiseEstrategica = analiseEstrategicaExists && analiseEstrategicaFilled;
  const claudeMdFilled = !claudeMdHasPlaceholders;

  const manualDone = (id: keyof typeof checksFile.manual) => Boolean(checksFile.manual[id]?.done);

  const autoChecks = [
    nodeOk,
    settingsJson,
    nodeModules,
    perfilProjeto,
    macroProcesso,
    analiseEstrategica,
    claudeMdFilled,
    specsInfo.ok,
    envExample,
    backend.ok,
    frontend.ok,
    tracesToday
  ];

  const manualChecks = [
    manualDone("powershell7"),
    manualDone("git"),
    manualDone("vscode"),
    manualDone("claude-code-cli"),
    manualDone("claude-code-opened")
  ];

  const checks = [...autoChecks, ...manualChecks];
  const done = checks.filter(Boolean).length;
  const total = checks.length;

  return {
    nodeVersion: process.version,
    prerequisites: {
      nodeOk,
      nodeDetail: `Detectado ${process.version}${nodeOk ? "" : " (precisa de 20.0.0 ou superior)"}`,
      settingsJson
    },
    harness: {
      nodeModules,
      appRunning: true
    },
    onboarding: {
      perfilProjeto,
      macroProcesso,
      analiseEstrategica,
      claudeMdFilled
    },
    specs: {
      constitutionExists: specsInfo.ok,
      nonTemplateCount: specsInfo.count
    },
    development: {
      envExample,
      envFile,
      backend,
      frontend,
      tracesToday
    },
    manual: checksFile.manual,
    progress: {
      done,
      total,
      percentage: Math.round((done / total) * 100)
    }
  };
}
