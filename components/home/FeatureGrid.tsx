import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURES = [
  {
    icon: "⚡",
    title: "پوشش کامل بازار",
    description: "ارز، طلا، سکه، رمزارز، شاخص بورس و کالاهای اساسی، همه در یک داشبورد یکپارچه.",
  },
  {
    icon: "🧭",
    title: "تحلیل ترکیبی و شفاف",
    description:
      "ترکیب روند روزانه، موقعیت در بازه هفتگی و سطح نوسان، یک توصیه قابل‌فهم «خرید، فروش یا نگه‌داری» می‌سازد.",
  },
  {
    icon: "🇮🇷",
    title: "طراحی کاملاً فارسی",
    description: "رابط کاربری راست‌چین، فونت فارسی و قالب‌بندی تومانی، مخصوص کاربر ایرانی.",
  },
  {
    icon: "🔒",
    title: "ورود امن با شماره موبایل",
    description: "ورود سریع با کد یک‌بارمصرف پیامکی، بدون نیاز به رمز عبور جداگانه.",
  },
];

export function FeatureGrid() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="چرا مرشد بازاری؟"
          title="ابزار ساده برای تصمیم‌های مالی روزمره"
          description="مرشد بازاری داده‌های خام بازار را به یک تصمیم قابل‌فهم تبدیل می‌کند."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="flex flex-col gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-ink-800 text-xl" aria-hidden>
                {feature.icon}
              </span>
              <h3 className="text-base font-semibold text-ink-50">{feature.title}</h3>
              <p className="text-sm leading-6 text-ink-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
