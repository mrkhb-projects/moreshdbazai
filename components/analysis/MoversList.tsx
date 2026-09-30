import { PriceChangeTag } from "@/components/prices/PriceChangeTag";
import { formatNumberFa, formatPriceValue } from "@/lib/format";
import type { MarketSignal } from "@/types/price";

interface MoversListProps {
  title: string;
  items: MarketSignal[];
  emptyText: string;
  metric?: "change" | "volatility";
}

export function MoversList({ title, items, emptyText, metric = "change" }: MoversListProps) {
  return (
    <div className="rounded-2xl border border-ink-800 bg-ink-900/60 p-5">
      <h3 className="mb-3 text-base font-semibold text-ink-50">{title}</h3>
      {items.length === 0 ? (
        <p className="text-sm text-ink-500">{emptyText}</p>
      ) : (
        <ul className="flex flex-col divide-y divide-ink-800">
          {items.map((signal) => (
            <li key={signal.key} className="flex items-center justify-between gap-3 py-2.5 text-sm">
              <div>
                <p className="font-medium text-ink-100">{signal.title}</p>
                <p className="num-fa text-xs text-ink-500">{formatPriceValue(signal.price)}</p>
              </div>
              {metric === "change" ? (
                <PriceChangeTag direction={signal.price.direction} changePercent={signal.price.changePercent} />
              ) : (
                <span className="num-fa text-sm font-medium text-ink-300">
                  {formatNumberFa(signal.volatilityPercent)}٪
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
