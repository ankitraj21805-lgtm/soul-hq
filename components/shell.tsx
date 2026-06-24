import Link from 'next/link';

export function Shell({ children }: { children: React.ReactNode }) {
  const links = ['About','Members','Join','Events','Alliance','Gallery','Rules','Login'];
  return <>
    <header className="nav"><div className="wrap navin"><Link href="/" style={{fontWeight:900,fontSize:20}}>👑 SOUL HQ</Link><nav className="links">{links.map(l => <Link key={l} href={'/'+l.toLowerCase()}>{l}</Link>)}<Link href="/admin">Admin</Link></nav></div></header>
    {children}
    <footer className="section"><div className="wrap muted">SOUL Syndicate • SYN Alliance • Respect • Loyalty • Skill • Fair-play only</div></footer>
  </>;
}

export function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div style={{textAlign:'center',maxWidth:760,margin:'0 auto 32px'}}><b className="redtxt">{eyebrow}</b><h1 className="title" style={{fontSize:44}}>{title}</h1><p className="muted">{text}</p></div>;
}
