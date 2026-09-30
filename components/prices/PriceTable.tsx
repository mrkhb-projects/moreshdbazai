"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { PriceChangeTag } from "@/components/prices/PriceChangeTag";
import { SignalBadge } from "@/components/prices/SignalBadge";
import { formatPriceValue, formatRangeNumber, formatTimeFa } from "@/lib/format";
import { buildSignal } from "@/lib/signals";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { MarketCategory, MarketPrice } from "@/types/price";

const FILTERS: Array<{ id: MarketCategory | "all"; label: string }> = [
  { id: "all", label: "همه" },
  ...(Object.keys(CATEGORY_LABELS) as MarketCategory[]).map((category) => ({
    id: category,
    label: CATEGORY_LABELS[category],
  })),
];

export function PriceTable({ prices }: { prices: MarketPrice[] }) {
  const [category, setCategory] = useState<MarketCategory | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return prices.filter((price) => {
      const matchesCategory = category === "all" || price.category === category;
      const matchesQuery = price.title.includes(query.trim());
      return matchesCategory && matchesQuery;
    });
  }, [prices, category, query]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="فیلتر دسته‌بندی">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              role="tab"
              aria-selected={category === filter.id}
              onClick={() => setCategory(filter.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                category === filter.id
                  ? "bg-brand-500 text-onbrand"
                  : "bg-ink-800 text-ink-300 hover:bg-ink-700"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="جستجوی نماد… مثلاً دلار"
          className="w-full rounded-xl border border-ink-800 bg-ink-900 px-4 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none sm:w-64"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="نتیجه‌ای پیدا نشد"
          description="نماد موردنظر شما در فهرست فعلی وجود ندارد. عبارت جستجو یا فیلتر را تغییر دهید."
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-ink-800">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-ink-800 bg-ink-900/60 text-ink-400">
                <th scope="col" className="px-4 py-3 text-start font-medium">
                  نماد
                </th>
                <th scope="col" className="px-4 py-3 text-start font-medium">
                  دسته
                </th>
                <th scope="col" className="px-4 py-3 text-start font-medium">
                  قیمت
                </th>
                <th scope="col" className="px-4 py-3 text-start font-medium">
                  تغییر
                </th>
                <th scope="col" className="px-4 py-3 text-start font-medium">
                  کمترین / بیشترین روز
                </th>
                <th scope="col" className="px-4 py-3 text-start font-medium">
                  وضعیت
                </th>
                <th scope="col" className="px-4 py-3 text-start font-medium">
                  به‌روزرسانی
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((price) => {
                const signal = buildSignal(price);
                return (
                  <tr key={price.key} className="border-b border-ink-800/60 last:border-0 hover:bg-ink-900/40">
                    <td className="px-4 py-3 font-medium text-ink-100">{price.title}</td>
                    <td className="px-4 py-3 text-ink-400">{CATEGORY_LABELS[price.category]}</td>
                    <td className="num-fa px-4 py-3 text-ink-50">{formatPriceValue(price)}</td>
                    <td className="px-4 py-3">
                      <PriceChangeTag direction={price.direction} changePercent={price.changePercent} />
                    </td>
                    <td className="num-fa px-4 py-3 text-ink-500">
                      {formatRangeNumber(price.low, price.unit)} — {formatRangeNumber(price.high, price.unit)}
                    </td>
                    <td className="px-4 py-3">
                      <SignalBadge action={signal.action} />
                    </td>
                    <td className="num-fa px-4 py-3 text-ink-500">{formatTimeFa(price.updatedAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
