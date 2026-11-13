export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { syncSocialMedia } from '@/lib/social-sync';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    const results = await syncSocialMedia();

    if (admin) {
      await logActivity('SYNC_SOCIAL_FEEDS', 'Social', 'Triggered manual social feed sync', admin.userId);
    }

    return NextResponse.json({ success: true, results });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
