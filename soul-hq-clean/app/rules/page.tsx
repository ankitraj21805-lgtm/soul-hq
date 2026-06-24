import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/section-title";

const rules = [
  "Respect every SOUL member and alliance member.",
  "No hacks, cheats, exploits, unsafe tools or toxic behavior.",
  "Attendance points: IN played 10, Late 7, OUT with reason 5, No reply 0.",
  "Warnings: 1 Reminder, 2 Role Hold, 3 Remove Review.",
  "Promotion depends on activity, teamwork, behavior and skill.",
  "SYN alliance tag players should not be attacked by allied clans."
];

export default function RulesPage() {
  return (
    <main className="px-4 py-20">
      <SectionTitle eyebrow="RULES" title="SOUL Code" description="Simple rules for a premium and disciplined clan." />
      <div className="mx-auto max-w-4xl">
        <Card>
          <div className="grid gap-3">
            {rules.map((rule, index) => (
              <div key={rule} className="flex gap-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-soul-red font-black">{index + 1}</span>
                <p className="text-zinc-300">{rule}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
