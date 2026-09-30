import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE_NAME } from "@/lib/constants";

const FOOTER_LINKS = [
  { href: "/prices", label: "قیمت‌های لحظه‌ای" },
  { href: "/signals", label: "سیگنال بازار" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800 bg-ink-950">
      <Container className="flex flex-col gap-8 py-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row">
          <div className="max-w-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-ink-950">
                م
              </span>
              <span className="font-bold text-ink-50">{SITE_NAME}</span>
            </div>
            <p className="text-sm leading-6 text-ink-400">
              مرشد بازاری، قیمت لحظه‌ای ارز، طلا و سکه را از منابع معتبر بازار ایران رصد می‌کند و
              تحلیلی ساده برای تصمیم‌گیری اقتصادی روزمره ارائه می‌دهد.
            </p>
          </div>

          <nav aria-label="لینک‌های پابرگ" className="flex flex-col gap-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-ink-400 hover:text-brand-400">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="rounded-xl border border-ink-800 bg-ink-900/50 p-4 text-xs leading-6 text-ink-500">
          <strong className="text-ink-300">سلب مسئولیت: </strong>
          محتوای «{SITE_NAME}» صرفاً جنبه اطلاع‌رسانی و آموزشی دارد و توصیه مالی رسمی محسوب
          نمی‌شود. قیمت‌ها از سرویس عمومی tgju.org دریافت می‌شوند و ممکن است با قیمت لحظه‌ای
          بازار اختلاف داشته باشند. مسئولیت هرگونه تصمیم خرید و فروش بر عهده کاربر است.
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-ink-800 pt-6 text-xs text-ink-500 sm:flex-row">
          <span>© {year} {SITE_NAME}. تمامی حقوق محفوظ است.</span>
          <span>ساخته‌شده با Next.js برای اجرا روی سرویس ابری ایرانی لیارا</span>
        </div>
      </Container>
    </footer>
  );
}
