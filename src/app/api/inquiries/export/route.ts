import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const inquiries = await prisma.contactInquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const headers = ['ID', 'Full Name', 'Email', 'Mobile Number', 'Subject', 'Message', 'Status', 'Date'];
  const rows = inquiries.map((iq) => [
    iq.id,
    `"${iq.fullName.replace(/"/g, '""')}"`,
    `"${iq.email}"`,
    `"${iq.mobileNumber}"`,
    `"${iq.subject.replace(/"/g, '""')}"`,
    `"${iq.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    iq.isReplied ? 'Replied' : iq.isRead ? 'Read' : 'Unread',
    iq.createdAt.toISOString(),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="inquiries_${Date.now()}.csv"`,
    },
  });
}
