import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected admin route prefix
const ADMIN_ROUTE = '/internal-portal-xyz';
const LOGIN_ROUTE = '/internal-portal-xyz/login';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect routes under /internal-portal-xyz
  if (!pathname.startsWith(ADMIN_ROUTE)) {
    return NextResponse.next();
  }

  // Allow access to login page without authentication
  if (pathname === LOGIN_ROUTE) {
    return NextResponse.next();
  }

  // Read auth cookie directly in middleware to keep edge bundle lightweight.
  const token = request.cookies.get('auth_token')?.value;

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL(LOGIN_ROUTE, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Token exists, allow access. Server/API routes perform full token validation.
  return NextResponse.next();
}

export const config = {
  matcher: ['/internal-portal-xyz/:path*'],
};
