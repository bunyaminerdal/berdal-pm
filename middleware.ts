import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const myCookie = cookies();

  let token: string | null = null;
  if (myCookie.get('next-auth.session-token')) {
    token = myCookie.get('next-auth.session-token')!.value;
  }

  const isLoggedIn = !!token;
  // const isUserOAuth = session?.user?.isOAuth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // const isOAuthPreventedRoute = oAuthPreventedRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  // if (isOAuthPreventedRoute && isUserOAuth) {
  //   return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  // }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return null;
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
