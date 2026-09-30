import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otp-store";
import { isValidIranianMobile, normalizeMobile } from "@/lib/phone";
import { setSessionCookie } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "بدنه درخواست نامعتبر است." }, { status: 400 });
  }

  const { phone: phoneRaw, code } = body as { phone?: string; code?: string };

  if (!phoneRaw || typeof phoneRaw !== "string" || !isValidIranianMobile(phoneRaw)) {
    return NextResponse.json({ ok: false, message: "شماره موبایل نامعتبر است." }, { status: 400 });
  }

  if (!code || typeof code !== "string") {
    return NextResponse.json({ ok: false, message: "کد تایید را وارد کنید." }, { status: 400 });
  }

  const phone = normalizeMobile(phoneRaw);
  const valid = verifyOtp(phone, code.trim());

  if (!valid) {
    return NextResponse.json({ ok: false, message: "کد تایید نادرست یا منقضی‌شده است." }, { status: 401 });
  }

  await setSessionCookie({ phone, createdAt: new Date().toISOString() });

  return NextResponse.json({ ok: true, message: "ورود با موفقیت انجام شد." });
}
