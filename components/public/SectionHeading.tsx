export default function SectionHeading({ eyebrow, title, description, align = "center" }: { eyebrow?: string; title: string; description?: string; align?: "center" | "left" }) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : "text-left"} max-w-3xl`}>
      {eyebrow && <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.22em] text-brand-orange">{eyebrow}</p>}
      <h2 className="text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>}
    </div>
  );
}
