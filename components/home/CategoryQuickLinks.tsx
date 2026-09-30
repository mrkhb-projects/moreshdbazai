import Link from "next/link";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { MarketCategory } from "@/types/price";

const CATEGORY_ICON: Record<MarketCategory, string> = {
  currency: "💵",
  gold: "🥇",
  coin: "🪙",
  crypto: "₿",
  stock: "📈",
  commodity: "🛢️",
};

const CATEGORY_DESCRIPTION: Record<MarketCategory, string> = {
  currency: "دلار، یورو، پوند، درهم و لیر",
  gold: "طلای ۱۸ و ۲۴ عیار، مثقال و انس جهانی",
  coin: "سکه امامی، بهار آزادی، نیم و ربع",
  crypto: "بیت‌کوین، اتریوم، بایننس کوین و بیشتر",
  stock: "شاخص کل، هم‌وزن و نمادهای بزرگ بورس",
  commodity: "نفت برنت، وست تگزاس، گاز و مس جهانی",
};

export function CategoryQuickLinks({ categories }: { categories: MarketCategory[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map((category) => (
        <Link
          key={category}
          href={`/prices?category=${category}`}
          className="group flex flex-col items-center gap-2 rounded-2xl border border-ink-800 bg-ink-900/60 p-4 text-center transition-colors hover:border-brand-500/50 hover:bg-ink-900"
        >
          <span className="text-2xl" aria-hidden>
            {CATEGORY_ICON[category]}
          </span>
          <span className="text-sm font-semibold text-ink-100 group-hover:text-brand-400">
            {CATEGORY_LABELS[category]}
          </span>
          <span className="text-[11px] leading-4 text-ink-500">{CATEGORY_DESCRIPTION[category]}</span>
        </Link>
      ))}
    </div>
  );
}
