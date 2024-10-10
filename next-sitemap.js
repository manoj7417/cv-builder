/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.geniescareerhub.com', // Replace with your domain
    generateRobotsTxt: true, // Generate a robots.txt file
    changefreq: 'daily', // How often the sitemap should be updated
    priority: 0.7, // Default priority for all URLs
    sitemapSize: 5000, // Limit number of URLs per sitemap file
    exclude: ['/admin/**'], // Exclude specific pages or patterns
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' }, // Allow all pages to be crawled
      ],
      additionalSitemaps: [
        'https://www.geniescareerhub.com/sitemap-0.xml', // Additional sitemaps if any
      ],
    },
  };
  