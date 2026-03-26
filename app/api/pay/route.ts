import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(request: NextRequest) {
  if (!PAYSTACK_SECRET_KEY) {
    return NextResponse.json({ message: 'Paystack secret is not configured' }, { status: 500 });
  }

  const cookie = request.cookies.get('bizula_session')?.value;
  if (!cookie) {
    return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  }

  await connect();

  const user = await User.findById(cookie);
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  try {
    const res = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        amount: 100000,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/verify`
      })
    });

    const data = await res.json();
    if (!data.status) {
      console.error('Paystack init failed', data);
      return NextResponse.json({ message: 'Paystack initialization failed' }, { status: 500 });
    }

    return NextResponse.json({ authorizationUrl: data.data.authorization_url });
  } catch (error) {
    console.error('Paystack request error', error);
    return NextResponse.json({ message: 'Paystack request failed' }, { status: 500 });
  }
}
