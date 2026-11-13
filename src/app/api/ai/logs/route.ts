export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const conversations = await prisma.aiConversation.findMany({
    orderBy: { createdAt: 'desc' },
    take: 30,
    include: {
      messages: { orderBy: { createdAt: 'asc' } },
    },
  });

  return NextResponse.json(conversations);
}
