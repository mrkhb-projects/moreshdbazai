import { formatNumberFa } from "@/lib/format";
import { RISK_LEVEL_LABEL } from "@/lib/signals";
import type { MarketOverview } from "@/lib/market-analysis";

const RISK_ORDER: Array<keyof MarketOverview["riskBreakdown"]> = ["low", "medium", "high"];

const RISK_DOT_CLASS: Record<keyof MarketOverview["riskBreakdown"], string> = {
  low: "bg-rise-500",
  medium: "bg-amber-500",
  high: "bg-fall-500",
};

export function RiskSummary({ overview }: { overview: MarketOverview }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-ink-800 bg-ink-900/60 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-ink-50">نقشه ریسک/نوسان بازار</h3>
        <span className="num-fa text-xs text-ink-500">
          میانگین نوسان هفتگی: {formatNumberFa(overview.avgVolatility)}٪
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {RISK_ORDER.map((level) => (
          <div key={level} className="flex items-center gap-3 rounded-xl bg-ink-900 p-3">
            <span className={`size-2.5 shrink-0 rounded-full ${RISK_DOT_CLASS[level]}`} aria-hidden />
            <div>
              <p className="num-fa text-sm font-bold text-ink-100">{formatNumberFa(overview.riskBreakdown[level])}</p>
              <p className="text-xs text-ink-400">{RISK_LEVEL_LABEL[level]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
