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
    "/job-dashboard",
    "/recruiter/:path*",
  ],
};

export function middleware(req) {
  if (req.nextUrl.pathname.startsWith('/recruiter')) {
    if (req.nextUrl.pathname === '/recruiter/signin' || req.nextUrl.pathname === '/recruiter/signup') {
      return NextResponse.next();
    }

    const token = req.cookies.get("token");
    if (!token || !token.value) {
      const redirectUrl = new URL("/recruiter/signin", req.url);
      redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  } else {
    const token = req.cookies.get("accessToken");
    if (!token || !token.value) {
      const redirectUrl = new URL("/login", req.url);
      redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}
