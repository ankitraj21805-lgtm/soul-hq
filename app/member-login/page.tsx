'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function MemberLogin(){
  const [msg,setMsg]=useState('');
  async function login(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault(); setMsg('Checking...');
    const password=new FormData(e.currentTarget).get('password');
    const r=await fetch('/api/auth/member-login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});
    if(r.ok){ location.href='/gallery'; return; }
    setMsg('Wrong member password');
  }
  return <main className="section"><div className="wrap"><div className="center"><b className="red">MEMBER LOGIN</b><h1 className="h2">SOUL Members Access</h1><p className="muted">Members clips/images upload aur download kar sakte hain. Delete/edit sirf admin karega.</p></div><form onSubmit={login} className="card form" style={{maxWidth:520,margin:'auto'}}><input className="input" type="password" name="password" placeholder="Member password" required/><button className="btn red">Login as Member</button>{msg&&<p className={msg.includes('Wrong')?'error':'toast'}>{msg}</p>}<Link className="btn" href="/gallery">Back to Gallery</Link></form></div></main>;
}
