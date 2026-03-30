import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

function getBaseDate(expiry: Date) {
  const now = new Date();
  return expiry > now ? expiry : now;
}

export async function GET(request: NextRequest) {
  if (!PAYSTACK_SECRET_KEY) {
    return NextResponse.json({ message: 'Paystack secret is not configured' }, { status: 500 });
  }

  const reference = request.nextUrl.searchParams.get('reference');
  if (!reference) {
    return NextResponse.json({ message: 'Reference is required' }, { status: 400 });
  }

  const cookie = request.cookies.get('bizula_session')?.value;
  if (!cookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  await connect();

  const user = await User.findById(cookie);
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
      }
    });

    const data = await res.json();
    if (!data.status || data.data.status !== 'success') {
      return NextResponse.json({ message: 'Payment not successful' }, { status: 400 });
    }

    const days = user.hasUsedInitialOffer ? 30 : 7;
    const baseDate = getBaseDate(user.subscriptionExpiry);
    const newExpiry = new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000);

    user.subscriptionExpiry = newExpiry;
    user.isSubscribed = true;
    user.hasUsedInitialOffer = true;
    await user.save();

    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('Verify failure', error);
    return NextResponse.json({ message: 'Verification failed' }, { status: 500 });
  }
}
