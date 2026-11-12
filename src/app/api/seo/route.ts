import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function GET() {
  const seo = await prisma.seoSetting.findMany({
    orderBy: { pagePath: 'asc' },
  });
  return NextResponse.json(seo);
}

export async function PUT(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { settings } = await req.json();
    if (!Array.isArray(settings)) {
      return NextResponse.json({ error: 'Array expected' }, { status: 400 });
    }

    for (const s of settings) {
      await prisma.seoSetting.upsert({
        where: { pagePath: s.pagePath },
        update: {
          metaTitle: s.metaTitle,
          metaDescription: s.metaDescription,
          metaKeywords: s.metaKeywords,
          ogTitle: s.ogTitle || s.metaTitle,
          ogDescription: s.ogDescription || s.metaDescription,
          ogImage: s.ogImage,
          twitterCard: s.twitterCard || 'summary_large_image',
          canonicalUrl: s.canonicalUrl,
          googleAnalyticsId: s.googleAnalyticsId,
          googleSearchConsoleCode: s.googleSearchConsoleCode,
          schemaMarkup: s.schemaMarkup,
          isIndexable: s.isIndexable !== undefined ? s.isIndexable : true,
        },
        create: {
          pagePath: s.pagePath,
          metaTitle: s.metaTitle,
          metaDescription: s.metaDescription,
          metaKeywords: s.metaKeywords,
          ogTitle: s.ogTitle || s.metaTitle,
          ogDescription: s.ogDescription || s.metaDescription,
          ogImage: s.ogImage,
          twitterCard: 'summary_large_image',
          canonicalUrl: s.canonicalUrl,
          googleAnalyticsId: s.googleAnalyticsId,
          googleSearchConsoleCode: s.googleSearchConsoleCode,
          schemaMarkup: s.schemaMarkup,
          isIndexable: true,
        },
      });
    }

    await logActivity('UPDATE_SEO', 'SEO', 'Updated SEO & Meta configuration', admin.userId);
    return NextResponse.json({ success: true, message: 'SEO settings updated' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
