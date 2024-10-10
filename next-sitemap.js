/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.geniescareerhub.com', // Your domain
    generateRobotsTxt: true, // Generates a robots.txt file
    sitemapSize: 5000, // Maximum number of URLs per sitemap (reduce if necessary)
    generateIndexSitemap: false, // Ensure that a single sitemap.xml is generated
    changefreq: 'daily', // Frequency of updates
    priority: 0.7, // Default priority for pages
    exclude: ['/admin/**', '/private/**', '/api/**'], // Exclude specific pages
    robotsTxtOptions: {
      policies: [{ userAgent: '*', allow: '/' }], // Allow all bots to crawl
    },
  };
  