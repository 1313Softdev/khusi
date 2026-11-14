export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { syncSocialMedia } from '@/lib/social-sync';

const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const platform = searchParams.get('platform') || 'all';
    const limit = Math.min(parseInt(searchParams.get('limit') || '12', 10), 50);
    const forceSync = searchParams.get('forceSync') === 'true';

    // 1. Check if 15 minutes have elapsed since last sync
    const accounts = await prisma.socialAccount.findMany({
      where: { platform: { in: ['facebook', 'instagram'] }, isActive: true },
    });

    const now = Date.now();
    let shouldSync = forceSync;

    if (!shouldSync) {
      if (accounts.length === 0) {
        shouldSync = true;
      } else {
        for (const acc of accounts) {
          if (!acc.lastSyncedAt || now - new Date(acc.lastSyncedAt).getTime() >= FIFTEEN_MINUTES_MS) {
            shouldSync = true;
            break;
          }
        }
      }
    }

    if (shouldSync) {
      try {
        await syncSocialMedia();
      } catch (syncErr) {
        console.error('Background social sync failed in /api/social/feed:', syncErr);
      }
    }

    // 2. Fetch latest posts from cache
    const whereClause: any = {};
    if (platform === 'facebook' || platform === 'instagram') {
      whereClause.platform = platform;
    }

    const posts = await prisma.socialPostCache.findMany({
      where: whereClause,
      orderBy: { timestamp: 'desc' },
      take: limit,
    });

    const latestSync = accounts.reduce<Date | null>((latest, a) => {
      if (!a.lastSyncedAt) return latest;
      if (!latest || new Date(a.lastSyncedAt) > latest) return new Date(a.lastSyncedAt);
      return latest;
    }, null);

    return NextResponse.json({
      success: true,
      platform,
      count: posts.length,
      syncIntervalMinutes: 15,
      lastSyncedAt: latestSync ? latestSync.toISOString() : new Date().toISOString(),
      posts,
    });
  } catch (error: any) {
    console.error('Error fetching social feed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch social feeds',
        posts: [],
      },
      { status: 500 }
    );
  }
}
