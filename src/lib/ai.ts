import { prisma } from './prisma';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function generateAiResponse(
  userMessage: string,
  history: ChatMessage[] = [],
  preferredLanguage: string = 'auto'
): Promise<{ reply: string; sources: string[] }> {
  // 1. Fetch AI Settings and Knowledge Base from MySQL
  const aiSettings = await prisma.aiSetting.findFirst();
  const knowledgeSources = await prisma.aiKnowledgeSource.findMany({
    where: { isActive: true },
  });
  const biography = await prisma.biography.findFirst();
  const settings = await prisma.websiteSetting.findFirst();
  const recentBlogs = await prisma.blog.findMany({
    where: { status: 'published' },
    take: 5,
    select: { titleEn: true, titlePa: true, shortDescEn: true, shortDescPa: true, slug: true },
  });

  const isPunjabi = /[\u0A00-\u0A7F]/.test(userMessage) || preferredLanguage === 'pa';
  const isHindi = /[\u0900-\u097F]/.test(userMessage) || preferredLanguage === 'hi';

  // Build grounded context
  let context = `--- VERIFIED KNOWLEDGE BASE: SARDAR KHUSHINDER SINGH JAND SAHIB ---\n`;
  context += `Identity: Sardar Khushinder Singh Jand Sahib (Social Worker & Respected Member of Punjab Sanjhivalta Dal).\n`;
  context += `Location: Village Jand Sahib, District Sri Muktsar Sahib / Bathinda belt, Punjab, India.\n`;
  context += `Office Contact: Phone: ${settings?.contactPhone}, Email: ${settings?.contactEmail}, WhatsApp: ${settings?.whatsappNumber}.\n`;
  context += `Official Address: ${settings?.contactAddress}.\n\n`;

  if (biography) {
    context += `Biography Summary (English): ${biography.shortBioEn}\n`;
    context += `Biography Summary (Punjabi): ${biography.shortBioPa}\n`;
    context += `Social Work Journey: ${biography.journeyEn}\n`;
    context += `Public Service Activities: ${biography.publicServiceEn}\n`;
    context += `Vision for Punjab: ${biography.visionEn}\n`;
    context += `Organization (Punjab Sanjhivalta Dal): ${biography.organizationEn}\n\n`;
  }

  context += `Recent Published Blogs:\n`;
  recentBlogs.forEach((b) => {
    context += `- ${b.titleEn} (Link: /blog/${b.slug})\n  Summary: ${b.shortDescEn}\n`;
  });

  context += `\nApproved Knowledge Modules:\n`;
  const usedSources: string[] = [];
  knowledgeSources.forEach((k) => {
    context += `[${k.title}]: ${k.content}\n`;
    usedSources.push(k.title);
  });

  // Check if user has an external Gemini API key configured in DB or ENV
  const apiKey = aiSettings?.apiKey || process.env.GEMINI_API_KEY;

  if (aiSettings?.isEnabled && apiKey && apiKey.trim().length > 10) {
    try {
      const systemInstruction = (aiSettings.systemPrompt || '') + '\n\n' + context;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${aiSettings.modelName || 'gemini-1.5-flash'}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstruction }]
          },
          contents: [
            ...history.map((h) => ({
              role: h.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: h.content }],
            })),
            {
              role: 'user',
              parts: [{ text: userMessage }],
            },
          ],
          generationConfig: {
            temperature: aiSettings.temperature || 0.3,
            maxOutputTokens: aiSettings.maxTokens || 600,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          return { reply: candidate.trim(), sources: usedSources };
        }
      }
    } catch (e) {
      console.warn('External Gemini API call failed or timed out, falling back to built-in knowledge retrieval engine:', e);
    }
  }

  // Built-in intelligent grounding engine (Deterministic & strictly obedient to guidelines)
  const q = userMessage.toLowerCase();

  // Detect out-of-scope / unrelated political inquiries
  const unrelatedKeywords = ['modi', 'rahul gandhi', 'bjp', 'congress', 'aap', 'kejriwal', 'trump', 'cricket match', 'weather in london', 'bollywood'];
  const isUnrelated = unrelatedKeywords.some(w => q.includes(w));

  if (isUnrelated) {
    if (isPunjabi) {
      return {
        reply: "ਮੈਂ ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ (ਸਮਾਜ ਸੇਵੀ ਅਤੇ ਮੈਂਬਰ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ) ਦੇ ਅਧਿਕਾਰਤ ਪੋਰਟਲ ਦਾ ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ਸਿਰਫ਼ ਉਹਨਾਂ ਦੇ ਲੋਕ ਸੇਵਾ ਕਾਰਜਾਂ, ਵਿਚਾਰਾਂ ਅਤੇ ਦਫ਼ਤਰੀ ਸੰਪਰਕ ਸੰਬੰਧੀ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰ ਸਕਦਾ ਹਾਂ।",
        sources: ['Official Guidelines'],
      };
    } else {
      return {
        reply: "I am the official digital assistant for Sardar Khushinder Singh Jand Sahib (Social Worker & Member of Punjab Sanjhivalta Dal). I am specifically dedicated to providing verified information regarding his social initiatives, published blogs, and official contact channels.",
        sources: ['Official Guidelines'],
      };
    }
  }

  // Who is Khushinder Singh / Biography
  if (q.includes('who is') || q.includes('ਕੌਣ ਹਨ') || q.includes('ਬਾਰੇ ਦੱਸੋ') || q.includes('about') || q.includes('bio') || q.includes('identity')) {
    if (isPunjabi) {
      return {
        reply: `ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਪੰਜਾਬ ਦੇ ਇੱਕ ਸੁਹਿਰਦ ਸਮਾਜ ਸੇਵੀ ਅਤੇ 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ' ਦੇ ਸਰਗਰਮ ਮੈਂਬਰ ਹਨ। ਉਹ ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ (ਮਾਲਵਾ ਖੇਤਰ) ਦੇ ਵਸਨੀਕ ਹਨ ਅਤੇ ਪਿਛਲੇ ਲੰਮੇ ਸਮੇਂ ਤੋਂ ਪੇਂਡੂ ਸਿਹਤ ਕੈਂਪ, ਲੋੜਵੰਦ ਬੱਚਿਆਂ ਦੀ ਸਿੱਖਿਆ, ਖੇਡਾਂ ਰਾਹੀਂ ਨੌਜਵਾਨਾਂ ਦੀ ਸੇਧ ਅਤੇ ਕਿਸਾਨੀ ਹਿੱਤਾਂ ਦੀ ਰਾਖੀ ਲਈ ਨਿਰੰਤਰ ਕਾਰਜਸ਼ੀਲ ਹਨ। ਹੋਰ ਵਿਸਤਾਰ ਨਾਲ ਪੜ੍ਹਨ ਲਈ ਤੁਸੀਂ ਸਾਡੇ 'ਮੇਰੇ ਬਾਰੇ' (About) ਪੰਨੇ 'ਤੇ ਜਾ ਸਕਦੇ ਹੋ।`,
        sources: ['Biography', 'Official Identity'],
      };
    } else {
      return {
        reply: `Sardar Khushinder Singh Jand Sahib is an esteemed social worker and active member of the Punjab Sanjhivalta Dal, rooted in Village Jand Sahib, Punjab. He has spearheaded numerous community initiatives including free rural healthcare and eye camps, youth athletic tournaments, tree plantation campaigns, and advocating for farmers' canal water rights. You can read his detailed biography on our About page.`,
        sources: ['Biography', 'Official Identity'],
      };
    }
  }

  // Punjab Sanjhivalta Dal
  if (q.includes('sanjhivalta') || q.includes('ਸਾਂਝੀਵਾਲਤਾ') || q.includes('party') || q.includes('party membership') || q.includes('ਦਲ')) {
    if (isPunjabi) {
      return {
        reply: `ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੀ 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ' ਦੇ ਸਰਗਰਮ ਮੈਂਬਰ ਹਨ। ਇਹ ਜਥੇਬੰਦੀ ਗੁਰੂਆਂ-ਪੀਰਾਂ ਦੀਆਂ ਸਿੱਖਿਆਵਾਂ ਅਨੁਸਾਰ ਸਰਬ-ਸਾਂਝੀਵਾਲਤਾ, ਭਾਈਚਾਰਕ ਏਕਤਾ, ਪਾਰਦਰਸ਼ੀ ਲੋਕ-ਪੱਖੀ ਪ੍ਰਸ਼ਾਸਨ ਅਤੇ ਪੰਜਾਬ ਦੇ ਹੱਕਾਂ ਦੀ ਰਾਖੀ ਲਈ ਵਚਨਬੱਧ ਹੈ।`,
        sources: ['Punjab Sanjhivalta Dal Membership'],
      };
    } else {
      return {
        reply: `Sardar Khushinder Singh is an active member of Punjab Sanjhivalta Dal. The organization stands for communal harmony, transparent governance, safeguarding the rights of Punjab's farmers and laborers, and upholding the timeless Punjabi principle of Sarbat Da Bhala (welfare of all).`,
        sources: ['Punjab Sanjhivalta Dal Membership'],
      };
    }
  }

  // Contact / Office / Phone / Address
  if (q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('email') || q.includes('address') || q.includes('ਸੰਪਰਕ') || q.includes('ਫੋਨ') || q.includes('ਪਤਾ')) {
    if (isPunjabi) {
      return {
        reply: `ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੀ ਦੇ ਦਫ਼ਤਰ ਨਾਲ ਸੰਪਰਕ ਕਰਨ ਲਈ ਵੇਰਵੇ ਹੇਠ ਲਿਖੇ ਅਨੁਸਾਰ ਹਨ:\n• ਫ਼ੋਨ / WhatsApp: ${settings?.contactPhone || '+91 98765 43210'}\n• ਈਮੇਲ: ${settings?.contactEmail || 'contact@khushindersingh.org'}\n• ਦਫ਼ਤਰ ਦਾ ਪਤਾ: ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ, ਜ਼ਿਲ੍ਹਾ ਸ੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ / ਬਠਿੰਡਾ ਬੈਲਟ, ਪੰਜਾਬ।\n• ਹਰ ਐਤਵਾਰ ਸਵੇਰੇ 10 ਵਜੇ ਦਫ਼ਤਰ ਵਿਖੇ ਜਨਤਕ ਮੁਲਾਕਾਤ ਹੁੰਦੀ ਹੈ। ਤੁਸੀਂ ਵੈੱਬਸਾਈਟ ਦੇ ਸੰਪਰਕ (Contact) ਫਾਰਮ ਰਾਹੀਂ ਵੀ ਆਪਣਾ ਸੁਨੇਹਾ ਭੇਜ ਸਕਦੇ ਹੋ।`,
        sources: ['Office Contact'],
      };
    } else {
      return {
        reply: `You can reach the office of Sardar Khushinder Singh Jand Sahib through:\n• Phone / WhatsApp: ${settings?.contactPhone || '+91 98765 43210'}\n• Email: ${settings?.contactEmail || 'contact@khushindersingh.org'}\n• Office Address: Village Jand Sahib, District Sri Muktsar Sahib / Bathinda region, Punjab, India.\n• Public grievance meetings are held every Sunday morning at 10:00 AM. You can also send a direct inquiry on the Contact page.`,
        sources: ['Office Contact'],
      };
    }
  }

  // Social Work / Medical Camps / Sports
  if (q.includes('social work') || q.includes('medical') || q.includes('health') || q.includes('sports') || q.includes('tree') || q.includes('ਕੈਂਪ') || q.includes('ਖੇਡ') || q.includes('ਸੇਵਾ')) {
    if (isPunjabi) {
      return {
        reply: `ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੀ ਦੇ ਮੁੱਖ ਸਮਾਜ ਸੇਵਾ ਕਾਰਜ:\n1. ਪੇਂਡੂ ਮੁਫ਼ਤ ਮੈਡੀਕਲ ਤੇ ਅੱਖਾਂ ਦੇ ਕੈਂਪ (15,000+ ਮਰੀਜ਼ਾਂ ਦੀ ਮੁਫ਼ਤ ਜਾਂਚ ਤੇ ਦਵਾਈਆਂ)।\n2. ਨੌਜਵਾਨਾਂ ਲਈ ਓਪਨ ਜਿੰਮ ਅਤੇ ਸਾਲਾਨਾ ਸ਼ਹੀਦ ਭਗਤ ਸਿੰਘ ਖੇਡ ਮੇਲੇ।\n3. ਵਾਤਾਵਰਣ ਦੀ ਸੰਭਾਲ ਲਈ 25,000+ ਰੁੱਖ ਲਗਾਉਣ ਦੀ ਮੁਹਿੰਮ।\n4. ਕਿਸਾਨਾਂ ਲਈ ਨਹਿਰੀ ਪਾਣੀ ਦੀ ਸਮੱਸਿਆ ਹੱਲ ਕਰਵਾਉਣਾ।\nਸਾਡੇ ਬਲਾਗ ਸੈਕਸ਼ਨ ਵਿੱਚ ਤੁਸੀਂ ਇਹਨਾਂ ਗਤੀਵਿਧੀਆਂ ਦੀਆਂ ਵਿਸਥਾਰਤ ਰਿਪੋਰਟਾਂ ਪੜ੍ਹ ਸਕਦੇ ਹੋ।`,
        sources: ['Key Social Work Projects'],
      };
    } else {
      return {
        reply: `Key social work initiatives led by Sardar Khushinder Singh:\n1. Rural Mega Healthcare & Eye Camps (Screened & treated 15,000+ villagers with free spectacles & medicine).\n2. Youth Sports & Open Gyms to inspire healthy living and fight drug menace.\n3. Green Punjab Plantation Drive planting over 25,000 native saplings.\n4. Farmer advocacy ensuring irrigation canal water reaches tail-end villages.\nVisit the Blog section to read verified coverage of these initiatives.`,
        sources: ['Key Social Work Projects'],
      };
    }
  }

  // Default fallback response
  return {
    reply: isPunjabi
      ? (aiSettings?.fallbackResponsePa || "ਇਸ ਵਿਸ਼ੇ ਸੰਬੰਧੀ ਪ੍ਰਮਾਣਿਤ ਜਾਣਕਾਰੀ ਇਸ ਵੇਲੇ ਉਪਲਬਧ ਨਹੀਂ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਸਾਡੇ ਸੰਪਰਕ (Contact) ਪੰਨੇ ਰਾਹੀਂ ਸਿੱਧਾ ਦਫ਼ਤਰ ਨਾਲ ਰਾਬਤਾ ਕਾਇਮ ਕਰੋ।")
      : (aiSettings?.fallbackResponseEn || "Verified information on this specific topic is currently not available in our records. Please feel free to reach out directly through our Contact page or call the office."),
    sources: ['Portal Knowledge Base'],
  };
}
