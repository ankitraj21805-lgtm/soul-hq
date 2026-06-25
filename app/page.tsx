import Link from 'next/link';

const modules = [
  ['Member Management','Roster, roles, skill level and activity tracking.'],
  ['Attendance Tracker','IN, LATE, OUT, NO REPLY with automatic points.'],
  ['Warning Tracker','Reminder, role hold and review workflow.'],
  ['Promotion Board','Trial Running, Eligible, Hold, Promoted and Demoted.'],
  ['Gallery Vault','Members can upload and download images and gameplay clips.'],
  ['Tryout Pipeline','Public requests appear in admin for accept/reject.'],
  ['Alliance Control','Official SYN rules and allied clan records.'],
  ['Event Manager','Clan meets, runs and alliance planning.'],
  ['Content Planner','Reels, posts, stories and media schedule.']
];

export default function Home(){
  return <main>
    <section className="hero"><div className="wrap grid grid2">
      <div><span className="tag">SOUL Syndicate • SYN Alliance</span><h1 className="title">SOUL HQ for <span className="red">MadOut 2</span>.</h1><p className="muted">Admin management, member media access, gallery vault, gameplay clips, skill tracking and clean fair-play rules.</p><div className="row" style={{marginTop:24}}><Link className="btn red" href="/gallery">Open Gallery Vault</Link><Link className="btn" href="/member-login">Member Login</Link><Link className="btn" href="/admin">Admin Login</Link></div></div>
      <div className="card"><p className="tag">Official Alliance Tag</p><h2 className="title red">SYN</h2><p className="muted">Respect • Loyalty • Skill. The gallery and dashboard are made for daily SOUL clan work.</p><div className="grid grid2" style={{marginTop:18}}><div className="card"><div className="stat">Media</div><p className="muted">Images + clips</p></div><div className="card"><div className="stat">HQ</div><p className="muted">Admin control</p></div></div></div>
    </div></section>
    <section className="section"><div className="wrap"><div className="center"><b className="red">FEATURES</b><h2 className="h2">SOUL management modules</h2><p className="muted">Clean, usable sections for real clan work.</p></div><div className="grid grid3">{modules.map(([title,desc])=><div className="card" key={title}><h3 className="red">{title}</h3><p className="muted">{desc}</p></div>)}</div></div></section>
  </main>
}
