import { Container } from "@/components/ui/Container";
import { SkeletonList } from "@/components/ui/LoadingState";

export default function LoadingSignals() {
  return (
    <Container className="flex flex-col gap-8 py-12">
      <div className="h-24 w-full max-w-2xl animate-pulse rounded-2xl bg-ink-800/60" />
      <SkeletonList rows={6} />
    </Container>
  );
}
