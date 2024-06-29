import { NextResponse } from "next/server";


const protectedRoutes = ['/resume-builder', '/analyser/feedback', '/user-history', '/user-profile', '/career-counselling'];

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export async function middleware(req) {
  const { pathname } = req.nextUrl
  let cookie = req.cookies.get('accessToken')
  if (protectedRoutes.includes(pathname)) {
    if (!cookie?.value) {
      return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, req.nextUrl));
    }
  }
  return NextResponse.next();
}
