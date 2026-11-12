import React from 'react';
import Navbar from '@/components/public/Navbar';
import HeroSlider from '@/components/public/HeroSlider';
import LogoCarousel from '@/components/public/LogoCarousel';
import SocialFeed from '@/components/public/SocialFeed';
import AboutIntro from '@/components/public/AboutIntro';
import LatestBlogs from '@/components/public/LatestBlogs';
import GallerySection from '@/components/public/GallerySection';
import ContactCta from '@/components/public/ContactCta';
import Footer from '@/components/public/Footer';
import AdBanner from '@/components/public/AdBanner';
import AiAssistantWidget from '@/components/public/AiAssistantWidget';
import { prisma } from '@/lib/prisma';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  // Fetch dynamic content from MySQL
  const [
    settings,
    sections,
    heroSlides,
    logoSlides,
    biography,
    cachedSocialPosts,
    blogs,
    galleryImages,
    advertisements,
    socialAccounts,
  ] = await Promise.all([
    prisma.websiteSetting.findFirst(),
    prisma.homepageSection.findMany({ orderBy: { displayOrder: 'asc' } }),
    prisma.heroSlide.findMany({ where: { isActive: true }, orderBy: { displayOrder: 'asc' } }),
    prisma.logoSlide.findMany({ where: { isActive: true }, orderBy: { displayOrder: 'asc' } }),
    prisma.biography.findFirst(),
    prisma.socialPostCache.findMany({ orderBy: { timestamp: 'desc' }, take: 8 }),
    prisma.blog.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
      take: 6,
      include: { category: true },
    }),
    prisma.galleryImage.findMany({
      orderBy: { displayOrder: 'asc' },
      take: 12,
      include: { gallery: true },
    }),
    prisma.advertisement.findMany({ where: { isActive: true } }),
    prisma.socialAccount.findMany({ where: { isActive: true } }),
  ]);

  // Format gallery items with categories
  const formattedGallery = galleryImages.map((g) => ({
    id: g.id,
    imageUrl: g.imageUrl,
    titleEn: g.titleEn,
    titlePa: g.titlePa,
    caption: g.caption,
    videoUrl: g.videoUrl,
    isFeatured: g.isFeatured,
    category: g.gallery?.category || 'Community',
  }));

  // Helper to check section status
  const isSectionEnabled = (key: string) => {
    const s = sections.find((sec) => sec.sectionKey === key);
    return s ? s.isEnabled : true;
  };

  const getSectionConfig = (key: string) => {
    return sections.find((sec) => sec.sectionKey === key);
  };

  // Find social profile URLs for fallbacks
  const fbAccount = socialAccounts.find((a) => a.platform === 'facebook');
  const igAccount = socialAccounts.find((a) => a.platform === 'instagram');

  return (
    <div className="flex flex-col min-h-screen bg-navy-950 text-white">
      <Navbar settings={settings || undefined} />

      <main className="flex-1">
        {/* 1. Hero Section */}
        {isSectionEnabled('hero') && (
          <HeroSlider slides={heroSlides} />
        )}

        {/* 2. Animated Logo Introduction */}
        {isSectionEnabled('logo_animation') && (
          <LogoCarousel logos={logoSlides} rotationInterval={4} effect="fade" />
        )}

        {/* 3. Facebook and Instagram Updates */}
        {isSectionEnabled('social_feeds') && (
          <SocialFeed
            posts={cachedSocialPosts}
            fbPageUrl={fbAccount?.profileUrl || 'https://facebook.com/khushinder.jandsahib'}
            igProfileUrl={igAccount?.profileUrl || 'https://instagram.com/khushinder_jandsahib'}
          />
        )}

        {/* Homepage Advertisement Placement */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner ads={advertisements} placement="homepage" />
        </div>

        {/* 4. About Introduction */}
        {isSectionEnabled('about_intro') && (
          <AboutIntro bio={biography} />
        )}

        {/* 5. Latest Blogs and News */}
        {isSectionEnabled('latest_blogs') && (
          <LatestBlogs
            blogs={blogs}
            titleEn={getSectionConfig('latest_blogs')?.titleEn || 'Latest Blogs & Public News'}
            titlePa={getSectionConfig('latest_blogs')?.titlePa || 'ਤਾਜ਼ਾ ਖ਼ਬਰਾਂ ਤੇ ਬਲਾਗ'}
          />
        )}

        {/* 6. Social Work Gallery */}
        {isSectionEnabled('gallery') && (
          <GallerySection images={formattedGallery} />
        )}

        {/* 7. Contact CTA */}
        {isSectionEnabled('contact_cta') && (
          <ContactCta settings={settings || undefined} />
        )}
      </main>

      {/* Footer & Floating AI Assistant */}
      <Footer settings={settings || undefined} socialLinks={socialAccounts} />
      <AiAssistantWidget />
    </div>
  );
}
