import { Badge } from "@/components/ui/Badge";
import { formatNumberFa } from "@/lib/format";
import { SENTIMENT_LABEL, type MarketOverview } from "@/lib/market-analysis";

const SENTIMENT_TONE: Record<MarketOverview["sentiment"], "rise" | "fall" | "neutral"> = {
  bullish: "rise",
  bearish: "fall",
  neutral: "neutral",
};

/** نوار سهم سه‌رنگ خرید/فروش/نگه‌داری برای نمایش سریع تعادل سیگنال‌های بازار */
function ShareBar({ buyShare, sellShare, holdShare }: { buyShare: number; sellShare: number; holdShare: number }) {
  return (
    <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-ink-800" role="img" aria-label="نسبت سیگنال‌های بازار">
      <div className="bg-rise-500" style={{ width: `${buyShare}%` }} />
      <div className="bg-fall-500" style={{ width: `${sellShare}%` }} />
      <div className="bg-ink-500" style={{ width: `${holdShare}%` }} />
    </div>
  );
}

export function SentimentSummary({ overview }: { overview: MarketOverview }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-ink-800 bg-ink-900/60 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-ink-50">جمع‌بندی وضعیت کلی بازار</h3>
        <Badge tone={SENTIMENT_TONE[overview.sentiment]}>{SENTIMENT_LABEL[overview.sentiment]}</Badge>
      </div>

      <p className="text-sm leading-7 text-ink-400">{overview.summary}</p>

      <ShareBar buyShare={overview.buyShare} sellShare={overview.sellShare} holdShare={overview.holdShare} />

      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div className="rounded-xl bg-ink-900 p-3">
          <p className="num-fa text-lg font-bold text-rise-500">{formatNumberFa(overview.buyCount)}</p>
          <p className="mt-1 text-ink-400">فرصت خرید ({formatNumberFa(overview.buyShare)}٪)</p>
        </div>
        <div className="rounded-xl bg-ink-900 p-3">
          <p className="num-fa text-lg font-bold text-fall-500">{formatNumberFa(overview.sellCount)}</p>
          <p className="mt-1 text-ink-400">فرصت فروش ({formatNumberFa(overview.sellShare)}٪)</p>
        </div>
        <div className="rounded-xl bg-ink-900 p-3">
          <p className="num-fa text-lg font-bold text-ink-200">{formatNumberFa(overview.holdCount)}</p>
          <p className="mt-1 text-ink-400">نگه‌داری ({formatNumberFa(overview.holdShare)}٪)</p>
        </div>
      </div>
    </div>
  );
}
