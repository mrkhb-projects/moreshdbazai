import { formatRangeNumber } from "@/lib/format";
import type { MarketPrice } from "@/types/price";

interface RangeBarProps {
  label: string;
  low: number;
  high: number;
  value: number;
  unit: MarketPrice["unit"];
}

/**
 * نوار افقی بازه (روزانه/هفتگی) با نشانگر موقعیت قیمت فعلی روی آن.
 * مثل نمودارهای مالی، همیشه چپ‌به‌راست (کف در چپ، سقف در راست) نمایش داده
 * می‌شود، صرف‌نظر از جهت راست‌چین کلی صفحه.
 */
export function RangeBar({ label, low, high, value, unit }: RangeBarProps) {
  const width = high - low;
  const positionPercent = width > 0 ? Math.min(100, Math.max(0, ((value - low) / width) * 100)) : 50;

  return (
    <div className="flex flex-col gap-2" dir="rtl">
      <div className="flex items-center justify-between text-xs text-ink-500">
        <span>{label}</span>
        <span className="num-fa">{formatRangeNumber(value, unit)}</span>
      </div>
      <div dir="ltr" className="relative h-2 w-full rounded-full bg-ink-800">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-brand-500/30"
          style={{ width: `${positionPercent}%` }}
          aria-hidden
        />
        <div
          className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-ink-950 bg-brand-500 shadow"
          style={{ left: `calc(${positionPercent}% - 6px)` }}
          aria-hidden
        />
      </div>
      <div dir="ltr" className="flex items-center justify-between text-xs text-ink-500">
        <span className="num-fa">{formatRangeNumber(low, unit)}</span>
        <span className="num-fa">{formatRangeNumber(high, unit)}</span>
      </div>
    </div>
  );
}
