type Props = {
  done: number;
  total: number;
  percentage: number;
};

export function ProgressBar({ done, total, percentage }: Props) {
  const isComplete = done === total;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-ink-300">
          <span className="text-ink-50 font-semibold">{done}</span> de {total} passos verificados automaticamente
        </span>
        <span className={isComplete ? "text-emerald-300 font-semibold" : "text-accent-soft font-semibold"}>{percentage}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-ink-800">
        <div
          className={`h-full transition-all duration-500 ${isComplete ? "bg-emerald-500" : "bg-gradient-to-r from-accent-deep to-accent"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
