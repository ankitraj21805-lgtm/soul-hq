import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
function db(){ return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''); }
export async function GET(){
 const r=await db().from('content_plan').select('*').eq('type','rule').order('created_at',{ascending:false});
 return NextResponse.json(r.data||[]);
}
