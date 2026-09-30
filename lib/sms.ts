/**
 * لایه انتزاعی سرویس پیامک.
 *
 * در حال حاضر هیچ سرویس پیامک ایرانی متصل نیست، بنابراین این ماژول در
 * «حالت توسعه/Mock» کار می‌کند: به‌جای ارسال واقعی پیامک، کد تایید را در
 * لاگ سرور چاپ می‌کند و همچنین (فقط در همین حالت) آن را در پاسخ API
 * برمی‌گرداند تا بتوان بدون داشتن گوشی واقعی تست کرد.
 *
 * برای اتصال به یک سرویس واقعی ایرانی (مثلاً کاوه‌نگار، ملی‌پیامک، ippanel):
 *   ۱. AUTH_MODE=sms را در Environment Variables تنظیم کنید.
 *   ۲. کلیدهای SMS_PROVIDER_API_KEY و SMS_PROVIDER_SENDER را مقداردهی کنید.
 *   ۳. تابع sendOtpSms را با فراخوانی API واقعی آن سرویس جایگزین کنید.
 * بقیه پروژه (UI، مسیرهای API) بدون تغییر باقی می‌ماند.
 */

export type AuthMode = "mock" | "sms";

export function getAuthMode(): AuthMode {
  return process.env.AUTH_MODE === "sms" ? "sms" : "mock";
}

export interface SendOtpResult {
  ok: boolean;
  /** فقط وقتی حالت mock فعال است پر می‌شود؛ هرگز در محیط sms واقعی برنگردانید */
  devCode?: string;
}

export async function sendOtpSms(phone: string, code: string): Promise<SendOtpResult> {
  const mode = getAuthMode();

  if (mode === "mock") {
    console.log(`[mock-sms] کد تایید برای ${phone}: ${code}`);
    return { ok: true, devCode: code };
  }

  const apiKey = process.env.SMS_PROVIDER_API_KEY;
  const sender = process.env.SMS_PROVIDER_SENDER;

  if (!apiKey || !sender) {
    // پیکربندی ناقص است؛ به‌جای کرش، خطای قابل‌فهم برمی‌گردانیم.
    console.error("SMS_PROVIDER_API_KEY یا SMS_PROVIDER_SENDER تنظیم نشده است.");
    return { ok: false };
  }

  // TODO: اتصال واقعی به سرویس پیامک ایرانی موردنظر را اینجا پیاده‌سازی کنید.
  // مثال کلی:
  // await fetch("https://api.provider.ir/send", {
  //   method: "POST",
  //   headers: { Authorization: `Bearer ${apiKey}` },
  //   body: JSON.stringify({ sender, receptor: phone, message: `کد تایید: ${code}` }),
  // });

  return { ok: false };
}
