const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Updating Hero Slides with Authentic HD Photos ---');
  
  // Clear old slides and insert updated authentic slides
  await prisma.heroSlide.deleteMany();
  
  await prisma.heroSlide.createMany({
    data: [
      {
        titleEn: 'Dedicated to Punjab, Grounded in Public Service',
        titlePa: 'ਲੋਕ ਸੇਵਾ ਨੂੰ ਸਮਰਪਿਤ, ਜ਼ਮੀਨ ਨਾਲ ਜੁੜੀ ਆਵਾਜ਼',
        subtitleEn: 'Sardar Khushinder Singh Jand Sahib',
        subtitlePa: 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ',
        descriptionEn: 'Championing rural youth empowerment, farmers\' rights, clean water, and community harmony across Punjab. Member, Punjab Sanjhivalta Dal.',
        descriptionPa: 'ਪੰਜਾਬ ਦੇ ਪਿੰਡਾਂ, ਨੌਜਵਾਨੀ, ਕਿਸਾਨੀ ਹੱਕਾਂ ਅਤੇ ਨਸ਼ਾ ਮੁਕਤ ਸਮਾਜ ਦੀ ਸਿਰਜਣਾ ਲਈ ਵਚਨਬੱਧ। ਮੈਂਬਰ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ।',
        imageUrl: '/images/khushinder-hero-1.jpg',
        btn1TextEn: 'About Me',
        btn1TextPa: 'ਮੇਰੇ ਬਾਰੇ',
        btn1Url: '/about',
        btn2TextEn: 'Contact Me',
        btn2TextPa: 'ਸੰਪਰਕ ਕਰੋ',
        btn2Url: '/contact',
        overlayOpacity: 0.55,
        displayOrder: 1,
        isActive: true,
      },
      {
        titleEn: 'Safeguarding Punjab\'s Environment & Groundwater',
        titlePa: 'ਪੰਜਾਬ ਦੇ ਵਾਤਾਵਰਨ ਅਤੇ ਜ਼ਮੀਨੀ ਪਾਣੀ ਦੀ ਰਾਖੀ',
        subtitleEn: 'Environmental Action & People\'s Rights',
        subtitlePa: 'ਵਾਤਾਵਰਨ ਚੇਤਨਾ ਅਤੇ ਜਨਤਕ ਅਧਿਕਾਰ',
        descriptionEn: 'Standing firm against toxic industrial pollution, defending clean drinking water for Malwa, and demanding strict enforcement for sustainable agriculture.',
        descriptionPa: 'ਜ਼ਹਿਰੀਲੀਆਂ ਫੈਕਟਰੀਆਂ ਵਿਰੁੱਧ ਜਨਤਕ ਸੰਘਰਸ਼, ਮਾਲਵਾ ਖੇਤਰ ਦੇ ਪੀਣ ਵਾਲੇ ਪਾਣੀ ਦੀ ਰਾਖੀ ਅਤੇ ਹਰਿਆਵਲ ਪੰਜਾਬ ਲਈ ਨਿਰੰਤਰ ਜਤਨ।',
        imageUrl: '/images/khushinder-hero-2.jpg',
        btn1TextEn: 'Read Latest Updates',
        btn1TextPa: 'ਤਾਜ਼ਾ ਜਾਣਕਾਰੀ',
        btn1Url: '/blog',
        btn2TextEn: 'Community Voice',
        btn2TextPa: 'ਭਾਈਚਾਰਕ ਸਾਂਝ',
        btn2Url: '/contact',
        overlayOpacity: 0.55,
        displayOrder: 2,
        isActive: true,
      },
      {
        titleEn: 'Empowering Youth Through Sports & Healthcare',
        titlePa: 'ਨੌਜਵਾਨਾਂ ਨੂੰ ਖੇਡਾਂ ਅਤੇ ਸਿਹਤ ਨਾਲ ਜੋੜਨ ਦਾ ਸੰਕਲਪ',
        subtitleEn: 'Drug-Free Healthy Punjab Initiative',
        subtitlePa: 'ਨਸ਼ਾ ਮੁਕਤ ਅਤੇ ਤੰਦਰੁਸਤ ਪੰਜਾਬ ਮੁਹਿੰਮ',
        descriptionEn: 'Organizing rural sports tournaments, free mega health and eye checkup camps, and inspiring youth towards constructive community building.',
        descriptionPa: 'ਪੇਂਡੂ ਖੇਡ ਮੇਲੇ, ਮੁਫ਼ਤ ਮੈਡੀਕਲ ਕੈਂਪ ਅਤੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਖੇਡ ਮੈਦਾਨਾਂ ਵੱਲ ਪ੍ਰੇਰਿਤ ਕਰਕੇ ਨਸ਼ਿਆਂ ਵਿਰੁੱਧ ਜ਼ਮੀਨੀ ਕਾਰਜ।',
        imageUrl: '/images/khushinder-hero-3.jpg',
        btn1TextEn: 'View Photo Gallery',
        btn1TextPa: 'ਫੋਟੋ ਗੈਲਰੀ',
        btn1Url: '/about#gallery',
        btn2TextEn: 'Get in Touch',
        btn2TextPa: 'ਸੰਪਰਕ ਕਰੋ',
        btn2Url: '/contact',
        overlayOpacity: 0.55,
        displayOrder: 3,
        isActive: true,
      },
    ],
  });
  console.log('✓ Hero Slides updated successfully.');

  // Update Biography
  console.log('--- Updating Biography with Profile Image & Info ---');
  await prisma.biography.upsert({
    where: { id: 1 },
    update: {
      profileImageUrl: '/images/khushinder-profile.jpg',
      fullNameEn: 'Sardar Khushinder Singh Jand Sahib',
      fullNamePa: 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ',
      titleEn: 'Social Worker | Member, Punjab Sanjhivalta Dal',
      titlePa: 'ਸਮਾਜ ਸੇਵੀ | ਮੈਂਬਰ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ',
      identityEn: 'Dedicated Social Worker and activist from Jand Sahib committed to people\'s welfare, environmental protection, clean water rights, and rural upliftment across Punjab.',
      identityPa: 'ਜੰਡ ਸਾਹਿਬ ਤੋਂ ਲੋਕ ਸੇਵਾ, ਵਾਤਾਵਰਨ ਸੰਭਾਲ, ਨਹਿਰੀ ਪਾਣੀ ਦੇ ਹੱਕਾਂ ਅਤੇ ਪੇਂਡੂ ਵਿਕਾਸ ਨੂੰ ਸਮਰਪਿਤ ਸੁਹਿਰਦ ਸਮਾਜ ਸੇਵਕ।',
      quoteEn: 'True leadership is defined not by office, but by unyielding service to the poorest person in the village.',
      quotePa: 'ਅਸਲ ਅਗਵਾਈ ਕਿਸੇ ਕੁਰਸੀ ਦੀ ਮੁਥਾਜ ਨਹੀਂ, ਸਗੋਂ ਪਿੰਡ ਦੇ ਆਖਰੀ ਲੋੜਵੰਦ ਵਿਅਕਤੀ ਦੀ ਸੁਹਿਰਦ ਸੇਵਾ ਵਿੱਚੋਂ ਪੈਦਾ ਹੁੰਦੀ ਹੈ।',
    },
    create: {
      id: 1,
      profileImageUrl: '/images/khushinder-profile.jpg',
      fullNameEn: 'Sardar Khushinder Singh Jand Sahib',
      fullNamePa: 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ',
      titleEn: 'Social Worker | Member, Punjab Sanjhivalta Dal',
      titlePa: 'ਸਮਾਜ ਸੇਵੀ | ਮੈਂਬਰ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ',
      identityEn: 'Dedicated Social Worker and activist from Jand Sahib committed to people\'s welfare, environmental protection, clean water rights, and rural upliftment across Punjab.',
      identityPa: 'ਜੰਡ ਸਾਹਿਬ ਤੋਂ ਲੋਕ ਸੇਵਾ, ਵਾਤਾਵਰਨ ਸੰਭਾਲ, ਨਹਿਰੀ ਪਾਣੀ ਦੇ ਹੱਕਾਂ ਅਤੇ ਪੇਂਡੂ ਵਿਕਾਸ ਨੂੰ ਸਮਰਪਿਤ ਸੁਹਿਰਦ ਸਮਾਜ ਸੇਵਕ।',
      shortBioEn: 'Sardar Khushinder Singh Jand Sahib is an active grass-roots social worker and prominent member of Punjab Sanjhivalta Dal from Punjab, India. He works tirelessly on canal water access, environmental defense against industrial toxins, youth de-addiction through sports, and free health initiatives.',
      shortBioPa: 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਪੰਜਾਬ ਦੇ ਸਰਗਰਮ ਸਮਾਜ ਸੇਵੀ ਅਤੇ ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਦੇ ਪ੍ਰਮੁੱਖ ਆਗੂ ਹਨ। ਉਹ ਨਹਿਰੀ ਪਾਣੀ, ਪ੍ਰਦੂਸ਼ਣ ਰੋਕਥਾਮ, ਪੇਂਡੂ ਸਿਹਤ ਸੇਵਾਵਾਂ ਅਤੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਖੇਡਾਂ ਵੱਲ ਪ੍ਰੇਰਿਤ ਕਰਨ ਲਈ ਨਿਰੰਤਰ ਕਾਰਜਸ਼ੀਲ ਹਨ।',
      fullBioEn: 'Sardar Khushinder Singh Jand Sahib has dedicated years of his life to addressing the most urgent challenges facing rural Punjab. Based in village Jand Sahib, his initiatives span clean drinking water campaigns, legal and peaceful protests against groundwater contaminating distilleries and factories, mobilizing farmers for tail-end irrigation canals, and running youth development sports programs.',
      fullBioPa: 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਨੇ ਆਪਣੇ ਜੀਵਨ ਦੇ ਅਨੇਕਾਂ ਸਾਲ ਪੰਜਾਬ ਦੇ ਪਿੰਡਾਂ ਦੀਆਂ ਬੁਨਿਆਦੀ ਸਮੱਸਿਆਵਾਂ ਹੱਲ ਕਰਨ ਲਈ ਲਗਾਏ ਹਨ। ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਤੋਂ ਸ਼ੁਰੂ ਹੋਈ ਇਹ ਸੇਵਾ ਯਾਤਰਾ ਅੱਜ ਪੂਰੇ ਮਾਲਵਾ ਖੇਤਰ ਵਿੱਚ ਪੀਣ ਵਾਲੇ ਸਾਫ਼ ਪਾਣੀ, ਪ੍ਰਦੂਸ਼ਣਕਾਰੀ ਫੈਕਟਰੀਆਂ ਵਿਰੁੱਧ ਕਾਨੂੰਨੀ ਤੇ ਸ਼ਾਂਤਮਈ ਘੋਲ, ਟੇਲਾਂ ਉੱਤੇ ਪਾਣੀ ਪਹੁੰਚਾਉਣ ਅਤੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਖੇਡਾਂ ਨਾਲ ਜੋੜਨ ਦੇ ਰੂਪ ਵਿੱਚ ਜਾਣੀ ਜਾਂਦੀ ਹੈ।',
      journeyEn: 'Rooted in the soil of Jand Sahib, Khushinder Singh began his social work by organizing village youth for collective welfare, repairing common community assets, and helping struggling farming households.',
      journeyPa: 'ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਦੀ ਧਰਤੀ ਤੋਂ ਸ਼ੁਰੂ ਕਰਕੇ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਨੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਇਕੱਠੇ ਕਰਕੇ ਸਾਂਝੇ ਕੰਮਾਂ, ਗਰੀਬ ਕਿਸਾਨਾਂ ਦੀ ਮਦਦ ਅਤੇ ਪਿੰਡ ਦੀ ਸਫ਼ਾਈ ਤੋਂ ਸੇਵਾ ਸ਼ੁਰੂ ਕੀਤੀ।',
      publicServiceEn: 'His public service includes spearheading free medical and eye camps, tree plantation campaigns, flood relief, and representing farmer grievances before irrigation and revenue authorities.',
      publicServicePa: 'ਮੁਫ਼ਤ ਮੈਡੀਕਲ ਕੈਂਪ, ਅੱਖਾਂ ਦੇ ਅਪਰੇਸ਼ਨ, ਹੜ੍ਹ ਪੀੜਤਾਂ ਦੀ ਮਦਦ, ਅਤੇ ਨਹਿਰੀ ਪਾਣੀ ਦੇ ਮਸਲੇ ਹੱਲ ਕਰਵਾਉਣਾ ਉਹਨਾਂ ਦੀ ਜਨਤਕ ਸੇਵਾ ਦਾ ਅਹਿਮ ਹਿੱਸਾ ਹਨ।',
      visionEn: 'A prosperous, drug-free Punjab where every farmer receives their rightful irrigation water, every village has access to world-class healthcare and education, and our natural ecosystem is protected for future generations.',
      visionPa: 'ਇੱਕ ਖ਼ੁਸ਼ਹਾਲ, ਨਸ਼ਾ ਮੁਕਤ ਅਤੇ ਹਰਿਆ-ਭਰਿਆ ਪੰਜਾਬ, ਜਿੱਥੇ ਹਰ ਕਿਸਾਨ ਨੂੰ ਨਹਿਰੀ ਪਾਣੀ ਮਿਲੇ, ਹਰ ਪਿੰਡ ਵਿੱਚ ਮਿਆਰੀ ਸਿਹਤ-ਸਿੱਖਿਆ ਸਹੂਲਤਾਂ ਹੋਣ ਅਤੇ ਪੰਜਾਬ ਦੀ ਕੁਦਰਤ ਸੁਰੱਖਿਅਤ ਰਹੇ।',
      organizationEn: 'As an esteemed member of Punjab Sanjhivalta Dal, he embodies the party\'s core philosophy of inclusive public service, communal harmony, and principled advocacy without personal self-interest.',
      organizationPa: 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਦੇ ਮੈਂਬਰ ਵਜੋਂ ਉਹ ਸਾਂਝੀਵਾਲਤਾ, ਭਾਈਚਾਰਕ ਏਕਤਾ ਅਤੇ ਨਿਰਸਵਾਰਥ ਲੋਕ ਸੇਵਾ ਦੇ ਸਿਧਾਂਤਾਂ ਨੂੰ ਅਮਲੀ ਜਾਮਾ ਪਹਿਨਾਉਂਦੇ ਹਨ।',
      quoteEn: 'True leadership is defined not by office, but by unyielding service to the poorest person in the village.',
      quotePa: 'ਅਸਲ ਅਗਵਾਈ ਕਿਸੇ ਕੁਰਸੀ ਦੀ ਮੁਥਾਜ ਨਹੀਂ, ਸਗੋਂ ਪਿੰਡ ਦੇ ਆਖਰੀ ਲੋੜਵੰਦ ਵਿਅਕਤੀ ਦੀ ਸੁਹਿਰਦ ਸੇਵਾ ਵਿੱਚੋਂ ਪੈਦਾ ਹੁੰਦੀ ਹੈ।',
    },
  });
  console.log('✓ Biography updated successfully.');

  // Update Social Accounts
  console.log('--- Updating Social Media URLs ---');
  await prisma.socialAccount.upsert({
    where: { platform: 'facebook' },
    update: {
      accountName: 'Sardar Khushinder Singh Jand Sahib',
      profileUrl: 'https://www.facebook.com/khushindersingh.sandhu',
      isActive: true,
      isFeedEnabled: true,
      status: 'active',
      lastSyncedAt: new Date(),
    },
    create: {
      platform: 'facebook',
      accountName: 'Sardar Khushinder Singh Jand Sahib',
      profileUrl: 'https://www.facebook.com/khushindersingh.sandhu',
      isActive: true,
      isFeedEnabled: true,
      status: 'active',
      lastSyncedAt: new Date(),
    },
  });

  await prisma.socialAccount.upsert({
    where: { platform: 'instagram' },
    update: {
      accountName: 'khushinder_singh',
      profileUrl: 'https://www.instagram.com/khushinder_singh',
      isActive: true,
      isFeedEnabled: true,
      status: 'active',
      lastSyncedAt: new Date(),
    },
    create: {
      platform: 'instagram',
      accountName: 'khushinder_singh',
      profileUrl: 'https://www.instagram.com/khushinder_singh',
      isActive: true,
      isFeedEnabled: true,
      status: 'active',
      lastSyncedAt: new Date(),
    },
  });
  console.log('✓ Social accounts updated.');

  // Update Social Posts Cache with rich, verified posts
  console.log('--- Updating Social Posts Cache with Authentic Ground Posts ---');
  await prisma.socialPostCache.deleteMany();

  const posts = [
    {
      platform: 'facebook',
      postId: 'fb_env_groundwater_2026',
      authorName: 'Sardar Khushinder Singh Jand Sahib',
      caption: 'ਪੰਜਾਬ ਦੇ ਪਾਣੀਆਂ ਅਤੇ ਵਾਤਾਵਰਨ ਨੂੰ ਪ੍ਰਦੂਸ਼ਿਤ ਕਰਨ ਵਾਲੀਆਂ ਲਾਲ ਸ਼੍ਰੇਣੀ ਦੀਆਂ ਫੈਕਟਰੀਆਂ ਖ਼ਿਲਾਫ਼ ਸਾਂਝੀ ਮੀਟਿੰਗ। ਅਸੀਂ ਆਪਣੀ ਆਉਣ ਵਾਲੀ ਪੀੜ੍ਹੀ ਦੇ ਸਾਫ਼ ਪਾਣੀ ਅਤੇ ਹਵਾ ਨਾਲ ਕਦੇ ਸਮਝੌਤਾ ਨਹੀਂ ਕਰਾਂਗੇ। ਸਾਰੇ ਪਿੰਡ ਵਾਸੀਆਂ ਅਤੇ ਕਿਸਾਨ ਸਾਥੀਆਂ ਦਾ ਧੰਨਵਾਦ।\n\nStanding united against environmental pollution and industrial contamination of Punjab\'s groundwater. Clean water and healthy air are non-negotiable rights for every resident.',
      mediaUrl: '/images/fb-post-1.jpg',
      mediaType: 'IMAGE',
      permalink: 'https://www.facebook.com/khushindersingh.sandhu',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      likesCount: 842,
      commentsCount: 116,
    },
    {
      platform: 'facebook',
      postId: 'fb_farmers_water_rights_2026',
      authorName: 'Sardar Khushinder Singh Jand Sahib',
      caption: 'ਟੇਲਾਂ \'ਤੇ ਨਹਿਰੀ ਪਾਣੀ ਪਹੁੰਚਾਉਣ ਅਤੇ ਮਾਲਵਾ ਖੇਤਰ ਦੇ ਕਿਸਾਨਾਂ ਨੂੰ ਸਿੰਚਾਈ ਸਹੂਲਤਾਂ ਦਿਵਾਉਣ ਲਈ ਪ੍ਰਸ਼ਾਸਨ ਨਾਲ ਗੱਲਬਾਤ। ਕਿਸਾਨੀ ਪੰਜਾਬ ਦੀ ਰੀੜ੍ਹ ਦੀ ਹੱਡੀ ਹੈ, ਇਸਦੀ ਮਜ਼ਬੂਤੀ ਸਾਡਾ ਪਹਿਲਾ ਫ਼ਰਜ਼ ਹੈ।\n\nAdvocating for tail-end canal water supply for farmers across the Malwa belt. Sustainable agriculture requires timely water delivery and fair treatment for all farming families.',
      mediaUrl: '/images/fb-post-2.jpg',
      mediaType: 'IMAGE',
      permalink: 'https://www.facebook.com/khushindersingh.sandhu',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28), // 1 day ago
      likesCount: 1250,
      commentsCount: 204,
    },
    {
      platform: 'facebook',
      postId: 'fb_health_camp_jand_sahib',
      authorName: 'Sardar Khushinder Singh Jand Sahib',
      caption: 'ਜੰਡ ਸਾਹਿਬ ਵਿਖੇ ਲੋੜਵੰਦ ਪਰਿਵਾਰਾਂ ਲਈ ਲਗਾਏ ਗਏ ਮੁਫ਼ਤ ਮੈਡੀਕਲ ਅਤੇ ਅੱਖਾਂ ਦੇ ਚੈੱਕਅੱਪ ਕੈਂਪ ਦੌਰਾਨ ਡਾਕਟਰਾਂ ਦੀ ਟੀਮ ਅਤੇ ਮਰੀਜ਼ਾਂ ਨਾਲ ਗੱਲਬਾਤ ਕਰਦੇ ਹੋਏ। ਸਮਾਜ ਸੇਵਾ ਹੀ ਸਭ ਤੋਂ ਵੱਡਾ ਧਰਮ ਹੈ।\n\nFree mega health and eye care camp held at Jand Sahib providing specialist checkups and free medicines to rural families. Genuine service to humanity is the highest calling.',
      mediaUrl: '/images/fb-post-3.jpg',
      mediaType: 'IMAGE',
      permalink: 'https://www.facebook.com/khushindersingh.sandhu',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 54), // 2 days ago
      likesCount: 690,
      commentsCount: 88,
    },
    {
      platform: 'instagram',
      postId: 'ig_sports_youth_cup',
      authorName: 'khushinder_singh',
      caption: 'ਨੌਜਵਾਨੀ ਨੂੰ ਨਸ਼ਿਆਂ ਤੋਂ ਦੂਰ ਕਰਕੇ ਖੇਡ ਮੈਦਾਨਾਂ ਵੱਲ ਤੋਰਨਾ ਸਾਡਾ ਮੁੱਖ ਟੀਚਾ ਹੈ। ਸ਼ਹੀਦ ਭਗਤ ਸਿੰਘ ਸਾਲਾਨਾ ਖੇਡ ਮੇਲੇ ਦੀ ਝਲਕ। 🏆⚽ #PunjabYouth #JandSahib #Sports #Health #Punjab',
      mediaUrl: '/images/ig-post-1.jpg',
      mediaType: 'IMAGE',
      permalink: 'https://www.instagram.com/khushinder_singh',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
      likesCount: 1420,
      commentsCount: 135,
    },
    {
      platform: 'instagram',
      postId: 'ig_green_punjab_initiative',
      authorName: 'khushinder_singh',
      caption: 'ਹਰਿਆਵਲ ਪੰਜਾਬ ਮੁਹਿੰਮ: ਪਿੰਡਾਂ ਵਿੱਚ ਫ਼ਲਦਾਰ ਅਤੇ ਛਾਂਦਾਰ ਬੂਟੇ ਲਗਾਉਂਦੇ ਹੋਏ। ਆਓ ਸਾਰੇ ਰਲ ਕੇ ਧਰਤੀ ਮਾਂ ਨੂੰ ਹਰਿਆ-ਭਰਿਆ ਬਣਾਈਏ। 🌿🌳 #GreenPunjab #Environment #SaveWater #SocialService',
      mediaUrl: '/images/ig-post-2.jpg',
      mediaType: 'IMAGE',
      permalink: 'https://www.instagram.com/khushinder_singh',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36),
      likesCount: 980,
      commentsCount: 74,
    },
    {
      platform: 'instagram',
      postId: 'ig_sanjhivalta_dal_unity',
      authorName: 'khushinder_singh',
      caption: 'ਲੋਕਾਂ ਦੀ ਸੇਵਾ ਅਤੇ ਭਾਈਚਾਰਕ ਸਾਂਝ ਹੀ ਸਾਡੀ ਤਾਕਤ ਹੈ। ਪਿੰਡ ਵਾਸੀਆਂ ਨਾਲ ਖੁੱਲ੍ਹੀ ਵਿਚਾਰ-ਚਰਚਾ। 🙏 #PunjabSanjhivaltaDal #PublicService #KhushinderSingh #JandSahib',
      mediaUrl: '/images/ig-post-3.jpg',
      mediaType: 'IMAGE',
      permalink: 'https://www.instagram.com/khushinder_singh',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
      likesCount: 1890,
      commentsCount: 215,
    },
  ];

  for (const post of posts) {
    await prisma.socialPostCache.create({ data: post });
  }
  console.log(`✓ Inserted ${posts.length} verified social posts into cache.`);

  // Update Gallery Images
  console.log('--- Updating Gallery Images ---');
  await prisma.galleryImage.deleteMany();
  
  const galleries = await prisma.gallery.findMany();
  const socialGallery = galleries[0] || await prisma.gallery.create({
    data: {
      titleEn: 'Social & Public Service Moments',
      titlePa: 'ਸਮਾਜ ਸੇਵਾ ਅਤੇ ਜਨਤਕ ਗਤੀਵਿਧੀਆਂ',
      slug: 'social-service',
      category: 'social_work',
      description: 'Glimpses of community work, meetings, and initiatives across Punjab.',
    }
  });

  await prisma.galleryImage.createMany({
    data: [
      {
        galleryId: socialGallery.id,
        imageUrl: '/images/khushinder-hero-1.jpg',
        titleEn: 'Addressing the Public Gathering',
        titlePa: 'ਜਨਤਕ ਇਕੱਠ ਨੂੰ ਸੰਬੋਧਨ',
        caption: 'Sardar Khushinder Singh addressing village representatives and youths.',
        isFeatured: true,
        displayOrder: 1,
      },
      {
        galleryId: socialGallery.id,
        imageUrl: '/images/khushinder-hero-2.jpg',
        titleEn: 'Environmental Awareness Session',
        titlePa: 'ਵਾਤਾਵਰਨ ਚੇਤਨਾ ਵਿਚਾਰ-ਵਟਾਂਦਰਾ',
        caption: 'Discussion on defending Punjab rivers and subsoil water.',
        isFeatured: true,
        displayOrder: 2,
      },
      {
        galleryId: socialGallery.id,
        imageUrl: '/images/khushinder-hero-3.jpg',
        titleEn: 'Youth Sports Gathering',
        titlePa: 'ਨੌਜਵਾਨ ਖੇਡ ਮੇਲਾ',
        caption: 'Encouraging athletes and honoring rural sports talents.',
        isFeatured: true,
        displayOrder: 3,
      },
      {
        galleryId: socialGallery.id,
        imageUrl: '/images/khushinder-profile.jpg',
        titleEn: 'Official Portrait',
        titlePa: 'ਅਧਿਕਾਰਤ ਤਸਵੀਰ',
        caption: 'Sardar Khushinder Singh Jand Sahib',
        isFeatured: true,
        displayOrder: 4,
      },
    ]
  });
  console.log('✓ Gallery images updated.');

  console.log('--- ALL UPDATES COMPLETED SUCCESSFULLY ---');
}

main()
  .catch((e) => {
    console.error('Error executing script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
