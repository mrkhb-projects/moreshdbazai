import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PriceTable } from "@/components/prices/PriceTable";
import { DataSourceNote } from "@/components/prices/DataSourceNote";
import { EmptyState } from "@/components/ui/EmptyState";
import { getMarketSnapshot } from "@/lib/market-data";

export const metadata: Metadata = {
  title: "قیمت لحظه‌ای ارز، طلا و سکه",
  description: "قیمت لحظه‌ای دلار، یورو، طلا و سکه در بازار ایران، به‌همراه بیشترین و کمترین قیمت روز.",
};

export const revalidate = 60;

export default async function PricesPage() {
  const snapshot = await getMarketSnapshot();

  return (
    <Container className="flex flex-col gap-8 py-12">
      <SectionHeading
        eyebrow="بازار زنده"
        title="قیمت لحظه‌ای ارز، طلا و سکه"
        description="این نسخه نمایشی (Demo) است و از داده نمونه استفاده می‌کند؛ در نسخه متصل به سرویس زنده، اطلاعات از tgju.org هر دقیقه به‌روزرسانی می‌شود."
      />

      <DataSourceNote source={snapshot.source} updatedAt={snapshot.updatedAt} />

      {snapshot.prices.length === 0 ? (
        <EmptyState
          title="داده‌ای برای نمایش وجود ندارد"
          description="سرویس قیمت موقتاً در دسترس نیست. لطفاً چند لحظه دیگر دوباره تلاش کنید."
        />
      ) : (
        <PriceTable prices={snapshot.prices} />
      )}
    </Container>
  );
}
