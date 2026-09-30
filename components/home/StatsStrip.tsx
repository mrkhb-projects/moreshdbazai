interface StatItem {
  label: string;
  value: string;
  hint?: string;
}

export function StatsStrip({ items }: { items: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-ink-800 bg-ink-900/60 p-4 text-center sm:p-5"
        >
          <p className="num-fa text-2xl font-extrabold text-ink-50 sm:text-3xl">{item.value}</p>
          <p className="mt-1 text-xs font-medium text-ink-300 sm:text-sm">{item.label}</p>
          {item.hint ? <p className="mt-1 text-[11px] leading-4 text-ink-500">{item.hint}</p> : null}
        </div>
      ))}
    </div>
  );
}
