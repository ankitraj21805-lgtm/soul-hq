import { NextResponse } from 'next/server';
import { adminSupabase } from '../../../../../lib/supabase';

function ok(table: string) {
  return ['members','attendance','warnings','tryouts','events','alliances','content_plan'].includes(table);
}

export async function PATCH(req: Request, ctx: { params: Promise<{ table: string; id: string }> }) {
  const { table, id } = await ctx.params;
  if (!ok(table)) return NextResponse.json({});
  const body = await req.json();
  const result = await adminSupabase().from(table).update(body).eq('id', id).select().single();
  return NextResponse.json(result.data ?? { error: result.error?.message });
}

export async function DELETE(_: Request, ctx: { params: Promise<{ table: string; id: string }> }) {
  const { table, id } = await ctx.params;
  if (!ok(table)) return NextResponse.json({});
  const result = await adminSupabase().from(table).delete().eq('id', id);
  return NextResponse.json({ ok: !result.error, error: result.error?.message });
}
