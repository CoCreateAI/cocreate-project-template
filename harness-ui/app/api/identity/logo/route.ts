import { NextResponse } from "next/server";
import { writeLogo, deleteLogo, mimeToExt, ALLOWED_LOGO_EXT, LOGO_MAX_SIZE_BYTES } from "@/lib/identity";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Esperado multipart/form-data com campo 'file'" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Campo 'file' ausente ou inválido" }, { status: 400 });
  }

  if (file.size > LOGO_MAX_SIZE_BYTES) {
    return NextResponse.json(
      { error: `Arquivo maior que ${LOGO_MAX_SIZE_BYTES / 1024 / 1024}MB` },
      { status: 400 }
    );
  }

  const ext = mimeToExt(file.type);
  if (!ext) {
    return NextResponse.json(
      {
        error: `Tipo não suportado: ${file.type}. Permitidos: ${ALLOWED_LOGO_EXT.join(", ")}`
      },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const updated = await writeLogo(buffer, ext);
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Erro ao salvar" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const updated = await deleteLogo();
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Erro ao remover" }, { status: 500 });
  }
}
