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
  const token = req.cookies.get("accessToken");

  if (!token || !token.value) {
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  const response = NextResponse.next();
  // Prevent caching for these routes
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');

  return response;
}
