'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Row=Record<string,any>;
function thumb(desc:any){ const m=String(desc||'').match(/THUMBNAIL_URL:\s*([^;]+);?/i); return m?m[1].trim():''; }
function clean(desc:any){ return String(desc||'').replace(/THUMBNAIL_URL:\s*[^;]+;?/ig,'').trim(); }
export default function Events(){
 const [rows,setRows]=useState<Row[]>([]),[loading,setLoading]=useState(true);
 useEffect(()=>{fetch('/api/public/events').then(r=>r.json()).then(d=>setRows(Array.isArray(d)?d:[])).catch(()=>setRows([])).finally(()=>setLoading(false))},[]);
 return <main className="section"><div className="wrap"><div className="center"><b className="red">EVENTS</b><h1 className="h2">SOUL Events</h1><p className="muted">Only admin-added events will show here. Fake cards removed.</p><div className="row" style={{justifyContent:'center',marginTop:16}}><Link className="btn red" href="/events-admin">Admin Add / Remove Events</Link></div></div>{loading&&<p className="muted">Loading events...</p>}{!loading&&!rows.length&&<div className="notice muted">No events added yet. Admin se event add karo.</div>}<div className="grid grid3">{rows.map(e=><div className="card" key={e.id} style={{padding:0,overflow:'hidden'}}>{thumb(e.description)&&<img src={thumb(e.description)} alt={e.title} style={{width:'100%',height:190,objectFit:'cover',display:'block'}}/>}<div style={{padding:20}}><h3>{e.title}</h3><p>{e.type} • {e.date||''} • {e.time||''}</p><p className="muted">{clean(e.description)}</p><span className="tag">{e.status}</span></div></div>)}</div></div></main>
}