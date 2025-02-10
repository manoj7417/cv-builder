import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Redirect /sitemap.xml to our API route
    return NextResponse.redirect(new URL('/api/sitemap', 'https://www.geniescareerhub.com'))
  } catch (error) {
    console.error('Sitemap redirect error:', error)
    return NextResponse.error(new Error('Failed to redirect to sitemap'))
  }
} 