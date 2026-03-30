import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import PasswordRecovery from '@/models/PasswordRecovery';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Creativemind';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'Luwie';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const password = searchParams.get('password');

    // Simple auth check
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connect();

    // Get all pending recovery requests
    const pendingRequests = await PasswordRecovery.find({ status: 'pending' }).sort({ createdAt: -1 });

    return NextResponse.json({
      requests: pendingRequests.map(req => ({
        id: req._id,
        email: req.email,
        resetCode: req.resetCode,
        createdAt: req.createdAt,
        expiresAt: req.expiresAt
      }))
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch requests' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, password, email, message } = await request.json();

    // Simple auth check
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connect();

    // Log message for admin
    console.log(`\n📧 ADMIN MESSAGE TO ${email}:\n${message}\n`);

    // This endpoint is for manual tracking - admin will manually send the email
    return NextResponse.json({
      message: 'Message logged. Please manually send the reset code to the user via email.'
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to process request' }, { status: 500 });
  }
}
