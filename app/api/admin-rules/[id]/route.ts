import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
function db(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '', {auth:{persistSession:false}});}
async function authed(){const store=await cookies();return store.get('soul_admin')?.value==='1';}
export async function DELETE(_:Request,ctx:{params:Promise<{id:string}>}){
  if(!(await authed())) return NextResponse.json({error:'Unauthorized'},{status:401});
  const {id}=await ctx.params;
  const r=await db().from('content_plan').delete().eq('id',id).eq('type','rule');
  return NextResponse.json({ok:!r.error,error:r.error?.message});
}
