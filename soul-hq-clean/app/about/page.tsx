import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/section-title";

export default function AboutPage() {
  return (
    <main className="px-4 py-20">
      <SectionTitle
        eyebrow="ABOUT"
        title="SOUL Syndicate"
        description="A disciplined MadOut 2 clan built on respect, loyalty and skill."
      />
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {[
          ["Identity", "SOUL is a premium clan identity with cinematic dark red branding."],
          ["Culture", "Members are tracked fairly by activity, teamwork, behavior and skill."],
          ["Fair Play", "No hacks, cheats, exploits, unsafe or toxic features are allowed."]
        ].map(([title, text]) => (
          <Card key={title}>
            <h3 className="text-2xl font-black text-soul-red">{title}</h3>
            <p className="mt-3 text-zinc-400">{text}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
