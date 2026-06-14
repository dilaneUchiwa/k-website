import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const locales = ['fr', 'en', 'es', 'zh'];
const defaultLocale = 'fr';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

const authMiddleware = withAuth(
  function onSuccess(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/admin/login',
    },
  }
);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin routes require authentication
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    return (authMiddleware as any)(req);
  }

  // API admin routes require authentication
  if (pathname.startsWith('/api/admin')) {
    return (authMiddleware as any)(req);
  }

  // All other routes use i18n
  if (!pathname.startsWith('/api') && !pathname.startsWith('/admin')) {
    return intlMiddleware(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|_vercel|.*\\..*).*)',
    '/api/admin/:path*',
  ],
};
