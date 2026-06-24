import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
const allowed = ['members','attendance','warnings','tryouts','events','alliances','content_plan'];
function db(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '', { auth: { persistSession:false } });}
export async function GET(_:Request, ctx:{params:Promise<{table:string}>}){ const {table}=await ctx.params; if(!allowed.includes(table)) return NextResponse.json([]); const r=await db().from(table).select('*'); return NextResponse.json(r.data || []); }
export async function POST(req:Request, ctx:{params:Promise<{table:string}>}){ const {table}=await ctx.params; if(!allowed.includes(table)) return NextResponse.json({error:'Invalid table'},{status:400}); const body=await req.json(); const r=await db().from(table).insert(body).select().single(); return NextResponse.json(r.data || {error:r.error?.message},{status:r.error?500:200}); }
