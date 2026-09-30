import { Card } from "@/components/ui/Card";
import { PriceChangeTag } from "@/components/prices/PriceChangeTag";
import { SignalBadge } from "@/components/prices/SignalBadge";
import { formatNumberFa, formatToman } from "@/lib/format";
import type { MarketPrice, SignalAction } from "@/types/price";

interface PriceCardProps {
  price: MarketPrice;
  action?: SignalAction;
}

export function PriceCard({ price, action }: PriceCardProps) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium text-ink-300">{price.title}</h3>
          <p className="num-fa mt-1 text-xl font-bold text-ink-50 sm:text-2xl">
            {price.unit === "toman" ? formatToman(price.price) : `${formatNumberFa(price.price)} دلار`}
          </p>
        </div>
        {action ? <SignalBadge action={action} /> : null}
      </div>

      <div className="flex items-center justify-between text-xs text-ink-500">
        <PriceChangeTag direction={price.direction} changePercent={price.changePercent} />
        <span className="num-fa">
          بازه: {formatNumberFa(price.low)} تا {formatNumberFa(price.high)}
        </span>
      </div>
    </Card>
  );
}
