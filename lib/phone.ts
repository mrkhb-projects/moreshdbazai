const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** تبدیل اعداد فارسی/عربی به لاتین برای پردازش یکسان ورودی‌ها */
export function toLatinDigits(input: string): string {
  return input.replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d))).replace(/[٠-٩]/g, (d) =>
    String("٠١٢٣٤٥٦٧٨٩".indexOf(d))
  );
}

/** اعتبارسنجی ساده شماره موبایل ایران (مثال: 09123456789) */
export function isValidIranianMobile(phone: string): boolean {
  const normalized = toLatinDigits(phone).trim();
  return /^09\d{9}$/.test(normalized);
}

export function normalizeMobile(phone: string): string {
  return toLatinDigits(phone).trim();
}
