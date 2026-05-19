interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  text?: string;
}

export function SectionTitle({ eyebrow, title, text }: SectionTitleProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow && <p className="mb-3 text-sm font-bold text-cyan-500">{eyebrow}</p>}
      <h2 className="text-3xl font-black text-slate-950 dark:text-white md:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{text}</p>}
    </div>
  );
}

