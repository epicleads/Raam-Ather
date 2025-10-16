import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import FloatingWhatsAppButton from './Components/common/FloatingWhatsAppButton';
import BottomNav from './Components/BottomNav/server/BottomNav';
import HeaderServer from './Components/New-Header/server/HeaderServer';
import { TestDriveModalProvider } from './Components/test-ride-form/TestDriveModalStore';
import { PopupProvider } from './Components/popups/PopupProvider';
import TestRideFormModal from './Components/test-ride-form/TestRideFormModal.client';
import ViewportFixClient from './Components/ViewportFixClient';
import CookieConsentManager from './Components/CookieConsent/CookieConsentManager';
import { SidebarProvider } from './Components/contexts/SidebarContext';
import Script from 'next/script';  // ✅ Needed for Google scripts

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Consolas', 'Courier New', 'monospace'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://raamather.com'),
  title: {
    default: 'Raam Ather Hyderabad Chennai - #1 Electric Scooter Dealer India',
    template: '%s | Raam Ather'
  },
  description: 'Leading Ather electric scooter dealer in Hyderabad & Chennai. Experience Ather 450X, Rizta with best prices, immediate delivery, comprehensive service across Telangana & Tamil Nadu.',
  keywords: 'Raam Ather, Ather dealer Hyderabad, Ather dealer Chennai, electric scooter Hyderabad, electric scooter Chennai, Ather 450X, Ather Rizta, EV dealer India, electric vehicle showroom',
  authors: [{ name: 'Raam Ather', url: 'https://raamather.com' }],
  creator: 'Raam Group',
  publisher: 'Raam Ather',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    apple: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://raamather.com',
    siteName: 'Raam Ather',
    title: 'Raam Ather - Leading Electric Scooter Dealer Hyderabad & Chennai',
    description: 'Experience premium Ather electric scooters at India\'s most trusted dealership. Best prices, expert service, and comprehensive support in Hyderabad & Chennai.',
    images: [
      {
        url: 'https://raamather.com/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Raam Ather Electric Scooter Dealer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@raamather',
    creator: '@raamather',
    title: 'Raam Ather - Premium Electric Scooter Dealer',
    description: 'Leading Ather dealer in Hyderabad & Chennai. Experience the future of electric mobility.',
    images: ['https://raamather.com/assets/twitter-card.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://raamather.com',
  },
  category: 'Electric Vehicle Dealer',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#00E396',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* ✅ Google Analytics (gtag.js) - Marketing Tracking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C6RZDEXVMD"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Primary GA4 Property for Marketing Team (Lead Conversion Tracking)
            gtag('config', 'G-C6RZDEXVMD', {
              page_path: window.location.pathname,
              send_page_view: true
            });
            
            // Secondary GA4 Property (existing)
            gtag('config', 'G-KGK8PQ2QS3');
          `}
        </Script>

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />

        {/* Preload critical award images for better LCP */}
        <link
          rel="preload"
          as="image"
          href="/Ather-Assets/thumbnails/smgrid4.jpg"
          media="(min-width: 768px)"
        />
        <link
          rel="preload"
          as="image"
          href="/Ather-Assets/thumbnails/smgrid5.jpg"
          media="(min-width: 768px)"
        />

        {/* ✅ Google Tag Manager - Marketing Conversion & Event Tracking */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TL7CZDW');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        {/* ✅ Google Tag Manager (noscript) - Fallback for users with JS disabled */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TL7CZDW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <CookieConsentManager>
          <PopupProvider>
            <TestDriveModalProvider>
              <SidebarProvider>
                <ViewportFixClient />
                <HeaderServer />
                <main className="min-h-screen overflow-x-hidden w-full max-w-full">
                  {children}
                </main>
                <BottomNav />
                <FloatingWhatsAppButton />
                {/* Global Test Ride Modal */}
                <TestRideFormModal />
              </SidebarProvider>
            </TestDriveModalProvider>
          </PopupProvider>
        </CookieConsentManager>
      </body>
    </html>
  );
}
