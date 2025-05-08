/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://passkar.vercel.app',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    exclude: ['/admin/*', '/private/*'], // optional
    changefreq: 'weekly',
    priority: 0.7,
  }
  