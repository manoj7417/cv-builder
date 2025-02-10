import { BASE_URL } from '@/app/config'

export async function GET() {
  // Define your static routes
  const staticRoutes = [
    '',
    '/login',
    '/terms-condition',
    '/user-blogs',
    '/user-dashboard',
    '/user-history',
    '/verify-email',
    '/verify-recruiter'
  ]

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticRoutes
        .map((route) => {
          return `
            <url>
              <loc>${BASE_URL}${route}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.7</priority>
            </url>
          `
        })
        .join('')}
    </urlset>
  `

  // Return the response with proper XML content type
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate'
    }
  })
} 