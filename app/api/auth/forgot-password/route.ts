import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';
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
      return NextResponse.json({ message: 'If the email exists, a reset link has been sent' }, { status: 200 });
    }

    // Generate reset token (in production, use a proper JWT or secure token)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // In a real app, you'd store this in the database
    // For now, we'll just return it (not secure for production)
    console.log(`Reset token for ${email}: ${resetToken}`);

    // TODO: Send email with reset link
    // const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

    return NextResponse.json({
      message: 'If the email exists, a reset link has been sent',
      // For development only - remove in production
      resetToken
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Password reset failed' }, { status: 500 });
  }
}