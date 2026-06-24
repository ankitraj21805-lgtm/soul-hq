export function SectionTitle({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-sm font-black tracking-[.35em] text-soul-red">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">{title}</h1>
      {description ? <p className="mt-4 text-zinc-400">{description}</p> : null}
    </div>
  );
}
