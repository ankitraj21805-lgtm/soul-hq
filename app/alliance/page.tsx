'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Row=Record<string,any>;
const OFFICIAL_TAG='【ӢラЯ】';
const fakeNames=['royal drift crew','night racers','blackline mafia','redline crew'];
function isFake(a:Row){return fakeNames.includes(String(a.clan_name||'').toLowerCase().trim()) || String(a.alliance_tag||'').toUpperCase()==='SYN'}
export default function Alliance(){
  const [rows,setRows]=useState<Row[]>([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    fetch('/api/public/alliances')
      .then(r=>r.json())
      .then(d=>setRows((Array.isArray(d)?d:[]).filter((a:any)=>!isFake(a))))
      .catch(()=>setRows([]))
      .finally(()=>setLoading(false));
  },[]);
  return <main className='section'><div className='wrap'><div className='center'><b className='red'>ALLIANCE</b><h1 className='h2'>Official Alliance Tag: <span className='red'>{OFFICIAL_TAG}</span></h1><p className='muted'>Only official alliances added by admin will appear here. Default/fake SYN cards are removed.</p><div className='row' style={{justifyContent:'center',marginTop:16}}><Link className='btn red' href='/alliance-admin'>Admin Add / Remove Alliance</Link></div></div>{loading&&<p className='muted'>Loading alliances...</p>}{!loading&&!rows.length&&<div className='notice muted'>No official alliance added yet. Admin Alliance Manager se clan add karo.</div>}<div className='grid grid3'>{rows.map(a=><div className='card' key={a.id}><h3>{a.clan_name}</h3><p>Official Tag: <b className='red'>{a.alliance_tag||OFFICIAL_TAG}</b></p><p className='muted'>Leader: {a.leader_instagram||'Not added'} • {a.status||'Active'}</p><p>{a.notes||'Official alliance record.'}</p></div>)}</div></div></main>
}