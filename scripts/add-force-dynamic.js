const fs = require('fs');
const path = require('path');

const routes = [
  'src/app/api/settings/route.ts',
  'src/app/api/biography/route.ts',
  'src/app/api/blogs/route.ts',
  'src/app/api/sections/route.ts',
  'src/app/api/inquiries/reply/route.ts',
  'src/app/api/inquiries/route.ts',
  'src/app/api/inquiries/export/route.ts',
  'src/app/api/auth/logout/route.ts',
  'src/app/api/auth/me/route.ts',
  'src/app/api/auth/forgot-password/route.ts',
  'src/app/api/auth/login/route.ts',
  'src/app/api/logos/route.ts',
  'src/app/api/social/route.ts',
  'src/app/api/social/sync/route.ts',
  'src/app/api/ai/settings/route.ts',
  'src/app/api/ai/chat/route.ts',
  'src/app/api/ai/logs/route.ts',
  'src/app/api/ai/knowledge/route.ts',
  'src/app/api/smtp/test/route.ts',
  'src/app/api/smtp/route.ts',
  'src/app/api/advertisements/route.ts',
  'src/app/api/hero/route.ts',
  'src/app/api/seo/route.ts',
  'src/app/api/galleries/route.ts',
  'src/app/api/categories/route.ts',
  'src/app/api/media/route.ts',
  'src/app/sitemap.xml/route.ts',
];

for (const relPath of routes) {
  const fullPath = path.join(__dirname, '..', relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    if (!content.includes("export const dynamic = 'force-dynamic'")) {
      content = `export const dynamic = 'force-dynamic';\n\n` + content;
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✓ Added force-dynamic to ${relPath}`);
    }
  }
}
