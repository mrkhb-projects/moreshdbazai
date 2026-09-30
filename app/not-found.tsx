import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <span className="text-6xl font-extrabold text-ink-700">۴۰۴</span>
      <h1 className="text-xl font-bold text-ink-50">صفحه موردنظر پیدا نشد</h1>
      <p className="max-w-sm text-sm text-ink-400">
        آدرسی که دنبال آن هستید وجود ندارد یا جابه‌جا شده است. می‌توانید به صفحه اصلی برگردید.
      </p>
      <ButtonLink href="/">بازگشت به صفحه اصلی</ButtonLink>
    </Container>
  );
}
