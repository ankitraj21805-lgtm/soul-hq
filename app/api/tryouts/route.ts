import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
function db(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '', { auth: { persistSession:false } });}
export async function GET(){ const r = await db().from('tryouts').select('*').order('created_at',{ascending:false}); return NextResponse.json(r.data || []); }
export async function POST(req:Request){ const body = await req.json(); const r = await db().from('tryouts').insert({ ...body, status:'Pending' }).select().single(); return NextResponse.json(r.data || { error:r.error?.message }, { status: r.error ? 500 : 200 }); }
