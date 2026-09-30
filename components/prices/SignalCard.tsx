import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SignalBadge } from "@/components/prices/SignalBadge";
import { PriceChangeTag } from "@/components/prices/PriceChangeTag";
import { WatchlistButton } from "@/components/prices/WatchlistButton";
import { formatNumberFa, formatPriceValue } from "@/lib/format";
import { HORIZON_LABEL, RISK_LEVEL_LABEL } from "@/lib/signals";
import type { MarketSignal } from "@/types/price";

const RISK_TONE: Record<MarketSignal["riskLevel"], "rise" | "fall" | "neutral"> = {
  low: "rise",
  medium: "neutral",
  high: "fall",
};

export function SignalCard({ signal }: { signal: MarketSignal }) {
  const { price } = signal;

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <Link href={`/prices/${price.key}`} className="group min-w-0">
          <h3 className="truncate text-base font-semibold text-ink-50 group-hover:text-brand-400">{signal.title}</h3>
          <p className="num-fa mt-1 text-lg font-bold text-ink-100">{formatPriceValue(price)}</p>
        </Link>
        <div className="flex shrink-0 items-center gap-1">
          <SignalBadge action={signal.action} />
          <WatchlistButton instrumentKey={price.key} />
        </div>
      </div>

      <p className="text-sm leading-6 text-ink-400">{signal.reason}</p>

      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={RISK_TONE[signal.riskLevel]}>{RISK_LEVEL_LABEL[signal.riskLevel]}</Badge>
        <Badge tone="neutral">{HORIZON_LABEL[signal.horizon]}</Badge>
        <Badge tone="neutral">
          موقعیت در بازه هفته: {formatNumberFa(signal.rangePositionPercent)}٪
        </Badge>
      </div>

      <div className="flex items-center justify-between border-t border-ink-800 pt-3 text-xs text-ink-500">
        <PriceChangeTag direction={price.direction} changePercent={price.changePercent} />
        <span>میزان اطمینان قاعده: {formatNumberFa(signal.confidence)}٪</span>
      </div>
    </Card>
  );
}
