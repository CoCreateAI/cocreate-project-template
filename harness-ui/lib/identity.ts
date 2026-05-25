import { access, mkdir, readFile, unlink, writeFile, readdir } from "fs/promises";
import { join } from "path";
import { DOCS_DIR } from "./paths";

export const IDENTITY_JSON = join(DOCS_DIR, "identidade-visual.json");
export const BRAND_ASSETS_DIR = join(DOCS_DIR, "assets", "brand");

export type IdentityColors = {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
};

export type IdentityLogo = {
  /** Caminho relativo ao projeto, ex: docs/assets/brand/logo.png */
  path: string;
  /** MIME type */
  type: string;
  uploadedAt: string;
};

export type IdentityTypography = {
  headingFamily: string;
  bodyFamily: string;
};

export type Identity = {
  name: string;
  tagline: string;
  logo: IdentityLogo | null;
  colors: IdentityColors;
  typography: IdentityTypography;
  updatedAt: string;
};

export const DEFAULT_IDENTITY: Identity = {
  name: "",
  tagline: "",
  logo: null,
  colors: {
    primary: "#1F3B57",
    accent: "#E26A5E",
    background: "#FFFFFF",
    surface: "#F9FAFC",
    textPrimary: "#2E2E2E",
    textSecondary: "#6B7280"
  },
  typography: {
    headingFamily: "IBM Plex Sans",
    bodyFamily: "Inter"
  },
  updatedAt: new Date(0).toISOString()
};

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export async function readIdentity(): Promise<Identity> {
  if (!(await exists(IDENTITY_JSON))) return { ...DEFAULT_IDENTITY };
  try {
    const raw = await readFile(IDENTITY_JSON, "utf-8");
    const parsed = JSON.parse(raw) as Partial<Identity>;
    return {
      name: parsed.name ?? DEFAULT_IDENTITY.name,
      tagline: parsed.tagline ?? DEFAULT_IDENTITY.tagline,
      logo: parsed.logo ?? null,
      colors: { ...DEFAULT_IDENTITY.colors, ...(parsed.colors ?? {}) },
      typography: { ...DEFAULT_IDENTITY.typography, ...(parsed.typography ?? {}) },
      updatedAt: parsed.updatedAt ?? DEFAULT_IDENTITY.updatedAt
    };
  } catch {
    return { ...DEFAULT_IDENTITY };
  }
}

export type IdentityPatch = {
  name?: string;
  tagline?: string;
  colors?: Partial<IdentityColors>;
  typography?: Partial<IdentityTypography>;
};

export async function writeIdentity(patch: IdentityPatch): Promise<Identity> {
  const current = await readIdentity();
  const updated: Identity = {
    ...current,
    name: patch.name ?? current.name,
    tagline: patch.tagline ?? current.tagline,
    colors: { ...current.colors, ...(patch.colors ?? {}) },
    typography: { ...current.typography, ...(patch.typography ?? {}) },
    updatedAt: new Date().toISOString()
  };
  await mkdir(DOCS_DIR, { recursive: true });
  await writeFile(IDENTITY_JSON, JSON.stringify(updated, null, 2) + "\n", "utf-8");
  return updated;
}

export const ALLOWED_LOGO_EXT = ["png", "svg", "jpg", "jpeg", "webp"] as const;
export const LOGO_MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

export type LogoExt = (typeof ALLOWED_LOGO_EXT)[number];

export function mimeToExt(mime: string): LogoExt | null {
  const map: Record<string, LogoExt> = {
    "image/png": "png",
    "image/svg+xml": "svg",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/webp": "webp"
  };
  return map[mime.toLowerCase()] ?? null;
}

export function extToMime(ext: LogoExt): string {
  const map: Record<LogoExt, string> = {
    png: "image/png",
    svg: "image/svg+xml",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp"
  };
  return map[ext];
}

async function removeAllExistingLogos(): Promise<void> {
  try {
    const files = await readdir(BRAND_ASSETS_DIR);
    for (const f of files) {
      if (/^logo\.(png|svg|jpg|jpeg|webp)$/i.test(f)) {
        await unlink(join(BRAND_ASSETS_DIR, f));
      }
    }
  } catch {
    // pasta inexistente é OK
  }
}

export async function writeLogo(buffer: Buffer, ext: LogoExt): Promise<Identity> {
  if (!ALLOWED_LOGO_EXT.includes(ext)) {
    throw new Error(`Extensão não permitida: ${ext}`);
  }
  if (buffer.byteLength > LOGO_MAX_SIZE_BYTES) {
    throw new Error(`Arquivo maior que ${LOGO_MAX_SIZE_BYTES / 1024 / 1024}MB`);
  }
  await mkdir(BRAND_ASSETS_DIR, { recursive: true });
  await removeAllExistingLogos();
  const filename = `logo.${ext}`;
  const fullPath = join(BRAND_ASSETS_DIR, filename);
  await writeFile(fullPath, buffer);
  const current = await readIdentity();
  const updated: Identity = {
    ...current,
    logo: {
      path: `docs/assets/brand/${filename}`,
      type: extToMime(ext),
      uploadedAt: new Date().toISOString()
    },
    updatedAt: new Date().toISOString()
  };
  await writeFile(IDENTITY_JSON, JSON.stringify(updated, null, 2) + "\n", "utf-8");
  return updated;
}

export async function deleteLogo(): Promise<Identity> {
  await removeAllExistingLogos();
  const current = await readIdentity();
  const updated: Identity = {
    ...current,
    logo: null,
    updatedAt: new Date().toISOString()
  };
  await writeFile(IDENTITY_JSON, JSON.stringify(updated, null, 2) + "\n", "utf-8");
  return updated;
}
