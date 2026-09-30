"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // فعلاً هیچ سرویس ارسال ایمیل/پیامک متصل نیست؛ صرفاً پیام موفقیت نمایش
    // داده می‌شود. برای اتصال واقعی، یک Route Handler مشابه auth بسازید.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-brand-500/30 bg-brand-500/10 p-4 text-sm text-brand-300">
        پیام شما ثبت شد. تیم پشتیبانی مرشد بازاری به‌زودی با شما تماس می‌گیرد.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-ink-200">
          نام و نام خانوادگی
        </label>
        <input
          id="name"
          required
          className="rounded-xl border border-ink-800 bg-ink-900 px-4 py-3 text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none"
          placeholder="نام شما"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-ink-200">
          پیام شما
        </label>
        <textarea
          id="message"
          required
          rows={4}
          className="resize-none rounded-xl border border-ink-800 bg-ink-900 px-4 py-3 text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none"
          placeholder="سوال یا پیشنهاد خود را بنویسید…"
        />
      </div>

      <Button type="submit">ارسال پیام</Button>
    </form>
  );
}
