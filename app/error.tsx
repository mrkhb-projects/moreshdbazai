"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("خطای عمومی برنامه:", error);
  }, [error]);

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <span className="text-5xl" aria-hidden>
        😕
      </span>
      <h1 className="text-xl font-bold text-ink-50">مشکلی پیش آمد</h1>
      <p className="max-w-sm text-sm text-ink-400">
        متاسفانه در نمایش این صفحه خطایی رخ داد. لطفاً دوباره تلاش کنید یا بعداً مراجعه کنید.
      </p>
      <Button onClick={reset}>تلاش دوباره</Button>
    </Container>
  );
}
