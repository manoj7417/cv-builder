// import { NextResponse } from "next/server";


// const protectedRoutes = ['/app/resume-builder', '/app/analyser/feedback', '/app/user-history', '/app/user-profile', '/app/career-counselling', '/app/mcq'];

// export const config = {
//   matcher: [
//     '/app/:path*'
//   ],
// }

// export async function middleware(req) {
//   const { pathname } = req.nextUrl
//   let cookie = req.cookies.get('accessToken')

//   console.log("Pathname:", pathname);
//   console.log("Cookie:", cookie);
  
//   if (protectedRoutes.includes(pathname)) {
//     if (!cookie?.value) {
//       return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, req.nextUrl));
//     }
//   }
//   return NextResponse.next();
// }



import { NextResponse } from 'next/server';

export const config = {
  // This matcher applies the middleware to all routes
  matcher: ['/user-profile', '/resume-builder', '/analyser/feedback', '/user-history', '/career-counselling', '/mcq'],
};

export function middleware(req) {

  // Check for accessToken cookie
  const token = req.cookies.get('accessToken');
  
  // Redirect to login page if token is not present
  if (!token?.value) {
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Allow access if token is present
  return NextResponse.next();
}
