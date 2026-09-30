import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/home/ContactForm";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "سوال، پیشنهاد یا انتقاد خود را با تیم مرشد بازاری در میان بگذارید.",
};

export default function ContactPage() {
  return (
    <Container className="flex flex-col gap-10 py-14">
      <SectionHeading
        eyebrow="در ارتباط باشید"
        title="تماس با تیم مرشد بازاری"
        description="این فرم فعلاً یک نمونه دمو است. برای اتصال واقعی ایمیل یا تیکت، بخش README را ببینید."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <ContactForm />
        </Card>

        <Card className="flex flex-col gap-4 text-sm text-ink-400">
          <div>
            <h3 className="mb-1 text-sm font-semibold text-ink-100">ایمیل پشتیبانی</h3>
            <p dir="ltr" className="text-start">support@moreshdbazari.ir</p>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold text-ink-100">ساعات پاسخگویی</h3>
            <p>شنبه تا چهارشنبه، ۹ تا ۱۷</p>
          </div>
        </Card>
      </div>
    </Container>
  );
}
