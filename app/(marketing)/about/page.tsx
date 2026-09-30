import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "درباره ما",
  description: `${SITE_NAME} چیست و چگونه به شما در تصمیم‌های مالی روزمره کمک می‌کند.`,
};

const VALUES = [
  {
    title: "شفافیت",
    description: "منبع داده و محدودیت‌های سیگنال‌ها را صادقانه اعلام می‌کنیم.",
  },
  {
    title: "سادگی",
    description: "بدون اصطلاحات پیچیده مالی؛ فقط یک توصیه قابل‌فهم.",
  },
  {
    title: "برای همه",
    description: "مناسب افرادی که تخصص مالی ندارند اما می‌خواهند تصمیم بهتری بگیرند.",
  },
];

export default function AboutPage() {
  return (
    <Container className="flex flex-col gap-10 py-14">
      <SectionHeading
        eyebrow="درباره ما"
        title={`${SITE_NAME}، دستیار اقتصادی روزمره شما`}
        description="مرشد بازاری با رصد لحظه‌ای بازار ارز، طلا و سکه ایران، اطلاعات پیچیده بازار را به تصمیم‌های ساده تبدیل می‌کند."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {VALUES.map((value) => (
          <Card key={value.title}>
            <h3 className="mb-2 text-base font-semibold text-ink-50">{value.title}</h3>
            <p className="text-sm leading-6 text-ink-400">{value.description}</p>
          </Card>
        ))}
      </div>

      <Card className="leading-7 text-ink-300">
        <h2 className="mb-3 text-lg font-bold text-ink-50">داستان ما</h2>
        <p className="text-sm">
          پیگیری هم‌زمان قیمت دلار، طلا و سکه از چند سایت مختلف، کار وقت‌گیری است. مرشد بازاری
          این اطلاعات را یک‌جا و به زبان ساده در اختیار شما می‌گذارد تا با اطمینان بیشتری در
          مورد پول خود تصمیم بگیرید.
        </p>
      </Card>
    </Container>
  );
}
