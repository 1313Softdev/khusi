export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { syncSocialMedia } from '@/lib/social-sync';
import { logActivity } from '@/lib/auth';

export async function GET(req: NextRequest) {
  return handleCronSync(req);
}

export async function POST(req: NextRequest) {
  return handleCronSync(req);
}

async function handleCronSync(req: NextRequest) {
  const startTime = Date.now();
  try {
    const results = await syncSocialMedia();
    const durationMs = Date.now() - startTime;

    try {
      await logActivity(
        'CRON_SOCIAL_SYNC',
        'Cron',
        `Automated 15-minute social sync completed in ${durationMs}ms (FB: ${results.facebook.count}, IG: ${results.instagram.count})`
      );
    } catch {
      // Activity logging optional if not initialized
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      interval: '15_minutes',
      durationMs,
      results,
    });
  } catch (error: any) {
    console.error('Cron social sync error:', error);
    return NextResponse.json(
      {
        success: false,
        timestamp: new Date().toISOString(),
        error: error.message || 'Cron sync failed',
      },
      { status: 500 }
    );
  }
}
