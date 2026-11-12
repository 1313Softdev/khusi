import React from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import AiAssistantWidget from '@/components/public/AiAssistantWidget';
import { prisma } from '@/lib/prisma';
import ContactClientView from './ContactClientView';

export const revalidate = 60;

export default async function ContactPage() {
  const [settings, socialAccounts] = await Promise.all([
    prisma.websiteSetting.findFirst(),
    prisma.socialAccount.findMany({ where: { isActive: true } }),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-navy-950 text-white">
      <Navbar settings={settings || undefined} />

      <main className="flex-1 pt-24 pb-20">
        <ContactClientView settings={settings} />
      </main>

      <Footer settings={settings || undefined} socialLinks={socialAccounts} />
      <AiAssistantWidget />
    </div>
  );
}
