import Link from 'next/link';
import { Shell } from '../components/shell';

export default function HomePage() {
  const modules = ['Member CRUD','Daily attendance','Warning tracker','Promotion status','Tryout pipeline','Event manager','Alliance manager','Content planner','Settings'];
  return <Shell><main>
    <section className="hero"><div className="wrap grid grid2">
      <div><span className="tag">SOUL Syndicate • MadOut 2 HQ</span><h1 className="title">Premium clan control for <span className="redtxt">SOUL</span>.</h1><p className="muted">Dark mafia-inspired full-stack clan website with public pages and a working admin dashboard.</p><div className="row" style={{marginTop:24}}><Link className="btn red" href="/join">Join Tryout</Link><Link className="btn" href="/members">View Members</Link><Link className="btn" href="/admin">Open Admin</Link></div></div>
      <div className="card"><p className="muted">Official alliance tag</p><h2 className="title redtxt">SYN</h2><p>Any player using SYN tag should not be attacked by allied clans. Clean fair-play only.</p><div className="grid grid2" style={{marginTop:18}}><div className="card"><div className="stat">20</div><p className="muted">Seed Members</p></div><div className="card"><div className="stat">10</div><p className="muted">IN Points</p></div></div></div>
    </div></section>
    <section className="section"><div className="wrap grid grid3">{modules.map(m => <div className="card" key={m}><h3 className="redtxt">{m}</h3><p className="muted">Open admin dashboard and manage this module.</p></div>)}</div></section>
  </main></Shell>;
}
