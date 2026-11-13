import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { prisma } from '@/lib/prisma';

export async function generateMetadata(): Promise<Metadata> {
  let seo = null;
  let settings = null;
  try {
    seo = await prisma.seoSetting.findUnique({ where: { pagePath: '/' } });
    settings = await prisma.websiteSetting.findFirst();
  } catch (e) {
    // Database might not be connected during static build
  }

  const title = seo?.metaTitle || settings?.siteTitle || 'Sardar Khushinder Singh Jand Sahib | Official Website';
  const description = seo?.metaDescription || settings?.siteDescription || 'Dedicated to social welfare, rural development, healthcare, and communal harmony across Punjab. Member of Punjab Sanjhivalta Dal.';

  return {
    title: {
      default: title,
      template: '%s | Sardar Khushinder Singh Jand Sahib',
    },
    description: description,
    keywords: seo?.metaKeywords ? seo.metaKeywords.split(', ') : ['Khushinder Singh', 'Jand Sahib', 'Punjab Sanjhivalta Dal', 'Social Worker Punjab'],
    authors: [{ name: 'Sardar Khushinder Singh Jand Sahib' }],
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    openGraph: {
      title: title,
      description: description,
      url: '/',
      siteName: 'Official Portal of Sardar Khushinder Singh Jand Sahib',
      images: [
        {
          url: seo?.ogImage || '/images/khushinder-hero.png',
          width: 1200,
          height: 630,
          alt: 'Sardar Khushinder Singh Jand Sahib',
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [seo?.ogImage || '/images/khushinder-hero.png'],
    },
    icons: {
      icon: settings?.faviconUrl || '/images/logo-emblem.png',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings = null;
  try {
    settings = await prisma.websiteSetting.findFirst();
  } catch (e) {
    // Database might not be connected during static build
  }
  const defaultLang = settings?.punjabiFirst ? 'pa' : 'en';

  const schemaOrgJSONLD = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sardar Khushinder Singh Jand Sahib',
    jobTitle: 'Social Worker & Member of Punjab Sanjhivalta Dal',
    description: 'Dedicated social worker committed to public welfare, rural healthcare, and youth empowerment in Punjab.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jand Sahib',
      addressRegion: 'Punjab',
      addressCountry: 'IN',
    },
    memberOf: {
      '@type': 'Organization',
      name: 'Punjab Sanjhivalta Dal',
    },
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    image: '/images/khushinder-hero.png',
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=Mukta+Mahee:wght@400;500;600;700;800&family=Noto+Sans+Gurmukhi:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
        />
      </head>
      <body className="bg-navy-950 text-gray-100 min-h-screen flex flex-col selection:bg-saffron-500 selection:text-navy-950 font-sans">
        <LanguageProvider defaultLang={defaultLang}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
