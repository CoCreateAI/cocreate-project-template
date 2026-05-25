type Props = {
  title: string;
  hint?: string;
  actionLabel?: string;
  actionHint?: string;
};

export function EmptyState({ title, hint, actionLabel, actionHint }: Props) {
  return (
    <div className="rounded-lg border border-dashed border-ink-700 bg-ink-900/40 p-8 text-center">
      <p className="text-sm font-medium text-ink-200">{title}</p>
      {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
      {actionLabel && (
        <div className="mt-4 inline-flex flex-col items-center gap-1">
          <code className="rounded bg-ink-800 px-3 py-1.5 text-xs font-mono text-accent-soft">{actionLabel}</code>
          {actionHint && <span className="text-[10px] text-ink-400">{actionHint}</span>}
        </div>
      )}
    </div>
  );
}
