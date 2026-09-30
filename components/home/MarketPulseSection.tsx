import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { SentimentSummary } from "@/components/analysis/SentimentSummary";
import type { MarketOverview } from "@/lib/market-analysis";

export function MarketPulseSection({ overview }: { overview: MarketOverview }) {
  return (
    <section className="py-16 sm:py-20">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="تحلیل هوشمند"
            title="جمع‌بندی وضعیت کلی بازار"
            description="خلاصه‌ای از موتور تحلیل مرشد بازاری بر اساس روند روزانه، موقعیت در بازه هفتگی و نوسان تمام نمادها."
          />
          <ButtonLink href="/analysis" variant="secondary" className="self-start sm:self-auto">
            مشاهده تحلیل کامل بازار
          </ButtonLink>
        </div>

        <SentimentSummary overview={overview} />
      </Container>
    </section>
  );
}
