import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0f172a'
};

export const metadata: Metadata = {
  title: 'QueryDash - Real-Time Business Intelligence Platform',
  description: 'QueryDash combines Power BI, Datadog, and Mixpanel. English queries, live dashboards, smart alerts, and real-time user tracking. 90% cheaper, open-source.',
  keywords: ['business intelligence', 'analytics', 'dashboard', 'monitoring', 'real-time data'],
  authors: [{ name: 'QueryDash Team' }],
  creator: 'QueryDash',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://querydash.io'),
  
  // Open Graph for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://querydash.io',
    siteName: 'QueryDash',
    title: 'QueryDash - Real-Time BI Made Simple',
    description: 'No SQL. No complexity. Just English queries + live dashboards + smart alerts.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QueryDash Platform'
      }
    ]
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'QueryDash - Real-Time Business Intelligence',
    description: 'English queries, live dashboards, smart alerts. 90% cheaper than competitors.',
    images: ['/twitter-image.png'],
    creator: '@querydash'
  },

  // Structured data (Schema.org)
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'QueryDash',
      description: 'Real-time business intelligence platform',
      applicationCategory: 'BusinessApplication',
      offers: {
        '@type': 'Offer',
        price: '499',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '1250'
      }
    })
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Favicon & manifest */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* DNS prefetch for external APIs */}
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URL} />
      </head>
      
      <body className="antialiased bg-primary text-white">
        {/* Skip to main content link (accessibility) */}
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to main content
        </a>
        
        <main id="main-content" role="main">
          {children}
        </main>

        {/* Analytics - add your tracking script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
                // Only load animation libraries if user allows motion
                console.log('Animations enabled');
              }
            `
          }}
        />
      </body>
    </html>
  );
}
