import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FAQ_ITEMS = [
  {
    question: "داده‌های قیمت از کجا می‌آید؟",
    answer:
      "در نسخه پیش‌فرض این پروژه از داده نمونه (Demo) استفاده می‌شود تا بدون نیاز به اتصال اینترنتی هم قابل اجرا باشد. با تنظیم متغیر محیطی DATA_SOURCE=live، قیمت ارز و طلا/سکه به‌صورت زنده از tgju.org دریافت می‌شود.",
  },
  {
    question: "سیگنال «فرصت خرید» و «فرصت فروش» چطور محاسبه می‌شود؟",
    answer:
      "موتور تحلیل مرشد بازاری سه عامل را ترکیب می‌کند: جهت و شدت تغییر روزانه، موقعیت قیمت در بازه هفتگی (نزدیک به کف یا سقف هفته)، و میزان نوسان. حاصل این ترکیب یک قاعده آماری ساده است، نه مدل پیش‌بینی یا توصیه مالی رسمی.",
  },
  {
    question: "آیا می‌توانم نمادهای موردعلاقه‌ام را ذخیره کنم؟",
    answer:
      "بله. با زدن آیکون ستاره روی هر نماد، آن را به فهرست «موردعلاقه‌ها» اضافه می‌کنید. این فهرست فقط در مرورگر همین دستگاه ذخیره می‌شود و برای مشاهده آن نیازی به ثبت‌نام نیست.",
  },
  {
    question: "چند بار در روز قیمت‌ها به‌روزرسانی می‌شوند؟",
    answer:
      "صفحات قیمت و تحلیل هر ۶۰ ثانیه یک‌بار به‌صورت خودکار بازخوانی می‌شوند تا همیشه نزدیک‌ترین داده موجود را ببینید.",
  },
  {
    question: "آیا مرشد بازاری توصیه سرمایه‌گذاری ارائه می‌دهد؟",
    answer:
      "خیر. تمام سیگنال‌ها و تحلیل‌ها صرفاً برای آشنایی با روند بازار و اهداف آموزشی است. پیش از هر تصمیم مالی حتماً با یک مشاور رسمی مشورت کنید.",
  },
];

export function FAQ() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading eyebrow="سوالات متداول" title="هر آنچه باید درباره مرشد بازاری بدانید" />

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-ink-800 bg-ink-900/60 p-4 open:bg-ink-900 sm:p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-ink-100 sm:text-base">
                {item.question}
                <span className="shrink-0 text-ink-500 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-ink-400">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
