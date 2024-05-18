import { NextResponse } from "next/server";

const protectedRoutes = ['/builder', '/resumeAnalyzer-dashboard'];

export async function middleware(req) {
  const { pathname } = req.nextUrl
  let cookie = req.cookies.get('accessToken')
  if (protectedRoutes.includes(pathname)) {
    if (!cookie) {
      return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, req.nextUrl));
    }
  }
  return NextResponse.next();
}
