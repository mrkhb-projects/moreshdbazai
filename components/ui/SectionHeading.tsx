interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "start" }: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-start";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow ? (
        <span className="text-sm font-medium text-brand-400">{eyebrow}</span>
      ) : null}
      <h2 className="text-2xl font-bold text-ink-50 sm:text-3xl">{title}</h2>
      {description ? <p className="text-sm leading-7 text-ink-400 sm:text-base">{description}</p> : null}
    </div>
  );
}
