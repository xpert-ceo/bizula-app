import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';
import { requireAdmin } from '@/lib/admin';
import { hashPassword } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const result = await requireAdmin(request);
  if (!('_id' in result)) {
    return result as NextResponse;
  }

  const url = new URL(request.url);
  const page = Math.max(parseInt(url.searchParams.get('page') || '1', 10), 1);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '10', 10), 1), 50);
  const search = url.searchParams.get('search') || '';

  await connect();

  const query: any = {};
  if (search) {
    query.$or = [
      { email: new RegExp(search, 'i') },
      { referralCode: new RegExp(search, 'i') },
      { role: new RegExp(search, 'i') }
    ];
  }

  const total = await User.countDocuments(query);
  const users = await User.find(query)
    .select('email role isSubscribed subscriptionExpiry createdAt referralCode referralCredits')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return NextResponse.json({ success: true, data: { users, total, page, limit } });
}

  const url = new URL(request.url);
  const page = Math.max(parseInt(url.searchParams.get('page') || '1', 10), 1);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '10', 10), 1), 50);
  const search = url.searchParams.get('search') || '';

  await connect();

  const query: any = {};
  if (search) {
    query.$or = [
      { email: new RegExp(search, 'i') },
      { referralCode: new RegExp(search, 'i') },
      { role: new RegExp(search, 'i') }
    ];
  }

  const total = await User.countDocuments(query);
  const users = await User.find(query)
    .select('email role isSubscribed subscriptionExpiry createdAt referralCode referralCredits')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return NextResponse.json({ success: true, data: { users, total, page, limit } });
}

export async function PATCH(request: NextRequest) {
  const result = await requireAdmin(request);
  if (!('_id' in result)) {
    return result as NextResponse;
  }

  await connect();
  const body = await request.json();
  const { userId, role, isSubscribed, resetPassword, action } = body;

  if (!userId) {
    return NextResponse.json({ success: false, error: 'userId is required' }, { status: 400 });
  }

  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
  }

  if (role) user.role = role;
  if (typeof isSubscribed === 'boolean') user.isSubscribed = isSubscribed;
  if (action === 'suspend') user.isSubscribed = false;
  if (action === 'activate') user.isSubscribed = true;

  if (resetPassword) {
    if (typeof resetPassword !== 'string' || resetPassword.length < 8) {
      return NextResponse.json({ success: false, error: 'resetPassword must be a string with 8+ chars' }, { status: 400 });
    }
    user.password = await hashPassword(resetPassword);
  }

  await user.save();

  return NextResponse.json({ success: true, data: { user } });
}

export async function DELETE(request: NextRequest) {
  const result = await requireAdmin(request);
  if (!('_id' in result)) {
    return result as NextResponse;
  }

  await connect();
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ success: false, error: 'userId is required' }, { status: 400 });
  }

  await User.findByIdAndDelete(userId);

  return NextResponse.json({ success: true, data: { userId } });
}
