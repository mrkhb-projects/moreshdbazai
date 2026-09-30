import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = "", ...rest }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-ink-800 bg-ink-900/60 p-5 shadow-sm backdrop-blur-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
