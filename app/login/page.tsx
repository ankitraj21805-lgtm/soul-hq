'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage(){
  const [msg,setMsg]=useState('');
  async function login(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setMsg('Checking...');
    const password = new FormData(e.currentTarget).get('password');
    try{
      const res = await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});
      if(res.ok){ location.href='/admin'; return; }
      setMsg('Wrong password');
    }catch{ setMsg('Login failed. Try again.'); }
  }
  return <main className="section"><div className="wrap"><div className="center"><b className="red">LOGIN</b><h1 className="h2">SOUL HQ Admin</h1><p className="muted">Protected clan dashboard access.</p></div><form onSubmit={login} className="card form" style={{maxWidth:520,margin:'auto'}}><label>Admin Password</label><input className="input" name="password" type="password" placeholder="Enter password" required/><button className="btn red">Login</button>{msg&&<p style={{color:msg.includes('Wrong')?'#ff8797':'#9fffb5'}}>{msg}</p>}<Link className="btn" href="/">Back Home</Link></form></div></main>;
}
