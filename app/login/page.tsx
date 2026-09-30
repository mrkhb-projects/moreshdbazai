import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { OtpLoginForm } from "@/components/auth/OtpLoginForm";

export const metadata: Metadata = {
  title: "ورود و ثبت‌نام",
  description: "ورود سریع به مرشد بازاری با شماره موبایل و کد یک‌بارمصرف.",
};

export default function LoginPage() {
  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-16">
      <Card className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-ink-50">ورود به مرشد بازاری</h1>
          <p className="mt-2 text-sm text-ink-400">
            با شماره موبایل خود وارد شوید. حساب کاربری نداشته باشید، به‌صورت خودکار ساخته می‌شود.
          </p>
        </div>
        <OtpLoginForm />
      </Card>
    </Container>
  );
}
