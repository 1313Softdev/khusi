import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (admin) {
    await logActivity('LOGOUT', 'Auth', `User logged out: ${admin.email}`, admin.userId);
  }

  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete('admin_token');
  return response;
}
