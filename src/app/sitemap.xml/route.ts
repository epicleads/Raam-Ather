import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://raamather.com'
  const lastModified = '2025-09-07T18:53:42+00:00'

  return [
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
    // Special pages
    {
      url: `${baseUrl}/offer`,
      lastModified: lastModified,
      changeFrequency: 'daily' as const,
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
}