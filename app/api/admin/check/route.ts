import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';

export async function GET(request: NextRequest) {
  const result = await requireAdmin(request);
  if ('_id' in result) {
    // it's the user object
    return NextResponse.json({ success: true, user: { email: result.email, role: result.role } });
  } else {
    // it's a NextResponse
    return result as NextResponse;
  }
}
