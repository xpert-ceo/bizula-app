import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/paywall') || pathname.startsWith('/api/sales') || pathname.startsWith('/api/pay')) {
    const cookie = request.cookies.get('bizula_session')?.value;
    if (!cookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/paywall/:path*', '/api/sales/:path*', '/api/pay/:path*']
};
