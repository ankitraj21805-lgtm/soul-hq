import { events } from '@/lib/data';
import { Shell, SectionTitle } from '@/components/shell';

export default function EventsPage() {
  return <Shell><main className="section"><div className="wrap"><SectionTitle eyebrow="EVENTS" title="Clan Schedule" text="Plan meets, alliance sessions and content posts." /><div className="grid grid3">{events.map((e:any) => <div className="card" key={e[0]}><h3>{e[0]}</h3><p>{e[1]} • {e[2]}</p><span className="tag">{e[3]}</span></div>)}</div></div></main></Shell>;
}
