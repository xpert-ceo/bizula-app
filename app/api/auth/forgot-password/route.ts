import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';
import PasswordRecovery from '@/models/PasswordRecovery';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    await connect();

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if email exists for security
      return NextResponse.json({ message: 'If an account exists with this email, an admin will send you a reset code' }, { status: 200 });
    }

    // Generate unique reset code
    const resetCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Save recovery request
    const recovery = new PasswordRecovery({
      userId: user._id,
      email: email,
      resetCode: resetCode,
      status: 'pending',
      expiresAt: expiresAt
    });

    await recovery.save();

    // Log for admin - in production, this would send to admin email/dashboard
    console.log(`\n🔑 PASSWORD RECOVERY REQUEST\n`);
    console.log(`Email: ${email}`);
    console.log(`Reset Code: ${resetCode}`);
    console.log(`Expires: ${expiresAt.toISOString()}`);
    console.log(`Recovery ID: ${recovery._id}\n`);

    return NextResponse.json({
      message: 'If an account exists with this email, an admin will send you a password reset code'
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Password recovery request failed' }, { status: 500 });
  }
}