import { Shell, SectionTitle } from '@/components/shell';

export default function AboutPage() {
  return <Shell><main className="section"><div className="wrap"><SectionTitle eyebrow="ABOUT" title="SOUL Syndicate" text="A disciplined MadOut 2 clan built around respect, loyalty and skill." /><div className="grid grid3"><div className="card"><h3>Identity</h3><p className="muted">SOUL HQ is the official clan control room.</p></div><div className="card"><h3>Culture</h3><p className="muted">Fair-play, clean rules and strong roles.</p></div><div className="card"><h3>Alliance</h3><p className="muted">Official tag is SYN for allied clan protection.</p></div></div></div></main></Shell>;
}
