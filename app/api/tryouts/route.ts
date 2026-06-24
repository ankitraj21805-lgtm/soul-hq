import { NextResponse } from 'next/server';
import { adminSupabase } from '@/lib/supabase';

export async function GET() {
  const supabase = adminSupabase();
  const { data, error } = await supabase.from('tryouts').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const body = await req.json();
  const supabase = adminSupabase();
  const { data, error } = await supabase.from('tryouts').insert({ ...body, status: 'Pending' }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
