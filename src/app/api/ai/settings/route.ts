import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin, logActivity } from '@/lib/auth';

export async function GET() {
  const settings = await prisma.aiSetting.findFirst();
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await prisma.aiSetting.upsert({
      where: { id: 1 },
      update: {
        isEnabled: body.isEnabled !== undefined ? body.isEnabled : true,
        provider: body.provider || 'gemini',
        apiKey: body.apiKey !== undefined ? body.apiKey : '',
        modelName: body.modelName || 'gemini-1.5-flash',
        systemPrompt: body.systemPrompt,
        welcomeMessageEn: body.welcomeMessageEn,
        welcomeMessagePa: body.welcomeMessagePa,
        fallbackResponseEn: body.fallbackResponseEn,
        fallbackResponsePa: body.fallbackResponsePa,
        responseLanguage: body.responseLanguage || 'auto',
        maxTokens: parseInt(body.maxTokens) || 500,
        temperature: parseFloat(body.temperature) || 0.3,
      },
      create: {
        id: 1,
        ...body,
      },
    });

    await logActivity('UPDATE_AI_SETTINGS', 'AI', 'Updated AI assistant instructions & API settings', admin.userId);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
