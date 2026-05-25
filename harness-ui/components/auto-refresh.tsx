"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, Pause } from "lucide-react";

type Props = {
  intervalMs?: number;
};

export function AutoRefresh({ intervalMs = 5000 }: Props) {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => {
      setRefreshing(true);
      router.refresh();
      const t = setTimeout(() => setRefreshing(false), 800);
      return () => clearTimeout(t);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, router, enabled]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-border-strong bg-bg-elevated/90 px-3 py-1.5 text-[10px] text-text-secondary backdrop-blur shadow-lg">
      <button
        onClick={() => setEnabled((v) => !v)}
        className="flex items-center gap-1.5"
        title={enabled ? "Pausar auto-refresh" : "Retomar auto-refresh"}
      >
        {enabled ? (
          <Activity
            className={`h-3 w-3 ${refreshing ? "text-brand-accent animate-pulse" : "text-brand-mint"}`}
            aria-hidden
          />
        ) : (
          <Pause className="h-3 w-3 text-text-muted" aria-hidden />
        )}
        <span>{enabled ? `auto-refresh ${intervalMs / 1000}s` : "pausado"}</span>
      </button>
    </div>
  );
}
