'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Row=Record<string,any>;
function info(raw:any){
  try{ const x=JSON.parse(String(raw||'{}')); return { description:x.description||'', thumbnailUrl:x.thumbnailUrl||'' }; }
  catch{ return { description:String(raw||''), thumbnailUrl:'' }; }
}
export default function Events(){
  const [rows,setRows]=useState<Row[]>([]),[loading,setLoading]=useState(true);
  useEffect(()=>{fetch('/api/public/events',{cache:'no-store'}).then(r=>r.json()).then(d=>setRows(Array.isArray(d)?d:[])).catch(()=>setRows([])).finally(()=>setLoading(false))},[]);
  return <main className="section"><div className="wrap"><div className="center"><b className="red">EVENTS</b><h1 className="h2">SOUL Events</h1><p className="muted">Only admin-added events appear here.</p><div className="row" style={{justifyContent:'center',marginTop:16}}><Link className="btn red" href="/events-admin">Admin Add / Remove Events</Link></div></div>{loading&&<p className="muted">Loading events...</p>}{!loading&&!rows.length&&<div className="notice muted">No events added yet. Admin can add events with optional thumbnail.</div>}<div className="grid grid3">{rows.map(e=>{const d=info(e.description);return <div className="card" key={e.id} style={{padding:0,overflow:'hidden'}}>{d.thumbnailUrl&&<img src={d.thumbnailUrl} alt={e.title} style={{width:'100%',height:190,objectFit:'cover',display:'block'}}/>}<div style={{padding:20}}><h3>{e.title}</h3><p className="muted">{e.type} • {e.date||''} • {e.time||''}</p><p>{d.description}</p><span className="tag">{e.status}</span></div></div>})}</div></div></main>
}