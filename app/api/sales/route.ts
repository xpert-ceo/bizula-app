import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';
import Sale from '@/models/Sale';

function verifySubscription(user: any) {
  const now = new Date();
  const expiry = new Date(user.subscriptionExpiry);

  // If user has never paid and it's been more than 7 days since signup, block
  if (!user.hasUsedInitialOffer && user.createdAt) {
    const daysSinceSignup = (now.getTime() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceSignup > 7) {
      return false;
    }
  }

  // If user has paid, check if subscription is still active
  if (user.hasUsedInitialOffer) {
    return expiry > now;
  }

  // During free trial
  return true;
}

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get('bizula_session')?.value;
  if (!cookie) {
    return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  }

  await connect();
  const user = await User.findById(cookie);
  if (!user || !verifySubscription(user)) {
    return NextResponse.json({ message: 'Subscription required' }, { status: 403 });
  }

  const sales = await Sale.find({ userId: user._id }).sort({ createdAt: -1 });
  return NextResponse.json({ sales });
}

export async function POST(request: NextRequest) {
  try {
    const cookie = request.cookies.get('bizula_session')?.value;
    if (!cookie) {
      return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
    }

    await connect();
    const user = await User.findById(cookie);
    if (!user || !verifySubscription(user)) {
      return NextResponse.json({ message: 'Subscription required' }, { status: 403 });
    }

    const body = await request.json();
    const { productName, sellingPrice, costPrice, quantity, adCost } = body;
    if (!productName || typeof sellingPrice !== 'number' || typeof costPrice !== 'number' || typeof quantity !== 'number' || typeof adCost !== 'number' || sellingPrice < 0 || costPrice < 0 || quantity <= 0 || adCost < 0) {
      return NextResponse.json({ message: 'Invalid input data' }, { status: 400 });
    }

    const revenue = sellingPrice * quantity;
    const profitPerUnit = sellingPrice - costPrice - adCost;
    const profit = profitPerUnit * quantity;

    const sale = new Sale({
      userId: user._id,
      productName,
      sellingPrice,
      costPrice,
      quantity,
      adCost,
      profit,
      revenue
    });

    await sale.save();

    return NextResponse.json({ message: 'Sale added', sale }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to add sale' }, { status: 500 });
  }
}
