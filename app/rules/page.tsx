'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Rule={id:string;title:string;status?:string;notes?:string};
function parse(raw:any){ try{return JSON.parse(String(raw||'{}'))}catch{return {text:String(raw||''),thumbnailUrl:''}} }
export default function Rules(){
 const [rows,setRows]=useState<Rule[]>([]),[loading,setLoading]=useState(true);
 useEffect(()=>{fetch('/api/rules').then(r=>r.json()).then(d=>setRows(Array.isArray(d)?d:[])).catch(()=>setRows([])).finally(()=>setLoading(false))},[]);
 return <main className="section"><div className="wrap"><div className="center"><b className="red">RULES</b><h1 className="h2">SOUL Rules</h1><p className="muted">Only admin-added rules will show here. Fake rule cards removed.</p><div className="row" style={{justifyContent:'center',marginTop:16}}><Link className="btn red" href="/rules-admin">Admin Add / Remove Rules</Link></div></div>{loading&&<p className="muted">Loading rules...</p>}{!loading&&!rows.length&&<div className="notice muted">No rules added yet. Admin se rule add karo.</div>}<div className="grid grid3">{rows.map(r=>{const n=parse(r.notes);return <div className="card" key={r.id} style={{padding:0,overflow:'hidden'}}>{n.thumbnailUrl&&<img src={n.thumbnailUrl} alt={r.title} style={{width:'100%',height:180,objectFit:'cover',display:'block'}}/>}<div style={{padding:20}}><h3>{r.title}</h3><p className="muted">{n.text||'Rule details not added.'}</p><span className="tag">{r.status||'Ready'}</span></div></div>})}</div></div></main>
}