"use client";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "مشکلی پیش آمد",
  description = "دریافت اطلاعات با خطا مواجه شد. لطفاً دوباره تلاش کنید.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-fall-500/30 bg-fall-500/5 px-6 py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-fall-500/15 text-2xl">
        ⚠️
      </div>
      <h3 className="text-base font-semibold text-ink-100">{title}</h3>
      <p className="max-w-sm text-sm text-ink-400">{description}</p>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="mt-2 rounded-xl bg-fall-500/15 px-4 py-2 text-sm font-medium text-fall-500 transition-colors hover:bg-fall-500/25"
        >
          تلاش دوباره
        </button>
      ) : null}
    </div>
  );
}
