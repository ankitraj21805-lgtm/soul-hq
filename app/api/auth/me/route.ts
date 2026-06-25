import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function GET() {
  const store = await cookies();
  const loggedIn = store.get('soul_admin')?.value === '1';
  return NextResponse.json({ ok: loggedIn });
}
