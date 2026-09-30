// این فایل فقط باید سمت سرور (Route Handler یا Server Component) فراخوانی
// شود چون به سرویس بیرونی وصل می‌شود. برای جلوگیری از نصب وابستگی اضافی،
// به‌جای پکیج «server-only» صرفاً با کامنت این محدودیت مستند شده است.
import { TRACKED_SYMBOLS } from "@/lib/constants";
import { MOCK_PRICES } from "@/lib/mock-data";
import { rialToToman } from "@/lib/format";
import type { MarketPrice, MarketSnapshot, PriceDirection } from "@/types/price";
import { buildSignals } from "@/lib/signals";

const DEFAULT_TGJU_URL = "https://call1.tgju.org/ajax.json";
const DEFAULT_CACHE_SECONDS = 60;

/** شکل خام هر آیتم در پاسخ سرویس داده tgju */
interface TgjuRawItem {
  p?: string | number;
  h?: string | number;
  l?: string | number;
  d?: string | number;
  dp?: number;
  dt?: "high" | "low" | "";
  ts?: string;
}

type TgjuRawResponse = {
  current?: Record<string, TgjuRawItem>;
};

function toNumber(value: string | number | undefined): number {
  if (value === undefined) return 0;
  if (typeof value === "number") return value;
  const cleaned = value.replace(/,/g, "").trim();
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toDirection(dt: TgjuRawItem["dt"]): PriceDirection {
  if (dt === "high") return "up";
  if (dt === "low") return "down";
  return "flat";
}

function getTgjuUrl(): string {
  return process.env.TGJU_API_URL?.trim() || DEFAULT_TGJU_URL;
}

function getCacheSeconds(): number {
  const raw = Number.parseInt(process.env.PRICE_CACHE_SECONDS || "", 10);
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_CACHE_SECONDS;
}

/**
 * دریافت داده خام از سرویس tgju. در صورت هرگونه خطا (شبکه، Timeout، فرمت
 * نامعتبر و ...) مقدار null برمی‌گردد تا لایه بالاتر به‌سادگی سراغ داده
 * نمونه برود و سایت هرگز Down نشود.
 */
async function fetchRawTgjuData(): Promise<TgjuRawResponse | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(getTgjuUrl(), {
      signal: controller.signal,
      next: { revalidate: getCacheSeconds() },
      headers: {
        accept: "application/json",
        "user-agent": "moreshd-bazari/1.0 (+https://moreshdbazari.ir)",
      },
    });

    if (!res.ok) return null;

    const data = (await res.json()) as TgjuRawResponse;
    if (!data || typeof data !== "object" || !data.current) return null;

    return data;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function mapToMarketPrices(raw: TgjuRawResponse): MarketPrice[] {
  const prices: MarketPrice[] = [];

  for (const symbol of TRACKED_SYMBOLS) {
    const item = raw.current?.[symbol.key];
    if (!item || item.p === undefined) continue;

    const rawPrice = toNumber(item.p);
    if (rawPrice <= 0) continue;

    const convert = symbol.isRial ? rialToToman : (v: number) => v;

    prices.push({
      key: symbol.key,
      title: symbol.title,
      category: symbol.category,
      unit: symbol.unit,
      price: convert(rawPrice),
      high: convert(toNumber(item.h)),
      low: convert(toNumber(item.l)),
      changeAmount: convert(toNumber(item.d)),
      changePercent: item.dp ?? 0,
      direction: toDirection(item.dt),
      updatedAt: item.ts ? new Date(item.ts.replace(" ", "T")).toISOString() : new Date().toISOString(),
    });
  }

  return prices;
}

/**
 * دریافت آخرین قیمت‌ها. اگر منبع زنده در دسترس نباشد یا داده کافی برنگرداند
 * (مثلاً کمتر از نیمی از نمادهای موردنظر)، به‌صورت شفاف از داده نمونه
 * استفاده می‌شود.
 */
export async function getMarketSnapshot(): Promise<MarketSnapshot> {
  const raw = await fetchRawTgjuData();
  const liveParsed = raw ? mapToMarketPrices(raw) : [];

  const useLive = liveParsed.length >= Math.ceil(TRACKED_SYMBOLS.length / 2);
  const prices = useLive ? liveParsed : MOCK_PRICES;

  return {
    prices,
    signals: buildSignals(prices),
    source: useLive ? "live" : "mock",
    updatedAt: new Date().toISOString(),
  };
}
