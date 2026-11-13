export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function GET() {
  const sources = await prisma.aiKnowledgeSource.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(sources);
}

export async function POST(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, category, content, documentUrl } = await req.json();
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const created = await prisma.aiKnowledgeSource.create({
      data: {
        title,
        category: category || 'general',
        content,
        documentUrl: documentUrl || null,
        isActive: true,
      },
    });

    await logActivity('CREATE_AI_KNOWLEDGE', 'AI', `Added AI knowledge document: ${created.title}`, admin.userId);
    return NextResponse.json({ success: true, source: created });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get('id') || '0');

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  await prisma.aiKnowledgeSource.delete({ where: { id } });
  await logActivity('DELETE_AI_KNOWLEDGE', 'AI', `Deleted AI knowledge source ID: ${id}`, admin.userId);
  return NextResponse.json({ success: true, message: 'Source deleted' });
}
