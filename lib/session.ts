import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/lib/constants";
import type { SessionUser } from "@/types/auth";

/**
 * نشست کاربر با یک کوکی امضاشده (HMAC) بدون وابستگی به کتابخانه یا سرویس
 * بیرونی پیاده‌سازی شده است. AUTH_SECRET را حتماً در محیط Production
 * مقداردهی کنید؛ در توسعه یک مقدار پیش‌فرض (فقط محلی) استفاده می‌شود.
 */

const FALLBACK_DEV_SECRET = "dev-only-insecure-secret-change-me";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // ۳۰ روز

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length >= 16) return secret;

  if (process.env.NODE_ENV === "production") {
    console.warn(
      "AUTH_SECRET تنظیم نشده یا خیلی کوتاه است. لطفاً یک مقدار تصادفی و امن در Environment Variables تنظیم کنید."
    );
  }
  return FALLBACK_DEV_SECRET;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function createSessionToken(user: SessionUser): string {
  const payload = Buffer.from(JSON.stringify(user)).toString("base64url");
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function parseSessionToken(token: string | undefined): SessionUser | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  if (!safeEqual(sign(payload), signature)) return null;

  try {
    const json = Buffer.from(payload, "base64url").toString("utf8");
    return JSON.parse(json) as SessionUser;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const store = await cookies();
  return parseSessionToken(store.get(SESSION_COOKIE_NAME)?.value);
}

export async function setSessionCookie(user: SessionUser): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, createSessionToken(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
}
