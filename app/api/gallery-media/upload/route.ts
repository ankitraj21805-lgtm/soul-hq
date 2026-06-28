import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
const buckets = { image: 'gallery-images', clip: 'gallery-clips' } as const;
function sb(){ return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '', { auth:{ persistSession:false } }); }
function safe(v:string){ return encodeURIComponent(String(v || 'unknown').trim().slice(0,70).replace(/\s+/g,'-')); }
async function allowed(){ const c=await cookies(); return c.get('soul_member')?.value==='1' || c.get('soul_admin')?.value==='1'; }
async function ensure(kind:'image'|'clip'){ const s=sb(); const bucket=buckets[kind]; const found=await s.storage.getBucket(bucket); if(found.error) await s.storage.createBucket(bucket,{ public:true, fileSizeLimit: 52428800 }); return { s, bucket }; }
export async function POST(req:Request){
  if(!(await allowed())) return NextResponse.json({ error:'Member login required' }, { status:401 });
  const ct=req.headers.get('content-type')||'';
  if(ct.includes('application/json')){
    const body=await req.json().catch(()=>({}));
    const title=String(body.title||'Media').trim();
    const uploadedBy=String(body.uploadedBy||'Unknown').trim();
    const mediaUrl=String(body.mediaUrl||'').trim();
    let valid=false; try{ const u=new URL(mediaUrl); valid=u.protocol.startsWith('http'); }catch{}
    if(!valid) return NextResponse.json({ error:'Valid media link paste karo' }, { status:400 });
    const notes=JSON.stringify({ mediaUrl, uploadedBy });
    const payload={ title, type:'media_link', status:'Ready', notes };
    let result=await sb().from('content_plan').insert(payload).select().single();
    if(result.error){
      result=await sb().from('content_plan').insert({ ...payload, status:'Draft' }).select().single();
    }
    if(result.error) return NextResponse.json({ error:result.error.message }, { status:500 });
    return NextResponse.json({ ok:true, data:result.data });
  }
  const form=await req.formData();
  const kind=form.get('kind')==='clip'?'clip':'image';
  const file=form.get('file') as File | null;
  const title=String(form.get('title') || (kind==='clip'?'Gameplay Media':'Gallery Image'));
  const uploadedBy=String(form.get('uploadedBy') || 'Unknown');
  if(!file) return NextResponse.json({ error:'File missing' }, { status:400 });
  if(kind==='image' && !file.type.startsWith('image/')) return NextResponse.json({ error:'Only image files allowed' }, { status:400 });
  if(kind==='clip' && !file.type.startsWith('video/')) return NextResponse.json({ error:'Only media files allowed' }, { status:400 });
  if(file.size>52428800) return NextResponse.json({ error:'File is too large for current storage. Use Clip Link mode for long videos.' }, { status:400 });
  const ext=(file.name.split('.').pop() || (kind==='clip'?'mp4':'png')).replace(/[^a-zA-Z0-9]/g,'').slice(0,8);
  const path=`${Date.now()}__${safe(uploadedBy)}__${safe(title)}.${ext}`;
  const { s, bucket }=await ensure(kind);
  const buffer=Buffer.from(await file.arrayBuffer());
  const { error }=await s.storage.from(bucket).upload(path,buffer,{ contentType:file.type, upsert:false });
  if(error) return NextResponse.json({ error:error.message }, { status:500 });
  const url=s.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  return NextResponse.json({ ok:true,bucket,path,url });
}