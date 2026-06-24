import { Shell, SectionTitle } from '../../components/shell';

export default function GalleryPage() {
  const items = ['Sports cars','Red neon city','Crown squad','SYN meet','Clan win','Role reveal'];
  return <Shell><main className="section"><div className="wrap"><SectionTitle eyebrow="GALLERY" title="SOUL Media" text="Premium frames for clan visuals and Instagram content." /><div className="grid grid3">{items.map(x => <div className="card" key={x}><h3 className="redtxt">{x}</h3><p className="muted">Add your clan image here later.</p></div>)}</div></div></main></Shell>;
}
