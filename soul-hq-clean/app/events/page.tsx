import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/section-title";
import { sampleEvents } from "@/lib/sample-data";

export default function EventsPage() {
  return (
    <main className="px-4 py-20">
      <SectionTitle eyebrow="EVENTS" title="Clan Schedule" description="Meets, alliance events and content shoots." />
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {sampleEvents.map((event) => (
          <Card key={event.id}>
            <Badge tone="red">{event.status}</Badge>
            <h3 className="mt-4 text-2xl font-black">{event.title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{event.type} • {event.date} • {event.time}</p>
            <p className="mt-4 text-zinc-300">{event.description}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
