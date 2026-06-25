'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Row = Record<string, any>;
const tables = ['members','attendance','warnings','tryouts','events','alliances','content_plan'];
function points(status:string){ if(status==='IN')return 10; if(status==='LATE')return 7; if(status==='OUT')return 5; return 0; }

export default function AdminPage(){
  const [authed,setAuthed]=useState(false);
  const [tab,setTab]=useState('members');
  const [rows,setRows]=useState<Record<string,Row[]>>({});
  const [msg,setMsg]=useState('');
  const [loading,setLoading]=useState(false);

  async function login(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setMsg('Checking...');
    const password = new FormData(e.currentTarget).get('password');
    try{
      const res = await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});
      if(res.ok){ setAuthed(true); setMsg('Logged in'); setTimeout(loadAll,100); return; }
      setMsg('Wrong password');
    }catch{ setMsg('Login failed'); }
  }

  useEffect(()=>{
    const timer=setTimeout(()=>setAuthed(false),1200);
    fetch('/api/auth/me').then(r=>r.ok?r.json():{ok:false}).then(d=>{ if(d.ok){ setAuthed(true); setTimeout(loadAll,100); }}).catch(()=>{}).finally(()=>clearTimeout(timer));
  },[]);

  async function load(table=tab){
    setLoading(true);
    try{
      const res=await fetch('/api/admin/'+table);
      if(res.status===401){ setAuthed(false); return; }
      const data=await res.json();
      setRows(x=>({...x,[table]:Array.isArray(data)?data:[]}));
    }catch{ setMsg('Load failed'); }
    setLoading(false);
  }
  async function loadAll(){ for(const t of tables) await load(t); }
  async function add(table:string, body:Row){ const r=await fetch('/api/admin/'+table,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}); setMsg(r.ok?'Saved':'Save failed'); if(r.ok) load(table); }
  async function patch(table:string,id:string,body:Row){ const r=await fetch('/api/admin/'+table+'/'+id,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}); setMsg(r.ok?'Updated':'Update failed'); if(r.ok) load(table); }
  async function remove(table:string,id:string){ if(!confirm('Delete this record?')) return; const r=await fetch('/api/admin/'+table+'/'+id,{method:'DELETE'}); setMsg(r.ok?'Deleted':'Delete failed'); if(r.ok) load(table); }
  async function seed(){ setMsg('Seeding...'); const r=await fetch('/api/seed',{method:'POST'}); setMsg(r.ok?'Database seeded':'Seed failed'); if(r.ok) loadAll(); }
  async function logout(){ await fetch('/api/auth/logout',{method:'POST'}); setAuthed(false); setRows({}); }

  if(!authed){
    return <main className="section"><div className="wrap"><div className="center"><b className="red">ADMIN</b><h1 className="h2">SOUL HQ Login</h1><p className="muted">Enter admin password to manage clan records.</p></div><form onSubmit={login} className="card form" style={{maxWidth:520,margin:'auto'}}><input className="input" type="password" name="password" placeholder="Admin password" required/><button className="btn red">Login</button>{msg&&<p style={{color:msg.includes('Wrong')?'#ff8797':'#9fffb5'}}>{msg}</p>}<Link className="btn" href="/">Back Home</Link></form></div></main>;
  }

  const roster=rows.members||[]; const tryouts=rows.tryouts||[]; const events=rows.events||[]; const allies=rows.alliances||[]; const content=rows.content_plan||[];
  function MemberForm(){return <form className="card form" onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);add('members',{real_name:f.get('real_name'),game_name:f.get('game_name'),instagram_id:f.get('instagram_id'),role:f.get('role'),team:f.get('team'),activity_status:f.get('activity_status'),driving_skill:Number(f.get('driving_skill')||0),game_skill:Number(f.get('game_skill')||0),teamwork:80,behavior:80,warnings_count:0,promotion_status:'Trial Running',alliance_tag:'SYN',notes:f.get('notes')});e.currentTarget.reset();}}><h3>Add Member</h3>{['real_name','game_name','instagram_id','role','team','driving_skill','game_skill','notes'].map(x=><input key={x} className="input" name={x} placeholder={x.replaceAll('_',' ')}/>) }<select name="activity_status"><option>Active</option><option>Trial</option><option>Inactive</option><option>Hold</option></select><button className="btn red">Add Member</button></form>}
  function AttendanceForm(){return <form className="card form" onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);const status=String(f.get('status'));add('attendance',{member_id:f.get('member_id'),date:f.get('date'),status,reason:f.get('reason'),points:points(status)});e.currentTarget.reset();}}><h3>Mark Attendance</h3><select name="member_id">{roster.map(m=><option key={m.id} value={m.id}>{m.game_name}</option>)}</select><input className="input" name="date" type="date" required/><select name="status"><option>IN</option><option>LATE</option><option>OUT</option><option>NO REPLY</option></select><input className="input" name="reason" placeholder="reason"/><button className="btn red">Save Attendance</button></form>}
  function WarningForm(){return <form className="card form" onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);add('warnings',{member_id:f.get('member_id'),reason:f.get('reason'),warning_level:Number(f.get('warning_level')),action:f.get('action'),date:f.get('date')});e.currentTarget.reset();}}><h3>Add Warning</h3><select name="member_id">{roster.map(m=><option key={m.id} value={m.id}>{m.game_name}</option>)}</select><input className="input" name="reason" placeholder="reason" required/><select name="warning_level"><option>1</option><option>2</option><option>3</option></select><select name="action"><option>Reminder</option><option>Role Hold</option><option>Remove Review</option></select><input className="input" name="date" type="date" required/><button className="btn red">Save Warning</button></form>}
  function EventForm(){return <form className="card form" onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);add('events',Object.fromEntries(f.entries()));e.currentTarget.reset();}}><h3>Add Event</h3>{['title','type','date','time','description','status'].map(x=><input key={x} className="input" name={x} placeholder={x}/>) }<button className="btn red">Add Event</button></form>}
  function AllianceForm(){return <form className="card form" onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);add('alliances',Object.fromEntries(f.entries()));e.currentTarget.reset();}}><h3>Add Alliance</h3>{['clan_name','alliance_tag','leader_instagram','status','notes'].map(x=><input key={x} className="input" name={x} placeholder={x}/>) }<button className="btn red">Add Alliance</button></form>}
  function ContentForm(){return <form className="card form" onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);add('content_plan',Object.fromEntries(f.entries()));e.currentTarget.reset();}}><h3>Add Content Plan</h3>{['title','type','date','status','notes'].map(x=><input key={x} className="input" name={x} placeholder={x}/>) }<button className="btn red">Add Plan</button></form>}

  return <main className="section"><div className="wrap"><div className="center"><b className="red">ADMIN</b><h1 className="h2">SOUL HQ Dashboard</h1><p className="muted">Protected, database-backed clan management.</p></div><div className="row"><button className="btn red" onClick={seed}>Seed Database</button><button className="btn" onClick={loadAll}>Refresh</button><button className="btn" onClick={logout}>Logout</button>{msg&&<b style={{color:'#9fffb5'}}>{msg}</b>}</div><div className="grid grid3" style={{marginTop:18}}><div className="card"><div className="stat">{roster.length}</div><p>Members</p></div><div className="card"><div className="stat">{tryouts.length}</div><p>Tryouts</p></div><div className="card"><div className="stat">{events.length}</div><p>Events</p></div></div><div className="tabs">{tables.map(t=><button key={t} className={tab===t?'active':''} onClick={()=>{setTab(t);load(t)}}>{t}</button>)}</div>{loading&&<p className="muted">Loading...</p>}{tab==='members'&&<><MemberForm/><div className="card tablewrap" style={{marginTop:16}}><table className="table"><thead><tr><th>Name</th><th>Role</th><th>Team</th><th>Status</th><th>Promotion</th><th>Action</th></tr></thead><tbody>{roster.map(m=><tr key={m.id}><td>{m.game_name}<br/><span className="muted">{m.real_name}</span></td><td>{m.role}</td><td>{m.team}</td><td>{m.activity_status}</td><td><select value={m.promotion_status||''} onChange={e=>patch('members',m.id,{promotion_status:e.target.value})}><option>Trial Running</option><option>Eligible</option><option>Hold</option><option>Promoted</option><option>Demoted</option><option>Remove Review</option></select></td><td><button className="small" onClick={()=>remove('members',m.id)}>Delete</button></td></tr>)}</tbody></table></div></>}{tab==='attendance'&&<><AttendanceForm/><div className="card" style={{marginTop:16}}>{(rows.attendance||[]).map(a=><p key={a.id}>{a.date} • {a.status} • {a.points} points • {a.reason}</p>)}</div></>}{tab==='warnings'&&<><WarningForm/><div className="card" style={{marginTop:16}}>{(rows.warnings||[]).map(w=><p key={w.id}>Level {w.warning_level} • {w.action} • {w.reason}</p>)}</div></>}{tab==='tryouts'&&<div className="grid grid2">{tryouts.map(t=><div className="card" key={t.id}><h3>{t.game_name}</h3><p>{t.name} • {t.instagram_id}</p><p className="muted">{t.active_time} • Driving {t.driving_skill} • Game {t.game_skill}</p><p>{t.message}</p><p>Status: <b>{t.status}</b></p><button className="small red" onClick={()=>patch('tryouts',t.id,{status:'Accepted'})}>Accept</button><button className="small" onClick={()=>patch('tryouts',t.id,{status:'Rejected'})}>Reject</button><button className="small" onClick={()=>remove('tryouts',t.id)}>Delete</button></div>)}</div>}{tab==='events'&&<><EventForm/><div className="grid grid3" style={{marginTop:16}}>{events.map(e=><div className="card" key={e.id}><h3>{e.title}</h3><p>{e.type} • {e.date} • {e.time}</p><span className="tag">{e.status}</span><br/><button className="small" onClick={()=>remove('events',e.id)}>Delete</button></div>)}</div></>}{tab==='alliances'&&<><AllianceForm/><div className="grid grid3" style={{marginTop:16}}>{allies.map(a=><div className="card" key={a.id}><h3>{a.clan_name}</h3><p>{a.alliance_tag} • {a.leader_instagram}</p><span className="tag">{a.status}</span><p>{a.notes}</p><button className="small" onClick={()=>remove('alliances',a.id)}>Delete</button></div>)}</div></>}{tab==='content_plan'&&<><ContentForm/><div className="grid grid3" style={{marginTop:16}}>{content.map(c=><div className="card" key={c.id}><h3>{c.title}</h3><p>{c.type} • {c.date}</p><span className="tag">{c.status}</span><p>{c.notes}</p><button className="small" onClick={()=>remove('content_plan',c.id)}>Delete</button></div>)}</div></>}</div></main>;
}
