import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/section-title";

const items = ["Crown Squad", "Neon Cars", "Smoke Night", "SYN Meet", "Content Shoot", "Role Reveal"];

export default function GalleryPage() {
  return (
    <main className="px-4 py-20">
      <SectionTitle eyebrow="GALLERY" title="Cinematic Clan Moments" description="Visual placeholders for SOUL media, cars and member highlights." />
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Card key={item} className="min-h-56 overflow-hidden">
            <div className="grid h-40 place-items-center rounded-3xl border border-white/10 bg-gradient-to-br from-red-950/60 via-black to-zinc-950">
              <p className="text-4xl font-black text-white/15">SOUL {index + 1}</p>
            </div>
            <h3 className="mt-5 text-xl font-black">{item}</h3>
          </Card>
        ))}
      </div>
    </main>
  );
}
