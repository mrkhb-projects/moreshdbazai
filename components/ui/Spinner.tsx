export function Spinner({ className = "" }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="در حال بارگذاری"
      className={`inline-block size-5 animate-spin rounded-full border-2 border-ink-600 border-t-brand-400 ${className}`}
    />
  );
}
