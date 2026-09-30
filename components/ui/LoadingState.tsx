import { Spinner } from "@/components/ui/Spinner";

export function LoadingState({ label = "در حال بارگذاری اطلاعات…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-ink-800 bg-ink-900/40 px-6 py-16 text-center">
      <Spinner className="size-8" />
      <p className="text-sm text-ink-400">{label}</p>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-ink-800 bg-ink-900/40 p-4">
      <div className="h-4 w-24 animate-pulse rounded bg-ink-800" />
      <div className="h-4 w-28 animate-pulse rounded bg-ink-800" />
      <div className="h-4 w-16 animate-pulse rounded bg-ink-800" />
    </div>
  );
}

export function SkeletonList({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="در حال بارگذاری">
      {Array.from({ length: rows }).map((_, index) => (
        <SkeletonRow key={index} />
      ))}
    </div>
  );
}
