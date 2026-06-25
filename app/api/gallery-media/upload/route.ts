import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
const buckets = { image: 'gallery-images', clip: 'gallery-clips' } as const;

function sb(){
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return { url, key, client: createClient(url, key, { auth:{ persistSession:false } }) };
}
function safe(v:string){ return encodeURIComponent(String(v || 'unknown').trim().slice(0,70).replace(/\s+/g,'-')); }
async function allowed(){ const c = await cookies(); return c.get('soul_member')?.value === '1' || c.get('soul_admin')?.value === '1'; }
async function ensure(kind:'image'|'clip'){
  const { url, key, client } = sb();
  if(!url || !key) return { ok:false, bucket:buckets[kind], s:client, error:'Supabase service role env missing' };
  const bucket = buckets[kind];
  const listed = await client.storage.listBuckets();
  if(listed.error) return { ok:false, bucket, s:client, error:'Storage access failed: '+listed.error.message };
  const exists = (listed.data || []).some((b:any)=>b.name === bucket);
  if(!exists){
    const made = await client.storage.createBucket(bucket, { public:true, fileSizeLimit: kind === 'clip' ? 100*1024*1024 : 10*1024*1024 });
    if(made.error && !made.error.message.toLowerCase().includes('already')) return { ok:false, bucket, s:client, error:'Bucket create failed: '+made.error.message };
  }
  return { ok:true, bucket, s:client, error:'' };
}
async function uploadOnce(kind:'image'|'clip', path:string, buffer:Buffer, type:string){
  const ready = await ensure(kind);
  if(!ready.ok) return { ok:false, error:ready.error };
  const up = await ready.s.storage.from(ready.bucket).upload(path, buffer, { contentType:type, upsert:false });
  if(up.error && up.error.message.toLowerCase().includes('bucket')){
    await ensure(kind);
    const retry = await ready.s.storage.from(ready.bucket).upload(path, buffer, { contentType:type, upsert:false });
    if(retry.error) return { ok:false, error:retry.error.message };
  } else if(up.error) return { ok:false, error:up.error.message };
  const url = ready.s.storage.from(ready.bucket).getPublicUrl(path).data.publicUrl;
  return { ok:true, bucket:ready.bucket, url };
}

export async function POST(req:Request){
  if(!(await allowed())) return NextResponse.json({ error:'Member login required' }, { status:401 });
  const form = await req.formData();
  const kind = form.get('kind') === 'clip' ? 'clip' : 'image';
  const file = form.get('file') as File | null;
  const title = String(form.get('title') || (kind === 'clip' ? 'Gameplay Media' : 'Gallery Image'));
  const uploadedBy = String(form.get('uploadedBy') || 'Unknown');
  if(!file) return NextResponse.json({ error:'File missing' }, { status:400 });
  if(kind === 'image' && !file.type.startsWith('image/')) return NextResponse.json({ error:'Only image files allowed' }, { status:400 });
  if(kind === 'clip' && !file.type.startsWith('video/')) return NextResponse.json({ error:'Only media files allowed' }, { status:400 });
  if(kind === 'image' && file.size > 10*1024*1024) return NextResponse.json({ error:'Image max 10MB' }, { status:400 });
  if(kind === 'clip' && file.size > 100*1024*1024) return NextResponse.json({ error:'Media max 100MB' }, { status:400 });
  const ext = (file.name.split('.').pop() || (kind === 'clip' ? 'mp4' : 'png')).replace(/[^a-zA-Z0-9]/g,'').slice(0,8);
  const path = `${Date.now()}__${safe(uploadedBy)}__${safe(title)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadOnce(kind, path, buffer, file.type);
  if(!result.ok) return NextResponse.json({ error:result.error }, { status:500 });
  return NextResponse.json({ ok:true, bucket:result.bucket, path, url:result.url });
}
