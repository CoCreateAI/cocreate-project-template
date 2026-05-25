import { MermaidChart } from "@/components/mermaid-chart";
import type { MermaidBlock } from "@/lib/mermaid-extract";

type Props = {
  title: string;
  blocks: MermaidBlock[];
  source?: string;
  idPrefix: string;
};

export function ArchitectureSection({ title, blocks, source, idPrefix }: Props) {
  if (blocks.length === 0) return null;
  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-text-secondary">{title}</h3>
        {source && (
          <code className="font-mono text-[10px] text-text-muted">{source}</code>
        )}
      </div>
      <div className="space-y-6">
        {blocks.map((block) => (
          <div key={block.index} className="surface p-5 space-y-3">
            {block.context && (
              <div className="flex items-center gap-2">
                <span className="chip">{block.context}</span>
              </div>
            )}
            <MermaidChart
              chart={block.source}
              id={`${idPrefix}-${block.index}`}
              title={block.context ?? title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
