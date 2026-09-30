/**
 * انواع داده‌ای مربوط به احراز هویت.
 * سیستم فعلی صرفاً یک Mock توسعه است (بدون ارسال پیامک واقعی) اما ساختار
 * آن طوری است که بعداً با جایگزینی lib/sms.ts با یک سرویس پیامک واقعی
 * ایرانی (مثل کاوه‌نگار یا ملی‌پیامک)، بدون تغییر در UI قابل اتصال است.
 */

export interface OtpRequestResult {
  ok: boolean;
  message: string;
  /** فقط در حالت توسعه/mock برای راحتی تست نمایش داده می‌شود */
  devCode?: string;
}

export interface OtpVerifyResult {
  ok: boolean;
  message: string;
}

export interface SessionUser {
  phone: string;
  createdAt: string;
}
