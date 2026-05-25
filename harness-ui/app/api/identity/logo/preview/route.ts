import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { readIdentity, BRAND_ASSETS_DIR, extToMime, type LogoExt } from "@/lib/identity";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Serve a logo do projeto (que está fora de harness-ui/public/, em docs/assets/brand/).
 * O dashboard chama este endpoint para mostrar a logo no preview e no showcase.
 */
export async function GET() {
  const identity = await readIdentity();
  if (!identity.logo) {
    return NextResponse.json({ error: "Sem logo" }, { status: 404 });
  }

  // Extrai extensão do path salvo (docs/assets/brand/logo.png)
  const match = identity.logo.path.match(/logo\.(png|svg|jpg|jpeg|webp)$/i);
  if (!match) {
    return NextResponse.json({ error: "Path inválido" }, { status: 404 });
  }
  const ext = match[1].toLowerCase() as LogoExt;
  const filePath = join(BRAND_ASSETS_DIR, `logo.${ext}`);

  try {
    const data = await readFile(filePath);
    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": identity.logo.type || extToMime(ext),
        "Cache-Control": "no-store"
      }
    });
  } catch {
    return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 });
  }
}
