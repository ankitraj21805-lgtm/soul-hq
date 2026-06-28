import Link from 'next/link';

const TAG = '【ӢラЯ】';
const modules = [
  ['Member Management','Roster, roles, UID, gun level, armor level and activity tracking.'],
  ['Attendance Tracker','IN, LATE, OUT, NO REPLY with automatic points.'],
  ['Warning Tracker','Reminder, role hold and review workflow.'],
  ['Promotion Board','Trial Running, Eligible, Hold, Promoted and Demoted.'],
  ['Gallery Vault','Members can upload/download images and gameplay clips.'],
  ['Tryout Pipeline','Public requests appear in admin for accept/reject.'],
  ['Alliance Control',`Official ${TAG} rules and allied clan records.`],
  ['Event Manager','Admin can add events with optional thumbnail.'],
  ['Rules Manager','Admin can add rules with optional thumbnail.']
];

export default function Home(){
  return <main>
    <section
      className="hero"
      style={{
        position:'relative',
        overflow:'hidden',
        backgroundImage:'linear-gradient(90deg,rgba(0,0,0,.88),rgba(20,0,5,.62),rgba(0,0,0,.9)),url(/soul-theme.svg)',
        backgroundSize:'cover',
        backgroundPosition:'center',
        borderBottom:'1px solid rgba(255,255,255,.08)'
      }}
    >
      <div className="wrap grid grid2" style={{alignItems:'center'}}>
        <div>
          <span className="tag">SOUL Syndicate • Alliance Tag: {TAG}</span>
          <h1 className="title">SOUL <span className="red">Syndicate</span></h1>
          <p className="muted" style={{fontSize:18,maxWidth:560}}>Night Syndicate Riders theme — mafia inspired clan HQ with gallery vault, member access, admin control, alliance rules and clean fair-play management.</p>
          <div className="row" style={{marginTop:24}}>
            <Link className="btn red" href="/gallery">Open Gallery Vault</Link>
            <Link className="btn" href="/join">Join Tryout</Link>
            <Link className="btn" href="/member-login">Member Login</Link>
            <Link className="btn" href="/admin">Admin Login</Link>
          </div>
        </div>
        <div className="card" style={{padding:0,overflow:'hidden',border:'1px solid rgba(255,36,73,.32)',boxShadow:'0 0 70px rgba(239,18,56,.28)'}}>
          <img src="/soul-logo.svg" alt="SOUL logo" style={{width:'100%',height:260,objectFit:'cover',display:'block'}} />
          <div style={{padding:22}}>
            <p className="tag">Official Alliance Tag</p>
            <h2 className="title red" style={{fontSize:48}}>{TAG}</h2>
            <p className="muted">Respect • Loyalty • Skill. {TAG} members are allied — no unnecessary fights.</p>
          </div>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="wrap">
        <div className="center">
          <b className="red">FEATURES</b>
          <h2 className="h2">SOUL HQ management modules</h2>
          <p className="muted">Clean, usable sections for real clan work.</p>
        </div>
        <div className="grid grid3">{modules.map(([title,desc])=><div className="card" key={title}><h3 className="red">{title}</h3><p className="muted">{desc}</p></div>)}</div>
      </div>
    </section>
  </main>
}