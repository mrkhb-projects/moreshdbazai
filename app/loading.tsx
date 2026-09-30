import { LoadingState } from "@/components/ui/LoadingState";
import { Container } from "@/components/ui/Container";

export default function RootLoading() {
  return (
    <Container className="py-16">
      <LoadingState />
    </Container>
  );
}
