"use client";

import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";
import { PriceCard } from "@/components/prices/PriceCard";
import { useWatchlist } from "@/lib/useWatchlist";
import type { MarketPrice, SignalAction } from "@/types/price";

export function FavoritesList({
  prices,
  signalByKey,
}: {
  prices: MarketPrice[];
  signalByKey: Record<string, SignalAction>;
}) {
  const { keys } = useWatchlist();
  const favorites = prices.filter((price) => keys.includes(price.key));

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <EmptyState
          title="هنوز موردعلاقه‌ای اضافه نکرده‌اید"
          description="با زدن آیکون ستاره روی هر نماد در صفحه «قیمت‌های لحظه‌ای» یا «تحلیل بازار»، می‌توانید آن را اینجا دنبال کنید. این فهرست فقط در همین مرورگر شما ذخیره می‌شود."
        />
        <ButtonLink href="/prices">مشاهده همه قیمت‌ها</ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {favorites.map((price) => (
        <PriceCard key={price.key} price={price} action={signalByKey[price.key]} />
      ))}
    </div>
  );
}
