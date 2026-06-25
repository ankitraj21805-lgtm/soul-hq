import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const buckets = { image: 'gallery-images', clip: 'gallery-clips' } as const;
function supabase(){ return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '', { auth:{ persistSession:false } }); }
function decode(v:string){ try { return decodeURIComponent(v); } catch { return v; } }
function meta(name:string){ const clean=name.replace(/\.[^/.]+$/,''); const p=clean.split('__'); return { uploadedAt:p[0] || '', uploadedBy:decode(p[1] || 'Unknown'), title:decode(p.slice(2).join('__') || 'SOUL Media') }; }
async function list(kind:'image'|'clip'){
  const s=supabase(); const bucket=buckets[kind];
  const { data, error } = await s.storage.from(bucket).list('', { limit:100, sortBy:{ column:'created_at', order:'desc' } });
  if(error) return [];
  return (data || []).filter(x=>x.name && !x.name.endsWith('/')).map(x=>{ const pub=s.storage.from(bucket).getPublicUrl(x.name).data.publicUrl; return { kind, bucket, path:x.name, url:pub, downloadUrl:pub + '?download=' + encodeURIComponent(x.name), size:x.metadata?.size || 0, createdAt:x.created_at || '', ...meta(x.name) }; });
}
export async function GET(){ const [images, clips] = await Promise.all([list('image'), list('clip')]); return NextResponse.json({ images, clips }); }
