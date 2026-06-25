import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'SOUL HQ', description: 'SOUL HQ website' };
const nav = [['Home','/'],['About','/about'],['Members','/members'],['Join','/join'],['Events','/events'],['Alliance','/alliance'],['Gallery','/gallery'],['Rules','/rules'],['Member Login','/member-login'],['Admin','/admin']];
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><header className="nav"><div className="wrap navin"><Link className="brand" href="/">👑 SOUL HQ</Link><nav className="links">{nav.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</nav></div></header>{children}<footer className="section"><div className="wrap muted">SOUL HQ • Respect • Loyalty • Skill</div></footer></body></html>;
}
