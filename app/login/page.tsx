import { Shell, SectionTitle } from '@/components/shell';

export default function LoginPage() {
  return <Shell><main className="section"><div className="wrap"><SectionTitle eyebrow="LOGIN" title="Admin Access" text="For now open dashboard directly. Supabase auth can be added with your project keys." /><div className="card" style={{maxWidth:520,margin:'auto',textAlign:'center'}}><p className="muted">Demo mode is enabled for setup.</p><a className="btn red" href="/admin">Open Admin Dashboard</a></div></div></main></Shell>;
}
