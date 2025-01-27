import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export const config = {
  matcher: [
    '/api/:path*',
    '/job-cv/:path*',
    '/resume-analyzer/:path*',
    '/resume-builder/:path*',
    '/cv-studio/:path*',
    '/career-services/:path*',
    '/(recruiter)/:path*',
    '/job-dashboard/:path*',
    '/coming-soon/:path*',
    // Add authentication routes
    '/login/:path*',
    '/register/:path*',
    '/reset-password/:path*',
  ]
};

export function middleware(request) {
  // Your middleware logic
  return NextResponse.next()
}
