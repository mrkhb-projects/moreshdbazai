"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SITE_NAME } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/", label: "خانه" },
  { href: "/prices", label: "قیمت‌های لحظه‌ای" },
  { href: "/signals", label: "سیگنال بازار" },
  { href: "/analysis", label: "تحلیل بازار" },
  { href: "/favorites", label: "موردعلاقه‌ها" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-950/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand-500 text-lg font-bold text-onbrand">
            م
          </span>
          <span className="text-base font-bold text-ink-50">{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="منوی اصلی">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-ink-800 text-brand-400" : "text-ink-300 hover:bg-ink-900 hover:text-ink-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <ButtonLink href="/login" variant="secondary">
            ورود / ثبت‌نام
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-lg border border-ink-800 text-ink-200"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="باز و بسته کردن منو"
          >
            <span className="sr-only">منو</span>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </Container>

      {open ? (
        <div id="mobile-menu" className="border-t border-ink-800 bg-ink-950 md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-200 hover:bg-ink-900"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg bg-ink-800 px-3 py-2.5 text-center text-sm font-medium text-ink-50"
            >
              ورود / ثبت‌نام
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
