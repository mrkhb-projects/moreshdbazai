/**
 * انواع داده‌ای مربوط به قیمت‌های بازار (ارز، طلا، سکه و ...).
 * این ساختار مستقل از منبع داده (tgju یا هر منبع دیگر) طراحی شده تا در
 * آینده جایگزینی منبع داده یا افزودن دیتابیس ساده باشد.
 */

export type MarketCategory =
  | "currency"
  | "gold"
  | "coin"
  | "crypto"
  | "stock"
  | "commodity";

export type PriceDirection = "up" | "down" | "flat";

export type SignalAction = "buy" | "sell" | "hold";

/** سطح ریسک/نوسان تخمینی نماد بر اساس پهنای بازه هفتگی نسبت به قیمت */
export type RiskLevel = "low" | "medium" | "high";

/** افق زمانی پیشنهادی برای پیگیری سیگنال */
export type SignalHorizon = "short" | "mid";

export interface MarketPrice {
  /** شناسه یکتا و پایدار، برگرفته از کلید منبع داده (مثلاً price_dollar_rl) */
  key: string;
  /** عنوان فارسی برای نمایش به کاربر */
  title: string;
  /** دسته‌بندی بازار */
  category: MarketCategory;
  /** واحد نمایش قیمت */
  unit: "toman" | "usd" | "point";
  /** قیمت لحظه‌ای */
  price: number;
  /** بیشترین قیمت روزانه */
  high: number;
  /** کمترین قیمت روزانه */
  low: number;
  /** بیشترین قیمت در بازه هفتگی اخیر (برای تحلیل روند) */
  weekHigh: number;
  /** کمترین قیمت در بازه هفتگی اخیر (برای تحلیل روند) */
  weekLow: number;
  /** مقدار تغییر نسبت به قیمت پایه */
  changeAmount: number;
  /** درصد تغییر */
  changePercent: number;
  /** جهت تغییر */
  direction: PriceDirection;
  /** زمان به‌روزرسانی (ISO) */
  updatedAt: string;
}

export interface MarketSignal {
  key: string;
  title: string;
  category: MarketCategory;
  action: SignalAction;
  /** توضیح کوتاه دلیل توصیه، به زبان ساده */
  reason: string;
  /** میزان اطمینان از ۰ تا ۱۰۰ (صرفاً شاخصی نمایشی بر پایه قواعد ساده) */
  confidence: number;
  /** سطح ریسک/نوسان تخمینی */
  riskLevel: RiskLevel;
  /** افق زمانی پیشنهادی برای پیگیری این سیگنال */
  horizon: SignalHorizon;
  /** موقعیت قیمت فعلی در بازه هفتگی، از ۰ (کف هفته) تا ۱۰۰ (سقف هفته) */
  rangePositionPercent: number;
  /** درصد نوسان هفتگی (پهنای بازه هفتگی نسبت به قیمت) */
  volatilityPercent: number;
  price: MarketPrice;
}

export interface MarketSnapshot {
  prices: MarketPrice[];
  signals: MarketSignal[];
  /** آیا داده از منبع زنده گرفته شد یا نمونه (fallback) بود */
  source: "live" | "mock";
  updatedAt: string;
}
