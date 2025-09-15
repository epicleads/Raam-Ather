import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://raamather.com'
  const lastModified = '2025-09-07T18:53:42+00:00'

  const chennaiSpecificPages = [
    // Main Chennai pages from XML tracker
    { url: '/chennai', priority: '1.0', changefreq: 'weekly' },
    { url: '/ather-dealer-chennai', priority: '0.9', changefreq: 'weekly' },
    { url: '/ather-450-chennai', priority: '0.9', changefreq: 'weekly' },
    { url: '/rizta-chennai', priority: '0.9', changefreq: 'weekly' },
    { url: '/ather-450-apex-chennai', priority: '0.9', changefreq: 'weekly' },
    { url: '/ather-service-chennai', priority: '0.85', changefreq: 'weekly' },
    { url: '/ather-showroom-chennai', priority: '0.8', changefreq: 'monthly' },
    
    // Area-specific pages for local SEO
    { url: '/ather-t-nagar-chennai', priority: '0.75', changefreq: 'monthly' },
    { url: '/ather-anna-nagar-chennai', priority: '0.75', changefreq: 'monthly' },
    { url: '/ather-velachery-chennai', priority: '0.75', changefreq: 'monthly' },
    { url: '/ather-omr-chennai', priority: '0.75', changefreq: 'monthly' },
    { url: '/ather-porur-chennai', priority: '0.75', changefreq: 'monthly' },
    { url: '/ather-tambaram-chennai', priority: '0.75', changefreq: 'monthly' },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${chennaiSpecificPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}