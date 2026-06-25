import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const store = await cookies();
  store.set('soul_member', '', { httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 0 });
  return NextResponse.json({ ok: true });
}
