import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';
import PasswordRecovery from '@/models/PasswordRecovery';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const { email, resetCode, newPassword } = await request.json();

    if (!email || !resetCode || !newPassword) {
      return NextResponse.json({ message: 'Email, reset code, and new password are required' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ message: 'Password must be at least 6 characters' }, { status: 400 });
    }

    await connect();

    // Find the recovery request
    const recovery = await PasswordRecovery.findOne({
      email: email,
      resetCode: resetCode,
      status: 'pending'
    });

    if (!recovery || recovery.expiresAt < new Date()) {
      return NextResponse.json({ message: 'Invalid or expired reset code' }, { status: 400 });
    }

    // Update user password
    const user = await User.findById(recovery.userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    // Mark recovery as completed
    recovery.status = 'completed';
    await recovery.save();

    return NextResponse.json({ message: 'Password has been successfully reset' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Password reset failed' }, { status: 500 });
  }
}
