import Image from "next/image";
import Link from "next/link";

type Props = {
  compact?: boolean;
  asLink?: boolean;
};

function Mark({ compact }: { compact: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-white/5 ring-1 ring-border-subtle">
        <Image
          src="/logo_cocreate.png"
          alt="CoCreate"
          fill
          sizes="36px"
          priority
          className="object-contain p-0.5"
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-display text-sm font-semibold text-text-primary">
          CoCreate <span className="text-brand-accent">Studio</span>
        </span>
        {!compact && (
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-text-muted">
            SDD + Harness
            <span className="text-text-muted/50" aria-hidden>·</span>
            <span className="font-mono normal-case tracking-normal text-brand-mint/80">:3001</span>
          </span>
        )}
      </div>
    </div>
  );
}

export function BrandMark({ compact = false, asLink = true }: Props) {
  if (!asLink) return <Mark compact={compact} />;
  return (
    <Link href="/" className="group inline-flex items-center transition-opacity hover:opacity-90">
      <Mark compact={compact} />
    </Link>
  );
}
