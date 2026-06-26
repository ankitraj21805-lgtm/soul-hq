import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

const buckets = { image: 'gallery-images', clip: 'gallery-clips' } as const;
function sb(){ return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '', { auth:{ persistSession:false } }); }
function safe(v:string){ return encodeURIComponent(String(v || 'unknown').trim().slice(0,70).replace(/\s+/g,'-')); }
async function allowed(){ const c=await cookies(); return c.get('soul_member')?.value==='1' || c.get('soul_admin')?.value==='1'; }
async function ensure(kind:'image'|'clip'){
  const s=sb(); const bucket=buckets[kind];
  const found=await s.storage.getBucket(bucket);
  if(found.error){
    const created=await s.storage.createBucket(bucket,{ public:true, fileSizeLimit: 52428800 });
    if(created.error) return { s, bucket, error: created.error.message };
  }
  return { s, bucket, error:'' };
}
export async function POST(req:Request){
  if(!(await allowed())) return NextResponse.json({ error:'Member login required' }, { status:401 });
  const body=await req.json().catch(()=>({}));
  const kind=body.kind==='clip'?'clip':'image';
  const contentType=String(body.contentType||'');
  if(kind==='image' && !contentType.startsWith('image/')) return NextResponse.json({ error:'Select an image file' }, { status:400 });
  if(kind==='clip' && !contentType.startsWith('video/')) return NextResponse.json({ error:'Select a video file' }, { status:400 });
  const ext=(String(body.fileName||'').split('.').pop() || (kind==='clip'?'mp4':'png')).replace(/[^a-zA-Z0-9]/g,'').slice(0,8);
  const path=`${Date.now()}__${safe(body.uploadedBy)}__${safe(body.title)}.${ext}`;
  const { s, bucket, error:bucketError }=await ensure(kind);
  if(bucketError) return NextResponse.json({ error:'Storage error: '+bucketError }, { status:500 });
  const { data, error }=await s.storage.from(bucket).createSignedUploadUrl(path);
  if(error) return NextResponse.json({ error:error.message }, { status:500 });
  return NextResponse.json({ bucket, path, token:data.token });
}
