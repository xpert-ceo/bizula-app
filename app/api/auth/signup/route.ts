import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, referralCode } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    await connect();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);

    // Generate unique referral code
    let userReferralCode;
    do {
      userReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    } while (await User.findOne({ referralCode: userReferralCode }));

    const userData: any = {
      email,
      password: hashedPassword,
      referralCode: userReferralCode
    };

    // Handle referral if provided
    if (referralCode) {
      const referrer = await User.findOne({ referralCode: referralCode.toUpperCase() });
      if (referrer) {
        userData.referredBy = referrer._id;
        // Give referrer 5 days credit
        referrer.referralCredits += 5;
        await referrer.save();
      }
    }

    const user = new User(userData);
    await user.save();

    return NextResponse.json({ message: 'User created', referralCode: userReferralCode }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Signup failed' }, { status: 500 });
  }
}
