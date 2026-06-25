import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const store = await cookies();
  return NextResponse.json({ ok: store.get('soul_member')?.value === '1' });
}
