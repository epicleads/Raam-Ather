import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SEO & Performance Optimizations
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raamather.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90, 100],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'self' https://www.google.com https://maps.google.com https://www.googletagmanager.com https://www.google-analytics.com; frame-src 'self' https://www.google.com https://maps.google.com;",
  },
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@heroicons/react'],
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  
  // Security & SEO headers
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  reactStrictMode: true,
  trailingSlash: false, // Removes trailing slashes for consistency
  
  // Headers for SEO and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'development' 
              ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://maps.google.com https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-src 'self' https://www.google.com https://maps.google.com; connect-src 'self' https://www.google.com https://maps.google.com https://www.google-analytics.com https://www.googletagmanager.com;"
              : "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google.com https://maps.google.com https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-src 'self' https://www.google.com https://maps.google.com; connect-src 'self' https://www.google.com https://maps.google.com https://www.google-analytics.com https://www.googletagmanager.com;"
          },
          // Performance headers
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          }
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400'
          }
        ]
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400'
          }
        ]
      },
      {
        source: '/(.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp|avif)$)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },

  // Redirects for SEO
  async redirects() {
    return [
      // Redirect www to non-www (canonical URLs)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.raamather.com',
          },
        ],
        destination: 'https://raamather.com/:path*',
        permanent: true,
      },
      // Redirect /home to homepage (fix for Google crawl issue)
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home/',
        destination: '/',
        permanent: true,
      },
      // Legacy URL redirects for SEO value preservation
      {
        source: '/showrooms/hyderabad',
        destination: '/hyderabad',
        permanent: true,
      },
      {
        source: '/showrooms/chennai',
        destination: '/chennai',
        permanent: true,
      },
      // Electric bike/scooter terminology redirect
      {
        source: '/electric-bike-in-hyderabad',
        destination: '/electric-scooter-hyderabad',
        permanent: true,
      },
      // WordPress to Next.js URL structure redirects
      {
        source: '/about-us',
        destination: '/AboutUs',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/AboutUs',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/ContactUs',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/ContactUs',
        permanent: true,
      },
      {
        source: '/store-locator',
        destination: '/StoreLocator',
        permanent: true,
      },
      {
        source: '/stores',
        destination: '/StoreLocator',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/PrivacyPolicy',
        permanent: true,
      },
      {
        source: '/terms-of-use',
        destination: '/TermsOfUse',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/TermsOfUse',
        permanent: true,
      },
      // Model redirects
      {
        source: '/ather-450x',
        destination: '/ather-450',
        permanent: true,
      },
      {
        source: '/ather450',
        destination: '/ather-450',
        permanent: true,
      },
      {
        source: '/ather-rizta',
        destination: '/rizta',
        permanent: true,
      },
      // Location variations
      {
        source: '/hyd',
        destination: '/hyderabad',
        permanent: true,
      },
      {
        source: '/chennai-showroom',
        destination: '/chennai',
        permanent: true,
      },
      {
        source: '/hyderabad-showroom',
        destination: '/hyderabad',
        permanent: true,
      },
    ]
  },

  // Rewrites for clean URLs
  async rewrites() {
    return [
      {
        source: '/ather-hyderabad',
        destination: '/hyderabad',
      },
      {
        source: '/ather-chennai', 
        destination: '/chennai',
      },
    ]
  },


  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
