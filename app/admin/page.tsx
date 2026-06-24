'use client';
import { useEffect, useState } from 'react';
import { Shell, SectionTitle } from '../../components/shell';
import { members as seedMembers, events as seedEvents, alliances as seedAlliances } from '../../lib/data';

type Row = Record<string, any>;
const tables = ['members','attendance','warnings','tryouts','events','alliances','content_plan'];

function points(status: string) {
  if (status === 'IN') return 10;
  if (status === 'LATE') return 7;
  if (status === 'OUT') return 5;
  return 0;
}

export default function AdminPage() {
  const [tab, setTab] = useState('members');
  const [rows, setRows] = useState<Record<string, Row[]>>({});
  const [loading, setLoading] = useState(false);

  async function load(table = tab) {
    setLoading(true);
    const res = await fetch('/api/admin/' + table);
    const data = await res.json();
    setRows(r => ({ ...r, [table]: Array.isArray(data) ? data : [] }));
    setLoading(false);
  }

  useEffect(() => { tables.forEach(t => load(t)); }, []);

  async function add(table: string, body: Row) {
    const res = await fetch('/api/admin/' + table, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (res.ok) load(table);
  }

  async function patch(table: string, id: string, body: Row) {
    const res = await fetch('/api/admin/' + table + '/' + id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (res.ok) load(table);
  }

  async function del(table: string, id: string) {
    const res = await fetch('/api/admin/' + table + '/' + id, { method: 'DELETE' });
    if (res.ok) load(table);
  }

  const dbMembers = rows.members || [];
  const roster = dbMembers.length ? dbMembers : seedMembers.map((m:any,i:number)=>({id:String(i),real_name:m[0],game_name:m[1],role:m[2],team:m[3],activity_status:m[4],driving_skill:m[5],game_skill:m[6],warnings_count:m[7],promotion_status:m[8]}));
  const tryouts = rows.tryouts || [];
  const eventRows = (rows.events || []).length ? rows.events : seedEvents.map((e:any,i:number)=>({id:String(i),title:e[0],type:e[1],time:e[2],status:e[3]}));
  const allianceRows = (rows.alliances || []).length ? rows.alliances : seedAlliances.map((a:any,i:number)=>({id:String(i),clan_name:a[0],alliance_tag:a[1],leader_instagram:a[2],status:a[3]}));

  function MemberForm(){return <form className="card form" onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);add('members',{real_name:f.get('real_name'),game_name:f.get('game_name'),instagram_id:f.get('instagram_id'),role:f.get('role'),team:f.get('team'),activity_status:'Active',driving_skill:Number(f.get('driving_skill')||0),game_skill:Number(f.get('game_skill')||0),teamwork:80,behavior:80,warnings_count:0,promotion_status:'Trial Running',alliance_tag:'SYN'});e.currentTarget.reset();}}><h3>Add Member</h3>{['real_name','game_name','instagram_id','role','team','driving_skill','game_skill'].map(x=><input key={x} className="input" name={x} placeholder={x.replaceAll('_',' ')} required/>)}<button className="btn red">Add</button></form>}
  function AttendanceForm(){return <form className="card form" onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);const status=String(f.get('status'));add('attendance',{member_id:f.get('member_id'),date:f.get('date'),status,reason:f.get('reason'),points:points(status)});e.currentTarget.reset();}}><h3>Mark Attendance</h3><select name="member_id">{roster.map((m:any)=><option key={m.id} value={m.id}>{m.game_name}</option>)}</select><input className="input" name="date" type="date" required/><select name="status"><option>IN</option><option>LATE</option><option>OUT</option><option>NO REPLY</option></select><input className="input" name="reason" placeholder="reason"/><button className="btn red">Save</button></form>}
  function WarningForm(){return <form className="card form" onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);add('warnings',{member_id:f.get('member_id'),reason:f.get('reason'),warning_level:Number(f.get('warning_level')),action:f.get('action'),date:f.get('date')});e.currentTarget.reset();}}><h3>Add Warning</h3><select name="member_id">{roster.map((m:any)=><option key={m.id} value={m.id}>{m.game_name}</option>)}</select><input className="input" name="reason" placeholder="reason" required/><select name="warning_level"><option>1</option><option>2</option><option>3</option></select><select name="action"><option>Reminder</option><option>Role Hold</option><option>Remove Review</option></select><input className="input" name="date" type="date" required/><button className="btn red">Save</button></form>}
  function EventForm(){return <form className="card form" onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);add('events',Object.fromEntries(f.entries()));e.currentTarget.reset();}}><h3>Add Event</h3>{['title','type','date','time','description','status'].map(x=><input key={x} className="input" name={x} placeholder={x}/>) }<button className="btn red">Add</button></form>}
  function AllianceForm(){return <form className="card form" onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);add('alliances',Object.fromEntries(f.entries()));e.currentTarget.reset();}}><h3>Add Alliance</h3>{['clan_name','alliance_tag','leader_instagram','status','notes'].map(x=><input key={x} className="input" name={x} placeholder={x}/>) }<button className="btn red">Add</button></form>}

  return <Shell><main className="section"><div className="wrap"><SectionTitle eyebrow="ADMIN" title="SOUL HQ Dashboard" text="Working modules with Supabase database storage." />
    <div className="grid grid3" style={{marginBottom:24}}><div className="card"><div className="stat">{roster.length}</div><p>Members</p></div><div className="card"><div className="stat">{tryouts.length}</div><p>Tryouts</p></div><div className="card"><div className="stat">{eventRows.length}</div><p>Events</p></div></div>
    <div className="tabs">{tables.map(t=><button key={t} className={tab===t?'active':''} onClick={()=>{setTab(t);load(t)}}>{t}</button>)}</div>{loading && <p>Loading...</p>}
    {tab==='members' && <><MemberForm/><div className="card" style={{marginTop:16,overflowX:'auto'}}><table className="table"><thead><tr><th>Name</th><th>Role</th><th>Team</th><th>Status</th><th>Promotion</th><th>Action</th></tr></thead><tbody>{roster.map((m:any)=><tr key={m.id}><td>{m.game_name}<br/><span className="muted">{m.real_name}</span></td><td>{m.role}</td><td>{m.team}</td><td>{m.activity_status}</td><td><select value={m.promotion_status||''} onChange={e=>patch('members',m.id,{promotion_status:e.target.value})}><option>Trial Running</option><option>Eligible</option><option>Hold</option><option>Promoted</option><option>Demoted</option><option>Remove Review</option></select></td><td>{String(m.id).length>3&&<button className="smallbtn" onClick={()=>del('members',m.id)}>Delete</button>}</td></tr>)}</tbody></table></div></>}
    {tab==='attendance' && <><AttendanceForm/><div className="card" style={{marginTop:16}}>{(rows.attendance||[]).map((a:any)=><p key={a.id}>{a.date} • {a.status} • {a.points} points • {a.reason}</p>)}</div></>}
    {tab==='warnings' && <><WarningForm/><div className="card" style={{marginTop:16}}>{(rows.warnings||[]).map((w:any)=><p key={w.id}>Level {w.warning_level} • {w.action} • {w.reason}</p>)}</div></>}
    {tab==='tryouts' && <div className="grid grid2">{tryouts.map((t:any)=><div className="card" key={t.id}><h3>{t.game_name}</h3><p>{t.name} • {t.instagram_id}</p><p className="muted">{t.message}</p><p>Status: {t.status}</p><button className="smallbtn red" onClick={()=>patch('tryouts',t.id,{status:'Accepted'})}>Accept</button><button className="smallbtn" onClick={()=>patch('tryouts',t.id,{status:'Rejected'})}>Reject</button></div>)}</div>}
    {tab==='events' && <><EventForm/><div className="grid grid3" style={{marginTop:16}}>{eventRows.map((e:any)=><div className="card" key={e.id}><h3>{e.title}</h3><p>{e.type} • {e.time}</p><span className="tag">{e.status}</span></div>)}</div></>}
    {tab==='alliances' && <><AllianceForm/><div className="grid grid3" style={{marginTop:16}}>{allianceRows.map((a:any)=><div className="card" key={a.id}><h3>{a.clan_name}</h3><p>{a.alliance_tag} • {a.leader_instagram}</p><span className="tag">{a.status}</span></div>)}</div></>}
    {tab==='content_plan' && <div className="card"><h3>Content Planner</h3><p className="muted">Use events and gallery to plan reels, stories and posts.</p></div>}
  </div></main></Shell>;
}
