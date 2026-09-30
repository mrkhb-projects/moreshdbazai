import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CtaSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-brand-500/30 bg-brand-500/10 px-6 py-14 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 h-56 bg-brand-500/25 blur-3xl"
          />
          <div className="relative flex flex-col items-center gap-5">
            <h2 className="max-w-lg text-2xl font-bold text-ink-50 sm:text-3xl">
              همین حالا با مرشد بازاری وارد بازار شوید
            </h2>
            <p className="max-w-md text-sm leading-7 text-ink-300">
              ثبت‌نام رایگان است و فقط با شماره موبایل، در چند ثانیه انجام می‌شود. سپس نمادهای
              موردعلاقه خود را دنبال کنید و تحلیل کامل بازار را ببینید.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/login">ورود / ثبت‌نام رایگان</ButtonLink>
              <ButtonLink href="/analysis" variant="secondary">
                مشاهده تحلیل بازار
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
