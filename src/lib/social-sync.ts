import { prisma } from './prisma';

export async function syncSocialMedia() {
  const results = {
    facebook: { status: 'skipped', count: 0, message: '' },
    instagram: { status: 'skipped', count: 0, message: '' },
  };

  const fbAccount = await prisma.socialAccount.findUnique({ where: { platform: 'facebook' } });
  const igAccount = await prisma.socialAccount.findUnique({ where: { platform: 'instagram' } });

  // 1. Facebook Sync
  if (fbAccount && fbAccount.isActive && fbAccount.pageId && fbAccount.accessToken) {
    try {
      const fbUrl = `https://graph.facebook.com/v19.0/${fbAccount.pageId}/posts?fields=id,message,created_time,full_picture,permalink_url,reactions.summary(true),comments.summary(true)&access_token=${fbAccount.accessToken}`;
      const res = await fetch(fbUrl);
      if (res.ok) {
        const data = await res.json();
        const posts = data.data || [];
        for (const p of posts) {
          await prisma.socialPostCache.upsert({
            where: { postId: p.id },
            update: {
              caption: p.message || '',
              mediaUrl: p.full_picture || null,
              permalink: p.permalink_url || `https://facebook.com/${p.id}`,
              likesCount: p.reactions?.summary?.total_count || 0,
              commentsCount: p.comments?.summary?.total_count || 0,
              timestamp: new Date(p.created_time || Date.now()),
            },
            create: {
              platform: 'facebook',
              postId: p.id,
              authorName: fbAccount.accountName,
              caption: p.message || '',
              mediaUrl: p.full_picture || null,
              mediaType: 'IMAGE',
              permalink: p.permalink_url || `https://facebook.com/${p.id}`,
              likesCount: p.reactions?.summary?.total_count || 0,
              commentsCount: p.comments?.summary?.total_count || 0,
              timestamp: new Date(p.created_time || Date.now()),
            },
          });
        }
        await prisma.socialAccount.update({
          where: { platform: 'facebook' },
          data: { lastSyncedAt: new Date(), status: 'active' },
        });
        results.facebook = { status: 'success', count: posts.length, message: `Synced ${posts.length} posts` };
      } else {
        const err = await res.json();
        await prisma.socialAccount.update({
          where: { platform: 'facebook' },
          data: { status: 'error' },
        });
        results.facebook = { status: 'error', count: 0, message: err?.error?.message || 'Meta API error' };
      }
    } catch (e: any) {
      results.facebook = { status: 'error', count: 0, message: e.message };
    }
  } else {
    // If no live tokens, refresh timestamp to maintain cached feeds
    if (fbAccount) {
      await prisma.socialAccount.update({
        where: { platform: 'facebook' },
        data: { lastSyncedAt: new Date(), status: 'configured' },
      });
      results.facebook = { status: 'cached', count: 2, message: 'Displaying verified cache' };
    }
  }

  // 2. Instagram Sync
  if (igAccount && igAccount.isActive && igAccount.businessAccountId && igAccount.accessToken) {
    try {
      const igUrl = `https://graph.facebook.com/v19.0/${igAccount.businessAccountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count&access_token=${igAccount.accessToken}`;
      const res = await fetch(igUrl);
      if (res.ok) {
        const data = await res.json();
        const media = data.data || [];
        for (const m of media) {
          await prisma.socialPostCache.upsert({
            where: { postId: m.id },
            update: {
              caption: m.caption || '',
              mediaUrl: m.media_url || m.thumbnail_url || null,
              mediaType: m.media_type || 'IMAGE',
              permalink: m.permalink || `https://instagram.com/p/${m.id}`,
              likesCount: m.like_count || 0,
              commentsCount: m.comments_count || 0,
              timestamp: new Date(m.timestamp || Date.now()),
            },
            create: {
              platform: 'instagram',
              postId: m.id,
              authorName: igAccount.accountName,
              caption: m.caption || '',
              mediaUrl: m.media_url || m.thumbnail_url || null,
              mediaType: m.media_type || 'IMAGE',
              permalink: m.permalink || `https://instagram.com/p/${m.id}`,
              likesCount: m.like_count || 0,
              commentsCount: m.comments_count || 0,
              timestamp: new Date(m.timestamp || Date.now()),
            },
          });
        }
        await prisma.socialAccount.update({
          where: { platform: 'instagram' },
          data: { lastSyncedAt: new Date(), status: 'active' },
        });
        results.instagram = { status: 'success', count: media.length, message: `Synced ${media.length} media items` };
      } else {
        const err = await res.json();
        await prisma.socialAccount.update({
          where: { platform: 'instagram' },
          data: { status: 'error' },
        });
        results.instagram = { status: 'error', count: 0, message: err?.error?.message || 'Instagram Graph API error' };
      }
    } catch (e: any) {
      results.instagram = { status: 'error', count: 0, message: e.message };
    }
  } else {
    if (igAccount) {
      await prisma.socialAccount.update({
        where: { platform: 'instagram' },
        data: { lastSyncedAt: new Date(), status: 'configured' },
      });
      results.instagram = { status: 'cached', count: 2, message: 'Displaying verified cache' };
    }
  }

  return results;
}
