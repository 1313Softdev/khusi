import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateAiResponse } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId, language } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const sid = sessionId || 'anon_' + Date.now();
    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

    // 1. Find or create conversation in MySQL
    let conversation = await prisma.aiConversation.findUnique({
      where: { sessionId: sid },
      include: { messages: { orderBy: { createdAt: 'asc' }, take: 10 } },
    });

    if (!conversation) {
      conversation = await prisma.aiConversation.create({
        data: {
          sessionId: sid,
          visitorIp: typeof ipAddress === 'string' ? ipAddress.split(',')[0] : '127.0.0.1',
          language: language || 'en',
        },
        include: { messages: true },
      });
    }

    // 2. Save visitor message in MySQL
    await prisma.aiMessage.create({
      data: {
        conversationId: conversation.id,
        sender: 'user',
        message: message.trim(),
      },
    });

    // 3. Format history for model
    const history = (conversation.messages || []).map((m) => ({
      role: m.sender as 'user' | 'assistant',
      content: m.message,
    }));

    // 4. Generate AI response grounded in verified database sources
    const { reply, sources } = await generateAiResponse(message, history, language);

    // 5. Save assistant reply in MySQL
    await prisma.aiMessage.create({
      data: {
        conversationId: conversation.id,
        sender: 'assistant',
        message: reply,
        sourcesUsed: sources.join(', '),
      },
    });

    return NextResponse.json({
      reply,
      sources,
      sessionId: sid,
    });
  } catch (err: any) {
    console.error('AI chat endpoint error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
