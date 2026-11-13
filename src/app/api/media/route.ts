export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get('folder');
  const search = searchParams.get('search');

  const whereClause: any = {};
  if (folder && folder !== 'all') whereClause.folder = folder;
  if (search) {
    whereClause.OR = [
      { title: { contains: search } },
      { fileName: { contains: search } },
      { altText: { contains: search } },
    ];
  }

  const media = await prisma.mediaLibrary.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(media);
}

export async function POST(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const title = (formData.get('title') as string) || '';
    const altText = (formData.get('altText') as string) || '';
    const folder = (formData.get('folder') as string) || 'general';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds maximum 20MB limit' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure upload dir exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(file.name) || '.jpg';
    const cleanBase = path.basename(file.name, ext).replace(/[^\w\-]/g, '_');
    const safeName = `${cleanBase}_${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, safeName);

    fs.writeFileSync(filePath, buffer);

    const fileUrl = `/uploads/${safeName}`;
    const fileType = file.type.startsWith('video/') ? 'video' : file.type.startsWith('image/') ? 'image' : 'document';

    const mediaEntry = await prisma.mediaLibrary.create({
      data: {
        fileName: file.name,
        fileUrl,
        fileType,
        fileSize: file.size,
        mimeType: file.type || 'application/octet-stream',
        altText: altText || file.name,
        title: title || file.name,
        folder,
      },
    });

    await logActivity('UPLOAD_MEDIA', 'Media', `Uploaded file: ${file.name} (${fileUrl})`, admin.userId);
    return NextResponse.json({ success: true, media: mediaEntry });
  } catch (err: any) {
    console.error('Media upload error:', err);
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

  const item = await prisma.mediaLibrary.findUnique({ where: { id } });
  if (item && item.fileUrl.startsWith('/uploads/')) {
    const localPath = path.join(process.cwd(), 'public', item.fileUrl);
    if (fs.existsSync(localPath)) {
      try {
        fs.unlinkSync(localPath);
      } catch (e) {
        console.warn('Could not remove file from disk:', e);
      }
    }
  }

  await prisma.mediaLibrary.delete({ where: { id } });
  await logActivity('DELETE_MEDIA', 'Media', `Deleted media ID: ${id}`, admin.userId);
  return NextResponse.json({ success: true, message: 'Media deleted' });
}
