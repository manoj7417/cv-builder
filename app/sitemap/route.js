import { BASE_URL } from '@/app/config'
import { dynamicRoutes } from '@/app/config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Combine static and dynamic routes
    const routes = [
      '',
      '/login',
      '/terms-condition',
      '/user-blogs',
      '/user-dashboard',
      '/user-history',
      '/verify-email',
      '/verify-recruiter',
      ...dynamicRoutes.filter(route => !route.startsWith('/api')) // Filter out API routes
    ]

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${route === '' ? '1.0' : '0.7'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

    // Return the response with proper XML content type
    return new Response(sitemap.trim(), {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-store'
      },
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
} 