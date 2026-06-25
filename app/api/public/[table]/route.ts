import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
const allowed = ['members','events','alliances'];
function db(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');}
export async function GET(_:Request, ctx:{params:Promise<{table:string}>}){
  const { table } = await ctx.params;
  if(!allowed.includes(table)) return NextResponse.json([]);
  const r = await db().from(table).select('*').order('created_at',{ascending:false});
  return NextResponse.json(r.data || []);
}
