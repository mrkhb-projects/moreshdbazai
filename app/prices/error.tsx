"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { ErrorState } from "@/components/ui/ErrorState";

export default function PricesError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("خطا در صفحه قیمت‌ها:", error);
  }, [error]);

  return (
    <Container className="py-12">
      <ErrorState
        title="نمایش قیمت‌ها با خطا مواجه شد"
        description="ممکن است سرویس داده موقتاً در دسترس نباشد. لطفاً دوباره تلاش کنید."
        onRetry={reset}
      />
    </Container>
  );
}
