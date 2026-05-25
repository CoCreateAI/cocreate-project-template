"use client";

import { useState } from "react";

type Props = {
  code: string;
  language?: string;
  label?: string;
};

export function CodeBlock({ code, language = "powershell", label }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard pode não estar disponível em http
    }
  }

  return (
    <div className="group relative rounded-lg border border-ink-800 bg-ink-950 overflow-hidden">
      {label && (
        <div className="flex items-center justify-between border-b border-ink-800 bg-ink-900/40 px-3 py-1.5">
          <span className="text-[10px] uppercase tracking-widest text-ink-400">{label}</span>
          <span className="text-[10px] font-mono text-ink-500">{language}</span>
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
        <code className="font-mono text-ink-100">{code}</code>
      </pre>
      <button
        onClick={copy}
        className="absolute right-2 top-2 rounded-md border border-ink-700 bg-ink-900 px-2 py-1 text-[10px] font-medium text-ink-300 opacity-0 group-hover:opacity-100 hover:text-accent-soft transition-all"
        aria-label="Copiar comando"
      >
        {copied ? "✓ copiado" : "Copiar"}
      </button>
    </div>
  );
}
