import { Container } from "@/components/ui/Container";

export default function LoadingPriceDetail() {
  return (
    <Container className="flex flex-col gap-8 py-12">
      <div className="h-6 w-32 animate-pulse rounded bg-ink-800/60" />
      <div className="h-10 w-64 animate-pulse rounded bg-ink-800/60" />
      <div className="h-16 w-full max-w-2xl animate-pulse rounded-2xl bg-ink-800/60" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="h-64 animate-pulse rounded-2xl bg-ink-800/60 lg:col-span-2" />
        <div className="h-64 animate-pulse rounded-2xl bg-ink-800/60" />
      </div>
    </Container>
  );
}
