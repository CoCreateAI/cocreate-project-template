import { CheckCircle2, AlertCircle, XCircle, FileText, FileEdit, FileCheck2 } from "lucide-react";

type Status =
  | "ok"
  | "parcial"
  | "erro"
  | "passou"
  | "falhou"
  | "rascunho"
  | "ativa"
  | "template"
  | string;

const styles: Record<string, { cls: string; Icon: typeof CheckCircle2 }> = {
  ok: { cls: "bg-brand-mint/15 text-brand-mint border-brand-mint/40", Icon: CheckCircle2 },
  passou: { cls: "bg-brand-mint/15 text-brand-mint border-brand-mint/40", Icon: CheckCircle2 },
  ativa: { cls: "bg-brand-mint/15 text-brand-mint border-brand-mint/40", Icon: FileCheck2 },
  parcial: { cls: "bg-amber-500/15 text-amber-300 border-amber-500/30", Icon: AlertCircle },
  rascunho: { cls: "bg-amber-500/15 text-amber-300 border-amber-500/30", Icon: FileEdit },
  erro: { cls: "bg-red-500/15 text-red-300 border-red-500/40", Icon: XCircle },
  falhou: { cls: "bg-red-500/15 text-red-300 border-red-500/40", Icon: XCircle },
  template: { cls: "bg-bg-surface text-text-muted border-border-subtle", Icon: FileText }
};

export function StatusBadge({ status }: { status: Status }) {
  const config = styles[status] ?? { cls: "bg-bg-surface text-text-secondary border-border-subtle", Icon: FileText };
  const { cls, Icon } = config;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${cls}`}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {status}
    </span>
  );
}
