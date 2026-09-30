import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STEPS = [
  {
    step: "۱",
    title: "قیمت‌ها را ببینید",
    description: "به صفحه قیمت‌های لحظه‌ای بروید و وضعیت ارز، طلا و سکه موردنظرتان را بررسی کنید.",
  },
  {
    step: "۲",
    title: "سیگنال را بخوانید",
    description: "مرشد بازاری بر اساس روند اخیر قیمت، یک توصیه ساده به شما نشان می‌دهد.",
  },
  {
    step: "۳",
    title: "آگاهانه تصمیم بگیرید",
    description: "با دیدی روشن‌تر از وضعیت بازار، بهترین زمان خرید یا فروش را انتخاب کنید.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-ink-800 bg-ink-900/40 py-16 sm:py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="روش کار" title="در سه قدم ساده" align="center" />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STEPS.map((item) => (
            <div key={item.step} className="flex flex-col items-center gap-3 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-brand-500 text-lg font-bold text-onbrand">
                {item.step}
              </span>
              <h3 className="text-base font-semibold text-ink-50">{item.title}</h3>
              <p className="max-w-xs text-sm leading-6 text-ink-400">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
