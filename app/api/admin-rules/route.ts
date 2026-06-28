import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
function db(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '', {auth:{persistSession:false}});}
async function authed(){const store=await cookies();return store.get('soul_admin')?.value==='1';}
function note(raw:any){try{return JSON.parse(String(raw||'{}'))}catch{return {description:String(raw||''),thumbnailUrl:''}}}
export async function GET(){
  if(!(await authed())) return NextResponse.json({error:'Unauthorized'},{status:401});
  const r=await db().from('content_plan').select('*').eq('type','rule').order('created_at',{ascending:false});
  const rows=(r.data||[]).map((x:any)=>{const n=note(x.notes);return {id:x.id,title:x.title,description:n.description||'',thumbnailUrl:n.thumbnailUrl||'',status:x.status||'Active'}});
  return NextResponse.json(rows);
}
export async function POST(req:Request){
  if(!(await authed())) return NextResponse.json({error:'Unauthorized'},{status:401});
  const b=await req.json();
  const notes=JSON.stringify({description:b.description||'',thumbnailUrl:b.thumbnailUrl||''});
  const r=await db().from('content_plan').insert({title:b.title,type:'rule',status:b.status||'Draft',notes}).select().single();
  return NextResponse.json(r.data||{error:r.error?.message},{status:r.error?500:200});
}
