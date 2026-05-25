"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Zap, CheckCircle2, AlertTriangle, Check } from "lucide-react";
import type { ManualCheckId, ManualCheckEntry } from "@/lib/manual-checks";

type Props = {
  id: ManualCheckId;
  initial: ManualCheckEntry | null;
  /** Se true, mostra apenas botão de validar (sem opção manual). Usar quando há probe confiável. */
  probeOnly?: boolean;
  /** Se true, mostra apenas botão manual. Usar quando não há comando para validar. */
  manualOnly?: boolean;
  /** Label do passo, mostrado em mensagens de feedback */
  label?: string;
};

type ProbeResponse = { ok: boolean; version?: string; error?: string };

export function ManualCheckToggle({ id, initial, probeOnly, manualOnly, label }: Props) {
  const router = useRouter();
  const [entry, setEntry] = useState<ManualCheckEntry | null>(initial);
  const [probeResult, setProbeResult] = useState<ProbeResponse | null>(null);
  const [busy, setBusy] = useState<"probe" | "save" | null>(null);
  const [, startTransition] = useTransition();

  async function runProbe() {
    setBusy("probe");
    setProbeResult(null);
    try {
      const res = await fetch(`/api/probe/${id}`);
      const data = (await res.json()) as ProbeResponse;
      setProbeResult(data);
      if (data.ok) {
        await saveCheck(true, "probe", data.version);
      }
    } catch (e) {
      setProbeResult({ ok: false, error: e instanceof Error ? e.message : "Falha de rede" });
    } finally {
      setBusy(null);
    }
  }

  async function saveCheck(done: boolean, via: "user" | "probe", version?: string) {
    setBusy("save");
    try {
      const res = await fetch("/api/setup-checks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, done, via, version })
      });
      if (res.ok) {
        setEntry({ done, via, version, ts: done ? new Date().toISOString() : undefined });
        startTransition(() => router.refresh());
      }
    } finally {
      setBusy(null);
    }
  }

  const isDone = entry?.done === true;

  return (
    <div className="space-y-2 pt-2">
      <div className="flex flex-wrap items-center gap-2">
        {!manualOnly && (
          <button
            onClick={runProbe}
            disabled={busy !== null}
            className="inline-flex items-center gap-1.5 rounded-md border border-brand-accent/40 bg-brand-accent/10 px-3 py-1.5 text-xs font-medium text-brand-accent-soft hover:bg-brand-accent/20 transition-colors disabled:opacity-50"
          >
            <Zap className={`h-3.5 w-3.5 ${busy === "probe" ? "animate-pulse" : ""}`} aria-hidden />
            {busy === "probe" ? "Validando…" : "Validar agora"}
          </button>
        )}
        {!probeOnly &&
          (isDone ? (
            <button
              onClick={() => saveCheck(false, "user")}
              disabled={busy !== null}
              className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary hover:border-amber-500/40 hover:text-amber-300 transition-colors disabled:opacity-50"
            >
              Desmarcar
            </button>
          ) : (
            <button
              onClick={() => saveCheck(true, "user")}
              disabled={busy !== null}
              className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-bg-surface px-3 py-1.5 text-xs font-medium text-text-primary hover:border-brand-mint/50 hover:text-brand-mint transition-colors disabled:opacity-50"
            >
              <Check className="h-3.5 w-3.5" aria-hidden />
              {busy === "save" ? "Salvando…" : "Já tenho instalado"}
            </button>
          ))}
        {isDone && entry?.via && (
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
              entry.via === "probe"
                ? "border-brand-accent/40 bg-brand-accent/10 text-brand-accent-soft"
                : "border-brand-mint/40 bg-brand-mint/10 text-brand-mint"
            }`}
            title={`Marcado em ${entry.ts ?? "?"}`}
          >
            <CheckCircle2 className="h-3 w-3" aria-hidden />
            {entry.via === "probe" ? "via probe" : entry.via === "auto" ? "via auto" : "via você"}
            {entry.version && <span className="font-mono text-[9px] opacity-80">· {entry.version}</span>}
          </span>
        )}
      </div>
      {probeResult && !probeResult.ok && (
        <div className="flex gap-2 rounded-md border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-xs text-amber-300">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden />
          <div>
            <span className="font-semibold">Probe falhou:</span> {probeResult.error}
            {!probeOnly && (
              <span className="block mt-1 text-text-muted">
                Se você tem certeza que está instalado, use "Já tenho instalado" para marcar manualmente.
              </span>
            )}
          </div>
        </div>
      )}
      {probeResult && probeResult.ok && (
        <div className="flex items-center gap-2 rounded-md border border-brand-mint/30 bg-brand-mint/5 px-3 py-2 text-xs text-brand-mint">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
          <span>
            Detectado{probeResult.version ? ` (${probeResult.version})` : ""}.{label ? ` ${label} confirmado.` : ""}
          </span>
        </div>
      )}
    </div>
  );
}
