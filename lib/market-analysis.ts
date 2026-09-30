import { CATEGORY_LABELS } from "@/lib/constants";
import { RISK_LEVEL_LABEL } from "@/lib/signals";
import type { MarketCategory, MarketSignal, RiskLevel } from "@/types/price";

/**
 * تحلیل کلی بازار (Market Overview).
 *
 * این ماژول آمار سیگنال‌های تولیدشده در lib/signals.ts را در سطح کل بازار و
 * به تفکیک هر دسته (ارز، طلا، سکه، رمزارز، بورس، کالا) جمع‌بندی می‌کند تا
 * یک «خلاصه تحلیلگر» قابل‌فهم و یک‌نگاه از وضعیت بازار به‌دست بدهد. مانند
 * lib/signals.ts، این‌جا هم یک تجمیع آماری ساده روی داده نمونه/زنده است، نه
 * تحلیل بنیادی یا مدل پیش‌بینی واقعی.
 */

export interface CategoryBreakdown {
  category: MarketCategory;
  label: string;
  total: number;
  buy: number;
  sell: number;
  hold: number;
  avgVolatility: number;
  dominantAction: "buy" | "sell" | "hold";
}

export type MarketSentiment = "bullish" | "bearish" | "neutral";

export interface MarketOverview {
  totalInstruments: number;
  buyCount: number;
  sellCount: number;
  holdCount: number;
  buyShare: number;
  sellShare: number;
  holdShare: number;
  sentiment: MarketSentiment;
  avgVolatility: number;
  riskyCount: number;
  riskBreakdown: Record<RiskLevel, number>;
  topGainers: MarketSignal[];
  topLosers: MarketSignal[];
  mostVolatile: MarketSignal[];
  categories: CategoryBreakdown[];
  summary: string;
}

export const SENTIMENT_LABEL: Record<MarketSentiment, string> = {
  bullish: "مثبت (اکثریت سیگنال‌ها خرید)",
  bearish: "منفی (اکثریت سیگنال‌ها فروش)",
  neutral: "خنثی (نگه‌داری غالب است)",
};

function share(count: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((count / total) * 1000) / 10;
}

function dominantActionOf(buy: number, sell: number, hold: number): "buy" | "sell" | "hold" {
  if (buy >= sell && buy >= hold) return "buy";
  if (sell >= buy && sell >= hold) return "sell";
  return "hold";
}

function buildCategoryBreakdown(signals: MarketSignal[]): CategoryBreakdown[] {
  const byCategory = new Map<MarketCategory, MarketSignal[]>();
  for (const signal of signals) {
    const list = byCategory.get(signal.category) ?? [];
    list.push(signal);
    byCategory.set(signal.category, list);
  }

  return Array.from(byCategory.entries()).map(([category, list]) => {
    const buy = list.filter((s) => s.action === "buy").length;
    const sell = list.filter((s) => s.action === "sell").length;
    const hold = list.filter((s) => s.action === "hold").length;
    const avgVolatility =
      Math.round((list.reduce((sum, s) => sum + s.volatilityPercent, 0) / list.length) * 10) / 10;

    return {
      category,
      label: CATEGORY_LABELS[category],
      total: list.length,
      buy,
      sell,
      hold,
      avgVolatility,
      dominantAction: dominantActionOf(buy, sell, hold),
    };
  });
}

function buildSummary(overview: {
  sentiment: MarketSentiment;
  buyShare: number;
  sellShare: number;
  holdShare: number;
  riskyCount: number;
  totalInstruments: number;
  categories: CategoryBreakdown[];
}): string {
  const { sentiment, buyShare, sellShare, holdShare, riskyCount, totalInstruments, categories } = overview;

  const leadingCategory = [...categories].sort((a, b) => {
    const aShare = a.dominantAction === "hold" ? 0 : (a.dominantAction === "buy" ? a.buy : a.sell) / a.total;
    const bShare = b.dominantAction === "hold" ? 0 : (b.dominantAction === "buy" ? b.buy : b.sell) / b.total;
    return bShare - aShare;
  })[0];

  const sentimentSentence =
    sentiment === "bullish"
      ? `فضای کلی بازار رو به رشد است؛ ${buyShare}٪ از نمادها سیگنال «فرصت خرید» دارند.`
      : sentiment === "bearish"
        ? `فضای کلی بازار نزولی است؛ ${sellShare}٪ از نمادها سیگنال «فرصت فروش» دارند.`
        : `فضای کلی بازار خنثی است؛ ${holdShare}٪ از نمادها در وضعیت «نگه‌داری» قرار دارند.`;

  const riskSentence =
    riskyCount > 0
      ? `از مجموع ${totalInstruments} نماد رصدشده، ${riskyCount} مورد نوسان هفتگی بالا (ریسک بالا) دارند و نیازمند احتیاط بیشتر هستند.`
      : `در حال حاضر هیچ نمادی در سطح ریسک بالا قرار ندارد.`;

  const categorySentence = leadingCategory
    ? `بیشترین هم‌سویی سیگنال در دسته «${leadingCategory.label}» دیده می‌شود (${
        leadingCategory.dominantAction === "buy"
          ? "غلبه سیگنال خرید"
          : leadingCategory.dominantAction === "sell"
            ? "غلبه سیگنال فروش"
            : "غلبه نگه‌داری"
      }).`
    : "";

  return `${sentimentSentence} ${riskSentence} ${categorySentence}`.trim();
}

export function buildMarketOverview(signals: MarketSignal[]): MarketOverview {
  const totalInstruments = signals.length;
  const buyCount = signals.filter((s) => s.action === "buy").length;
  const sellCount = signals.filter((s) => s.action === "sell").length;
  const holdCount = signals.filter((s) => s.action === "hold").length;

  const buyShare = share(buyCount, totalInstruments);
  const sellShare = share(sellCount, totalInstruments);
  const holdShare = share(holdCount, totalInstruments);

  const sentiment: MarketSentiment =
    buyCount > sellCount && buyCount > holdCount
      ? "bullish"
      : sellCount > buyCount && sellCount > holdCount
        ? "bearish"
        : "neutral";

  const avgVolatility =
    totalInstruments > 0
      ? Math.round((signals.reduce((sum, s) => sum + s.volatilityPercent, 0) / totalInstruments) * 10) / 10
      : 0;

  const riskBreakdown: Record<RiskLevel, number> = { low: 0, medium: 0, high: 0 };
  for (const s of signals) riskBreakdown[s.riskLevel] += 1;

  const byChange = [...signals].sort((a, b) => b.price.changePercent - a.price.changePercent);
  const topGainers = byChange.slice(0, 3).filter((s) => s.price.changePercent > 0);
  const topLosers = byChange
    .slice(-3)
    .reverse()
    .filter((s) => s.price.changePercent < 0);

  const mostVolatile = [...signals].sort((a, b) => b.volatilityPercent - a.volatilityPercent).slice(0, 3);

  const categories = buildCategoryBreakdown(signals).sort((a, b) => b.total - a.total);

  const overview: MarketOverview = {
    totalInstruments,
    buyCount,
    sellCount,
    holdCount,
    buyShare,
    sellShare,
    holdShare,
    sentiment,
    avgVolatility,
    riskyCount: riskBreakdown.high,
    riskBreakdown,
    topGainers,
    topLosers,
    mostVolatile,
    categories,
    summary: "",
  };

  overview.summary = buildSummary(overview);
  return overview;
}

export { RISK_LEVEL_LABEL };
