import React from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import GallerySection from '@/components/public/GallerySection';
import ContactCta from '@/components/public/ContactCta';
import AiAssistantWidget from '@/components/public/AiAssistantWidget';
import { prisma } from '@/lib/prisma';
import AboutClientView from './AboutClientView';

export const revalidate = 60;

export default async function AboutPage() {
  let settings = null;
  let biography = null;
  let galleryImages: any[] = [];
  let socialAccounts: any[] = [];

  try {
    const results = await Promise.all([
      prisma.websiteSetting.findFirst(),
      prisma.biography.findFirst(),
      prisma.galleryImage.findMany({
        take: 8,
        orderBy: { displayOrder: 'asc' },
        include: { gallery: true },
      }),
      prisma.socialAccount.findMany({ where: { isActive: true } }),
    ]);
    [settings, biography, galleryImages, socialAccounts] = results;
  } catch (e) {
    // Database might not be connected during static build
  }

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

  return (
    <div className="flex flex-col min-h-screen bg-navy-950 text-white">
      <Navbar settings={settings || undefined} />

      <main className="flex-1 pt-24">
        <AboutClientView bio={biography} />

        {/* Photo Gallery Section */}
        <GallerySection images={formattedGallery} />

        {/* Contact Invitation */}
        <ContactCta settings={settings || undefined} />
      </main>

      <Footer settings={settings || undefined} socialLinks={socialAccounts} />
      <AiAssistantWidget />
    </div>
  );
}
