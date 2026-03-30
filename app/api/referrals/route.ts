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

  // Get referral stats
  const referredUsers = await User.countDocuments({ referredBy: user._id });
  const totalCreditsEarned = referredUsers * 5;

  return NextResponse.json({
    referralCode: user.referralCode,
    referralCredits: user.referralCredits,
    referredUsers,
    totalCreditsEarned
  });
}