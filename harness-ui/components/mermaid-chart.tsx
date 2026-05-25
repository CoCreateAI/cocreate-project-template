"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { Maximize2, ZoomIn, ZoomOut, RotateCcw, X } from "lucide-react";

type Props = {
  chart: string;
  id?: string;
  title?: string;
};

const FONT_STACK = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

function buildMermaidConfig(useMaxWidth: boolean) {
  return {
    startOnLoad: false,
    theme: "dark" as const,
    securityLevel: "loose" as const,
    fontFamily: FONT_STACK,
    themeVariables: {
      fontFamily: FONT_STACK,
      fontSize: "14px",
      // Paleta CoCreate
      background: "#0A1422",
      primaryColor: "#1F3B57", // brand-primary
      primaryBorderColor: "#E26A5E", // brand-accent (coral)
      primaryTextColor: "#F0F4F8",
      secondaryColor: "#142435",
      secondaryBorderColor: "#2D4660",
      secondaryTextColor: "#F0F4F8",
      tertiaryColor: "#1B2E45",
      tertiaryBorderColor: "#1F344A",
      tertiaryTextColor: "#94A6B8",
      lineColor: "#94A6B8",
      textColor: "#F0F4F8",
      nodeTextColor: "#F0F4F8",
      mainBkg: "#1F3B57",
      edgeLabelBackground: "#142435",
      clusterBkg: "#0A1422",
      clusterBorder: "#1F344A",
      titleColor: "#F0F4F8",
      labelTextColor: "#F0F4F8"
    },
    flowchart: { curve: "basis" as const, padding: 20, htmlLabels: true, useMaxWidth }
  };
}

async function renderMermaid(chart: string, renderId: string, useMaxWidth = true): Promise<string> {
  const mermaid = (await import("mermaid")).default;
  mermaid.initialize(buildMermaidConfig(useMaxWidth));
  const result = await mermaid.render(renderId, chart);
  // Garante que o SVG sempre tenha display:block (alguns browsers tratam inline svg com baseline)
  return result.svg.replace(/<svg /, '<svg style="display:block;" ');
}

export function MermaidChart({ chart, id, title = "Arquitetura" }: Props) {
  const [svg, setSvg] = useState<string | null>(null);
  const [svgFs, setSvgFs] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const baseId = id ?? `mermaid-${Math.random().toString(36).slice(2)}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const result = await renderMermaid(chart, `${baseId}-inline`);
        if (active) setSvg(result);
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : "Erro ao renderizar diagrama");
      }
    })();
    return () => {
      active = false;
    };
  }, [chart, baseId]);

  const zoomIn = useCallback(() => setScale((s) => Math.min(8, s * 1.25)), []);
  const zoomOut = useCallback(() => setScale((s) => Math.max(0.2, s * 0.8)), []);
  const zoomReset = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const openFullscreen = useCallback(async () => {
    zoomReset();
    setExpanded(true);
    if (!svgFs) {
      try {
        // useMaxWidth=false faz o Mermaid gerar SVG com dimensões em pixels reais,
        // crítico aqui porque o container do transform/scale não define largura própria
        const result = await renderMermaid(chart, `${baseId}-fs-${Date.now()}`, false);
        setSvgFs(result);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erro ao renderizar diagrama em tela cheia");
      }
    }
  }, [zoomReset, svgFs, chart, baseId]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
      else if (e.key === "+" || e.key === "=") zoomIn();
      else if (e.key === "-" || e.key === "_") zoomOut();
      else if (e.key === "0") zoomReset();
    };
    window.addEventListener("keydown", onKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [expanded, zoomIn, zoomOut, zoomReset]);

  function startDrag(e: React.MouseEvent) {
    dragRef.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  }
  function onDrag(e: React.MouseEvent) {
    if (!dragRef.current) return;
    setOffset({
      x: dragRef.current.ox + (e.clientX - dragRef.current.x),
      y: dragRef.current.oy + (e.clientY - dragRef.current.y)
    });
  }
  function endDrag() {
    dragRef.current = null;
  }
  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((s) => Math.max(0.2, Math.min(8, s * delta)));
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-900 bg-red-950/30 p-4 text-sm text-red-300">
        Erro renderizando Mermaid: {error}
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="rounded-xl border border-border-subtle bg-bg-surface/50 p-6 text-center text-sm text-text-muted">
        Carregando diagrama…
      </div>
    );
  }

  const fullscreenOverlay = expanded && (
    <div className="fixed inset-0 z-[100] flex flex-col bg-bg-base/97 backdrop-blur-md">
      <header className="flex items-center justify-between border-b border-border-subtle bg-bg-elevated/80 px-6 py-3">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-sm font-semibold text-text-primary">{title}</h3>
          <span className="text-[10px] uppercase tracking-widest text-text-muted">tela cheia</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={zoomOut}
            className="inline-flex items-center justify-center rounded-md border border-border-strong bg-bg-surface p-1.5 text-text-secondary hover:border-brand-accent hover:text-brand-accent-soft transition-colors"
            title="Diminuir (tecla -)"
            aria-label="Diminuir zoom"
          >
            <ZoomOut className="h-3.5 w-3.5" aria-hidden />
          </button>
          <span className="w-14 text-center font-mono text-text-secondary">{Math.round(scale * 100)}%</span>
          <button
            onClick={zoomIn}
            className="inline-flex items-center justify-center rounded-md border border-border-strong bg-bg-surface p-1.5 text-text-secondary hover:border-brand-accent hover:text-brand-accent-soft transition-colors"
            title="Aumentar (tecla +)"
            aria-label="Aumentar zoom"
          >
            <ZoomIn className="h-3.5 w-3.5" aria-hidden />
          </button>
          <button
            onClick={zoomReset}
            className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-bg-surface px-2.5 py-1 text-text-secondary hover:border-brand-accent hover:text-brand-accent-soft transition-colors"
            title="Resetar (tecla 0)"
          >
            <RotateCcw className="h-3 w-3" aria-hidden />
            Resetar
          </button>
          <button
            onClick={() => setExpanded(false)}
            className="ml-2 inline-flex items-center gap-1.5 rounded-md bg-brand-accent px-3 py-1.5 font-semibold text-white hover:bg-brand-accent-deep transition-colors shadow-md shadow-brand-accent/30"
            title="Fechar (Esc)"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
            Fechar (Esc)
          </button>
        </div>
      </header>
      <div
        className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={startDrag}
        onMouseMove={onDrag}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onWheel={onWheel}
      >
        {svgFs ? (
          <div className="flex h-full w-full items-center justify-center">
            <div
              className="mermaid-fullscreen origin-center transition-transform duration-75 will-change-transform"
              style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
              dangerouslySetInnerHTML={{ __html: svgFs }}
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-text-muted">
            Renderizando diagrama em alta resolução…
          </div>
        )}
      </div>
      <footer className="border-t border-border-subtle bg-bg-elevated/60 px-6 py-2 text-center text-[11px] text-text-muted">
        Arraste para mover · Scroll do mouse para zoom · Teclas + / − / 0 / Esc
      </footer>
    </div>
  );

  return (
    <>
      <div className="relative">
        <div className="mermaid-container overflow-x-auto" dangerouslySetInnerHTML={{ __html: svg }} />
        <button
          onClick={openFullscreen}
          className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-bg-elevated/90 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-text-primary hover:border-brand-accent hover:text-brand-accent-soft transition-all shadow-lg"
          title="Expandir em tela cheia"
        >
          <Maximize2 className="h-3 w-3" aria-hidden />
          <span>Tela cheia</span>
        </button>
      </div>

      {mounted && fullscreenOverlay ? createPortal(fullscreenOverlay, document.body) : null}
    </>
  );
}
