import { OTP_TTL_SECONDS } from "@/lib/constants";

/**
 * ذخیره‌سازی موقت کد تایید در حافظه سرور.
 *
 * ⚠️ این پیاده‌سازی فقط برای دموی توسعه مناسب است (یک نمونه پردازشی).
 * برای Production واقعی با چند Instance، این Map را با Redis یا جدول
 * دیتابیس (پس از افزودن PostgreSQL طبق README) جایگزین کنید؛ امضای تابع‌ها
 * بدون تغییر می‌ماند.
 */

interface OtpEntry {
  code: string;
  expiresAt: number;
}

const store = new Map<string, OtpEntry>();

export function saveOtp(phone: string, code: string): void {
  store.set(phone, {
    code,
    expiresAt: Date.now() + OTP_TTL_SECONDS * 1000,
  });
}

export function verifyOtp(phone: string, code: string): boolean {
  const entry = store.get(phone);
  if (!entry) return false;

  const isValid = entry.code === code && Date.now() <= entry.expiresAt;
  if (isValid) store.delete(phone);
  return isValid;
}

export function generateOtpCode(length = 5): string {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return String(Math.floor(min + Math.random() * (max - min))).slice(0, length);
}
