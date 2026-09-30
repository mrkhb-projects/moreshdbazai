import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink-800 bg-gradient-to-b from-ink-900 to-ink-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-brand-500/20 blur-3xl"
      />
      <Container className="relative flex flex-col items-center gap-6 py-16 text-center sm:py-24">
        <span className="rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-medium text-brand-300">
          داده و تحلیل بازار ارز، طلا، سکه، رمزارز، بورس و کالا
        </span>

        <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.4] text-ink-50 sm:text-5xl sm:leading-[1.3]">
          مرشد بازاری؛ همیشه بدانید همین الان
          <br className="hidden sm:block" /> باید بخرید یا بفروشید
        </h1>

        <p className="max-w-xl text-sm leading-7 text-ink-400 sm:text-base">
          قیمت دلار، طلا، سکه، رمزارز، شاخص بورس و کالاهای اساسی را لحظه‌به‌لحظه رصد کنید و با
          تحلیل ترکیبی روند روزانه، بازه هفتگی و نوسان، بفهمید بازار در چه وضعیتی است؛ بدون نیاز
          به تخصص مالی.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/prices">مشاهده قیمت‌های لحظه‌ای</ButtonLink>
          <ButtonLink href="/analysis" variant="secondary">
            مشاهده تحلیل بازار
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
