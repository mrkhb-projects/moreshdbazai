import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SignalBadge } from "@/components/prices/SignalBadge";
import { PriceChangeTag } from "@/components/prices/PriceChangeTag";
import { RangeBar } from "@/components/prices/RangeBar";
import { WatchlistButton } from "@/components/prices/WatchlistButton";
import { DataSourceNote } from "@/components/prices/DataSourceNote";
import { DisclaimerBanner } from "@/components/home/DisclaimerBanner";
import { formatDateFa, formatNumberFa, formatPriceValue } from "@/lib/format";
import { buildSignal, HORIZON_LABEL, RISK_LEVEL_LABEL } from "@/lib/signals";
import { CATEGORY_LABELS } from "@/lib/constants";
import { getMarketSnapshot } from "@/lib/market-data";

interface PageProps {
  params: Promise<{ key: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { key } = await params;
  const snapshot = await getMarketSnapshot();
  const price = snapshot.prices.find((p) => p.key === key);

  if (!price) {
    return { title: "نماد پیدا نشد" };
  }

  return {
    title: price.title,
    description: `قیمت لحظه‌ای ${price.title}، بازه روزانه و هفتگی، و سیگنال خرید/فروش مرشد بازاری.`,
  };
}

export default async function PriceDetailPage({ params }: PageProps) {
  const { key } = await params;
  const snapshot = await getMarketSnapshot();
  const price = snapshot.prices.find((p) => p.key === key);

  if (!price) {
    notFound();
  }

  const signal = buildSignal(price);

  return (
    <Container className="flex flex-col gap-8 py-12">
      <div className="flex flex-col gap-3">
        <Link href="/prices" className="w-fit text-sm text-ink-400 hover:text-brand-400">
          ← بازگشت به همه قیمت‌ها
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-sm font-medium text-brand-400">{CATEGORY_LABELS[price.category]}</span>
            <h1 className="mt-1 text-2xl font-bold text-ink-50 sm:text-3xl">{price.title}</h1>
          </div>
          <WatchlistButton instrumentKey={price.key} className="border border-ink-800" />
        </div>
      </div>

      <DataSourceNote source={snapshot.source} updatedAt={snapshot.updatedAt} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="flex flex-col gap-5 lg:col-span-2">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <p className="num-fa text-3xl font-extrabold text-ink-50 sm:text-4xl">{formatPriceValue(price)}</p>
            <PriceChangeTag direction={price.direction} changePercent={price.changePercent} />
          </div>

          <RangeBar label="بازه روزانه" low={price.low} high={price.high} value={price.price} unit={price.unit} />
          <RangeBar label="بازه هفتگی" low={price.weekLow} high={price.weekHigh} value={price.price} unit={price.unit} />

          <p className="text-xs text-ink-500">آخرین به‌روزرسانی: {formatDateFa(price.updatedAt)}</p>
        </Card>

        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-semibold text-ink-50">سیگنال مرشد بازاری</h2>
            <SignalBadge action={signal.action} />
          </div>

          <p className="text-sm leading-6 text-ink-400">{signal.reason}</p>

          <div className="flex flex-wrap gap-2">
            <Badge tone="neutral">{RISK_LEVEL_LABEL[signal.riskLevel]}</Badge>
            <Badge tone="neutral">{HORIZON_LABEL[signal.horizon]}</Badge>
            <Badge tone="neutral">موقعیت در بازه هفته: {formatNumberFa(signal.rangePositionPercent)}٪</Badge>
          </div>

          <p className="border-t border-ink-800 pt-3 text-xs text-ink-500">
            میزان اطمینان قاعده: {formatNumberFa(signal.confidence)}٪
          </p>
        </Card>
      </div>

      <DisclaimerBanner />
    </Container>
  );
}
