import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
function db(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');}
function note(raw:any){try{return JSON.parse(String(raw||'{}'))}catch{return {description:String(raw||''),thumbnailUrl:''}}}
export async function GET(){
  const r=await db().from('content_plan').select('*').eq('type','rule').order('created_at',{ascending:false});
  const rows=(r.data||[]).map((x:any)=>{const n=note(x.notes);return {id:x.id,title:x.title,description:n.description||'',thumbnailUrl:n.thumbnailUrl||'',status:x.status||'Active'}});
  return NextResponse.json(rows);
}
