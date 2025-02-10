import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  const baseUrl = 'https://www.geniescareerhub.com'

  // Define your static routes
  const staticPages = [
    '',
    '/resume-builder',
    '/resume-analyzer',
    '/cv-studio',
    '/career-services',
    '/jobs',
    '/login',
    '/signup',
    '/terms-condition',
    '/privacy-policy',
    '/about-us',
    '/contact-us',
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((path) => {
          return `
            <url>
              <loc>${baseUrl}${path}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>${path === '' ? 'daily' : 'weekly'}</changefreq>
              <priority>${path === '' ? '1.0' : '0.8'}</priority>
            </url>
          `
        })
        .join('')}
    </urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
} 