import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const protectedPaths = ['/dashboard', '/paywall', '/api/sales', '/api/pay', '/admin', '/api/admin'];

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const cookie = request.cookies.get('bizula_session')?.value;
    if (!cookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/paywall/:path*', '/api/sales/:path*', '/api/pay/:path*', '/admin/:path*', '/api/admin/:path*']
};
