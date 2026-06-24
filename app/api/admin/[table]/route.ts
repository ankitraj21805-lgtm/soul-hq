import { NextResponse } from 'next/server';
import { adminSupabase } from '../../../../lib/supabase';

function ok(table: string) {
  return ['members','attendance','warnings','tryouts','events','alliances','content_plan'].includes(table);
}

export async function GET(_: Request, ctx: { params: Promise<{ table: string }> }) {
  const { table } = await ctx.params;
  if (!ok(table)) return NextResponse.json([]);
  const result = await adminSupabase().from(table).select('*');
  return NextResponse.json(result.data ?? []);
}

export async function POST(req: Request, ctx: { params: Promise<{ table: string }> }) {
  const { table } = await ctx.params;
  if (!ok(table)) return NextResponse.json({});
  const body = await req.json();
  const result = await adminSupabase().from(table).insert(body).select().single();
  return NextResponse.json(result.data ?? { error: result.error?.message });
}
