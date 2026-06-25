'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

type Clip={path:string;url:string;downloadUrl:string;title:string;uploadedBy:string;created_at:string;size:number};
function supabase(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');}
function mb(n:number){return n? (n/1024/1024).toFixed(1)+' MB' : ''}
export default function ClipsPage(){
  const [clips,setClips]=useState<Clip[]>([]);
  const [msg,setMsg]=useState('');
  const [loading,setLoading]=useState(false);
  async function load(){
    setLoading(true);
    try{ const r=await fetch('/api/clips',{cache:'no-store'}); const d=await r.json(); setClips(Array.isArray(d)?d:[]); }
    catch{ setMsg('Clips load failed'); }
    setLoading(false);
  }
  useEffect(()=>{load()},[]);
  async function upload(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setMsg('Uploading clip...');
    const form=new FormData(e.currentTarget);
    const title=String(form.get('title')||'Fighting Clip');
    const uploadedBy=String(form.get('uploadedBy')||'Unknown');
    const file=form.get('file') as File;
    if(!file || !file.type.startsWith('video/')){setMsg('Only video file upload karo');return;}
    if(file.size > 100*1024*1024){setMsg('Max 100MB clip allowed');return;}
    const sign=await fetch('/api/clips/sign',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fileName:file.name,contentType:file.type,title,uploadedBy})});
    const data=await sign.json();
    if(!sign.ok){setMsg(data.error || 'Upload permission failed');return;}
    const up=await supabase().storage.from('clips').uploadToSignedUrl(data.path,data.token,file);
    if(up.error){setMsg(up.error.message);return;}
    setMsg('Clip uploaded successfully');
    e.currentTarget.reset();
    load();
  }
  return <main className="section"><div className="wrap"><div className="center"><b className="red">FIGHTING CLIPS</b><h1 className="h2">SOUL Clip Vault</h1><p className="muted">Gameplay fighting clips upload karo, website par store rahega, uploader name dikhega aur download bhi hoga.</p><div className="row" style={{justifyContent:'center'}}><Link className="btn" href="/">Home</Link><Link className="btn" href="/admin">Admin</Link></div></div><form onSubmit={upload} className="card form" style={{maxWidth:720,margin:'0 auto 28px'}}><h3>Upload New Clip</h3><input className="input" name="title" placeholder="Clip title, e.g. 1v2 fight win" required/><input className="input" name="uploadedBy" placeholder="Uploaded by / Game name" required/><input className="input" name="file" type="file" accept="video/mp4,video/webm,video/quicktime,video/x-matroska" required/><button className="btn red">Upload Clip</button>{msg&&<p className="toast">{msg}</p>}<p className="muted">Max 100MB. Only fair-play gameplay clips — no hacks/cheats.</p></form>{loading&&<p className="muted">Loading clips...</p>}{!loading&&!clips.length&&<div className="notice muted">Abhi koi clip upload nahi hai.</div>}<div className="grid grid2">{clips.map(c=><div className="card" key={c.path}><video src={c.url} controls style={{width:'100%',borderRadius:16,background:'#000',maxHeight:360}}/><h3>{c.title}</h3><p className="muted">Uploaded by: <b>{c.uploadedBy}</b></p><p className="muted">{c.created_at ? new Date(c.created_at).toLocaleString() : ''} {mb(c.size)}</p><div className="row"><a className="btn red" href={c.downloadUrl}>Download</a><a className="btn" href={c.url} target="_blank">Open</a></div></div>)}</div></div></main>
}
