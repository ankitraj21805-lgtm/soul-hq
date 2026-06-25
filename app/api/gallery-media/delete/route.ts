import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

function supabase(){ return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '', { auth:{ persistSession:false } }); }
async function isAdmin(){ const c=await cookies(); return c.get('soul_admin')?.value === '1'; }
export async function POST(req:Request){
  if(!(await isAdmin())) return NextResponse.json({ error:'Admin only' }, { status:401 });
  const body=await req.json().catch(()=>({}));
  const bucket=String(body.bucket || ''); const path=String(body.path || '');
  if(!['gallery-images','gallery-clips'].includes(bucket) || !path) return NextResponse.json({ error:'Invalid media' }, { status:400 });
  const { error } = await supabase().storage.from(bucket).remove([path]);
  if(error) return NextResponse.json({ error:error.message }, { status:500 });
  return NextResponse.json({ ok:true });
}
