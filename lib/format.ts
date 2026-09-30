/**
 * ابزارهای قالب‌بندی فارسی: اعداد، تومان، درصد و تاریخ شمسی.
 * همه‌جا در پروژه به‌جای Intl مستقیم، از همین توابع استفاده کنید تا
 * قالب‌بندی یکدست بماند.
 */

import type { MarketPrice } from "@/types/price";

const faNumberFormatter = new Intl.NumberFormat("fa-IR");
const faPercentFormatter = new Intl.NumberFormat("fa-IR", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

/** تبدیل عدد به رشته با اعداد فارسی و جداکننده هزارگان */
export function formatNumberFa(value: number): string {
  return faNumberFormatter.format(Math.round(value));
}

/** قالب‌بندی مبلغ به تومان با پسوند «تومان» */
export function formatToman(value: number): string {
  return `${faNumberFormatter.format(Math.round(value))} تومان`;
}

/**
 * تعداد رقم اعشار مناسب برای نمایش مبالغ دلاری: دارایی‌های کم‌ارزش
 * (مثلاً گاز طبیعی یا ریپل) بدون اعشار به‌کلی بی‌معنا می‌شوند.
 */
function usdDecimals(value: number): number {
  const abs = Math.abs(value);
  if (abs < 10) return 3;
  if (abs < 1000) return 2;
  return 0;
}

/** قالب‌بندی عدد خام بر حسب واحد قیمت (بدون پسوند)، برای استفاده در بازه کمترین/بیشترین */
export function formatRangeNumber(value: number, unit: MarketPrice["unit"]): string {
  if (unit === "usd") {
    const decimals = usdDecimals(value);
    return new Intl.NumberFormat("fa-IR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }
  return formatNumberFa(value);
}

/** قالب‌بندی مبلغ دلاری با پسوند «دلار» و رقم اعشار مناسب */
export function formatUsd(value: number): string {
  return `${formatRangeNumber(value, "usd")} دلار`;
}

/** قالب‌بندی مقدار شاخص بورس با پسوند «واحد» */
export function formatPoint(value: number): string {
  return `${formatNumberFa(value)} واحد`;
}

/** قالب‌بندی قیمت یک نماد بر اساس واحد آن (تومان/دلار/واحد شاخص) */
export function formatPriceValue(price: Pick<MarketPrice, "unit" | "price">): string {
  switch (price.unit) {
    case "toman":
      return formatToman(price.price);
    case "point":
      return formatPoint(price.price);
    case "usd":
    default:
      return formatUsd(price.price);
  }
}

/** تبدیل ریال (واحد اصلی داده منبع) به تومان */
export function rialToToman(rial: number): number {
  return Math.round(rial / 10);
}

/** قالب‌بندی درصد تغییر همراه با علامت + یا - */
export function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${faPercentFormatter.format(Math.abs(value))}٪`;
}

/** قالب‌بندی زمان به‌صورت ساعت:دقیقه فارسی */
export function formatTimeFa(iso: string): string {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}

/** قالب‌بندی تاریخ کامل شمسی */
export function formatDateFa(iso: string): string {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}
