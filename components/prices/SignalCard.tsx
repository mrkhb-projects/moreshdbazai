import { Card } from "@/components/ui/Card";
import { SignalBadge } from "@/components/prices/SignalBadge";
import { PriceChangeTag } from "@/components/prices/PriceChangeTag";
import { formatNumberFa, formatToman } from "@/lib/format";
import type { MarketSignal } from "@/types/price";

export function SignalCard({ signal }: { signal: MarketSignal }) {
  const { price } = signal;

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-ink-50">{signal.title}</h3>
          <p className="num-fa mt-1 text-lg font-bold text-ink-100">
            {price.unit === "toman" ? formatToman(price.price) : `${formatNumberFa(price.price)} دلار`}
          </p>
        </div>
        <SignalBadge action={signal.action} />
      </div>

      <p className="text-sm leading-6 text-ink-400">{signal.reason}</p>

      <div className="flex items-center justify-between border-t border-ink-800 pt-3 text-xs text-ink-500">
        <PriceChangeTag direction={price.direction} changePercent={price.changePercent} />
        <span>میزان اطمینان قاعده: {formatNumberFa(signal.confidence)}٪</span>
      </div>
    </Card>
  );
}
