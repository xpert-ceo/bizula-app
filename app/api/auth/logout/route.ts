import { NextResponse } from 'next/server';

export async function POST() {
  const cookie = `bizula_session=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`;

  return NextResponse.json({ message: 'Logged out' }, { status: 200, headers: { 'Set-Cookie': cookie } });
}