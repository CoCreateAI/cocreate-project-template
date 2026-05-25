import type { ReactNode } from "react";
import { Check, Circle, ArrowRight, Minus } from "lucide-react";

type StepStatus = "done" | "pending" | "manual" | "current";

type Props = {
  number: string;
  title: string;
  status: StepStatus;
  detail?: string;
  children?: ReactNode;
};

const statusConfig: Record<
  StepStatus,
  { Icon: typeof Check; cls: string; label: string }
> = {
  done: {
    Icon: Check,
    cls: "border-brand-mint/50 bg-brand-mint/10 text-brand-mint",
    label: "Feito"
  },
  pending: {
    Icon: Circle,
    cls: "border-border-subtle bg-bg-surface/60 text-text-muted",
    label: "Pendente"
  },
  current: {
    Icon: ArrowRight,
    cls: "border-brand-accent bg-brand-accent/10 text-brand-accent-soft",
    label: "Próximo"
  },
  manual: {
    Icon: Minus,
    cls: "border-border-subtle bg-bg-surface/60 text-text-muted",
    label: "Manual"
  }
};

export function SetupStep({ number, title, status, detail, children }: Props) {
  const cfg = statusConfig[status];
  const Icon = cfg.Icon;
  return (
    <div
      className={`rounded-xl border p-5 ${
        status === "current"
          ? "border-brand-accent/40 bg-brand-accent/5"
          : status === "done"
          ? "border-brand-mint/30 bg-brand-mint/5"
          : "border-border-subtle bg-bg-surface/60"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${cfg.cls}`}>
          <Icon className="h-4 w-4" aria-hidden />
        </div>
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-mono text-[11px] text-text-muted">{number}</span>
            <h3 className="text-base font-semibold text-text-primary">{title}</h3>
            <span
              className={`ml-auto inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${cfg.cls}`}
            >
              {cfg.label}
            </span>
          </div>
          {detail && <p className="text-sm text-text-secondary">{detail}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
