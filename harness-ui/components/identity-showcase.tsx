import type { Identity, IdentityColors } from "@/lib/identity";

type Props = {
  identity: Identity;
};

const COLOR_LABELS: Record<keyof IdentityColors, string> = {
  primary: "Primária",
  accent: "Accent",
  background: "Background",
  surface: "Surface",
  textPrimary: "Texto principal",
  textSecondary: "Texto secundário"
};

export function IdentityShowcase({ identity }: Props) {
  const { name, tagline, colors, logo, updatedAt } = identity;
  const isDefault = !name && !logo && updatedAt === new Date(0).toISOString();

  return (
    <div className="surface p-6 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {logo ? (
            <img
              src="/api/identity/logo/preview"
              alt={name || "Logo do projeto"}
              className="h-16 w-16 rounded-lg object-contain ring-1 ring-border-subtle"
              style={{ backgroundColor: colors.surface }}
            />
          ) : (
            <div
              className="flex h-16 w-16 items-center justify-center rounded-lg font-display text-2xl font-bold ring-1 ring-border-subtle"
              style={{ backgroundColor: colors.primary, color: colors.background }}
            >
              {(name || "?").slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="space-y-1">
            <h3 className="font-display text-xl font-bold text-text-primary">
              {name || <span className="text-text-muted italic">Sem nome definido</span>}
            </h3>
            {tagline ? (
              <p className="text-sm text-text-secondary">{tagline}</p>
            ) : (
              <p className="text-xs text-text-muted italic">Sem tagline</p>
            )}
          </div>
        </div>
        {isDefault ? (
          <span className="chip">padrão CoCreate</span>
        ) : (
          <span className="chip-mint">customizado</span>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Paleta</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {(Object.keys(COLOR_LABELS) as Array<keyof IdentityColors>).map((key) => (
            <div
              key={key}
              className="flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-base p-2"
            >
              <div
                className="h-8 w-8 shrink-0 rounded-md ring-1 ring-border-subtle"
                style={{ backgroundColor: colors[key] }}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="text-[11px] text-text-secondary">{COLOR_LABELS[key]}</p>
                <p className="font-mono text-[10px] text-text-muted truncate">{colors[key]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isDefault && (
        <p className="text-[11px] text-text-muted">
          Última atualização:{" "}
          <time dateTime={updatedAt}>{new Date(updatedAt).toLocaleString("pt-BR")}</time>
        </p>
      )}
    </div>
  );
}
