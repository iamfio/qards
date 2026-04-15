import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export default function QardEmptyList() {
  return (
    <Empty className="mt-12 border border-dashed border-border bg-muted/20">
      <EmptyHeader>
        <EmptyTitle>You have no cards yet.</EmptyTitle>
        <EmptyDescription>
          This profile has not published any qards yet.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
