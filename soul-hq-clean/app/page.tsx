import Link from "next/link";
import { Car, Crown, Shield, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/section-title";

const features = [
  ["Member Records", "Track role, skill, team, warnings and promotion status.", Users],
  ["Attendance Points", "IN, LATE, OUT, NO REPLY with automatic points.", Shield],
  ["Tryout Pipeline", "Public applications appear inside admin dashboard.", Crown],
  ["Alliance Rules", "SYN tag protection and fair-play coordination.", Car]
];

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-soul-red/30 bg-soul-red/10 px-4 py-2 text-sm font-black text-red-100">
            👑 SOUL Syndicate • Official HQ
          </div>
          <h1 className="text-5xl font-black leading-[.95] tracking-tight md:text-7xl">
            Mafia-style control room for <span className="text-soul-red">SOUL</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-zinc-300">
            Premium responsive full-stack clan website for MadOut 2 with member management,
            attendance, warnings, promotion tracking, tryouts, events, alliances and content planning.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/join" className="rounded-full bg-soul-red px-5 py-3 text-sm font-black text-white shadow-neon">
              Apply Tryout
            </Link>
            <Link href="/members" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white">
              View Members
            </Link>
            <Link href="/login" className="rounded-full border border-white/15 bg-black/40 px-5 py-3 text-sm font-black text-white">
              Admin Login
            </Link>
          </div>
        </div>

        <Card className="relative overflow-hidden p-8">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-soul-red/20 blur-3xl" />
          <p className="text-sm font-black tracking-[.35em] text-zinc-500">ALLIANCE TAG</p>
          <p className="mt-3 text-8xl font-black text-soul-red">SYN</p>
          <p className="mt-4 text-zinc-300">
            Any player using the SYN tag should not be attacked by allied clans.
            SOUL HQ keeps this fair-play rule clear and visible.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              ["20", "Sample Members"],
              ["10", "IN Points"],
              ["3", "Warning Review"],
              ["0", "Cheat Features"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-black/40 p-4">
                <p className="text-3xl font-black text-soul-gold">{value}</p>
                <p className="text-xs text-zinc-400">{label}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="px-4 py-20">
        <SectionTitle
          eyebrow="FULL STACK MODULES"
          title="Built for real clan management"
          description="Clean admin tools with fair-play culture. No hacks, cheats, exploits or toxic systems."
        />
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map(([title, description, Icon]) => (
            <Card key={title as string}>
              <Icon className="text-soul-red" />
              <h3 className="mt-5 text-xl font-black">{title as string}</h3>
              <p className="mt-2 text-sm text-zinc-400">{description as string}</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
