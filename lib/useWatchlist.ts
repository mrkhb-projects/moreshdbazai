"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * موردعلاقه‌ها (Watchlist) — کاملاً سمت مرورگر و در localStorage ذخیره
 * می‌شود؛ چون این پروژه هنوز دیتابیس ندارد. با افزودن احراز هویت واقعی در
 * آینده، می‌توان همین API را حفظ کرد و فقط منبع ذخیره‌سازی را به سرور
 * (به‌ازای هر کاربر) منتقل کرد.
 */

const STORAGE_KEY = "mb-watchlist";
const listeners = new Set<() => void>();
let cache: string[] | null = null;

function readStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function getSnapshot(): string[] {
  if (cache === null) cache = readStorage();
  return cache;
}

function getServerSnapshot(): string[] {
  return [];
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function writeStorage(next: string[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ذخیره‌سازی محلی در دسترس نیست؛ تغییر فقط برای همین بازدید اعمال می‌شود
  }
  listeners.forEach((listener) => listener());
}

export function useWatchlist() {
  const keys = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isSaved = useCallback((key: string) => keys.includes(key), [keys]);

  const toggle = useCallback((key: string) => {
    const current = getSnapshot();
    const next = current.includes(key) ? current.filter((k) => k !== key) : [...current, key];
    writeStorage(next);
  }, []);

  return { keys, isSaved, toggle };
}
