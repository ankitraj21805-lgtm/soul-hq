'use client';
import { useState } from 'react';
import { Shell, SectionTitle } from '../../components/shell';

export default function JoinPage() {
  const [msg, setMsg] = useState('');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg('Saving...');
    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form.entries());
    const res = await fetch('/api/tryouts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setMsg(res.ok ? 'Tryout request saved.' : 'Could not save request.');
    if (res.ok) e.currentTarget.reset();
  }
  const fields = ['name','game_name','instagram_id','active_time','driving_skill','game_skill'];
  return <Shell><main className="section"><div className="wrap"><SectionTitle eyebrow="JOIN" title="Tryout Form" text="Apply for SOUL Syndicate." /><form onSubmit={submit} className="card form" style={{maxWidth:720,margin:'auto'}}>{fields.map(f => <div key={f}><label>{f.replaceAll('_',' ')}</label><input className="input" name={f} required /></div>)}<div><label>message</label><textarea className="input" name="message" rows={4} /></div><button className="btn red">Submit Tryout</button>{msg && <p>{msg}</p>}</form></div></main></Shell>;
}
