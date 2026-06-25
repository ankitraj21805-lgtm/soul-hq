import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const BUCKET = 'clips';
function admin(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '', { auth: { persistSession:false } });}
function safe(v:string){return encodeURIComponent(String(v || 'unknown').trim().slice(0,60).replace(/\s+/g,'-'))}
async function ensureBucket(){
  const s=admin();
  const found=await s.storage.getBucket(BUCKET);
  if(found.error) await s.storage.createBucket(BUCKET,{ public:true, fileSizeLimit:104857600, allowedMimeTypes:['video/mp4','video/webm','video/quicktime','video/x-matroska'] });
  return s;
}
export async function POST(req:Request){
  const body=await req.json().catch(()=>({}));
  const fileName=String(body.fileName || 'clip.mp4');
  const contentType=String(body.contentType || 'video/mp4');
  if(!contentType.startsWith('video/')) return NextResponse.json({error:'Only video clips allowed'}, {status:400});
  const ext=(fileName.split('.').pop() || 'mp4').replace(/[^a-zA-Z0-9]/g,'').slice(0,8) || 'mp4';
  const path=`${Date.now()}__${safe(body.uploadedBy)}__${safe(body.title)}.${ext}`;
  const s=await ensureBucket();
  const { data, error } = await s.storage.from(BUCKET).createSignedUploadUrl(path);
  if(error) return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json({ path, token:data.token });
}
