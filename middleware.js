/** @format */

// import { NextResponse } from 'next/server';

// export const config = {
//   matcher: ['/user-profile', '/resume-builder', '/analyser/feedback', '/user-history', '/career-counselling', '/mcq', '/add-credit', '/settings/profile', '/settings/cvanalysis', '/settings/pyschometric-test', '/user-dashboard'
//   ],
// };

// export function middleware(req) {
//   const token = req.cookies.get('accessToken')
//   if (token && token.value) {
//     return NextResponse.next();
//   }
//   const redirectUrl = new URL('/login', req.url);
//   redirectUrl.searchParams.set('redirect', req.nextUrl.pathname);
//   return NextResponse.redirect(redirectUrl);
// }

import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/user-profile",
    "/resume-builder",
    "/analyser/feedback",
    "/user-history",
    "/career-counselling",
    "/mcq",
    "/add-credit",
    "/settings/profile",
    "/settings/cvanalysis",
    "/settings/pyschometric-test",
    "/user-dashboard",
  ],
};

export function middleware(req) {
  // Check for access token
  const token = req.cookies.get("accessToken");
  if (!token || !token.value) {
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Generate a nonce for CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;

  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  // Set headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  

  return response;
}
