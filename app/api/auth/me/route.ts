import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get('bizula_session')?.value;
  if (!sessionId) {
    return NextResponse.json({ success: false, error: 'Unauthenticated' }, { status: 401 });
  }

  await connect();
  const user = await User.findById(sessionId).select('email role isSubscribed subscriptionExpiry referralCode referralCredits createdAt');
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthenticated' }, { status: 401 });
  }

  return NextResponse.json({ success: true, data: user });
}
