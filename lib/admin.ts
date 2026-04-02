import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';

export async function getSessionUser(request: NextRequest) {
  const sessionId = request.cookies.get('bizula_session')?.value;
  if (!sessionId) {
    return null;
  }

  await connect();
  const user = await User.findById(sessionId);
  return user;
}

export async function requireAdmin(request: NextRequest) {
  const user = await getSessionUser(request);

  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthenticated' }, { status: 401 });
  }

  if (user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 });
  }

  return user;
}
