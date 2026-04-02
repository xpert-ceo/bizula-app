import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';

export async function GET(request: NextRequest) {
  const adminOrResponse = await requireAdmin(request);
  if (!(adminOrResponse as any)._id) {
    return adminOrResponse as NextResponse;
  }

  return NextResponse.json({ success: true, user: { email: adminOrResponse.email, role: adminOrResponse.role } });
}
