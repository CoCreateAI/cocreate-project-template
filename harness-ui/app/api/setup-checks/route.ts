import { NextResponse } from "next/server";
import { readChecks, writeCheck, isManualCheckId, type ManualCheckVia } from "@/lib/manual-checks";

export const dynamic = "force-dynamic";

export async function GET() {
  const file = await readChecks();
  return NextResponse.json(file);
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

  const { id, done, via, version } = body as {
    id?: unknown;
    done?: unknown;
    via?: unknown;
    version?: unknown;
  };

  if (typeof id !== "string" || !isManualCheckId(id)) {
    return NextResponse.json({ error: "id desconhecido" }, { status: 400 });
  }

  if (typeof done !== "boolean") {
    return NextResponse.json({ error: "done deve ser boolean" }, { status: 400 });
  }

  const allowedVia: ManualCheckVia[] = ["user", "probe", "auto"];
  const safeVia = typeof via === "string" && (allowedVia as string[]).includes(via) ? (via as ManualCheckVia) : "user";

  const safeVersion = typeof version === "string" && version.length < 200 ? version : undefined;

  const updated = await writeCheck(id, { done, via: safeVia, version: safeVersion });
  return NextResponse.json(updated);
}
