import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DataSourceNote } from "@/components/prices/DataSourceNote";
import { DisclaimerBanner } from "@/components/home/DisclaimerBanner";
import { EmptyState } from "@/components/ui/EmptyState";
import { SentimentSummary } from "@/components/analysis/SentimentSummary";
import { RiskSummary } from "@/components/analysis/RiskSummary";
import { CategoryBreakdownList } from "@/components/analysis/CategoryBreakdownList";
import { MoversList } from "@/components/analysis/MoversList";
import { getMarketSnapshot } from "@/lib/market-data";
import { buildMarketOverview } from "@/lib/market-analysis";

export const metadata: Metadata = {
  title: "تحلیل جامع بازار",
  description:
    "جمع‌بندی وضعیت کلی بازار ایران: تعادل سیگنال خرید/فروش، نقشه ریسک، بیشترین رشد و افت، و تفکیک هر بازار (ارز، طلا، سکه، رمزارز، بورس، کالا).",
};

export const revalidate = 60;

export default async function AnalysisPage() {
  const snapshot = await getMarketSnapshot();

  if (snapshot.signals.length === 0) {
    return (
      <Container className="flex flex-col gap-8 py-12">
        <SectionHeading
          eyebrow="تحلیل تخصصی"
          title="تحلیل جامع بازار"
          description="جمع‌بندی هوشمند وضعیت کلی بازار بر اساس تمام نمادهای رصدشده."
        />
        <EmptyState
          title="داده‌ای برای تحلیل وجود ندارد"
          description="در حال حاضر داده کافی برای محاسبه تحلیل بازار در دسترس نیست."
        />
      </Container>
    );
  }

  const overview = buildMarketOverview(snapshot.signals);

  return (
    <Container className="flex flex-col gap-8 py-12">
      <SectionHeading
        eyebrow="تحلیل تخصصی"
        title="تحلیل جامع بازار"
        description="ترکیب روند روزانه، موقعیت در بازه هفتگی و نوسان هر نماد، برای یک جمع‌بندی یک‌نگاه از کل بازار ایران."
      />

      <DataSourceNote source={snapshot.source} updatedAt={snapshot.updatedAt} />
      <DisclaimerBanner />

      <SentimentSummary overview={overview} />
      <RiskSummary overview={overview} />
      <CategoryBreakdownList categories={overview.categories} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <MoversList title="بیشترین رشد امروز" items={overview.topGainers} emptyText="نمادی با رشد قابل توجه ثبت نشده است." />
        <MoversList title="بیشترین افت امروز" items={overview.topLosers} emptyText="نمادی با افت قابل توجه ثبت نشده است." />
        <MoversList
          title="پرنوسان‌ترین نمادهای هفته"
          items={overview.mostVolatile}
          emptyText="داده نوسان کافی نیست."
          metric="volatility"
        />
      </div>
    </Container>
  );
}
