import { formatDateFa } from "@/lib/format";

export function DataSourceNote({ source, updatedAt }: { source: "live" | "mock"; updatedAt: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 rounded-xl border px-4 py-2.5 text-xs ${
        source === "live"
          ? "border-brand-500/30 bg-brand-500/10 text-brand-300"
          : "border-ink-700 bg-ink-800/60 text-ink-400"
      }`}
    >
      <span className="relative flex size-2">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
            source === "live" ? "bg-brand-400" : "bg-ink-500"
          }`}
        />
        <span className={`relative inline-flex size-2 rounded-full ${source === "live" ? "bg-brand-400" : "bg-ink-500"}`} />
      </span>
      {source === "live" ? (
        <span>داده زنده از tgju.org</span>
      ) : (
        <span>داده نمونه (منبع زنده موقتاً در دسترس نیست)</span>
      )}
      <span className="num-fa text-ink-500">· آخرین به‌روزرسانی: {formatDateFa(updatedAt)}</span>
    </div>
  );
}
