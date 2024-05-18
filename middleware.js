import { NextResponse } from "next/server";


const protectedRoutes = ['/builder', '/resumeAnalyzer-dashboard'];

export async function middleware(req) {
  const { pathname } = req.nextUrl
  if (protectedRoutes.includes(pathname)) {
    if (!req.cookies.has('accessToken')) {
      return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, req.nextUrl));
    }
  }
  return NextResponse.next();
}
