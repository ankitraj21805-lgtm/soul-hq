import { members } from '../../lib/data';
import { Shell, SectionTitle } from '../../components/shell';

export default function MembersPage() {
  return <Shell><main className="section"><div className="wrap"><SectionTitle eyebrow="ROSTER" title="SOUL Members" text="Twenty sample members for your clan HQ." /><div className="grid grid3">{members.map((m: any) => <div className="card" key={m[1]}><div className="row" style={{justifyContent:'space-between'}}><h3>{m[1]}</h3><span className="tag">SYN</span></div><p className="muted">{m[0]} • {m[2]}</p><p>Team: {m[3]} • Status: {m[4]}</p><p>Driving {m[5]} • Game {m[6]}</p><p>Warnings: {m[7]} • {m[8]}</p></div>)}</div></div></main></Shell>;
}
