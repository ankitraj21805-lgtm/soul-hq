import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const expected = process.env.ADMIN_PASSWORD || 'SOULHQ2026';
  if (!body.password || body.password !== expected) return NextResponse.json({ ok:false, error:'Wrong password' }, { status:401 });
  const store = await cookies();
  store.set('soul_admin','1',{ httpOnly:true, sameSite:'lax', secure:true, path:'/', maxAge:60*60*24*7 });
  return NextResponse.json({ ok:true });
}
