import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PriceChangeTag } from "@/components/prices/PriceChangeTag";
import { SignalBadge } from "@/components/prices/SignalBadge";
import { WatchlistButton } from "@/components/prices/WatchlistButton";
import { formatPriceValue, formatRangeNumber } from "@/lib/format";
import type { MarketPrice, SignalAction } from "@/types/price";

interface PriceCardProps {
  price: MarketPrice;
  action?: SignalAction;
}

export function PriceCard({ price, action }: PriceCardProps) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <Link href={`/prices/${price.key}`} className="group min-w-0">
          <h3 className="truncate text-sm font-medium text-ink-300 group-hover:text-brand-400">{price.title}</h3>
          <p className="num-fa mt-1 text-xl font-bold text-ink-50 sm:text-2xl">{formatPriceValue(price)}</p>
        </Link>
        <div className="flex shrink-0 items-center gap-1">
          {action ? <SignalBadge action={action} /> : null}
          <WatchlistButton instrumentKey={price.key} />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-ink-500">
        <PriceChangeTag direction={price.direction} changePercent={price.changePercent} />
        <span className="num-fa">
          بازه روزانه: {formatRangeNumber(price.low, price.unit)} تا {formatRangeNumber(price.high, price.unit)}
        </span>
      </div>
    </Card>
  );
}
