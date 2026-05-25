"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, Trash2, Save, CheckCircle2, AlertTriangle } from "lucide-react";
import type { Identity, IdentityColors } from "@/lib/identity";

type Props = {
  initial: Identity;
};

const COLOR_FIELDS: Array<{ key: keyof IdentityColors; label: string; hint: string }> = [
  { key: "primary", label: "Primária", hint: "Cor principal da marca" },
  { key: "accent", label: "Accent", hint: "Destaques, CTAs, links" },
  { key: "background", label: "Background", hint: "Fundo principal" },
  { key: "surface", label: "Surface", hint: "Cards, painéis" },
  { key: "textPrimary", label: "Texto principal", hint: "Títulos e parágrafos" },
  { key: "textSecondary", label: "Texto secundário", hint: "Hints, metadados" }
];

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

export function IdentityForm({ initial }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initial.name);
  const [tagline, setTagline] = useState(initial.tagline);
  const [colors, setColors] = useState<IdentityColors>(initial.colors);
  const [logoPath, setLogoPath] = useState<string | null>(initial.logo?.path ?? null);
  const [logoType, setLogoType] = useState<string | null>(initial.logo?.type ?? null);
  const [busy, setBusy] = useState<"save" | "upload" | "delete" | null>(null);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Limpa feedback após 3s
  useEffect(() => {
    if (!feedback) return;
    const id = setTimeout(() => setFeedback(null), 3000);
    return () => clearTimeout(id);
  }, [feedback]);

  function updateColor(key: keyof IdentityColors, value: string) {
    setColors((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    // Valida hex
    for (const { key, label } of COLOR_FIELDS) {
      if (!HEX_RE.test(colors[key])) {
        setFeedback({ kind: "err", text: `Cor "${label}" inválida: use formato #RRGGBB` });
        return;
      }
    }
    setBusy("save");
    try {
      const res = await fetch("/api/identity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, tagline, colors })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? `HTTP ${res.status}`);
      }
      setFeedback({ kind: "ok", text: "Identidade salva." });
      startTransition(() => router.refresh());
    } catch (e) {
      setFeedback({ kind: "err", text: e instanceof Error ? e.message : "Falha ao salvar" });
    } finally {
      setBusy(null);
    }
  }

  async function handleUpload(file: File) {
    setBusy("upload");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/identity/logo", { method: "POST", body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? `HTTP ${res.status}`);
      }
      const updated = (await res.json()) as Identity;
      setLogoPath(updated.logo?.path ?? null);
      setLogoType(updated.logo?.type ?? null);
      setFeedback({ kind: "ok", text: "Logo enviada." });
      startTransition(() => router.refresh());
    } catch (e) {
      setFeedback({ kind: "err", text: e instanceof Error ? e.message : "Falha no upload" });
    } finally {
      setBusy(null);
    }
  }

  async function handleDeleteLogo() {
    setBusy("delete");
    try {
      const res = await fetch("/api/identity/logo", { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setLogoPath(null);
      setLogoType(null);
      setFeedback({ kind: "ok", text: "Logo removida." });
      startTransition(() => router.refresh());
    } catch (e) {
      setFeedback({ kind: "err", text: e instanceof Error ? e.message : "Falha ao remover" });
    } finally {
      setBusy(null);
    }
  }

  // URL do logo: arquivos em docs/assets/brand/ ficam FORA do harness-ui/public,
  // então o Next.js não serve diretamente. Usamos a API como proxy de leitura — fallback à API.
  const logoUrl = logoPath ? `/api/identity/logo/preview?ts=${Date.now()}` : null;
  // Nota: implementação de preview via API requer endpoint adicional. Por ora, mostramos placeholder.
  // O preview real ainda usa o caminho via Next/Image se o arquivo estiver em public/.
  // Como alternativa rápida: mostrar o caminho como texto.

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* Form */}
      <div className="surface p-6 space-y-6">
        <div className="space-y-1">
          <h3 className="font-display text-lg font-semibold text-text-primary">Identidade visual do projeto</h3>
          <p className="text-xs text-text-muted">
            Salvo em <code className="font-mono">docs/identidade-visual.json</code>. A skill{" "}
            <code className="font-mono text-brand-accent-soft">/executar-tarefa</code> lê esses valores ao criar o frontend.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome do projeto">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={80}
              placeholder="Ex: Portal Emprega Brasil"
              className="w-full rounded-md border border-border-strong bg-bg-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-accent focus:outline-none"
            />
          </Field>
          <Field label="Tagline (opcional)">
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              maxLength={200}
              placeholder="Ex: Conectando talentos a oportunidades"
              className="w-full rounded-md border border-border-strong bg-bg-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-accent focus:outline-none"
            />
          </Field>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-text-primary">Cores</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {COLOR_FIELDS.map(({ key, label, hint }) => (
              <ColorField
                key={key}
                label={label}
                hint={hint}
                value={colors[key]}
                onChange={(v) => updateColor(key, v)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-text-primary">Logo</h4>
          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/svg+xml,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={busy !== null}
              className="btn-secondary"
            >
              <Upload className="h-4 w-4" aria-hidden />
              {busy === "upload" ? "Enviando…" : logoPath ? "Substituir logo" : "Enviar logo"}
            </button>
            {logoPath && (
              <button
                type="button"
                onClick={handleDeleteLogo}
                disabled={busy !== null}
                className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-bg-surface px-3 py-2 text-sm font-medium text-text-secondary hover:border-red-500/50 hover:text-red-300 transition-colors disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" aria-hidden />
                Remover
              </button>
            )}
            {logoPath && (
              <span className="text-[11px] font-mono text-text-muted">{logoPath}</span>
            )}
          </div>
          <p className="text-[11px] text-text-muted">
            PNG, SVG, JPG ou WebP. Máximo 2MB. Salvo em <code className="font-mono">docs/assets/brand/logo.&lt;ext&gt;</code>.
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-border-subtle pt-4">
          <button type="button" onClick={handleSave} disabled={busy !== null} className="btn-primary">
            <Save className="h-4 w-4" aria-hidden />
            {busy === "save" ? "Salvando…" : "Salvar identidade"}
          </button>
          {feedback && (
            <div
              className={`flex items-center gap-2 text-xs ${
                feedback.kind === "ok" ? "text-brand-mint" : "text-red-300"
              }`}
            >
              {feedback.kind === "ok" ? (
                <CheckCircle2 className="h-4 w-4" aria-hidden />
              ) : (
                <AlertTriangle className="h-4 w-4" aria-hidden />
              )}
              {feedback.text}
            </div>
          )}
        </div>
      </div>

      {/* Preview ao vivo */}
      <PreviewPanel name={name} tagline={tagline} colors={colors} logoPath={logoPath} logoType={logoType} />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium text-text-secondary">{label}</span>
      {children}
    </label>
  );
}

function ColorField({
  label,
  hint,
  value,
  onChange
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const isValid = HEX_RE.test(value);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-secondary">{label}</span>
        <span className="text-[10px] text-text-muted">{hint}</span>
      </div>
      <div className="flex items-center gap-2 rounded-md border border-border-strong bg-bg-base px-2 py-1.5">
        <input
          type="color"
          value={isValid ? value : "#000000"}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="h-7 w-7 cursor-pointer rounded border-none bg-transparent p-0"
          aria-label={`Escolher ${label}`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          maxLength={7}
          className={`flex-1 bg-transparent font-mono text-sm focus:outline-none ${
            isValid ? "text-text-primary" : "text-red-300"
          }`}
          placeholder="#RRGGBB"
        />
      </div>
    </div>
  );
}

function PreviewPanel({
  name,
  tagline,
  colors,
  logoPath,
  logoType
}: {
  name: string;
  tagline: string;
  colors: IdentityColors;
  logoPath: string | null;
  logoType: string | null;
}) {
  const previewLogoUrl = logoPath ? `/api/identity/logo/preview?ts=${Date.now()}` : null;

  return (
    <div className="surface p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-text-primary">Preview ao vivo</h4>
        <span className="chip">amostra</span>
      </div>
      <div
        className="rounded-xl border p-5 space-y-3"
        style={{ backgroundColor: colors.background, borderColor: colors.surface }}
      >
        <div className="flex items-center gap-3">
          {previewLogoUrl ? (
            <img
              src={previewLogoUrl}
              alt="Logo"
              className="h-10 w-10 rounded object-contain"
              style={{ backgroundColor: colors.surface }}
            />
          ) : (
            <div
              className="flex h-10 w-10 items-center justify-center rounded font-display text-lg font-bold"
              style={{ backgroundColor: colors.primary, color: colors.background }}
            >
              {(name || "?").slice(0, 1).toUpperCase()}
            </div>
          )}
          <div>
            <div className="font-display font-semibold" style={{ color: colors.textPrimary }}>
              {name || "Nome do projeto"}
            </div>
            {tagline && (
              <div className="text-xs" style={{ color: colors.textSecondary }}>
                {tagline}
              </div>
            )}
          </div>
        </div>
        <div className="rounded-lg p-3" style={{ backgroundColor: colors.surface }}>
          <p className="text-xs" style={{ color: colors.textSecondary }}>
            Card de exemplo
          </p>
          <p className="mt-1 text-sm" style={{ color: colors.textPrimary }}>
            Texto principal usando a paleta escolhida.
          </p>
        </div>
        <button
          type="button"
          className="w-full rounded-lg px-3 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: colors.accent, color: "#FFFFFF" }}
        >
          Botão de ação (accent)
        </button>
        <button
          type="button"
          className="w-full rounded-lg border px-3 py-2 text-sm font-medium"
          style={{ borderColor: colors.primary, color: colors.primary }}
        >
          Botão secundário (primary)
        </button>
      </div>
      <p className="text-[11px] text-text-muted">
        Esta é uma simulação. O dashboard CoCreate Studio continua com a paleta CoCreate.
      </p>
    </div>
  );
}
