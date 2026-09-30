import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SignalCard } from "@/components/prices/SignalCard";
import { DataSourceNote } from "@/components/prices/DataSourceNote";
import { DisclaimerBanner } from "@/components/home/DisclaimerBanner";
import { EmptyState } from "@/components/ui/EmptyState";
import { getMarketSnapshot } from "@/lib/market-data";

export const metadata: Metadata = {
  title: "سیگنال خرید و فروش بازار",
  description: "توصیه ساده خرید، فروش یا نگه‌داری برای ارز، طلا و سکه بر اساس روند قیمت لحظه‌ای.",
};

export const revalidate = 60;

export default async function SignalsPage() {
  const snapshot = await getMarketSnapshot();

  return (
    <Container className="flex flex-col gap-8 py-12">
      <SectionHeading
        eyebrow="تحلیل ساده بازار"
        title="همین الان چی بخرم، چی بفروشم؟"
        description="بر اساس روند قیمت هر نماد در بازه اخیر، یک توصیه ساده و قابل‌فهم دریافت کنید."
      />

      <DataSourceNote source={snapshot.source} updatedAt={snapshot.updatedAt} />
      <DisclaimerBanner />

      {snapshot.signals.length === 0 ? (
        <EmptyState
          title="سیگنالی برای نمایش وجود ندارد"
          description="داده کافی برای محاسبه سیگنال در دسترس نیست."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {snapshot.signals.map((signal) => (
            <SignalCard key={signal.key} signal={signal} />
          ))}
        </div>
      )}
    </Container>
  );
}
