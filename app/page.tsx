import { Hero } from "@/components/home/Hero";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CtaSection } from "@/components/home/CtaSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PriceCard } from "@/components/prices/PriceCard";
import { DataSourceNote } from "@/components/prices/DataSourceNote";
import { ButtonLink } from "@/components/ui/Button";
import { getMarketSnapshot } from "@/lib/market-data";

export const revalidate = 60;

const HIGHLIGHT_KEYS = ["price_dollar_rl", "sekee", "geram18", "crypto_bitcoin", "stock_tedpix", "commodity_brent"];

export default async function HomePage() {
  const snapshot = await getMarketSnapshot();
  const highlights = HIGHLIGHT_KEYS.map((key) => snapshot.prices.find((p) => p.key === key)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );
  const signalByKey = new Map(snapshot.signals.map((s) => [s.key, s.action]));

  return (
    <>
      <Hero />

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="نبض بازار"
              title="وضعیت لحظه‌ای بازار ایران"
              description="نمای کلی از مهم‌ترین نمادهای ارز، طلا، سکه، رمزارز، بورس و کالا."
            />
            <ButtonLink href="/prices" variant="secondary" className="self-start sm:self-auto">
              مشاهده همه قیمت‌ها
            </ButtonLink>
          </div>

          <DataSourceNote source={snapshot.source} updatedAt={snapshot.updatedAt} />

          {highlights.length === 0 ? (
            <p className="text-sm text-ink-400">در حال حاضر داده‌ای برای نمایش وجود ندارد.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {highlights.map((price) => (
                <PriceCard key={price.key} price={price} action={signalByKey.get(price.key)} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <FeatureGrid />
      <HowItWorks />
      <CtaSection />
    </>
  );
}
