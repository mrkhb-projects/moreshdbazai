import { Badge } from "@/components/ui/Badge";
import { SIGNAL_ACTION_LABEL } from "@/lib/signals";
import type { SignalAction } from "@/types/price";

const TONE_MAP: Record<SignalAction, "rise" | "fall" | "neutral"> = {
  buy: "rise",
  sell: "fall",
  hold: "neutral",
};

const ICON_MAP: Record<SignalAction, string> = {
  buy: "▲",
  sell: "▼",
  hold: "■",
};

export function SignalBadge({ action }: { action: SignalAction }) {
  return (
    <Badge tone={TONE_MAP[action]}>
      <span aria-hidden>{ICON_MAP[action]}</span>
      {SIGNAL_ACTION_LABEL[action]}
    </Badge>
  );
}
