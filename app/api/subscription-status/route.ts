import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get('bizula_session')?.value;
  if (!cookie) {
    return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  }

  await connect();
  const user = await User.findById(cookie);
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const now = new Date();
  const expiry = new Date(user.subscriptionExpiry);

  // Check if in free trial
  if (!user.hasUsedInitialOffer && user.createdAt) {
    const daysSinceSignup = Math.floor((now.getTime() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24));
    const daysLeft = Math.max(0, 7 - daysSinceSignup);

    if (daysSinceSignup <= 7) {
      return NextResponse.json({
        isInTrial: true,
        daysLeft,
        needsPayment: false
      });
    } else {
      return NextResponse.json({
        isInTrial: false,
        daysLeft: 0,
        needsPayment: true
      });
    }
  }

  // Paid user
  if (expiry > now) {
    const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return NextResponse.json({
      isInTrial: false,
      daysLeft,
      needsPayment: false
    });
  } else {
    return NextResponse.json({
      isInTrial: false,
      daysLeft: 0,
      needsPayment: true
    });
  }
}