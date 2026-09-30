import type { MarketPrice, MarketSignal, SignalAction } from "@/types/price";

/**
 * منطق تولید سیگنال خرید/فروش.
 *
 * ⚠️ توجه مهم: این یک قاعدهٔ ساده و آموزشی بر پایه شتاب تغییر قیمت روزانه
 * است و هیچ مدل مالی/تحلیل تکنیکال واقعی پشت آن نیست. هدف آن نمایش یک
 * اسکلت قابل‌توسعه است؛ جایگزینی آن با یک موتور تحلیلی واقعی (یا اتصال به
 * سرویس تحلیل بازار) در آینده، بدون تغییر در بقیه پروژه ممکن است چون فقط
 * همین فایل باید عوض شود.
 */

const STRONG_MOVE_THRESHOLD = 1.5; // درصد
const MILD_MOVE_THRESHOLD = 0.5; // درصد

interface SignalRule {
  action: SignalAction;
  reason: string;
  confidence: number;
}

function evaluateRule(price: MarketPrice): SignalRule {
  const { direction, changePercent } = price;
  const absChange = Math.abs(changePercent);

  if (direction === "down" && absChange >= STRONG_MOVE_THRESHOLD) {
    return {
      action: "buy",
      reason: `افت محسوس ${absChange.toFixed(1)}٪ نسبت به روز گذشته؛ فرصت مناسب برای بررسی خرید پلکانی.`,
      confidence: Math.min(90, 55 + absChange * 6),
    };
  }

  if (direction === "up" && absChange >= STRONG_MOVE_THRESHOLD) {
    return {
      action: "sell",
      reason: `رشد قابل توجه ${absChange.toFixed(1)}٪ در بازه اخیر؛ مناسب برای شناسایی سود بخشی از دارایی.`,
      confidence: Math.min(90, 55 + absChange * 6),
    };
  }

  if (direction === "down" && absChange >= MILD_MOVE_THRESHOLD) {
    return {
      action: "buy",
      reason: `روند نزولی ملایم (${absChange.toFixed(1)}٪)؛ می‌توان برای خرید بیشتر رصد کرد.`,
      confidence: 45 + absChange * 8,
    };
  }

  if (direction === "up" && absChange >= MILD_MOVE_THRESHOLD) {
    return {
      action: "sell",
      reason: `روند صعودی ملایم (${absChange.toFixed(1)}٪)؛ نگه‌داشتن با رصد نزدیک توصیه می‌شود.`,
      confidence: 40 + absChange * 8,
    };
  }

  return {
    action: "hold",
    reason: "نوسان قیمت در محدوده عادی است؛ فعلاً نگه‌داری و رصد بازار منطقی‌تر است.",
    confidence: 35,
  };
}

export function buildSignal(price: MarketPrice): MarketSignal {
  const rule = evaluateRule(price);
  return {
    key: price.key,
    title: price.title,
    category: price.category,
    action: rule.action,
    reason: rule.reason,
    confidence: Math.round(Math.min(95, Math.max(5, rule.confidence))),
    price,
  };
}

export function buildSignals(prices: MarketPrice[]): MarketSignal[] {
  return prices.map(buildSignal).sort((a, b) => b.confidence - a.confidence);
}

export const SIGNAL_ACTION_LABEL: Record<SignalAction, string> = {
  buy: "فرصت خرید",
  sell: "فرصت فروش",
  hold: "نگه‌داری",
};
