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
    "/recruiter/((?!reset-password|signin|signup).)*$", // Exclude auth routes
  ],
};

export function middleware(req) {
  try {
    if (req.nextUrl.pathname.startsWith('/recruiter')) {
      const token = req.cookies.get("token");

      // Allow access to auth routes
      if (req.nextUrl.pathname === '/recruiter/signin' ||
        req.nextUrl.pathname === '/recruiter/signup' ||
        req.nextUrl.pathname === '/recruiter/reset-password') {
        return NextResponse.next();
      }

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
  } catch (error) {
    console.error('Middleware error:', error);
    // Return next response instead of throwing error
    return NextResponse.next();
  }
}
