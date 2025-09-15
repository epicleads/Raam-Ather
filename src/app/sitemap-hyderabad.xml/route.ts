import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://raamather.com'
  const lastModified = '2025-09-07T18:53:42+00:00'

  const hyderabadSpecificPages = [
    // Main Hyderabad pages from XML tracker
    { url: '/hyderabad', priority: '1.0', changefreq: 'weekly' },
    { url: '/ather-dealer-hyderabad', priority: '0.9', changefreq: 'weekly' },
    { url: '/ather-450-hyderabad', priority: '0.9', changefreq: 'weekly' },
    { url: '/rizta-hyderabad', priority: '0.9', changefreq: 'weekly' },
    { url: '/ather-450-apex-hyderabad', priority: '0.9', changefreq: 'weekly' },
    { url: '/ather-service-hyderabad', priority: '0.85', changefreq: 'weekly' },
    { url: '/ather-showroom-hyderabad', priority: '0.8', changefreq: 'monthly' },
    
    // Area-specific pages for local SEO
    { url: '/ather-hitech-city-hyderabad', priority: '0.75', changefreq: 'monthly' },
    { url: '/ather-gachibowli-hyderabad', priority: '0.75', changefreq: 'monthly' },
    { url: '/ather-jubilee-hills-hyderabad', priority: '0.75', changefreq: 'monthly' },
    { url: '/ather-banjara-hills-hyderabad', priority: '0.75', changefreq: 'monthly' },
    { url: '/ather-secunderabad-hyderabad', priority: '0.75', changefreq: 'monthly' },
    { url: '/ather-kukatpally-hyderabad', priority: '0.75', changefreq: 'monthly' },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${hyderabadSpecificPages
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