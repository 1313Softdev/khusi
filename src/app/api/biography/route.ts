export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function GET() {
  const bio = await prisma.biography.findFirst();
  return NextResponse.json(bio);
}

export async function PUT(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await prisma.biography.upsert({
      where: { id: 1 },
      update: {
        fullNameEn: body.fullNameEn,
        fullNamePa: body.fullNamePa,
        titleEn: body.titleEn,
        titlePa: body.titlePa,
        identityEn: body.identityEn,
        identityPa: body.identityPa,
        profileImageUrl: body.profileImageUrl,
        shortBioEn: body.shortBioEn,
        shortBioPa: body.shortBioPa,
        fullBioEn: body.fullBioEn,
        fullBioPa: body.fullBioPa,
        journeyEn: body.journeyEn,
        journeyPa: body.journeyPa,
        publicServiceEn: body.publicServiceEn,
        publicServicePa: body.publicServicePa,
        visionEn: body.visionEn,
        visionPa: body.visionPa,
        organizationEn: body.organizationEn,
        organizationPa: body.organizationPa,
        quoteEn: body.quoteEn,
        quotePa: body.quotePa,
      },
      create: {
        id: 1,
        ...body,
      },
    });

    await logActivity('UPDATE_BIOGRAPHY', 'Biography', 'Updated verified biography and public service records', admin.userId);
    return NextResponse.json({ success: true, biography: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
