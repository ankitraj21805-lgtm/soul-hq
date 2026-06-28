'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Row=Record<string,any>;
export default function Rules(){
  const [rows,setRows]=useState<Row[]>([]),[loading,setLoading]=useState(true);
  useEffect(()=>{fetch('/api/public/rules',{cache:'no-store'}).then(r=>r.json()).then(d=>setRows(Array.isArray(d)?d:[])).catch(()=>setRows([])).finally(()=>setLoading(false))},[]);
  return <main className="section"><div className="wrap"><div className="center"><b className="red">RULES</b><h1 className="h2">SOUL Rules</h1><p className="muted">Guidelines added from the control room appear here.</p><div className="row" style={{justifyContent:'center',marginTop:16}}><Link className="btn red" href="/rules-admin">Manage Rules</Link></div></div>{loading&&<p className="muted">Loading rules...</p>}{!loading&&!rows.length&&<div className="notice muted">No rules added yet.</div>}<div className="grid grid3">{rows.map(r=><div className="card" key={r.id} style={{padding:0,overflow:'hidden'}}>{r.thumbnailUrl&&<img src={r.thumbnailUrl} alt={r.title} style={{width:'100%',height:190,objectFit:'cover',display:'block'}}/>}<div style={{padding:20}}><h3>{r.title}</h3><p className="muted">{r.description}</p><span className="tag">{r.status||'Active'}</span></div></div>)}</div></div></main>
}