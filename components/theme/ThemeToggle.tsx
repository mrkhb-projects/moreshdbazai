"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "mb-theme";
const listeners = new Set<() => void>();

function getSnapshot(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setDark(next: boolean) {
  document.documentElement.classList.toggle("dark", next);
  try {
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  } catch {
    // ذخیره‌سازی محلی در دسترس نیست؛ تم فقط برای همین بازدید اعمال می‌شود
  }
  listeners.forEach((listener) => listener());
}

/**
 * دکمه تغییر تم روشن/تاریک. پیش‌فرض پروژه «روشن» است؛ انتخاب کاربر در
 * localStorage ذخیره می‌شود تا در بازدیدهای بعدی حفظ شود. از
 * useSyncExternalStore استفاده شده تا وضعیت مستقیماً از کلاس روی <html>
 * خوانده شود و با اسکریپت اولیه (ThemeScript) بدون ناسازگاری هیدراسیون
 * هماهنگ بماند.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      type="button"
      onClick={() => setDark(!isDark)}
      aria-pressed={isDark}
      aria-label={isDark ? "فعال‌سازی تم روشن" : "فعال‌سازی تم تاریک"}
      title={isDark ? "تم روشن" : "تم تاریک"}
      className={`flex size-10 shrink-0 items-center justify-center rounded-lg border border-ink-800 text-ink-300 transition-colors hover:bg-ink-900 hover:text-ink-50 ${className}`}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden>
          <path
            d="M12 3v2M12 19v2M5 5l1.5 1.5M17.5 17.5 19 19M3 12h2M19 12h2M5 19l1.5-1.5M17.5 6.5 19 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden>
          <path
            d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
