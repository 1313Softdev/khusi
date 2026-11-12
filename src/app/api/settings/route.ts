import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function GET() {
  const settings = await prisma.websiteSetting.findFirst();
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await prisma.websiteSetting.upsert({
      where: { id: 1 },
      update: {
        siteName: body.siteName,
        siteTitle: body.siteTitle,
        siteDescription: body.siteDescription,
        faviconUrl: body.faviconUrl,
        mainLogoUrl: body.mainLogoUrl,
        footerLogoUrl: body.footerLogoUrl,
        contactEmail: body.contactEmail,
        contactPhone: body.contactPhone,
        contactAddress: body.contactAddress,
        whatsappNumber: body.whatsappNumber,
        primaryColor: body.primaryColor,
        secondaryColor: body.secondaryColor,
        accentColor: body.accentColor,
        defaultLanguage: body.defaultLanguage,
        allowLanguageToggle: body.allowLanguageToggle,
        punjabiFirst: body.punjabiFirst,
        copyrightText: body.copyrightText,
      },
      create: {
        id: 1,
        ...body,
      },
    });

    await logActivity('UPDATE_SETTINGS', 'Settings', 'Updated global website settings', admin.userId);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
