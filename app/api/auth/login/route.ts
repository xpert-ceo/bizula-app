import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';
import { comparePassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }

    await connect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const cookie = `bizula_session=${encodeURIComponent(user._id.toString())}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`;

    return NextResponse.json({ success: true, data: { message: 'Logged in' } }, { status: 200, headers: { 'Set-Cookie': cookie } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Login failed' }, { status: 500 });
  }
}
