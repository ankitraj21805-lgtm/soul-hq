import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const BUCKET = 'clips';
function admin(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '', { auth: { persistSession:false } });}
function decodePart(v:string){try{return decodeURIComponent(v)}catch{return v}}
function parseName(name:string){
  const clean = name.replace(/\.[^/.]+$/, '');
  const parts = clean.split('__');
  return { uploadedAt: parts[0] || '', uploadedBy: decodePart(parts[1] || 'Unknown'), title: decodePart(parts.slice(2).join('__') || 'Fighting Clip') };
}
async function ensureBucket(){
  const s=admin();
  const found=await s.storage.getBucket(BUCKET);
  if(found.error) await s.storage.createBucket(BUCKET,{ public:true, fileSizeLimit:104857600, allowedMimeTypes:['video/mp4','video/webm','video/quicktime','video/x-matroska'] });
  return s;
}
export async function GET(){
  const s=await ensureBucket();
  const { data, error } = await s.storage.from(BUCKET).list('', { limit:100, sortBy:{ column:'created_at', order:'desc' } });
  if(error) return NextResponse.json({ error:error.message }, { status:500 });
  const clips=(data||[]).filter(x=>x.name && !x.name.endsWith('/')).map(x=>{
    const meta=parseName(x.name);
    const { data: pub } = s.storage.from(BUCKET).getPublicUrl(x.name);
    return { path:x.name, url:pub.publicUrl, downloadUrl:pub.publicUrl + '?download=' + encodeURIComponent(x.name), size:x.metadata?.size || 0, created_at:x.created_at, ...meta };
  });
  return NextResponse.json(clips);
}
