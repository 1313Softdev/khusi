const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function createSVG(width, height, bgGradient, title, subtitle, badgeText = 'PUNJAB SANJHIVATLA DAL', iconType = 'shield') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGradient[0]}" />
      <stop offset="50%" stop-color="${bgGradient[1]}" />
      <stop offset="100%" stop-color="${bgGradient[2]}" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#0B192C" stop-opacity="0" />
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>
  
  <rect width="100%" height="100%" fill="url(#bg)" />
  <rect width="100%" height="100%" fill="url(#glow)" />

  <!-- Subtle Decorative geometric lines -->
  <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height)*0.4}" fill="none" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="8 6" opacity="0.25" />
  <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height)*0.3}" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.15" />

  <g transform="translate(0, 0)">
    <!-- Badge -->
    <rect x="${width/2 - 160}" y="${height * 0.18}" width="320" height="32" rx="16" fill="#F59E0B" fill-opacity="0.2" stroke="#F59E0B" stroke-width="1.5" />
    <text x="${width/2}" y="${height * 0.18 + 20}" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#FBBF24" text-anchor="middle" letter-spacing="2">${badgeText}</text>

    <!-- Main Title -->
    <text x="${width/2}" y="${height * 0.48}" font-family="system-ui, -apple-system, sans-serif" font-size="${Math.min(36, width/22)}" font-weight="800" fill="#FFFFFF" text-anchor="middle" filter="url(#shadow)">
      ${title}
    </text>

    <!-- Subtitle -->
    <text x="${width/2}" y="${height * 0.58}" font-family="system-ui, -apple-system, sans-serif" font-size="${Math.min(18, width/42)}" font-weight="500" fill="#E2E8F0" text-anchor="middle" opacity="0.95">
      ${subtitle}
    </text>

    <!-- Cultural emblem representation -->
    <g transform="translate(${width/2 - 30}, ${height * 0.72}) scale(0.6)">
      <path d="M50 0 L100 40 L80 100 L20 100 L0 40 Z" fill="#F59E0B" opacity="0.9" />
      <circle cx="50" cy="50" r="24" fill="#0B192C" />
      <path d="M50 30 L55 45 L70 45 L58 55 L62 70 L50 60 L38 70 L42 55 L30 45 L45 45 Z" fill="#FBBF24" />
    </g>
  </g>
</svg>`;
}

const assets = [
  // Logos
  { name: 'logo-main.png', svg: createSVG(400, 100, ['#0B192C', '#1E293B', '#0F172A'], 'KHUSHINDER SINGH', 'Social Worker | Punjab Sanjhivalta Dal', 'JAND SAHIB, PUNJAB') },
  { name: 'logo-footer.png', svg: createSVG(400, 100, ['#060D17', '#0B192C', '#1B2A4A'], 'KHUSHINDER SINGH', 'Public Service & Social Reform', 'PUNJAB SANJHIVATLA DAL') },
  { name: 'logo-emblem.png', svg: createSVG(250, 250, ['#0B192C', '#1B2A4A', '#F59E0B'], 'KSJS', 'JAND SAHIB', 'SEVA & INTEGRITY') },
  { name: 'logo-sanjhivalta.png', svg: createSVG(300, 300, ['#1E1B4B', '#312E81', '#4338CA'], 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ', 'PUNJAB SANJHIVATLA DAL', 'UNITY & HARMONY') },
  { name: 'logo-welfare.png', svg: createSVG(300, 300, ['#064E3B', '#047857', '#059669'], 'ਸਮਾਜ ਭਲਾਈ ਮਿਸ਼ਨ', 'COMMUNITY WELFARE', 'HEALTH & EDUCATION') },
  { name: 'logo-khushinder.png', svg: createSVG(300, 300, ['#78350F', '#B45309', '#D97706'], 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ', 'KHUSHINDER SINGH JAND SAHIB', 'GRASSROOTS LEADER') },
  { name: 'logo-sports.png', svg: createSVG(300, 300, ['#831843', '#BE185D', '#DB2777'], 'ਪੰਜਾਬ ਯੂਥ ਸਪੋਰਟਸ', 'YOUTH & ATHLETICS', 'FIT & DRUG FREE PUNJAB') },

  // Profiles
  { name: 'khushinder-hero.png', svg: createSVG(800, 900, ['#0B192C', '#1B2A4A', '#060D17'], 'Sardar Khushinder Singh', 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ', 'SOCIAL WORKER & LEADER') },
  { name: 'khushinder-profile.png', svg: createSVG(600, 600, ['#0B192C', '#1E293B', '#334E68'], 'S. Khushinder Singh', 'Jand Sahib, Punjab', 'COMMUNITY SERVICE') },

  // Hero Slides
  { name: 'hero-1.jpg', svg: createSVG(1920, 1080, ['#060D17', '#0B192C', '#1E293B'], 'Dedicated to the People of Punjab', 'ਲੋਕ ਸੇਵਾ ਨੂੰ ਸਮਰਪਿਤ, ਜ਼ਮੀਨ ਨਾਲ ਜੁੜੀ ਆਵਾਜ਼', 'SARDAR KHUSHINDER SINGH JAND SAHIB') },
  { name: 'hero-2.jpg', svg: createSVG(1920, 1080, ['#1E1B4B', '#0B192C', '#312E81'], 'Empowering Youth & Rural Healthcare', 'ਪੇਂਡੂ ਸਿਹਤ ਸੇਵਾਵਾਂ ਅਤੇ ਨੌਜਵਾਨਾਂ ਦੀ ਬਿਹਤਰੀ ਲਈ ਯਤਨਸ਼ੀਲ', 'VILLAGE HEALTH CAMPS & SPORTS') },
  { name: 'hero-3.jpg', svg: createSVG(1920, 1080, ['#042F2E', '#0B192C', '#115E59'], 'Punjab Sanjhivalta Dal: Harmony & Progress', 'ਪੰਜਾਬ ਦੀ ਭਾਈਚਾਰਕ ਸਾਂਝ ਤੇ ਖੁਸ਼ਹਾਲੀ ਦਾ ਸੰਕਲਪ', 'FAIR GOVERNANCE & FARMER SOLIDARITY') },

  // Blogs
  { name: 'blog-health-camp.jpg', svg: createSVG(1200, 700, ['#0F172A', '#1E3A8A', '#1E40AF'], 'Mega Medical & Eye Camp Jand Sahib', '850+ Rural Patients Screened & Treated Free', 'HEALTHCARE INITIATIVE') },
  { name: 'blog-sports-cup.jpg', svg: createSVG(1200, 700, ['#312E81', '#4338CA', '#6366F1'], 'Annual Rural Kabaddi & Volleyball Cup', '32 Village Teams Participated with High Spirit', 'YOUTH & SPORTS') },
  { name: 'blog-farmer-delegation.jpg', svg: createSVG(1200, 700, ['#78350F', '#92400E', '#B45309'], 'Canal Water Delegation Meets Administration', 'Restoring Irrigation Water Supply to Tail End Villages', 'FARMER ADVOCACY') },
  { name: 'blog-tree-plantation.jpg', svg: createSVG(1200, 700, ['#064E3B', '#065F46', '#047857'], 'Green Punjab Plantation Campaign', '5,000+ Native Trees Planted with Village Community', 'ENVIRONMENTAL CARE') },

  // Social Posts
  { name: 'fb-post-1.jpg', svg: createSVG(800, 800, ['#1877F2', '#0C53B7', '#0A397E'], 'Medical Camp Highlights | Jand Sahib', 'ਸਿਹਤ ਕੈਂਪ ਦੀਆਂ ਮੁੱਖ ਝਲਕੀਆਂ', 'FACEBOOK OFFICIAL UPDATE') },
  { name: 'fb-post-2.jpg', svg: createSVG(800, 800, ['#0F172A', '#1E293B', '#334155'], 'Farmer Delegation Sabha', 'ਕਿਸਾਨ-ਮਜ਼ਦੂਰ ਏਕਤਾ ਅਤੇ ਨਹਿਰੀ ਪਾਣੀ ਮੀਟਿੰਗ', 'FACEBOOK OFFICIAL UPDATE') },
  { name: 'ig-post-1.jpg', svg: createSVG(800, 800, ['#833AB4', '#FD1D1D', '#FCB045'], 'Open Gyms & Youth Sports In Punjab', 'ਨੌਜਵਾਨੀ ਨੂੰ ਖੇਡ ਮੈਦਾਨਾਂ ਨਾਲ ਜੋੜਨ ਦਾ ਉਪਰਾਲਾ', 'INSTAGRAM OFFICIAL REEL/POST') },
  { name: 'ig-post-2.jpg', svg: createSVG(800, 800, ['#059669', '#10B981', '#34D399'], 'Green Village Initiative', 'ਰੁੱਖ ਲਗਾਓ, ਵਾਤਾਵਰਣ ਬਚਾਓ ਮੁਹਿੰਮ', 'INSTAGRAM OFFICIAL POST') },

  // Gallery
  { name: 'gallery-health-1.jpg', svg: createSVG(1000, 750, ['#0F172A', '#1E3A8A', '#0284C7'], 'Eye Diagnostic Screening for Elders', 'ਬਜ਼ੁਰਗਾਂ ਲਈ ਅੱਖਾਂ ਦੀ ਜਾਂਚ', 'VILLAGE HEALTH CAMP') },
  { name: 'gallery-health-2.jpg', svg: createSVG(1000, 750, ['#0F172A', '#0369A1', '#0EA5E9'], 'Free Medicine Counter Distribution', 'ਮੁਫ਼ਤ ਦਵਾਈਆਂ ਵੰਡ ਕਾਊਂਟਰ', 'HEALTH SERVICE') },
  { name: 'gallery-sports-1.jpg', svg: createSVG(1000, 750, ['#312E81', '#4F46E5', '#6366F1'], 'Inauguration of Volleyball Cup', 'ਵਾਲੀਬਾਲ ਟੂਰਨਾਮੈਂਟ ਉਦਘਾਟਨ', 'SPORTS FESTIVAL') },
  { name: 'gallery-sports-2.jpg', svg: createSVG(1000, 750, ['#701A75', '#A21CAF', '#C026D3'], 'Trophy Presentation Ceremony', 'ਜੇਤੂ ਟੀਮ ਨੂੰ ਟਰਾਫ਼ੀ ਭੇਟ', 'CHAMPIONS AWARD') },

  // Ads
  { name: 'ad-blood-donation.jpg', svg: createSVG(1200, 400, ['#991B1B', '#B91C1C', '#DC2626'], 'Mega Blood Donation Camp', 'Sunday, 10:00 AM at Community Center Jand Sahib', 'SAVE A LIFE - DONATE BLOOD') },
  { name: 'ad-green-punjab.jpg', svg: createSVG(400, 600, ['#064E3B', '#065F46', '#059669'], 'Adopt A Tree Today', 'Join Sardar Khushinder Singh in Green Punjab Mission', 'ENVIRONMENT AWARENESS') },
];

for (const a of assets) {
  const filePath = path.join(targetDir, a.name);
  fs.writeFileSync(filePath, a.svg, 'utf8');
}

console.log(`Generated ${assets.length} SVG visual assets in public/images!`);
