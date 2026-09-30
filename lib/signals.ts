import type {
  MarketPrice,
  MarketSignal,
  RiskLevel,
  SignalAction,
  SignalHorizon,
} from "@/types/price";

/**
 * موتور تولید سیگنال خرید/فروش/نگه‌داری.
 *
 * ⚠️ توجه مهم: این یک قاعدهٔ آماری ساده و آموزشی است، نه یک مدل مالی یا
 * تحلیل تکنیکال واقعی (بدون RSI/MACD/میانگین متحرک واقعی و بدون داده
 * تاریخی چندساله). خروجی آن صرفاً برای آشنایی با یک اسکلت قابل‌توسعه است.
 * سه سیگنال ورودی با هم ترکیب می‌شوند:
 *
 *   ۱) شتاب روزانه (daily momentum): درصد تغییر قیمت نسبت به روز قبل.
 *   ۲) موقعیت در بازه هفتگی (range position): قیمت فعلی چند درصد از راه
 *      بین کف تا سقف هفتگی را طی کرده؛ نزدیکی به کف = منطقهٔ ارزشی محتمل،
 *      نزدیکی به سقف = منطقهٔ اشباع خرید محتمل.
 *   ۳) نوسان هفتگی (volatility): پهنای بازهٔ هفتگی نسبت به قیمت، به‌عنوان
 *      شاخص ریسک نگه‌داری آن دارایی در کوتاه‌مدت.
 *
 * جایگزینی این فایل با یک موتور تحلیلی واقعی‌تر (یا اتصال به سرویس خارجی)
 * در آینده، بدون تغییر در بقیهٔ پروژه ممکن است.
 */

const STRONG_MOVE_THRESHOLD = 1.5; // درصد تغییر روزانه که «قابل توجه» تلقی می‌شود
const NEAR_EDGE = 30; // فاصله (٪) از کف/سقف هفتگی که «نزدیک به لبه» تلقی می‌شود

interface SignalComputation {
  action: SignalAction;
  reason: string;
  confidence: number;
  riskLevel: RiskLevel;
  horizon: SignalHorizon;
}

function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, value));
}

/** موقعیت قیمت در بازه هفتگی: ۰ = کف هفته، ۱۰۰ = سقف هفته */
export function computeRangePosition(price: MarketPrice): number {
  const { price: current, weekHigh, weekLow } = price;
  const width = weekHigh - weekLow;
  if (!Number.isFinite(width) || width <= 0) return 50;
  return clampPercent(((current - weekLow) / width) * 100);
}

/** درصد نوسان هفتگی (پهنای بازه هفتگی نسبت به قیمت فعلی) */
export function computeVolatility(price: MarketPrice): number {
  const { price: current, weekHigh, weekLow } = price;
  if (!Number.isFinite(current) || current <= 0) return 0;
  return Math.max(0, ((weekHigh - weekLow) / current) * 100);
}

function toRiskLevel(volatilityPercent: number): RiskLevel {
  if (volatilityPercent >= 11) return "high";
  if (volatilityPercent >= 5) return "medium";
  return "low";
}

const RANGE_LABEL = (pos: number) =>
  pos <= NEAR_EDGE
    ? "نزدیک کف بازه هفتگی"
    : pos >= 100 - NEAR_EDGE
      ? "نزدیک سقف بازه هفتگی"
      : "در میانه بازه هفتگی";

function evaluate(price: MarketPrice): SignalComputation {
  const { direction, changePercent } = price;
  const absChange = Math.abs(changePercent);
  const rangePosition = computeRangePosition(price);
  const volatility = computeVolatility(price);
  const riskLevel = toRiskLevel(volatility);
  const nearLow = rangePosition <= NEAR_EDGE;
  const nearHigh = rangePosition >= 100 - NEAR_EDGE;
  const rangeText = RANGE_LABEL(rangePosition);
  const volatilityText =
    riskLevel === "high"
      ? `نوسان هفتگی بالا (${volatility.toFixed(1)}٪)`
      : riskLevel === "medium"
        ? `نوسان هفتگی متوسط (${volatility.toFixed(1)}٪)`
        : `نوسان هفتگی محدود (${volatility.toFixed(1)}٪)`;

  // حالت ۱: افت روزانه محسوس + نزدیک کف هفتگی → قوی‌ترین سیگنال خرید
  if (direction === "down" && absChange >= STRONG_MOVE_THRESHOLD && nearLow) {
    return {
      action: "buy",
      reason: `افت ${absChange.toFixed(1)}٪ امروز، قیمت را به کف بازه هفتگی (${rangeText}) نزدیک کرده است. ${volatilityText}؛ از نظر آماری این ناحیه در هفته اخیر، منطقهٔ جذاب‌تری برای ورود پلکانی بوده است.`,
      confidence: Math.min(92, 62 + absChange * 5 + (NEAR_EDGE - Math.min(rangePosition, NEAR_EDGE))),
      riskLevel,
      horizon: "short",
    };
  }

  // حالت ۲: رشد روزانه محسوس + نزدیک سقف هفتگی → قوی‌ترین سیگنال فروش/سود
  if (direction === "up" && absChange >= STRONG_MOVE_THRESHOLD && nearHigh) {
    return {
      action: "sell",
      reason: `رشد ${absChange.toFixed(1)}٪ امروز، قیمت را به سقف بازه هفتگی (${rangeText}) رسانده است. ${volatilityText}؛ چنین نواحی معمولاً محل مناسبی برای شناسایی سود بخشی از دارایی هستند.`,
      confidence: Math.min(92, 62 + absChange * 5 + Math.max(0, rangePosition - (100 - NEAR_EDGE))),
      riskLevel,
      horizon: "short",
    };
  }

  // حالت ۳: افت روزانه محسوس ولی هنوز در میانه/سقف بازه → احتیاط، اما فرصت
  if (direction === "down" && absChange >= STRONG_MOVE_THRESHOLD) {
    return {
      action: "buy",
      reason: `افت قابل توجه ${absChange.toFixed(1)}٪ نسبت به روز گذشته ثبت شده (${rangeText}). ${volatilityText}؛ می‌توان ادامه روند را رصد و خرید را پلکانی انجام داد.`,
      confidence: Math.min(85, 55 + absChange * 5),
      riskLevel,
      horizon: "short",
    };
  }

  // حالت ۴: رشد روزانه محسوس ولی هنوز در میانه/کف بازه → احتیاط در فروش زودهنگام
  if (direction === "up" && absChange >= STRONG_MOVE_THRESHOLD) {
    return {
      action: "sell",
      reason: `رشد قابل توجه ${absChange.toFixed(1)}٪ در بازه اخیر ثبت شده (${rangeText}). ${volatilityText}؛ نگه‌داشتن با رصد نزدیک یا شناسایی سود جزئی منطقی‌تر است.`,
      confidence: Math.min(80, 50 + absChange * 5),
      riskLevel,
      horizon: "short",
    };
  }

  // حالت ۵: بدون شتاب روزانه قوی، اما نزدیک کف هفتگی → سیگنال ملایم خرید
  if (nearLow && direction !== "up") {
    return {
      action: "buy",
      reason: `با وجود نوسان روزانه محدود (${absChange.toFixed(1)}٪)، قیمت در ناحیه کف بازه هفتگی (${rangeText}) قرار دارد. ${volatilityText}؛ این ناحیه برای رصد جهت شروع خرید پلکانی مناسب‌تر است.`,
      confidence: 48 + (NEAR_EDGE - Math.min(rangePosition, NEAR_EDGE)),
      riskLevel,
      horizon: "mid",
    };
  }

  // حالت ۶: بدون شتاب روزانه قوی، اما نزدیک سقف هفتگی → سیگنال ملایم فروش
  if (nearHigh && direction !== "down") {
    return {
      action: "sell",
      reason: `با وجود نوسان روزانه محدود (${absChange.toFixed(1)}٪)، قیمت در ناحیه سقف بازه هفتگی (${rangeText}) قرار دارد. ${volatilityText}؛ نگه‌داری با احتیاط یا شناسایی سود جزئی توصیه می‌شود.`,
      confidence: 45 + Math.max(0, rangePosition - (100 - NEAR_EDGE)),
      riskLevel,
      horizon: "mid",
    };
  }

  // حالت پیش‌فرض: بدون سیگنال قوی
  return {
    action: "hold",
    reason: `نوسان روزانه (${absChange.toFixed(1)}٪) در محدوده عادی است و قیمت در میانه بازه هفتگی (${rangeText}) قرار دارد. ${volatilityText}؛ فعلاً نگه‌داری و رصد بازار منطقی‌تر از تصمیم فوری است.`,
    confidence: 32,
    riskLevel,
    horizon: "mid",
  };
}

export function buildSignal(price: MarketPrice): MarketSignal {
  const result = evaluate(price);
  const rangePositionPercent = Math.round(computeRangePosition(price));
  const volatilityPercent = Math.round(computeVolatility(price) * 10) / 10;

  return {
    key: price.key,
    title: price.title,
    category: price.category,
    action: result.action,
    reason: result.reason,
    confidence: Math.round(Math.min(95, Math.max(5, result.confidence))),
    riskLevel: result.riskLevel,
    horizon: result.horizon,
    rangePositionPercent,
    volatilityPercent,
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

export const RISK_LEVEL_LABEL: Record<RiskLevel, string> = {
  low: "ریسک پایین",
  medium: "ریسک متوسط",
  high: "ریسک بالا",
};

export const HORIZON_LABEL: Record<SignalHorizon, string> = {
  short: "افق کوتاه‌مدت",
  mid: "افق میان‌مدت",
};
