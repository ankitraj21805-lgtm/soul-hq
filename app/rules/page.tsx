import { Shell, SectionTitle } from '../../components/shell';

export default function RulesPage() {
  const rules = ['Respect every member','No hacks, cheats or exploits','IN played gives 10 points','Late gives 7 points','OUT with reason gives 5 points','No reply gives 0 points','Warning 1 is reminder','Warning 2 is role hold','Warning 3 is remove review'];
  return <Shell><main className="section"><div className="wrap"><SectionTitle eyebrow="RULES" title="Clan Standards" text="Simple rules for a clean and fair clan." /><div className="grid grid3">{rules.map(r => <div className="card" key={r}>{r}</div>)}</div></div></main></Shell>;
}
