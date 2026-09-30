import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink-700 bg-ink-900/30 px-6 py-16 text-center">
      {icon ?? (
        <div className="flex size-12 items-center justify-center rounded-full bg-ink-800 text-2xl">
          📭
        </div>
      )}
      <h3 className="text-base font-semibold text-ink-100">{title}</h3>
      {description ? <p className="max-w-sm text-sm text-ink-400">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
