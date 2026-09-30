import { NextResponse } from "next/server";
import { generateOtpCode, saveOtp } from "@/lib/otp-store";
import { sendOtpSms } from "@/lib/sms";
import { isValidIranianMobile, normalizeMobile } from "@/lib/phone";
import { OTP_CODE_LENGTH } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "بدنه درخواست نامعتبر است." }, { status: 400 });
  }

  const phoneRaw = (body as { phone?: string })?.phone;
  if (!phoneRaw || typeof phoneRaw !== "string" || !isValidIranianMobile(phoneRaw)) {
    return NextResponse.json(
      { ok: false, message: "شماره موبایل نامعتبر است. مثال: ۰۹۱۲۳۴۵۶۷۸۹" },
      { status: 400 }
    );
  }

  const phone = normalizeMobile(phoneRaw);
  const code = generateOtpCode(OTP_CODE_LENGTH);
  saveOtp(phone, code);

  const result = await sendOtpSms(phone, code);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: "ارسال پیامک ممکن نشد. بعداً دوباره تلاش کنید." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "کد تایید ارسال شد.",
    ...(result.devCode ? { devCode: result.devCode } : {}),
  });
}
