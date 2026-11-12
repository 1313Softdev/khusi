import { NextRequest, NextResponse } from 'next/server';
import { testSmtp } from '@/lib/mailer';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { testEmail } = await req.json();
    if (!testEmail) {
      return NextResponse.json({ error: 'Test recipient email is required' }, { status: 400 });
    }

    const info = await testSmtp(testEmail);
    await logActivity('TEST_SMTP', 'SMTP', `Sent test email to ${testEmail}`, admin.userId);

    return NextResponse.json({ success: true, message: 'Test email delivered successfully', info });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
