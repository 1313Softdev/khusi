export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function GET() {
  const accounts = await prisma.socialAccount.findMany({
    orderBy: { id: 'asc' },
  });
  return NextResponse.json(accounts);
}

export async function PUT(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { accounts } = await req.json();
    if (!Array.isArray(accounts)) {
      return NextResponse.json({ error: 'Accounts array required' }, { status: 400 });
    }

    for (const acc of accounts) {
      await prisma.socialAccount.upsert({
        where: { platform: acc.platform },
        update: {
          accountName: acc.accountName,
          profileUrl: acc.profileUrl,
          pageId: acc.pageId || null,
          businessAccountId: acc.businessAccountId || null,
          accessToken: acc.accessToken || null,
          refreshToken: acc.refreshToken || null,
          isActive: acc.isActive !== undefined ? acc.isActive : true,
          isFeedEnabled: acc.isFeedEnabled !== undefined ? acc.isFeedEnabled : true,
          syncIntervalMinutes: parseInt(acc.syncIntervalMinutes) || 60,
          status: acc.status || 'configured',
        },
        create: {
          platform: acc.platform,
          accountName: acc.accountName || acc.platform,
          profileUrl: acc.profileUrl || '',
          pageId: acc.pageId || null,
          businessAccountId: acc.businessAccountId || null,
          accessToken: acc.accessToken || null,
          refreshToken: acc.refreshToken || null,
          isActive: true,
          isFeedEnabled: true,
          status: 'configured',
        },
      });
    }

    await logActivity('UPDATE_SOCIAL_ACCOUNTS', 'Social', 'Updated social media configuration and API tokens', admin.userId);
    return NextResponse.json({ success: true, message: 'Social accounts updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
