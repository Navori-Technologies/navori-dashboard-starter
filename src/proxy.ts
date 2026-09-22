import { NextResponse, type NextRequest } from 'next/server';

// Keystone's default session cookie name (see @keystone-6/core session config).
// Override if your Keystone `sessionStrategy` uses a different cookie name.
const KEYSTONE_SESSION_COOKIE = process.env.KEYSTONE_SESSION_COOKIE_NAME ?? 'keystonejs-session';

// This is a cheap presence check only (no GraphQL round-trip) — it just
// keeps signed-out visitors out of /dashboard and signed-in visitors out of
// /auth. The actual session is validated server-side against Keystone in
// the /dashboard layout (see features/auth/session.ts) and re-validated on
// every GraphQL request Keystone's own access control enforces.
export default function middleware(request: NextRequest) {
  const hasSession = request.cookies.has(KEYSTONE_SESSION_COOKIE);
  const { pathname } = request.nextUrl;

  if (!hasSession && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  if (hasSession && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard/overview', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'
  ]
};
