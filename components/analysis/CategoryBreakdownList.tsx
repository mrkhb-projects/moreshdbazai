import { Badge } from "@/components/ui/Badge";
import { formatNumberFa } from "@/lib/format";
import { SIGNAL_ACTION_LABEL } from "@/lib/signals";
import type { CategoryBreakdown } from "@/lib/market-analysis";

const DOMINANT_TONE: Record<CategoryBreakdown["dominantAction"], "rise" | "fall" | "neutral"> = {
  buy: "rise",
  sell: "fall",
  hold: "neutral",
};

export function CategoryBreakdownList({ categories }: { categories: CategoryBreakdown[] }) {
  return (
    <div className="rounded-2xl border border-ink-800 bg-ink-900/60 p-5">
      <h3 className="mb-4 text-base font-semibold text-ink-50">تفکیک سیگنال به تفکیک بازار</h3>
      <div className="flex flex-col divide-y divide-ink-800">
        {categories.map((cat) => (
          <div key={cat.category} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div>
              <p className="text-sm font-medium text-ink-100">{cat.label}</p>
              <p className="num-fa mt-0.5 text-xs text-ink-500">
                {formatNumberFa(cat.total)} نماد · نوسان میانگین {formatNumberFa(cat.avgVolatility)}٪
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="num-fa text-xs text-rise-500">خرید {formatNumberFa(cat.buy)}</span>
              <span className="num-fa text-xs text-fall-500">فروش {formatNumberFa(cat.sell)}</span>
              <span className="num-fa text-xs text-ink-400">نگه‌داری {formatNumberFa(cat.hold)}</span>
              <Badge tone={DOMINANT_TONE[cat.dominantAction]}>{SIGNAL_ACTION_LABEL[cat.dominantAction]} غالب</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
