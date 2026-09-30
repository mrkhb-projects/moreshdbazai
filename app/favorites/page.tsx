import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DataSourceNote } from "@/components/prices/DataSourceNote";
import { FavoritesList } from "@/components/prices/FavoritesList";
import { getMarketSnapshot } from "@/lib/market-data";

export const metadata: Metadata = {
  title: "موردعلاقه‌ها",
  description: "نمادهای موردعلاقه شما در یک نگاه — این فهرست فقط در مرورگر شما ذخیره می‌شود.",
};

export const revalidate = 60;

export default async function FavoritesPage() {
  const snapshot = await getMarketSnapshot();
  const signalByKey = Object.fromEntries(snapshot.signals.map((s) => [s.key, s.action]));

  return (
    <Container className="flex flex-col gap-8 py-12">
      <SectionHeading
        eyebrow="شخصی‌سازی"
        title="موردعلاقه‌ها"
        description="نمادهایی که با ستاره علامت زده‌اید، اینجا و به‌صورت لحظه‌ای کنار هم قابل مشاهده‌اند."
      />

      <DataSourceNote source={snapshot.source} updatedAt={snapshot.updatedAt} />

      <FavoritesList prices={snapshot.prices} signalByKey={signalByKey} />
    </Container>
  );
}
