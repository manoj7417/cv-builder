// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req, ev) {
  // Extending the timeout duration
  ev.waitUntil(new Promise((resolve) => setTimeout(resolve, 60000))); // 60 seconds timeout
  return NextResponse.next();
}

// Apply this middleware only to API routes
export const config = {
  matcher: '/api/:path*',
};
