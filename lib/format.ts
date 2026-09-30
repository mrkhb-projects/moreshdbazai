/**
 * ابزارهای قالب‌بندی فارسی: اعداد، تومان، درصد و تاریخ شمسی.
 * همه‌جا در پروژه به‌جای Intl مستقیم، از همین توابع استفاده کنید تا
 * قالب‌بندی یکدست بماند.
 */

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
