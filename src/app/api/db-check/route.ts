export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || '';
  const sanitizedUrl = dbUrl.replace(/:(.*?)@/, ':****@');

  try {
    const userCount = await prisma.user.count();
    const adminUser = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
        fullName: true,
        isActive: true,
        role: { select: { name: true, slug: true } },
      },
    });

    return NextResponse.json({
      status: 'connected',
      databaseUrlConfigured: !!dbUrl,
      connectionInfo: sanitizedUrl,
      userCount,
      adminUser,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        databaseUrlConfigured: !!dbUrl,
        connectionInfo: sanitizedUrl,
        errorMessage: error.message,
        errorCode: error.code || null,
        errorMeta: error.meta || null,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
