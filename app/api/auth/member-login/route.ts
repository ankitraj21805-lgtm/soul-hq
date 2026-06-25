import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const expected = process.env.MEMBER_PASSWORD || 'nsr';
  if (!body.password || String(body.password).toLowerCase() !== expected.toLowerCase()) {
    return NextResponse.json({ ok: false, error: 'Wrong member password' }, { status: 401 });
  }
  const store = await cookies();
  store.set('soul_member', '1', { httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 60 * 60 * 24 * 30 });
  return NextResponse.json({ ok: true });
}
