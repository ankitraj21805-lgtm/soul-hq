import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/section-title";
import { sampleAlliances } from "@/lib/sample-data";

export default function AlliancePage() {
  return (
    <main className="px-4 py-20">
      <SectionTitle
        eyebrow="ALLIANCE"
        title="Official Tag: SYN"
        description="Any player using SYN tag should not be attacked by allied clans."
      />

      <Card className="mx-auto mb-8 max-w-4xl text-center">
        <p className="text-8xl font-black text-soul-red">SYN</p>
        <p className="mx-auto mt-5 max-w-2xl text-zinc-300">
          SYN is the official SOUL alliance tag. Allied clans should treat SYN-tag players as protected allies,
          avoid unnecessary attacks, and keep all gameplay fair and respectful.
        </p>
      </Card>

      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {sampleAlliances.map((alliance) => (
          <Card key={alliance.id}>
            <h3 className="text-2xl font-black">{alliance.clan_name}</h3>
            <p className="mt-2 text-soul-red">{alliance.alliance_tag}</p>
            <p className="mt-2 text-sm text-zinc-400">{alliance.leader_instagram}</p>
            <p className="mt-4 text-zinc-300">{alliance.notes}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
