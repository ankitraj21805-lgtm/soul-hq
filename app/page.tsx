import Link from 'next/link';

const TAG = '【ӢラЯ】';
const soulLogo = 'data:image/webp;base64,UklGRs5dAABXRUJQVlA4IMJdAAAwNgKdASqEAyYCPrVWo0ynJLKwpzSq8lAWiWVuBgRne7hlHEQlgnulvECQgbsHRUXBMv1P7QbD/QH8vTM+pJ+dtPq8tn2vhjMo1Emh+nkbXRq7N0D4S3Nl9Zf9K3vkLk+4vOZ8t/zP3G73P7H/1/3fta/9WnP4f/68cn88zmf9PkH+uf63mSf1T++eoX/t44N8eMWpffRH+n1benOsx//Xpo/Mf/J6MBX//KTo+k6uyzeT0EJz6iU/95XpInqmc+mwoOhy+b6UhWQ9LBXLubdOxCQgGvD8HJ8vrLqNntDjoZQ8pPvFa8+9C225ra7tjRh73oDi7rAugShjcTguQOO43sKNIjauil89qIO1Y2FtD6Y5+/lMG6A6hI++qH+txIR/QIcdgbpnQQMdoTxHQ2yshZ8ZL9QJw27OrJBIq3BhVyjQwgG5z0N98psw4TPcfsRcSGJUumHUxzxrsNv/jmoVxA4h85jnqP5D786HVAz+0qZkdm82eV3lxq/ueqeAqWL47aXhR7hfFjCj3a7muHWip62AV7BCMI0JtCLTZtcgFX7U3fMiW/8LT+05VneAoJdXt/3McuJNtWWacgWXMMxAYDFtGIi3fvu4mpOFt+LvZiGSv88f8Er5WxwsGZiBtT3DRu4+N/cTHQh1/GV/NoIbXz7+V+Cc+Js6U1AWOrDn4efOAxEObVc77vaIIyclXwDwSA+VOpvPZl0XhHfTG4JiCkVDOFeGBK+BIBkPw57PXIN+5yhiUWK6uPnO8PYT/2q/jIDqYLBbaiGpnJa+P5TCIYOJ7OlF/TpCx5xszbUbmvIZAgSHS2Tc8CEs86J01s6dIX5Dj2J9zHSk76cywy4nx36gpb0iP3+0KaLP2UzgwEFW/Gg4s+Sirrs/iTqr2ccWtzeJFf6qKR4JRRS2NwcKqYo82Xabx8q2tVBsjhZZF46y/lce1jlbfXVLwqOA9J77Ngm7OPh91Xo5NmP66ScMokzEd5PP+vxY8IBCK78Mz/20DlaI/jkz8reO+mRkEhAXVCUmyOWFq/plnZya+PQCAYRUJ8ao/ZB4aRDzhzyCYVDKTaRLAlmS4xbYB//aI0Tg4D7KH3GQZQNjw5EkQgsN3y2fNHa6aL4BU9P0s7g3asTO88Pa4dW7Il/fom+aHixtw1v2W+nlo5UgEa6VZN1Eywp9tGHJNhxSNXep0tCyxqc+5WQjfhKvUj4UcMNfF+9VfVLEgDwpycAva5jXXEjV1JY4DF2mXcnDZtnlAyHoxI4YOQ/wOPt6rOMdbrBZqRTQJfX+K/ln8wnt/Ks8AyxnFa4InlzfvVAHlzcpw+4NrclPOzF+L++4PFk1sK8m2MiqOT6s7F+h4EyHAsn1/LN3j9/zq2unO0L69Ukqh20Y6dB5xYkNTv1+DHVD1fAVuZy7DuB+I6k94HckSuYJ3FFksWZm4ISmL1eoW4GW1hT28ScG9e3z5qzc7kibx3TDnFXcnrwTNLO4Swq91wuhKeiqjpOQMAWI0HVACDb7xo+SNtmw1diBXVzfhU9H7o1CsWfjYkyv25LQx4L1aR6/HS0YFyZ5w6wo1qd4ddUe/TNTX1aCyJ7dbv7TS7L+hXQpxj5a7i37pEKSOHd6fQoVN9x3e1FX2S8bw/lIbMLNDEDVbmXlCnjwP1b/4FTHaMAFCoRIEjE8bxBP5BIcuem7RuL/NDJsRxBnffzDMESzQJKxFH2UQukB56C6HG4ae9yrlAPyf7PQ91GI6LARzpAxrP6MRNC4X7qqyjzWXnO2ttv14f2Fbe20F3sMZfhjv/LVDE+AaXuXT3s7Kc5EB9qcRtRd0Jkhvls9vc5yzBvq/Kqb97P6MIAAA=';
const soulPoster = 'data:image/webp;base64,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';

const modules = [
  ['Member Management','Roster, roles, UID, gun level, armor level and activity tracking.'],
  ['Attendance Tracker','IN, LATE, OUT, NO REPLY with automatic points.'],
  ['Warning Tracker','Reminder, role hold and review workflow.'],
  ['Promotion Board','Trial Running, Eligible, Hold, Promoted and Demoted.'],
  ['Gallery Vault','Members can upload/download images and gameplay clips.'],
  ['Tryout Pipeline','Public requests appear in admin for accept/reject.'],
  ['Alliance Control',`Official ${TAG} rules and allied clan records.`],
  ['Event Manager','Clan meets, runs and alliance planning.'],
  ['Content Planner','Reels, posts, stories and media schedule.']
];

export default function Home(){
  return <main>
    <section
      className="hero"
      style={{
        position:'relative',
        overflow:'hidden',
        backgroundImage:`linear-gradient(90deg,rgba(0,0,0,.88),rgba(20,0,5,.64),rgba(0,0,0,.9)),url(${soulPoster})`,
        backgroundSize:'cover',
        backgroundPosition:'center top',
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
          <img src={soulLogo} alt="SOUL logo" style={{width:'100%',height:260,objectFit:'cover',display:'block'}} />
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