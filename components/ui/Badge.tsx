import type { ReactNode } from "react";

type Tone = "neutral" | "rise" | "fall" | "brand";

const TONE_CLASSES: Record<Tone, string> = {
  neutral: "bg-ink-800 text-ink-200",
  rise: "bg-rise-500/15 text-rise-500",
  fall: "bg-fall-500/15 text-fall-500",
  brand: "bg-brand-500/15 text-brand-400",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${TONE_CLASSES[tone]}`}>
      {children}
    </span>
  );
}
