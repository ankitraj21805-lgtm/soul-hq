import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
const allowed = ['members','attendance','warnings','tryouts','events','alliances','content_plan'];
function db(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '', { auth: { persistSession:false } });}
async function authed(){ const store = await cookies(); return store.get('soul_admin')?.value === '1'; }
export async function PATCH(req:Request, ctx:{params:Promise<{table:string;id:string}>}){ if(!(await authed())) return NextResponse.json({error:'Unauthorized'},{status:401}); const {table,id}=await ctx.params; if(!allowed.includes(table)) return NextResponse.json({error:'Invalid table'},{status:400}); const body=await req.json(); const r=await db().from(table).update(body).eq('id',id).select().single(); return NextResponse.json(r.data || {error:r.error?.message},{status:r.error?500:200}); }
export async function DELETE(_:Request, ctx:{params:Promise<{table:string;id:string}>}){ if(!(await authed())) return NextResponse.json({error:'Unauthorized'},{status:401}); const {table,id}=await ctx.params; if(!allowed.includes(table)) return NextResponse.json({error:'Invalid table'},{status:400}); const r=await db().from(table).delete().eq('id',id); return NextResponse.json({ok:!r.error,error:r.error?.message}); }
