"use client";

import { useWatchlist } from "@/lib/useWatchlist";

export function WatchlistButton({
  instrumentKey,
  className = "",
}: {
  instrumentKey: string;
  className?: string;
}) {
  const { isSaved, toggle } = useWatchlist();
  const saved = isSaved(instrumentKey);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(instrumentKey);
      }}
      aria-pressed={saved}
      aria-label={saved ? "حذف از موردعلاقه‌ها" : "افزودن به موردعلاقه‌ها"}
      title={saved ? "حذف از موردعلاقه‌ها" : "افزودن به موردعلاقه‌ها"}
      className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
        saved ? "text-amber-400" : "text-ink-500 hover:text-ink-200"
      } ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill={saved ? "currentColor" : "none"} aria-hidden>
        <path
          d="m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 17l-5.6 3.1 1.4-6.3-4.8-4.3 6.4-.6L12 3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
