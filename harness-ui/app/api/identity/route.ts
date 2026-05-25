import { NextResponse } from "next/server";
import { readIdentity, writeIdentity, type IdentityPatch } from "@/lib/identity";

export const dynamic = "force-dynamic";

export async function GET() {
  const identity = await readIdentity();
  return NextResponse.json(identity);
}

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

function isHex(value: unknown): value is string {
  return typeof value === "string" && HEX_RE.test(value);
}

function sanitizeString(value: unknown, max = 200): string | undefined {
  if (typeof value !== "string") return undefined;
  return value.slice(0, max);
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Body precisa ser objeto" }, { status: 400 });
  }

  const { name, tagline, colors, typography } = body as Record<string, unknown>;

  const patch: IdentityPatch = {};

  const safeName = sanitizeString(name, 80);
  if (safeName !== undefined) patch.name = safeName;

  const safeTagline = sanitizeString(tagline, 200);
  if (safeTagline !== undefined) patch.tagline = safeTagline;

  if (colors && typeof colors === "object") {
    const c = colors as Record<string, unknown>;
    const colorKeys = ["primary", "accent", "background", "surface", "textPrimary", "textSecondary"] as const;
    const safeColors: Partial<IdentityPatch["colors"]> = {};
    for (const key of colorKeys) {
      if (key in c) {
        if (!isHex(c[key])) {
          return NextResponse.json({ error: `Cor '${key}' deve estar no formato #RRGGBB` }, { status: 400 });
        }
        safeColors[key] = c[key];
      }
    }
    if (Object.keys(safeColors).length > 0) patch.colors = safeColors;
  }

  if (typography && typeof typography === "object") {
    const t = typography as Record<string, unknown>;
    const safeTypo: Partial<IdentityPatch["typography"]> = {};
    const heading = sanitizeString(t.headingFamily, 100);
    const body = sanitizeString(t.bodyFamily, 100);
    if (heading !== undefined) safeTypo.headingFamily = heading;
    if (body !== undefined) safeTypo.bodyFamily = body;
    if (Object.keys(safeTypo).length > 0) patch.typography = safeTypo;
  }

  const updated = await writeIdentity(patch);
  return NextResponse.json(updated);
}
