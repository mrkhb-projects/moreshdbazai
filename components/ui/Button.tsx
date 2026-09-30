import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-ink-950 hover:bg-brand-400 focus-visible:outline-brand-400",
  secondary:
    "bg-ink-800 text-ink-50 hover:bg-ink-700 focus-visible:outline-ink-500",
  ghost:
    "bg-transparent text-ink-100 hover:bg-ink-800 focus-visible:outline-ink-500",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
  return (
    <button className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ href, variant = "primary", className = "", children }: ButtonLinkProps) {
  return (
    <Link href={href} className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`}>
      {children}
    </Link>
  );
}
