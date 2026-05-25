"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RefreshCw } from "lucide-react";

export function RefreshButton({ label = "Atualizar" }: { label?: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button
      onClick={() =>
        startTransition(() => {
          router.refresh();
        })
      }
      className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-bg-surface px-3 py-1.5 text-xs font-medium text-text-primary hover:border-brand-accent hover:text-brand-accent-soft transition-colors disabled:opacity-50"
      disabled={pending}
    >
      <RefreshCw className={`h-3.5 w-3.5 ${pending ? "animate-spin" : ""}`} aria-hidden />
      <span>{pending ? "Atualizando…" : label}</span>
    </button>
  );
}
