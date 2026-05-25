"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="markdown-body prose prose-invert prose-sm max-w-none prose-headings:text-ink-50 prose-headings:tracking-tight prose-a:text-accent-soft prose-code:text-accent-soft prose-strong:text-ink-100 prose-table:text-sm">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
