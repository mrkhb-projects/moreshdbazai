// این فایل فقط باید سمت سرور (Route Handler یا Server Component) فراخوانی
// شود چون به فایل‌سیستم و (اختیاری) شبکه دسترسی دارد.
import { readFile } from "fs/promises";
import path from "path";
import { TRACKED_SYMBOLS } from "@/lib/constants";
import { buildSignals } from "@/lib/signals";
import type { MarketPrice, MarketSnapshot, PriceDirection } from "@/types/price";

/**
 * =============================================================================
 * منبع داده بازار — حالت «Demo» در برابر حالت «Live»
 * =============================================================================
 * در حال حاضر پروژه در حالت **Demo** اجرا می‌شود: تمام قیمت‌ها از فایل محلی
 * data/market-prices.json خوانده می‌شوند و هیچ درخواست شبکه‌ای به سرویس
 * بیرونی زده نمی‌شود. این یعنی پروژه در Preview خود Arena، یا هر محیط
 * آفلاین دیگر، بدون نیاز به دیتابیس یا API واقعی کامل کار می‌کند.
 *
 * وقتی پروژه را روی Liara مستقر کردید و خواستید قیمت واقعی و لحظه‌ای از
 * tgju.org دریافت شود، کافی است متغیر محیطی زیر را تنظیم کنید:
 *
 *   DATA_SOURCE=live
 *
 * در این حالت ابتدا تلاش می‌شود از سرویس داده tgju (آدرس آن از TGJU_API_URL
 * خوانده می‌شود) داده زنده گرفته شود؛ اگر به هر دلیلی (قطعی شبکه، Timeout،
 * تغییر فرمت پاسخ) ناموفق بود، برنامه بدون کرش کردن به همان فایل JSON محلی
 * برمی‌گردد تا سایت هرگز از کار نیفتد.
 * =============================================================================
 */

const DATA_FILE = path.join(process.cwd(), "data", "market-prices.json");
const DEFAULT_TGJU_URL = "https://call1.tgju.org/ajax.json";
const DEFAULT_CACHE_SECONDS = 60;

interface LocalPriceEntry {
  key: string;
  title: string;
  category: MarketPrice["category"];
  unit: MarketPrice["unit"];
  price: number;
  high: number;
  low: number;
  weekHigh: number;
  weekLow: number;
  changeAmount: number;
  changePercent: number;
  direction: PriceDirection;
}

interface LocalDataFile {
  note?: string;
  prices: LocalPriceEntry[];
}

function getDataSource(): "json" | "live" {
  return process.env.DATA_SOURCE === "live" ? "live" : "json";
}

/** خواندن قیمت‌های نمونه از فایل JSON محلی (data/market-prices.json) */
async function readLocalPrices(): Promise<MarketPrice[]> {
  const raw = await readFile(DATA_FILE, "utf-8");
  const parsed = JSON.parse(raw) as LocalDataFile;
  const updatedAt = new Date().toISOString();

  return parsed.prices.map((item) => ({ ...item, updatedAt }));
}

// ---------------------------------------------------------------------------
// منطق دریافت داده زنده از tgju (فقط وقتی DATA_SOURCE=live باشد فعال می‌شود)
// ---------------------------------------------------------------------------

interface TgjuRawItem {
  p?: string | number;
  h?: string | number;
  l?: string | number;
  d?: string | number;
  dp?: number;
  dt?: "high" | "low" | "";
  ts?: string;
}

type TgjuRawResponse = { current?: Record<string, TgjuRawItem> };

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

function rialToToman(rial: number): number {
  return Math.round(rial / 10);
}

async function fetchRawTgjuData(): Promise<TgjuRawResponse | null> {
  const url = process.env.TGJU_API_URL?.trim() || DEFAULT_TGJU_URL;
  const cacheSeconds =
    Number.parseInt(process.env.PRICE_CACHE_SECONDS || "", 10) || DEFAULT_CACHE_SECONDS;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: cacheSeconds },
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

// سرویس عمومی ajax.json فقط بازه بالا/پایین «روزانه» می‌دهد، نه هفتگی. برای
// این‌که محاسبه سیگنال (که به بازه هفتگی نیاز دارد) در حالت Live هم کار کند،
// بازه هفتگی را با کمی حاشیه اطراف بازه روزانه تخمین می‌زنیم. این یک
// تقریب ساده است، نه داده واقعی هفتگی.
const WEEK_RANGE_MARGIN = 0.015; // ۱.۵٪ حاشیه اطراف بازه روزانه

function estimateWeekRange(dailyLow: number, dailyHigh: number, price: number) {
  if (dailyHigh <= 0 || dailyLow <= 0 || dailyHigh < dailyLow) {
    // داده روزانه معتبر نیست؛ یک بازه خیلی محافظه‌کارانه دور قیمت فعلی می‌سازیم
    return { weekLow: price * 0.97, weekHigh: price * 1.03 };
  }
  return {
    weekLow: dailyLow * (1 - WEEK_RANGE_MARGIN),
    weekHigh: dailyHigh * (1 + WEEK_RANGE_MARGIN),
  };
}

function mapToMarketPrices(raw: TgjuRawResponse): MarketPrice[] {
  const prices: MarketPrice[] = [];

  for (const symbol of TRACKED_SYMBOLS) {
    const item = raw.current?.[symbol.key];
    if (!item || item.p === undefined) continue;

    const rawPrice = toNumber(item.p);
    if (rawPrice <= 0) continue;

    const convert = symbol.isRial ? rialToToman : (v: number) => v;

    const price = convert(rawPrice);
    const high = convert(toNumber(item.h));
    const low = convert(toNumber(item.l));
    const { weekLow, weekHigh } = estimateWeekRange(low, high, price);

    prices.push({
      key: symbol.key,
      title: symbol.title,
      category: symbol.category,
      unit: symbol.unit,
      price,
      high,
      low,
      weekHigh,
      weekLow,
      changeAmount: convert(toNumber(item.d)),
      changePercent: item.dp ?? 0,
      direction: toDirection(item.dt),
      updatedAt: item.ts ? new Date(item.ts.replace(" ", "T")).toISOString() : new Date().toISOString(),
    });
  }

  return prices;
}

async function readLivePrices(): Promise<MarketPrice[] | null> {
  const raw = await fetchRawTgjuData();
  if (!raw) return null;

  const parsed = mapToMarketPrices(raw);
  const enoughData = parsed.length >= Math.ceil(TRACKED_SYMBOLS.length / 2);
  return enoughData ? parsed : null;
}

/**
 * دریافت آخرین وضعیت بازار.
 * - حالت پیش‌فرض (Demo): همیشه از فایل JSON محلی می‌خواند؛ هیچ درخواست
 *   شبکه‌ای زده نمی‌شود.
 * - حالت Live (`DATA_SOURCE=live`): ابتدا تلاش برای داده زنده، در صورت خطا
 *   بازگشت شفاف به همان فایل JSON محلی.
 */
export async function getMarketSnapshot(): Promise<MarketSnapshot> {
  const mode = getDataSource();

  if (mode === "live") {
    const live = await readLivePrices();
    if (live) {
      return {
        prices: live,
        signals: buildSignals(live),
        source: "live",
        updatedAt: new Date().toISOString(),
      };
    }
  }

  const local = await readLocalPrices();
  return {
    prices: local,
    signals: buildSignals(local),
    source: "mock",
    updatedAt: new Date().toISOString(),
  };
}
