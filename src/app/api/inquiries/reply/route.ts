export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTransporter } from '@/lib/mailer';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { inquiryId, replySubject, replyMessage } = await req.json();

    const inquiry = await prisma.contactInquiry.findUnique({ where: { id: parseInt(inquiryId) } });
    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    const smtpSetting = await prisma.smtpSetting.findFirst();
    const transporter = await getTransporter();

    if (transporter && smtpSetting && smtpSetting.smtpPassword) {
      await transporter.sendMail({
        from: `"${smtpSetting.senderName}" <${smtpSetting.senderEmail}>`,
        to: inquiry.email,
        subject: replySubject,
        html: `<p>Dear ${inquiry.fullName},</p>
<div style="background:#f9fafb;padding:14px;border-left:4px solid #f59e0b;margin:16px 0;">
  ${replyMessage.replace(/\n/g, '<br/>')}
</div>
<p>Warm regards,<br/><strong>Office of Sardar Khushinder Singh Jand Sahib</strong><br/>Social Worker | Member, Punjab Sanjhivalta Dal</p>`,
      });
    }

    await prisma.contactInquiry.update({
      where: { id: inquiry.id },
      data: {
        isReplied: true,
        isRead: true,
        adminNotes: (inquiry.adminNotes ? inquiry.adminNotes + '\n' : '') + `[Replied on ${new Date().toLocaleString()}]: ${replyMessage.slice(0, 100)}...`,
      },
    });

    await logActivity('REPLY_INQUIRY', 'Inquiries', `Sent email reply to ${inquiry.email}`, admin.userId);
    return NextResponse.json({ success: true, message: 'Reply sent successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
