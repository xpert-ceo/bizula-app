import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    await connect();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Signup failed' }, { status: 500 });
  }
}
