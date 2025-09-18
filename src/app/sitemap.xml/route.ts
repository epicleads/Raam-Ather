import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://raamather.com'
  const lastModified = '2025-09-07T18:53:42+00:00'

  const urls = [
    // Homepage - Highest priority
    {
      url: `${baseUrl}/`,
      lastModified: lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    // Core service pages
    {
      url: `${baseUrl}/Services`,
      lastModified: lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/offer`,
      lastModified: lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/AboutUs`,
      lastModified: lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ContactUs`,
      lastModified: lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/StoreLocator`,
      lastModified: lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Product pages
    {
      url: `${baseUrl}/rizta`,
      lastModified: lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ather-450`,
      lastModified: lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ather-450-apex`,
      lastModified: lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/models`,
      lastModified: lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/test-drive`,
      lastModified: lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Location pages
    {
      url: `${baseUrl}/chennai`,
      lastModified: lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hyderabad`,
      lastModified: lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ather-dealer-chennai`,
      lastModified: lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ather-dealer-hyderabad`,
      lastModified: lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/electric-scooter-hyderabad`,
      lastModified: lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/raam-ather-locations`,
      lastModified: lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    // Legal pages
    {
      url: `${baseUrl}/TermsOfUse`,
      lastModified: lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/PrivacyPolicy`,
      lastModified: lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(item => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified}</lastmod>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  })
}