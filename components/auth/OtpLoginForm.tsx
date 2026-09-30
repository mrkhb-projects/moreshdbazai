"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { isValidIranianMobile } from "@/lib/phone";

type Step = "phone" | "code";

export function OtpLoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [devCode, setDevCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleRequestOtp(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!isValidIranianMobile(phone)) {
      setError("شماره موبایل را به‌صورت صحیح وارد کنید، مثال: ۰۹۱۲۳۴۵۶۷۸۹");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.message || "ارسال کد تایید ناموفق بود.");
        return;
      }

      setDevCode(data.devCode ?? null);
      setStep("code");
    } catch {
      setError("ارتباط با سرور برقرار نشد. اتصال اینترنت خود را بررسی کنید.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!code.trim()) {
      setError("کد تایید را وارد کنید.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.message || "کد تایید نادرست است.");
        return;
      }

      setSuccess("ورود با موفقیت انجام شد.");
      router.push("/");
      router.refresh();
    } catch {
      setError("ارتباط با سرور برقرار نشد. اتصال اینترنت خود را بررسی کنید.");
    } finally {
      setLoading(false);
    }
  }

  if (step === "phone") {
    return (
      <form onSubmit={handleRequestOtp} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium text-ink-200">
            شماره موبایل
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            dir="ltr"
            placeholder="09123456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-xl border border-ink-800 bg-ink-900 px-4 py-3 text-start text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none"
          />
        </div>

        {error ? <p role="alert" className="text-sm text-fall-500">{error}</p> : null}

        <Button type="submit" disabled={loading}>
          {loading ? "در حال ارسال کد…" : "دریافت کد تایید"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4" noValidate>
      <p className="text-sm text-ink-400">
        کد تایید ۵ رقمی برای شماره <bdi className="num-fa font-medium text-ink-100">{phone}</bdi> ارسال شد.
      </p>

      {devCode ? (
        <p className="rounded-xl border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm text-brand-300">
          حالت توسعه فعال است؛ کد تایید نمایشی: <bdi className="num-fa font-bold">{devCode}</bdi>
        </p>
      ) : null}

      <div className="flex flex-col gap-2">
        <label htmlFor="code" className="text-sm font-medium text-ink-200">
          کد تایید
        </label>
        <input
          id="code"
          type="text"
          inputMode="numeric"
          dir="ltr"
          placeholder="12345"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="num-fa rounded-xl border border-ink-800 bg-ink-900 px-4 py-3 text-center text-lg tracking-widest text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none"
        />
      </div>

      {error ? <p role="alert" className="text-sm text-fall-500">{error}</p> : null}
      {success ? <p className="text-sm text-rise-500">{success}</p> : null}

      <Button type="submit" disabled={loading}>
        {loading ? "در حال بررسی…" : "ورود"}
      </Button>

      <button
        type="button"
        onClick={() => {
          setStep("phone");
          setCode("");
          setError(null);
        }}
        className="text-sm text-ink-400 hover:text-ink-100"
      >
        اصلاح شماره موبایل
      </button>
    </form>
  );
}
