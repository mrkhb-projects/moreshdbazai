import { formatPercent } from "@/lib/format";
import type { PriceDirection } from "@/types/price";

const DIRECTION_CLASSES: Record<PriceDirection, string> = {
  up: "text-rise-500",
  down: "text-fall-500",
  flat: "text-ink-400",
};

const DIRECTION_ICON: Record<PriceDirection, string> = {
  up: "↑",
  down: "↓",
  flat: "—",
};

export function PriceChangeTag({
  direction,
  changePercent,
}: {
  direction: PriceDirection;
  changePercent: number;
}) {
  return (
    <span className={`num-fa inline-flex items-center gap-1 text-sm font-medium ${DIRECTION_CLASSES[direction]}`}>
      <span aria-hidden>{DIRECTION_ICON[direction]}</span>
      {formatPercent(changePercent)}
    </span>
  );
}
