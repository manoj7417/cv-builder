/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.geniescareerhub.com', // Your website domain
    generateRobotsTxt: true, // Generate a robots.txt file
    changefreq: 'daily', // Frequency for crawling pages
    priority: 0.7, // Default priority for all pages
    sitemapSize: 5000, // Limit for URLs per sitemap file
    exclude: ['/admin/**', '/private/**', '/api/**'], // Exclude specific pages like admin or API routes
    robotsTxtOptions: {
      policies: [{ userAgent: '*', allow: '/' }], // Allow all bots to crawl the site
    },
  };
  