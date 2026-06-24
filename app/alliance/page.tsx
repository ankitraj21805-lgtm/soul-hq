import { alliances } from '../../lib/data';
import { Shell, SectionTitle } from '../../components/shell';

export default function AlliancePage() {
  return <Shell><main className="section"><div className="wrap"><SectionTitle eyebrow="ALLIANCE" title="Official tag: SYN" text="Any player using SYN tag should not be attacked by allied clans." /><div className="grid grid3">{alliances.map((a:any) => <div className="card" key={a[0]}><h3>{a[0]}</h3><p>Tag: <b className="redtxt">{a[1]}</b></p><p className="muted">Leader: {a[2]} • {a[3]}</p></div>)}</div></div></main></Shell>;
}
