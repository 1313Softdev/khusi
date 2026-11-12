const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seed() {
  console.log('Seeding initial data for Sardar Khushinder Singh Jand Sahib website...');

  // 1. Roles
  const adminRole = await prisma.role.upsert({
    where: { slug: 'admin' },
    update: {},
    create: {
      name: 'Administrator',
      slug: 'admin',
      description: 'Full administrative access to all modules and configurations',
    },
  });

  const editorRole = await prisma.role.upsert({
    where: { slug: 'editor' },
    update: {},
    create: {
      name: 'Editor',
      slug: 'editor',
      description: 'Access to blogs, gallery and media updates',
    },
  });

  // 2. Demo Admin User
  const passwordHash = await bcrypt.hash('Admin@12345', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@khushindersingh.org' },
    update: { passwordHash },
    create: {
      email: 'admin@khushindersingh.org',
      fullName: 'Sardar Khushinder Singh Jand Sahib',
      passwordHash: passwordHash,
      phone: '+91 98765 43210',
      avatar: '/images/khushinder-profile.png',
      roleId: adminRole.id,
      isActive: true,
    },
  });
  console.log('✓ Admin user verified: admin@khushindersingh.org (Password: Admin@12345)');

  // 3. Website Settings
  await prisma.websiteSetting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      siteName: 'Sardar Khushinder Singh Jand Sahib',
      siteTitle: 'Official Portal | Social Worker & Member of Punjab Sanjhivalta Dal',
      siteDescription: 'Dedicated to community welfare, rural empowerment, education, youth development, and social harmony across Punjab.',
      faviconUrl: '/images/logo-emblem.png',
      mainLogoUrl: '/images/logo-main.png',
      footerLogoUrl: '/images/logo-footer.png',
      contactEmail: 'contact@khushindersingh.org',
      contactPhone: '+91 98765 43210',
      contactAddress: 'Village Jand Sahib, District Sri Muktsar Sahib / Bathinda Belt, Punjab 152026, India',
      whatsappNumber: '+919876543210',
      primaryColor: '#0B192C',
      secondaryColor: '#1B2A4A',
      accentColor: '#F59E0B',
      defaultLanguage: 'en',
      allowLanguageToggle: true,
      punjabiFirst: false,
      copyrightText: '© 2026 Sardar Khushinder Singh Jand Sahib. Member, Punjab Sanjhivalta Dal. All Rights Reserved.',
    },
  });

  // 4. Biography
  await prisma.biography.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      fullNameEn: 'Sardar Khushinder Singh Jand Sahib',
      fullNamePa: 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ',
      titleEn: 'Social Worker & Member of Punjab Sanjhivalta Dal',
      titlePa: 'ਸਮਾਜ ਸੇਵੀ ਅਤੇ ਮੈਂਬਰ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ',
      identityEn: 'A devoted grassroots leader and social worker from Jand Sahib, committed to the welfare of rural communities, farmer issues, youth development, and preserving the social fabric of Punjab.',
      identityPa: 'ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਤੋਂ ਉੱਠ ਕੇ ਲੋਕ ਸੇਵਾ ਨੂੰ ਸਮਰਪਿਤ ਸੁਹਿਰਦ ਆਗੂ, ਜੋ ਕਿਸਾਨੀ ਹਿੱਤਾਂ, ਨੌਜਵਾਨਾਂ ਦੀ ਸਿੱਖਿਆ ਅਤੇ ਪੰਜਾਬ ਦੀ ਭਾਈਚਾਰਕ ਸਾਂਝ ਲਈ ਨਿਰੰਤਰ ਯਤਨਸ਼ੀਲ ਹਨ।',
      profileImageUrl: '/images/khushinder-hero.png',
      shortBioEn: 'Sardar Khushinder Singh Jand Sahib is an active social activist and respected member of the Punjab Sanjhivalta Dal. For over a decade, he has led community welfare projects, rural healthcare camps, educational aid for underprivileged students, and youth sports initiatives across rural Punjab.',
      shortBioPa: 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਇੱਕ ਨਿਧੜਕ ਸਮਾਜ ਸੇਵੀ ਅਤੇ ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਦੇ ਸਰਗਰਮ ਮੈਂਬਰ ਹਨ। ਉਹਨਾਂ ਨੇ ਪਿਛਲੇ ਇੱਕ ਦਹਾਕੇ ਤੋਂ ਪੇਂਡੂ ਸਿਹਤ ਕੈਂਪ, ਲੋੜਵੰਦ ਬੱਚਿਆਂ ਦੀ ਪੜ੍ਹਾਈ ਵਿੱਚ ਮਦਦ, ਖੇਡ ਮੇਲੇ ਅਤੇ ਪਿੰਡਾਂ ਵਿੱਚ ਆਪਸੀ ਭਾਈਚਾਰਾ ਮਜ਼ਬੂਤ ਕਰਨ ਲਈ ਵੱਡਮੁੱਲਾ ਯੋਗਦਾਨ ਪਾਇਆ ਹੈ।',
      fullBioEn: `Sardar Khushinder Singh Jand Sahib was born and brought up in the historic soil of Jand Sahib in Punjab. From an early age, he witnessed firsthand the everyday challenges faced by agricultural families, rural youth, and working-class citizens in Punjab.\n\nDriven by the spirit of *Sarbat da Bhala* (welfare of all), Khushinder Singh dedicated himself to ground-level social work. Rather than staying confined to rhetoric, he actively organized volunteer brigades for natural calamity relief, initiated free medical check-up camps with specialist doctors in remote villages, and championed community sports clubs to channel youth energy positively.\n\nAs an active member of the Punjab Sanjhivalta Dal, Sardar Khushinder Singh advocates for honest public administration, grassroots democratic representation, equitable development for Malwa, Majha, and Doaba, and strong support systems for the farming community.`,
      fullBioPa: `ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦਾ ਜਨਮ ਅਤੇ ਪਾਲਣ-ਪੋਸ਼ਣ ਪੰਜਾਬ ਦੀ ਇਤਿਹਾਸਕ ਧਰਤੀ ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਵਿਖੇ ਹੋਇਆ। ਬਚਪਨ ਤੋਂ ਹੀ ਉਹਨਾਂ ਨੇ ਪੰਜਾਬ ਦੇ ਪਿੰਡਾਂ, ਕਿਸਾਨੀ ਪਰਿਵਾਰਾਂ ਅਤੇ ਮਿਹਨਤਕਸ਼ ਲੋਕਾਂ ਦੀਆਂ ਮੁਸ਼ਕਲਾਂ ਨੂੰ ਨੇੜਿਓਂ ਮਹਿਸੂਸ ਕੀਤਾ।\n\n'ਸਰਬੱਤ ਦਾ ਭਲਾ' ਦੇ ਪਾਵਨ ਸੰਕਲਪ ਨੂੰ ਧਾਰਨ ਕਰਦਿਆਂ, ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੀ ਨੇ ਜ਼ਮੀਨੀ ਪੱਧਰ 'ਤੇ ਲੋਕ ਸੇਵਾ ਨੂੰ ਆਪਣਾ ਜੀਵਨ ਮਨੋਰਥ ਬਣਾਇਆ। ਉਹਨਾਂ ਨੇ ਦੂਰ-ਦੁਰਾਡੇ ਦੇ ਪਿੰਡਾਂ ਵਿੱਚ ਮੁਫ਼ਤ ਮੈਡੀਕਲ ਕੈਂਪ ਲਗਵਾਏ, ਲੋੜਵੰਦ ਬੱਚਿਆਂ ਦੀਆਂ ਸਕੂਲ ਫੀਸਾਂ ਤੇ ਕਿਤਾਬਾਂ ਦਾ ਪ੍ਰਬੰਧ ਕੀਤਾ, ਅਤੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਨਸ਼ਿਆਂ ਤੋਂ ਦੂਰ ਰੱਖਣ ਲਈ ਖੇਡ ਕਲੱਬਾਂ ਦੀ ਸਥਾਪਨਾ ਕਰਵਾਈ।\n\nਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਦੇ ਸਰਗਰਮ ਮੈਂਬਰ ਵਜੋਂ ਉਹ ਪੰਜਾਬ ਵਿੱਚ ਇਮਾਨਦਾਰ ਰਾਜਨੀਤੀ, ਭਾਈਚਾਰਕ ਸਾਂਝ, ਪਿੰਡਾਂ ਦੇ ਸਰਬਪੱਖੀ ਵਿਕਾਸ ਅਤੇ ਕਿਸਾਨਾਂ-ਮਜ਼ਦੂਰਾਂ ਦੇ ਹੱਕਾਂ ਲਈ ਮੋਹਰੀ ਹੋ ਕੇ ਆਵਾਜ਼ ਬੁਲੰਦ ਕਰ ਰਹੇ ਹਨ।`,
      journeyEn: `Over the past twelve years, Sardar Khushinder Singh has transformed grassroots social activism in his area. Beginning with village sanitation and youth kabaddi tournaments, his initiatives quickly expanded into regional educational scholarships, emergency ambulance arrangements, and organized advocacy for canal water distribution to tail-end agricultural fields. His transparent approach and availability to common villagers 24/7 have earned him deep trust and respect.`,
      journeyPa: `ਪਿਛਲੇ ਬਾਰ੍ਹਾਂ ਸਾਲਾਂ ਦੌਰਾਨ ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਨੇ ਜ਼ਮੀਨੀ ਪੱਧਰ 'ਤੇ ਸਮਾਜ ਸੇਵਾ ਦੀ ਮਿਸਾਲ ਕਾਇਮ ਕੀਤੀ ਹੈ। ਪਿੰਡਾਂ ਵਿੱਚ ਸਾਫ਼-ਸਫ਼ਾਈ ਅਤੇ ਕਬੱਡੀ ਟੂਰਨਾਮੈਂਟਾਂ ਤੋਂ ਸ਼ੁਰੂ ਹੋਇਆ ਇਹ ਸਫ਼ਰ ਅੱਜ ਸੈਂਕੜੇ ਪਰਿਵਾਰਾਂ ਲਈ ਸਹਾਰਾ ਬਣ ਚੁੱਕਾ ਹੈ। ਟੇਲਾਂ 'ਤੇ ਨਹਿਰੀ ਪਾਣੀ ਪਹੁੰਚਾਉਣ ਦਾ ਸੰਘਰਸ਼ ਹੋਵੇ ਜਾਂ ਗਰੀਬ ਮਰੀਜ਼ਾਂ ਦਾ ਇਲਾਜ, ਉਹ ਹਮੇਸ਼ਾ ਪਹਿਲੀ ਕਤਾਰ ਵਿੱਚ ਖੜ੍ਹੇ ਰਹੇ ਹਨ।`,
      publicServiceEn: `Key Public Service Milestones:\n• Rural Medical & Eye Check-up Camps: Provided free treatment, medicines, and spectacles to over 15,000 rural residents.\n• Youth Sports & Anti-Drug Rallies: Built 8 village open gyms and organized annual Shaheed Bhagat Singh sports tournaments.\n• Educational Assistance: Distributed uniforms, textbooks, and tuition assistance to over 1,200 underprivileged rural school children.\n• Water & Environment Care: Planted over 25,000 indigenous trees across canal banks and village roads in Malwa belt.\n• Farmer & Laborer Solidarity: Provided legal and administrative assistance to marginal farmers facing debt and crop insurance bottlenecks.`,
      publicServicePa: `ਮੁੱਖ ਲੋਕ ਸੇਵਾ ਕਾਰਜ:\n• ਪੇਂਡੂ ਮੈਡੀਕਲ ਤੇ ਅੱਖਾਂ ਦੇ ਕੈਂਪ: 15,000 ਤੋਂ ਵੱਧ ਪਿੰਡ ਵਾਸੀਆਂ ਨੂੰ ਮੁਫ਼ਤ ਦਵਾਈਆਂ, ਚੈਕਅੱਪ ਤੇ ਐਨਕਾਂ ਵੰਡੀਆਂ ਗਈਆਂ।\n• ਖੇਡਾਂ ਅਤੇ ਨਸ਼ਾ ਵਿਰੋਧੀ ਮੁਹਿੰਮ: 8 ਪਿੰਡਾਂ ਵਿੱਚ ਓਪਨ ਜਿੰਮ ਲਗਵਾਏ ਅਤੇ ਸ਼ਹੀਦ ਭਗਤ ਸਿੰਘ ਯਾਦਗਾਰੀ ਖੇਡ ਮੇਲੇ ਕਰਵਾਏ।\n• ਵਿੱਦਿਅਕ ਸਹਾਇਤਾ: 1,200 ਤੋਂ ਵੱਧ ਲੋੜਵੰਦ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਵਰਦੀਆਂ, ਕਿਤਾਬਾਂ ਅਤੇ ਫੀਸਾਂ ਦੀ ਸਹਾਇਤਾ।\n• ਵਾਤਾਵਰਣ ਤੇ ਹਰਿਆਵਲ ਮੁਹਿੰਮ: ਨਹਿਰਾਂ ਦੀਆਂ ਪੱਟੜੀਆਂ ਅਤੇ ਪਿੰਡਾਂ ਦੀਆਂ ਸੜਕਾਂ ਦੁਆਲੇ 25,000 ਤੋਂ ਵੱਧ ਰੁੱਖ ਲਗਾਏ।\n• ਕਿਸਾਨ-ਮਜ਼ਦੂਰ ਭਲਾਈ: ਫ਼ਸਲੀ ਮੁਆਵਜ਼ੇ ਅਤੇ ਨਹਿਰੀ ਪਾਣੀ ਦੇ ਮਸਲਿਆਂ 'ਤੇ ਕਿਸਾਨਾਂ ਨੂੰ ਪ੍ਰਸ਼ਾਸਨਿਕ ਸਹਿਯੋਗ ਦਿੱਤਾ।`,
      visionEn: `A prosperous, educated, drug-free Punjab where every youth has dignified local employment, every farmer gets fair remuneration, healthcare is accessible to the poorest family, and the social brotherhood of all communities remains unbroken.`,
      visionPa: `ਇੱਕ ਖੁਸ਼ਹਾਲ, ਨਸ਼ਾ-ਮੁਕਤ ਅਤੇ ਪੜ੍ਹਿਆ-ਲਿਖਿਆ ਪੰਜਾਬ, ਜਿੱਥੇ ਹਰ ਨੌਜਵਾਨ ਨੂੰ ਆਪਣੀ ਮਿੱਟੀ 'ਤੇ ਰੁਜ਼ਗਾਰ ਮਿਲੇ, ਕਿਸਾਨ ਦੀ ਮਿਹਨਤ ਦਾ ਪੂਰਾ ਮੁੱਲ ਪਵੇ, ਹਰ ਗਰੀਬ ਦਾ ਚੰਗਾ ਇਲਾਜ ਹੋਵੇ ਅਤੇ ਭਾਈਚਾਰਕ ਸਾਂਝ ਸਦੀਵੀ ਕਾਇਮ ਰਹੇ।`,
      organizationEn: `Punjab Sanjhivalta Dal stands for collective public welfare, democratic integrity, regional aspirations of Punjab, and secular brotherhood as taught by the great Gurus and saints of Punjab. As a dedicated member, Sardar Khushinder Singh champions these core principles with unwavering discipline.`,
      organizationPa: `ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਗੁਰੂਆਂ-ਪੀਰਾਂ ਦੀਆਂ ਸਿੱਖਿਆਵਾਂ ਅਨੁਸਾਰ ਸਰਬ-ਸਾਂਝੀਵਾਲਤਾ, ਪੰਜਾਬ ਦੇ ਹੱਕਾਂ ਦੀ ਰਾਖੀ ਅਤੇ ਪਾਰਦਰਸ਼ੀ ਲੋਕ-ਪੱਖੀ ਪ੍ਰਸ਼ਾਸਨ ਲਈ ਵਚਨਬੱਧ ਹੈ। ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੀ ਇਸ ਜਥੇਬੰਦੀ ਦੇ ਆਦਰਸ਼ਾਂ ਨੂੰ ਜ਼ਮੀਨ 'ਤੇ ਲਾਗੂ ਕਰਨ ਲਈ ਪੂਰੀ ਤਨਦੇਹੀ ਨਾਲ ਕਾਰਜ ਕਰ ਰਹੇ ਹਨ।`,
      quoteEn: '"True service is not done for glory; it is done so that the quietest person in the village feels someone is standing with them."',
      quotePa: '"ਸੱਚੀ ਸੇਵਾ ਵਡਿਆਈਆਂ ਖੱਟਣ ਲਈ ਨਹੀਂ, ਸਗੋਂ ਇਸ ਲਈ ਹੁੰਦੀ ਹੈ ਤਾਂ ਜੋ ਪਿੰਡ ਦੇ ਆਖਰੀ ਬੰਦੇ ਨੂੰ ਵੀ ਇਹ ਭਰੋਸਾ ਰਹੇ ਕਿ ਉਸਦੇ ਦੁੱਖ-ਸੁੱਖ ਵਿੱਚ ਕੋਈ ਨਾਲ ਖੜ੍ਹਾ ਹੈ।"',
    },
  });

  // 5. Hero Slides
  const heroSlides = [
    {
      titleEn: 'Dedicated to People, Grounded in Service',
      titlePa: 'ਲੋਕ ਸੇਵਾ ਨੂੰ ਸਮਰਪਿਤ, ਜ਼ਮੀਨ ਨਾਲ ਜੁੜੀ ਆਵਾਜ਼',
      subtitleEn: 'Sardar Khushinder Singh Jand Sahib',
      subtitlePa: 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ',
      descriptionEn: 'Working relentlessly for rural empowerment, youth development, and farmer welfare across Punjab. Member of Punjab Sanjhivalta Dal.',
      descriptionPa: 'ਪੰਜਾਬ ਦੇ ਪਿੰਡਾਂ, ਨੌਜਵਾਨੀ ਅਤੇ ਕਿਸਾਨੀ ਦੀ ਬਿਹਤਰੀ ਲਈ ਦਿਨ-ਰਾਤ ਤਤਪਰ। ਮੈਂਬਰ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ।',
      imageUrl: '/images/hero-1.jpg',
      videoUrl: '',
      btn1TextEn: 'About My Work',
      btn1TextPa: 'ਮੇਰੇ ਬਾਰੇ ਜਾਣੋ',
      btn1Url: '/about',
      btn2TextEn: 'Public Contact',
      btn2TextPa: 'ਸੰਪਰਕ ਕਰੋ',
      btn2Url: '/contact',
      overlayOpacity: 0.55,
      displayOrder: 1,
      isActive: true,
    },
    {
      titleEn: 'Empowering Punjab Youth & Health Initiatives',
      titlePa: 'ਪੰਜਾਬ ਦੀ ਨੌਜਵਾਨੀ ਅਤੇ ਸਿਹਤ ਸੇਵਾਵਾਂ ਲਈ ਉਪਰਾਲੇ',
      subtitleEn: 'Village Medical Camps & Sports Clubs',
      subtitlePa: 'ਪੇਂਡੂ ਮੈਡੀਕਲ ਕੈਂਪ ਤੇ ਖੇਡ ਮੇਲੇ',
      descriptionEn: 'Building grassroots sports infrastructure, anti-drug awareness drives, and organizing specialist medical assistance for thousands of families.',
      descriptionPa: 'ਨਸ਼ਿਆਂ ਖ਼ਿਲਾਫ਼ ਜਾਗਰੂਕਤਾ, ਓਪਨ ਜਿੰਮਾਂ ਦੀ ਸਥਾਪਨਾ ਅਤੇ ਹਜ਼ਾਰਾਂ ਪਰਿਵਾਰਾਂ ਲਈ ਮੁਫ਼ਤ ਸਿਹਤ ਸਹੂਲਤਾਂ ਦਾ ਪ੍ਰਬੰਧ।',
      imageUrl: '/images/hero-2.jpg',
      videoUrl: '',
      btn1TextEn: 'Read Latest Updates',
      btn1TextPa: 'ਤਾਜ਼ਾ ਖ਼ਬਰਾਂ ਪੜ੍ਹੋ',
      btn1Url: '/blog',
      btn2TextEn: 'Join Community Work',
      btn2TextPa: 'ਸੇਵਾ ਵਿੱਚ ਸਾਥ ਦਿਓ',
      btn2Url: '/contact',
      overlayOpacity: 0.5,
      displayOrder: 2,
      isActive: true,
    },
    {
      titleEn: 'Upholding Brotherhood & Progress for Punjab',
      titlePa: 'ਪੰਜਾਬ ਦੀ ਭਾਈਚਾਰਕ ਸਾਂਝ ਤੇ ਖੁਸ਼ਹਾਲੀ ਦਾ ਸੰਕਲਪ',
      subtitleEn: 'Punjab Sanjhivalta Dal',
      subtitlePa: 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ',
      descriptionEn: 'Striving for fair governance, equal opportunities for our farmers and laborers, and an unshakeable bond across all communities.',
      descriptionPa: 'ਇਮਾਨਦਾਰ ਸ਼ਾਸਨ, ਕਿਸਾਨਾਂ-ਮਜ਼ਦੂਰਾਂ ਲਈ ਬਰਾਬਰ ਹੱਕ ਅਤੇ ਸਮੁੱਚੇ ਸਮਾਜ ਵਿੱਚ ਅਟੁੱਟ ਭਾਈਚਾਰਾ।',
      imageUrl: '/images/hero-3.jpg',
      videoUrl: '',
      btn1TextEn: 'Our Vision',
      btn1TextPa: 'ਸਾਡੀ ਸੋਚ',
      btn1Url: '/about#vision',
      btn2TextEn: 'Write to Khushinder Singh',
      btn2TextPa: 'ਆਪਣਾ ਸੁਨੇਹਾ ਭੇਜੋ',
      btn2Url: '/contact',
      overlayOpacity: 0.5,
      displayOrder: 3,
      isActive: true,
    },
  ];

  for (const slide of heroSlides) {
    const existing = await prisma.heroSlide.findFirst({ where: { titleEn: slide.titleEn } });
    if (!existing) {
      await prisma.heroSlide.create({ data: slide });
    }
  }

  // 6. Logo Slides
  const logoSlides = [
    { title: 'Punjab Sanjhivalta Dal Official Insignia', imageUrl: '/images/logo-sanjhivalta.png', displayOrder: 1, isActive: true },
    { title: 'Social Welfare Mission Emblem', imageUrl: '/images/logo-welfare.png', displayOrder: 2, isActive: true },
    { title: 'Sardar Khushinder Singh Monogram', imageUrl: '/images/logo-khushinder.png', displayOrder: 3, isActive: true },
    { title: 'Punjab Youth & Sports Forum', imageUrl: '/images/logo-sports.png', displayOrder: 4, isActive: true },
  ];

  for (const l of logoSlides) {
    const existing = await prisma.logoSlide.findFirst({ where: { title: l.title } });
    if (!existing) {
      await prisma.logoSlide.create({ data: l });
    }
  }

  // 7. Homepage Sections Configuration
  const defaultSections = [
    { sectionKey: 'hero', titleEn: 'Hero Section', titlePa: 'ਮੁੱਖ ਬੈਨਰ', isEnabled: true, displayOrder: 1 },
    { sectionKey: 'logo_animation', titleEn: 'Animated Organization Logos', titlePa: 'ਸੰਸਥਾ ਦੇ ਲੋਗੋ', isEnabled: true, displayOrder: 2 },
    { sectionKey: 'social_feeds', titleEn: 'Facebook & Instagram Updates', titlePa: 'ਸੋਸ਼ਲ ਮੀਡੀਆ ਅਪਡੇਟਸ', isEnabled: true, displayOrder: 3 },
    { sectionKey: 'about_intro', titleEn: 'About Khushinder Singh', titlePa: 'ਜਾਣ-ਪਛਾਣ', isEnabled: true, displayOrder: 4 },
    { sectionKey: 'latest_blogs', titleEn: 'Latest Blogs & Public News', titlePa: 'ਤਾਜ਼ਾ ਖ਼ਬਰਾਂ ਤੇ ਬਲਾਗ', isEnabled: true, displayOrder: 5, postsCount: 3 },
    { sectionKey: 'gallery', titleEn: 'Social Work Gallery', titlePa: 'ਲੋਕ ਸੇਵਾ ਗੈਲਰੀ', isEnabled: true, displayOrder: 6 },
    { sectionKey: 'contact_cta', titleEn: 'Connect with Khushinder Singh', titlePa: 'ਸਿੱਧਾ ਰਾਬਤਾ ਕਾਇਮ ਕਰੋ', isEnabled: true, displayOrder: 7 },
  ];

  for (const s of defaultSections) {
    await prisma.homepageSection.upsert({
      where: { sectionKey: s.sectionKey },
      update: {},
      create: s,
    });
  }

  // 8. Categories
  const catWelfare = await prisma.blogCategory.upsert({
    where: { slug: 'community-welfare' },
    update: {},
    create: {
      nameEn: 'Community Welfare',
      namePa: 'ਸਮਾਜ ਭਲਾਈ',
      slug: 'community-welfare',
      description: 'Public health camps, eye donation drives, and relief initiatives',
    },
  });

  const catYouth = await prisma.blogCategory.upsert({
    where: { slug: 'youth-and-sports' },
    update: {},
    create: {
      nameEn: 'Youth & Sports',
      namePa: 'ਨੌਜਵਾਨ ਅਤੇ ਖੇਡਾਂ',
      slug: 'youth-and-sports',
      description: 'Sports tournaments, fitness clubs, and anti-drug campaigns',
    },
  });

  const catAgriculture = await prisma.blogCategory.upsert({
    where: { slug: 'agriculture-and-farmers' },
    update: {},
    create: {
      nameEn: 'Agriculture & Rural Issues',
      namePa: 'ਕਿਸਾਨੀ ਅਤੇ ਪੇਂਡੂ ਮਸਲੇ',
      slug: 'agriculture-and-farmers',
      description: 'Canal water distribution, crop compensation, and agrarian welfare',
    },
  });

  const catOrganization = await prisma.blogCategory.upsert({
    where: { slug: 'punjab-sanjhivalta-dal' },
    update: {},
    create: {
      nameEn: 'Punjab Sanjhivalta Dal Updates',
      namePa: 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਗਤੀਵਿਧੀਆਂ',
      slug: 'punjab-sanjhivalta-dal',
      description: 'Organizational conventions, press releases, and public delegations',
    },
  });

  // 9. Tags
  const tagHealth = await prisma.blogTag.upsert({
    where: { slug: 'healthcare' },
    update: {},
    create: { nameEn: 'Healthcare', namePa: 'ਸਿਹਤ', slug: 'healthcare' },
  });
  const tagJandSahib = await prisma.blogTag.upsert({
    where: { slug: 'jand-sahib' },
    update: {},
    create: { nameEn: 'Jand Sahib', namePa: 'ਜੰਡ ਸਾਹਿਬ', slug: 'jand-sahib' },
  });
  const tagYouth = await prisma.blogTag.upsert({
    where: { slug: 'punjab-youth' },
    update: {},
    create: { nameEn: 'Punjab Youth', namePa: 'ਪੰਜਾਬ ਨੌਜਵਾਨੀ', slug: 'punjab-youth' },
  });

  // 10. Sample Blogs
  const sampleBlogs = [
    {
      titleEn: 'Mega Free Medical & Eye Camp Organized in Jand Sahib: Over 850 Patients Screened',
      titlePa: 'ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਵਿਖੇ ਵਿਸ਼ਾਲ ਮੁਫ਼ਤ ਮੈਡੀਕਲ ਤੇ ਅੱਖਾਂ ਦਾ ਕੈਂਪ: 850 ਤੋਂ ਵੱਧ ਮਰੀਜ਼ਾਂ ਨੇ ਲਿਆ ਲਾਭ',
      slug: 'mega-medical-eye-camp-jand-sahib',
      shortDescEn: 'Under the supervision of Sardar Khushinder Singh Jand Sahib, specialist doctors from Ludhiana and Bathinda provided free consultations, tests, and medicines.',
      shortDescPa: 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦੀ ਅਗਵਾਈ ਹੇਠ ਲੁਧਿਆਣਾ ਅਤੇ ਬਠਿੰਡਾ ਦੇ ਮਾਹਿਰ ਡਾਕਟਰਾਂ ਵੱਲੋਂ ਮੁਫ਼ਤ ਚੈਕਅੱਪ, ਟੈਸਟ ਅਤੇ ਦਵਾਈਆਂ ਵੰਡੀਆਂ ਗਈਆਂ।',
      contentEn: `Under the dedicated initiative of Sardar Khushinder Singh Jand Sahib, a comprehensive mega free medical and eye check-up camp was organized at Village Jand Sahib. 

Over 850 villagers from Jand Sahib and adjacent hamlets received consultations from senior cardiologists, ophthalmologists, and general physicians. Free spectacles were distributed to 320 elderly citizens, and 45 patients requiring cataract surgeries were enrolled for sponsored procedures at renowned regional healthcare centers.

Speaking to attendees, Sardar Khushinder Singh highlighted that quality healthcare must reach the rural doorsteps of Punjab: "Our elderly mothers and fathers in villages often ignore health ailments due to distance and financial distress. It is our moral duty as social workers to bring modern diagnostics and loving care directly to our villages."`,
      contentPa: `ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦੇ ਸੁਹਿਰਦ ਉਪਰਾਲੇ ਸਦਕਾ ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਵਿਖੇ ਇੱਕ ਵਿਸ਼ਾਲ ਮੁਫ਼ਤ ਮੈਡੀਕਲ ਅਤੇ ਅੱਖਾਂ ਦਾ ਚੈਕਅੱਪ ਕੈਂਪ ਸਫ਼ਲਤਾਪੂਰਵਕ ਲਗਾਇਆ ਗਿਆ।

ਇਸ ਕੈਂਪ ਵਿੱਚ ਜੰਡ ਸਾਹਿਬ ਅਤੇ ਆਸ-ਪਾਸ ਦੇ ਪਿੰਡਾਂ ਤੋਂ ਆਏ 850 ਤੋਂ ਵੱਧ ਲੋਕਾਂ ਨੇ ਦਿਲ ਦੇ ਰੋਗਾਂ, ਅੱਖਾਂ ਅਤੇ ਜਨਰਲ ਬਿਮਾਰੀਆਂ ਦੇ ਮਾਹਿਰ ਡਾਕਟਰਾਂ ਤੋਂ ਮੁਫ਼ਤ ਜਾਂਚ ਕਰਵਾਈ। ਬਜ਼ੁਰਗਾਂ ਨੂੰ 320 ਨਜ਼ਰ ਦੀਆਂ ਐਨਕਾਂ ਅਤੇ ਲੋੜੀਂਦੀਆਂ ਦਵਾਈਆਂ ਮੁਫ਼ਤ ਦਿੱਤੀਆਂ ਗਈਆਂ, ਜਦਕਿ ਮੋਤੀਆਬਿੰਦ ਦੇ 45 ਮਰੀਜ਼ਾਂ ਦੇ ਆਪ੍ਰੇਸ਼ਨਾਂ ਦਾ ਪੂਰਾ ਪ੍ਰਬੰਧ ਕੀਤਾ ਗਿਆ।

ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਨੇ ਇਕੱਠ ਨੂੰ ਸੰਬੋਧਨ ਕਰਦਿਆਂ ਕਿਹਾ: "ਸਾਡੇ ਬਜ਼ੁਰਗਾਂ ਅਤੇ ਮਾਤਾਵਾਂ ਨੂੰ ਦੂਰ ਸ਼ਹਿਰਾਂ ਵਿੱਚ ਜਾਣ ਦੀ ਖੱਜਲ-ਖ਼ੁਆਰੀ ਤੋਂ ਬਚਾਉਣਾ ਅਤੇ ਉਹਨਾਂ ਨੂੰ ਪਿੰਡ ਦੀ ਦਹਿਲੀਜ਼ 'ਤੇ ਮਿਆਰੀ ਸਿਹਤ ਸਹੂਲਤਾਂ ਮੁਹੱਈਆ ਕਰਵਾਉਣਾ ਸਾਡਾ ਸਭ ਤੋਂ ਪਹਿਲਾ ਸਮਾਜਿਕ ਫ਼ਰਜ਼ ਹੈ।"`,
      featuredImage: '/images/blog-health-camp.jpg',
      categoryId: catWelfare.id,
      isFeatured: true,
      status: 'published',
      publishedAt: new Date(),
      authorName: 'Sardar Khushinder Singh',
      metaTitle: 'Mega Free Medical Camp Jand Sahib | Khushinder Singh',
      metaDescription: 'Free healthcare and eye checkup camp organized in Jand Sahib by Sardar Khushinder Singh assisting 850+ rural patients.',
    },
    {
      titleEn: 'Annual Rural Kabaddi & Volleyball Cup Celebrates Sportsmanship and Healthy Youth',
      titlePa: 'ਸਾਲਾਨਾ ਪੇਂਡੂ ਕਬੱਡੀ ਤੇ ਵਾਲੀਬਾਲ ਕੱਪ: ਨੌਜਵਾਨਾਂ ਨੂੰ ਖੇਡਾਂ ਵੱਲ ਪ੍ਰੇਰਿਤ ਕਰਨ ਦਾ ਵੱਡਾ ਉਪਰਾਲਾ',
      slug: 'rural-kabaddi-volleyball-cup-jand-sahib',
      shortDescEn: 'Over 32 village teams competed with passion and discipline in the two-day sports tournament hosted to promote healthy living and drug-free youth.',
      shortDescPa: 'ਨੌਜਵਾਨਾਂ ਨੂੰ ਨਸ਼ਿਆਂ ਤੋਂ ਦੂਰ ਕਰਕੇ ਖੇਡ ਮੈਦਾਨਾਂ ਨਾਲ ਜੋੜਨ ਲਈ ਕਰਵਾਏ ਦੋ-ਰੋਜ਼ਾ ਟੂਰਨਾਮੈਂਟ ਵਿੱਚ 32 ਪਿੰਡਾਂ ਦੀਆਂ ਟੀਮਾਂ ਨੇ ਸ਼ਾਨਦਾਰ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ।',
      contentEn: `To instill discipline, camaraderie, and physical vigor among Punjab youth, Sardar Khushinder Singh Jand Sahib inaugurated the Annual Rural Kabaddi & Volleyball Tournament at the local stadium grounds.

Featuring enthusiastic participation from 32 teams across the Malwa region, the tournament witnessed exhilarating competition. The winning teams were honored with cash prizes, trophies, and complete sports kits.

"Our youth possess unmatched talent, strength, and courage," stated Khushinder Singh during the prize distribution ceremony. "If we provide them playgrounds, gymnasiums, and honest guidance, Punjab's youth will shine nationally and globally while staying completely clear of social evils."`,
      contentPa: `ਪੰਜਾਬ ਦੀ ਨੌਜਵਾਨੀ ਵਿੱਚ ਖੇਡ ਭਾਵਨਾ, ਅਨੁਸ਼ਾਸਨ ਅਤੇ ਸਰੀਰਕ ਤੰਦਰੁਸਤੀ ਨੂੰ ਉਤਸ਼ਾਹਿਤ ਕਰਨ ਲਈ ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਵੱਲੋਂ ਸਾਲਾਨਾ ਪੇਂਡੂ ਕਬੱਡੀ ਅਤੇ ਵਾਲੀਬਾਲ ਟੂਰਨਾਮੈਂਟ ਕਰਵਾਇਆ ਗਿਆ।

ਮਾਲਵਾ ਖੇਤਰ ਦੇ ਵੱਖ-ਵੱਖ ਪਿੰਡਾਂ ਤੋਂ ਪਹੁੰਚੀਆਂ 32 ਟੀਮਾਂ ਵਿਚਾਲੇ ਫਸਵੇਂ ਮੁਕਾਬਲੇ ਹੋਏ। ਜੇਤੂ ਟੀਮਾਂ ਨੂੰ ਨਕਦ ਇਨਾਮਾਂ, ਟਰਾਫ਼ੀਆਂ ਅਤੇ ਖੇਡ ਕਿੱਟਾਂ ਨਾਲ ਸਨਮਾਨਿਤ ਕੀਤਾ ਗਿਆ।

ਇਨਾਮ ਵੰਡ ਸਮਾਰੋਹ ਮੌਕੇ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੀ ਨੇ ਕਿਹਾ: "ਪੰਜਾਬ ਦੇ ਨੌਜਵਾਨਾਂ ਵਿੱਚ ਅਥਾਹ ਹੁਨਰ ਅਤੇ ਜਜ਼ਬਾ ਹੈ। ਜੇਕਰ ਅਸੀਂ ਆਪਣੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਖੇਡ ਮੈਦਾਨ, ਜਿੰਮ ਅਤੇ ਸਹੀ ਦਿਸ਼ਾ ਦੇਈਏ ਤਾਂ ਉਹ ਕਿਸੇ ਵੀ ਖੇਤਰ ਵਿੱਚ ਪਿੱਛੇ ਨਹੀਂ ਰਹਿ ਸਕਦੇ।"`,
      featuredImage: '/images/blog-sports-cup.jpg',
      categoryId: catYouth.id,
      isFeatured: true,
      status: 'published',
      publishedAt: new Date(Date.now() - 86400000 * 3),
      authorName: 'Sardar Khushinder Singh',
      metaTitle: 'Rural Kabaddi Tournament Jand Sahib | Khushinder Singh',
      metaDescription: 'Annual village sports tournament held in Jand Sahib to channel youth energy into athletics and community unity.',
    },
    {
      titleEn: 'Punjab Sanjhivalta Dal Delegation Meets Local Administration on Canal Water Issues',
      titlePa: 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਦਾ ਵਫ਼ਦ ਨਹਿਰੀ ਪਾਣੀ ਦੇ ਮਸਲੇ ਨੂੰ ਲੈ ਕੇ ਪ੍ਰਸ਼ਾਸਨਿਕ ਅਧਿਕਾਰੀਆਂ ਨੂੰ ਮਿਲਿਆ',
      slug: 'punjab-sanjhivalta-dal-canal-water-delegation',
      shortDescEn: 'A high-level delegation led by Khushinder Singh submitted a detailed memorandum urging desiltation of watercourses and equitable canal water supply to tail-end villages.',
      shortDescPa: "ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਕਿਸਾਨਾਂ ਦੇ ਵਫ਼ਦ ਨੇ ਟੇਲਾਂ 'ਤੇ ਨਹਿਰੀ ਪਾਣੀ ਪਹੁੰਚਾਉਣ ਅਤੇ ਸੂਇਆਂ ਦੀ ਸਫ਼ਾਈ ਲਈ ਮੰਗ ਪੱਤਰ ਸੌਂਪਿਆ।",
      contentEn: `A delegation of farmers and social representatives under the banner of Punjab Sanjhivalta Dal, led by Sardar Khushinder Singh Jand Sahib, met with the Executive Engineer (Canal Division) and administrative authorities.

The memorandum highlighted that over a dozen tail-end villages were experiencing acute irrigation water shortages during critical sowing periods. Khushinder Singh insisted that immediate desiltation of distributaries and strict checking of illegal water theft must be carried out without partisan bias.

The administration assured prompt technical inspection and agreed to restore rotational water discharge within seven working days.`,
      contentPa: `ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਦੇ ਬੈਨਰ ਹੇਠ ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਕਿਸਾਨਾਂ ਅਤੇ ਇਲਾਕਾ ਨਿਵਾਸੀਆਂ ਦੇ ਇੱਕ ਵਫ਼ਦ ਨੇ ਨਹਿਰੀ ਵਿਭਾਗ ਦੇ ਉੱਚ ਅਧਿਕਾਰੀਆਂ ਨਾਲ ਮੁਲਾਕਾਤ ਕੀਤੀ।

ਵਫ਼ਦ ਵੱਲੋਂ ਸੌਂਪੇ ਗਏ ਮੰਗ ਪੱਤਰ ਵਿੱਚ ਦੱਸਿਆ ਗਿਆ ਕਿ ਕਈ ਪਿੰਡਾਂ ਵਿੱਚ ਟੇਲਾਂ 'ਤੇ ਨਹਿਰੀ ਪਾਣੀ ਨਾ ਪੁੱਜਣ ਕਾਰਨ ਕਿਸਾਨਾਂ ਦੀਆਂ ਫ਼ਸਲਾਂ ਪ੍ਰਭਾਵਿਤ ਹੋ ਰਹੀਆਂ ਹਨ। ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੀ ਨੇ ਜ਼ੋਰ ਦੇ ਕੇ ਕਿਹਾ ਕਿ ਸੂਇਆਂ ਦੀ ਤੁਰੰਤ ਸਫ਼ਾਈ ਕਰਵਾਈ ਜਾਵੇ ਅਤੇ ਪਾਣੀ ਦੀ ਬਰਾਬਰ ਵੰਡ ਯਕੀਨੀ ਬਣਾਈ ਜਾਵੇ।

ਪ੍ਰਸ਼ਾਸਨਿਕ ਅਧਿਕਾਰੀਆਂ ਨੇ ਵਫ਼ਦ ਨੂੰ ਭਰੋਸਾ ਦਿਵਾਇਆ ਕਿ ਅਗਲੇ ਕੁਝ ਦਿਨਾਂ ਵਿੱਚ ਨਹਿਰੀ ਪਾਣੀ ਦੀ ਸਪਲਾਈ ਬਹਾਲ ਕਰ ਦਿੱਤੀ ਜਾਵੇਗੀ।`,
      featuredImage: '/images/blog-farmer-delegation.jpg',
      categoryId: catAgriculture.id,
      isFeatured: false,
      status: 'published',
      publishedAt: new Date(Date.now() - 86400000 * 7),
      authorName: 'Sardar Khushinder Singh',
      metaTitle: 'Canal Water Delegation | Punjab Sanjhivalta Dal',
      metaDescription: 'Khushinder Singh leads farmers delegation to resolve irrigation water shortage at tail ends.',
    },
    {
      titleEn: 'Green Punjab Campaign: 5,000 Saplings Planted with Community Participation',
      titlePa: 'ਹਰਿਆਵਲ ਲਹਿਰ: ਪਿੰਡ ਵਾਸੀਆਂ ਦੇ ਸਹਿਯੋਗ ਨਾਲ 5,000 ਬੂਟੇ ਲਗਾਏ ਗਏ',
      slug: 'green-punjab-tree-plantation-drive',
      shortDescEn: 'Community tree plantation campaign organized along major rural roads, school campuses, and community centers.',
      shortDescPa: 'ਵਾਤਾਵਰਣ ਦੀ ਸੰਭਾਲ ਅਤੇ ਪੰਜਾਬ ਨੂੰ ਹਰਾ-ਭਰਾ ਬਣਾਉਣ ਲਈ ਪਿੰਡਾਂ ਦੀਆਂ ਸੜਕਾਂ ਅਤੇ ਸਕੂਲਾਂ ਦੁਆਲੇ ਪੌਦੇ ਲਗਾਏ ਗਏ।',
      contentEn: `Recognizing the pressing need for environmental conservation and ground-water recharging, Sardar Khushinder Singh initiated the monsoon Green Punjab Plantation Drive across rural belts.

School students, village elders, and local youth clubs participated with joy, planting neem, tahli (shisham), peepal, and fruit-bearing trees along school grounds and village roads. Sardar Khushinder Singh appealed to every household to adopt at least two trees and protect them until maturity.`,
      contentPa: `ਵਾਤਾਵਰਣ ਵਿੱਚ ਆ ਰਹੇ ਵਿਗਾੜ ਨੂੰ ਠੱਲ੍ਹ ਪਾਉਣ ਲਈ ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਵੱਲੋਂ ਪੇਂਡੂ ਖੇਤਰਾਂ ਵਿੱਚ ਵਿਸ਼ਾਲ ਰੁੱਖ ਲਗਾਓ ਮੁਹਿੰਮ ਚਲਾਈ ਗਈ।

ਇਸ ਮੁਹਿੰਮ ਵਿੱਚ ਸਕੂਲੀ ਬੱਚਿਆਂ, ਬਜ਼ੁਰਗਾਂ ਅਤੇ ਯੂਥ ਕਲੱਬਾਂ ਨੇ ਵੱਧ-ਚੜ੍ਹ ਕੇ ਹਿੱਸਾ ਲਿਆ। ਨਿੰਮ, ਟਾਹਲੀ, ਪਿੱਪਲ ਅਤੇ ਬੋਹੜ ਵਰਗੇ ਰਵਾਇਤੀ ਰੁੱਖ ਲਗਾਏ ਗਏ। ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੀ ਨੇ ਹਰ ਪਰਿਵਾਰ ਨੂੰ ਅਪੀਲ ਕੀਤੀ ਕਿ ਉਹ ਘੱਟੋ-ਘੱਟ ਦੋ ਰੁੱਖ ਜ਼ਰੂਰ ਲਗਾਉਣ ਅਤੇ ਉਹਨਾਂ ਦੀ ਪਾਲਣਾ ਕਰਨ।`,
      featuredImage: '/images/blog-tree-plantation.jpg',
      categoryId: catWelfare.id,
      isFeatured: false,
      status: 'published',
      publishedAt: new Date(Date.now() - 86400000 * 12),
      authorName: 'Sardar Khushinder Singh',
      metaTitle: 'Green Punjab Campaign | Khushinder Singh Jand Sahib',
      metaDescription: 'Community tree plantation drive led by Sardar Khushinder Singh Jand Sahib.',
    },
  ];

  for (const b of sampleBlogs) {
    const existing = await prisma.blog.findUnique({ where: { slug: b.slug } });
    if (!existing) {
      const created = await prisma.blog.create({ data: b });
      await prisma.blogTagRelation.createMany({
        data: [
          { blogId: created.id, tagId: tagHealth.id },
          { blogId: created.id, tagId: tagJandSahib.id },
        ],
        skipDuplicates: true,
      });
    }
  }

  // 11. Social Accounts & Cached Feeds
  const socialAccounts = [
    {
      platform: 'facebook',
      accountName: 'Khushinder Singh Sandhu Official',
      profileUrl: 'https://www.facebook.com/khushindersingh.sandhu',
      pageId: '1029384756',
      isActive: true,
      isFeedEnabled: true,
      status: 'active',
      syncIntervalMinutes: 30,
      lastSyncedAt: new Date(),
    },
    {
      platform: 'instagram',
      accountName: '@khushinder_singh',
      profileUrl: 'https://www.instagram.com/khushinder_singh',
      businessAccountId: '178414002345678',
      isActive: true,
      isFeedEnabled: true,
      status: 'active',
      syncIntervalMinutes: 30,
      lastSyncedAt: new Date(),
    },
    {
      platform: 'youtube',
      accountName: 'Khushinder Singh Jand Sahib Official',
      profileUrl: 'https://youtube.com/@KhushinderSinghJandSahib',
      isActive: true,
      isFeedEnabled: false,
      status: 'configured',
    },
    {
      platform: 'twitter',
      accountName: '@KhushinderJand',
      profileUrl: 'https://x.com/KhushinderJand',
      isActive: true,
      isFeedEnabled: false,
      status: 'configured',
    },
    {
      platform: 'whatsapp',
      accountName: '+91 98765 43210',
      profileUrl: 'https://wa.me/919876543210?text=Sat%20Sri%20Akal%20Khushinder%20Singh%20Ji',
      isActive: true,
      isFeedEnabled: false,
      status: 'configured',
    },
  ];

  for (const acc of socialAccounts) {
    await prisma.socialAccount.upsert({
      where: { platform: acc.platform },
      update: {},
      create: acc,
    });
  }

  // 12. Cached Social Posts
  const cachedPosts = [
    {
      platform: 'facebook',
      postId: 'fb_post_101',
      authorName: 'Sardar Khushinder Singh Jand Sahib',
      caption: 'ਅੱਜ ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਵਿਖੇ ਹੋਏ ਮੈਡੀਕਲ ਕੈਂਪ ਦੌਰਾਨ ਬਜ਼ੁਰਗਾਂ ਅਤੇ ਮਾਤਾਵਾਂ ਦੀ ਸੇਵਾ ਕਰਦਿਆਂ ਮਨ ਨੂੰ ਅਥਾਹ ਸਕੂਨ ਮਿਲਿਆ। ਸਾਡਾ ਮਕਸਦ ਹਰ ਲੋੜਵੰਦ ਤੱਕ ਸਿਹਤ ਸਹੂਲਤਾਂ ਪਹੁੰਚਾਉਣਾ ਹੈ। ਆਪ ਸਭ ਦੇ ਨਿੱਘੇ ਪਿਆਰ ਅਤੇ ਸਹਿਯੋਗ ਲਈ ਬਹੁਤ-ਬਹੁਤ ਧੰਨਵਾਦ। #SocialWork #JandSahib #PunjabSanjhivaltaDal',
      mediaUrl: '/images/fb-post-1.jpg',
      mediaType: 'IMAGE',
      permalink: 'https://facebook.com/khushinder.jandsahib/posts/101',
      likesCount: 542,
      commentsCount: 89,
      timestamp: new Date(Date.now() - 3600000 * 5),
    },
    {
      platform: 'instagram',
      postId: 'ig_post_201',
      authorName: '@khushinder_jandsahib',
      caption: 'ਖੇਡ ਮੈਦਾਨਾਂ ਨਾਲ ਜੁੜੀ ਨੌਜਵਾਨੀ ਹੀ ਪੰਜਾਬ ਦਾ ਸੁਨਹਿਰੀ ਭਵਿੱਖ ਸਿਰਜ ਸਕਦੀ ਹੈ। ਪਿੰਡਾਂ ਵਿੱਚ ਓਪਨ ਜਿੰਮ ਅਤੇ ਖੇਡ ਕਿੱਟਾਂ ਵੰਡਣ ਦੀ ਮੁਹਿੰਮ ਨਿਰੰਤਰ ਜਾਰੀ ਹੈ। 🏏 ⚽️ #PunjabYouth #Sports #Fitness #KhushinderSingh',
      mediaUrl: '/images/ig-post-1.jpg',
      mediaType: 'IMAGE',
      permalink: 'https://instagram.com/p/ig_post_201',
      likesCount: 1240,
      commentsCount: 135,
      timestamp: new Date(Date.now() - 3600000 * 18),
    },
    {
      platform: 'facebook',
      postId: 'fb_post_102',
      authorName: 'Sardar Khushinder Singh Jand Sahib',
      caption: "ਕਿਸਾਨ ਸਾਡੇ ਦੇਸ਼ ਦੇ ਅੰਨਦਾਤਾ ਹਨ। ਨਹਿਰੀ ਪਾਣੀ ਦੀ ਸਮੱਸਿਆ ਸੰਬੰਧੀ ਅੱਜ ਪ੍ਰਸ਼ਾਸਨਿਕ ਅਧਿਕਾਰੀਆਂ ਨਾਲ ਵਿਸ਼ੇਸ਼ ਮੀਟਿੰਗ ਕੀਤੀ। ਜਦੋਂ ਤੱਕ ਟੇਲਾਂ 'ਤੇ ਪਾਣੀ ਨਹੀਂ ਪਹੁੰਚਦਾ, ਅਸੀਂ ਚੁੱਪ ਨਹੀਂ ਬੈਠਾਂਗੇ। ਕਿਸਾਨ-ਮਜ਼ਦੂਰ ਏਕਤਾ ਜ਼ਿੰਦਾਬਾਦ!",
      mediaUrl: '/images/fb-post-2.jpg',
      mediaType: 'IMAGE',
      permalink: 'https://facebook.com/khushinder.jandsahib/posts/102',
      likesCount: 890,
      commentsCount: 112,
      timestamp: new Date(Date.now() - 3600000 * 36),
    },
    {
      platform: 'instagram',
      postId: 'ig_post_202',
      authorName: '@khushinder_jandsahib',
      caption: 'ਵਾਤਾਵਰਣ ਦੀ ਸੰਭਾਲ ਸਾਡਾ ਸਭ ਦਾ ਸਾਂਝਾ ਫ਼ਰਜ਼ ਹੈ। ਆਓ ਸਾਰੇ ਰਲ ਕੇ ਪੰਜਾਬ ਦੀ ਧਰਤੀ ਨੂੰ ਹਰਿਆ-ਭਰਿਆ ਬਣਾਈਏ। ਅੱਜ ਪਿੰਡ ਦੇ ਸਕੂਲ ਵਿੱਚ ਨਵੇਂ ਬੂਟੇ ਲਗਾਏ। 🌳 🌿 #GreenPunjab #Nature #PlantTrees',
      mediaUrl: '/images/ig-post-2.jpg',
      mediaType: 'IMAGE',
      permalink: 'https://instagram.com/p/ig_post_202',
      likesCount: 980,
      commentsCount: 76,
      timestamp: new Date(Date.now() - 3600000 * 60),
    },
  ];

  for (const cp of cachedPosts) {
    await prisma.socialPostCache.upsert({
      where: { postId: cp.postId },
      update: {},
      create: cp,
    });
  }

  // 13. Galleries & Images
  const galleryHealth = await prisma.gallery.upsert({
    where: { slug: 'village-health-camps' },
    update: {},
    create: {
      titleEn: 'Village Health & Eye Camps',
      titlePa: 'ਪੇਂਡੂ ਸਿਹਤ ਤੇ ਅੱਖਾਂ ਦੇ ਕੈਂਪ',
      slug: 'village-health-camps',
      category: 'Healthcare',
      description: 'Photos and moments from medical camps held in Jand Sahib and surrounding villages.',
      displayOrder: 1,
      isActive: true,
    },
  });

  const gallerySports = await prisma.gallery.upsert({
    where: { slug: 'sports-youth-initiatives' },
    update: {},
    create: {
      titleEn: 'Youth Sports Tournaments & Fitness',
      titlePa: 'ਨੌਜਵਾਨ ਖੇਡ ਮੇਲੇ ਅਤੇ ਜਿੰਮ',
      slug: 'sports-youth-initiatives',
      category: 'Sports',
      description: 'Kabaddi and volleyball tournaments encouraging athletic excellence.',
      displayOrder: 2,
      isActive: true,
    },
  });

  const galleryImages = [
    {
      galleryId: galleryHealth.id,
      imageUrl: '/images/gallery-health-1.jpg',
      titleEn: 'Eye check-up in progress for village elders',
      titlePa: 'ਬਜ਼ੁਰਗਾਂ ਦੀਆਂ ਅੱਖਾਂ ਦੀ ਜਾਂਚ',
      caption: 'Specialist doctors examining patients with advanced diagnostic equipment.',
      isFeatured: true,
      displayOrder: 1,
    },
    {
      galleryId: galleryHealth.id,
      imageUrl: '/images/gallery-health-2.jpg',
      titleEn: 'Free medicine distribution counter',
      titlePa: 'ਮੁਫ਼ਤ ਦਵਾਈਆਂ ਵੰਡਣ ਦਾ ਕਾਊਂਟਰ',
      caption: 'Quality medicines distributed free of cost to attendees.',
      isFeatured: false,
      displayOrder: 2,
    },
    {
      galleryId: gallerySports.id,
      imageUrl: '/images/gallery-sports-1.jpg',
      titleEn: 'Inauguration of Village Volleyball Tournament',
      titlePa: 'ਵਾਲੀਬਾਲ ਟੂਰਨਾਮੈਂਟ ਦਾ ਉਦਘਾਟਨ',
      caption: 'Encouraging youth to stay fit and dedicated to sports.',
      isFeatured: true,
      displayOrder: 1,
    },
    {
      galleryId: gallerySports.id,
      imageUrl: '/images/gallery-sports-2.jpg',
      titleEn: 'Trophy presentation to winning team',
      titlePa: 'ਜੇਤੂ ਟੀਮ ਨੂੰ ਟਰਾਫ਼ੀ ਭੇਟ ਕਰਦੇ ਹੋਏ',
      caption: 'Honoring champions of the rural kabaddi championship.',
      isFeatured: false,
      displayOrder: 2,
    },
  ];

  for (const gi of galleryImages) {
    const existing = await prisma.galleryImage.findFirst({
      where: { galleryId: gi.galleryId, imageUrl: gi.imageUrl },
    });
    if (!existing) {
      await prisma.galleryImage.create({ data: gi });
    }
  }

  // 14. Advertisements / Public Awareness Banners
  const sampleAds = [
    {
      title: 'Free Blood Donation Camp - Jand Sahib Community Hall',
      placement: 'homepage',
      imageUrl: '/images/ad-blood-donation.jpg',
      destinationUrl: '/contact',
      htmlCode: '',
      isActive: true,
    },
    {
      title: 'Join Green Punjab Campaign - Adopt A Tree Today',
      placement: 'blog_sidebar',
      imageUrl: '/images/ad-green-punjab.jpg',
      destinationUrl: '/about',
      htmlCode: '',
      isActive: true,
    },
    {
      title: 'Public Grievance Redressal Camp - Every Sunday',
      placement: 'footer',
      imageUrl: '',
      destinationUrl: '/contact',
      htmlCode: '<div class="p-4 bg-gradient-to-r from-navy-900 to-navy-800 text-white rounded-xl border border-saffron-500/30 text-center"><p class="text-saffron-400 font-semibold text-sm">ਜਨਤਕ ਸੁਣਵਾਈ ਦਿਵਸ</p><p class="text-xs text-gray-300 mt-1">ਹਰ ਐਤਵਾਰ ਸਵੇਰੇ 10 ਵਜੇ ਦਫ਼ਤਰ ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਵਿਖੇ ਆਮ ਲੋਕਾਂ ਦੀਆਂ ਮੁਸ਼ਕਲਾਂ ਸੁਣੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।</p></div>',
      isActive: true,
    },
  ];

  for (const ad of sampleAds) {
    const existing = await prisma.advertisement.findFirst({ where: { title: ad.title } });
    if (!existing) {
      await prisma.advertisement.create({ data: ad });
    }
  }

  // 15. SMTP Settings & Email Templates
  await prisma.smtpSetting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUsername: 'office@khushindersingh.org',
      smtpPassword: '',
      encryption: 'TLS',
      senderName: 'Office of Sardar Khushinder Singh Jand Sahib',
      senderEmail: 'office@khushindersingh.org',
      adminNotificationEmail: 'khushinder.jandsahib@gmail.com',
      isEnabled: true,
    },
  });

  await prisma.emailTemplate.upsert({
    where: { templateKey: 'contact_notification' },
    update: {},
    create: {
      templateKey: 'contact_notification',
      title: 'New Public Contact Inquiry Received',
      subject: 'New Public Inquiry: {{subject}} - from {{full_name}}',
      bodyHtml: `<h3>New Public Inquiry on Khushinder Singh Portal</h3>
<p><strong>From:</strong> {{full_name}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Mobile:</strong> {{mobile_number}}</p>
<p><strong>Subject:</strong> {{subject}}</p>
<p><strong>Message:</strong></p>
<div style="background:#f4f6f8;padding:12px;border-left:4px solid #f59e0b;">{{message}}</div>`,
      variables: 'full_name, email, mobile_number, subject, message',
    },
  });

  await prisma.emailTemplate.upsert({
    where: { templateKey: 'visitor_confirmation' },
    update: {},
    create: {
      templateKey: 'visitor_confirmation',
      title: 'Inquiry Confirmation to Public Visitor',
      subject: 'Thank you for contacting Sardar Khushinder Singh Jand Sahib',
      bodyHtml: `<p>Dear {{full_name}},</p>
<p>Sat Sri Akal.</p>
<p>We have successfully received your message regarding "<strong>{{subject}}</strong>". Our office team will review your inquiry and get in touch with you shortly.</p>
<p>Warm regards,<br>
<strong>Office of Sardar Khushinder Singh Jand Sahib</strong><br>
Social Worker & Member, Punjab Sanjhivalta Dal</p>`,
      variables: 'full_name, subject',
    },
  });

  // 16. AI Settings & Approved Knowledge Sources
  const systemPrompt = `You are the official verified AI Public Assistant on the portal of Sardar Khushinder Singh Jand Sahib.

CRITICAL IDENTITY AND ACCURACY RULES:
1. You strictly represent and provide accurate information about:
   - Sardar Khushinder Singh Jand Sahib (Social Worker and Member of Punjab Sanjhivalta Dal).
   - Location: Jand Sahib, Punjab, India.
   - His verified biography, public social service, and community initiatives.
   - His membership and work with Punjab Sanjhivalta Dal.
   - Website contact details, published updates, and official social media.
2. Under NO circumstance do you answer questions about unrelated politicians, personal rumors, or unverified claims.
3. If an inquiry asks about someone else or unrelated general topics, politely reply:
   "I am the dedicated public assistant for Sardar Khushinder Singh Jand Sahib (Social Worker & Member, Punjab Sanjhivalta Dal). I can only assist you with information regarding his social initiatives, published blogs, and official contact channels."
4. If information is not available in your approved knowledge sources, clearly state:
   "Verified information on this topic is currently not available in our records. Please feel free to reach out directly through the Contact page."
5. Answer politely in the user's language (Punjabi, English, or Hindi).
6. Do NOT claim to be Khushinder Singh personally; you are his official portal assistant.`;

  await prisma.aiSetting.upsert({
    where: { id: 1 },
    update: { systemPrompt },
    create: {
      id: 1,
      isEnabled: true,
      provider: 'gemini',
      apiKey: '',
      modelName: 'gemini-1.5-flash',
      systemPrompt: systemPrompt,
      welcomeMessageEn: 'Sat Sri Akal! Welcome to the official website of Sardar Khushinder Singh Jand Sahib. How may I assist you regarding his public service, initiatives, or latest updates?',
      welcomeMessagePa: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦੇ ਅਧਿਕਾਰਤ ਪੋਰਟਲ \'ਤੇ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਮੈਂ ਉਹਨਾਂ ਦੀ ਸਮਾਜ ਸੇਵਾ, ਲੋਕ ਭਲਾਈ ਕਾਰਜਾਂ ਅਤੇ ਤਾਜ਼ਾ ਗਤੀਵਿਧੀਆਂ ਬਾਰੇ ਤੁਹਾਡੀ ਕੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?',
      fallbackResponseEn: 'Verified information on this specific topic is currently not available in our records. Please feel free to reach out directly through our Contact page.',
      fallbackResponsePa: 'ਇਸ ਵਿਸ਼ੇ ਸੰਬੰਧੀ ਪ੍ਰਮਾਣਿਤ ਜਾਣਕਾਰੀ ਇਸ ਵੇਲੇ ਉਪਲਬਧ ਨਹੀਂ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਸੰਪਰਕ ਪੰਨੇ ਰਾਹੀਂ ਸਿੱਧਾ ਦਫ਼ਤਰ ਨਾਲ ਰਾਬਤਾ ਕਾਇਮ ਕਰੋ।',
      responseLanguage: 'auto',
      maxTokens: 600,
      temperature: 0.3,
    },
  });

  const knowledgeSources = [
    {
      title: 'Official Identity & Overview',
      category: 'biography',
      content: 'Sardar Khushinder Singh Jand Sahib is an esteemed social worker based in Jand Sahib, Punjab, India. He is an active member of Punjab Sanjhivalta Dal, dedicated to public service, healthcare accessibility, rural education, youth engagement through sports, and farmer assistance.',
    },
    {
      title: 'Political and Social Identity - Punjab Sanjhivalta Dal',
      category: 'sanjhivalta_dal',
      content: 'Khushinder Singh is an active member of Punjab Sanjhivalta Dal. The organization stands for communal harmony, transparent governance, safeguarding the rights of Punjab farmers and laborers, and upholding the timeless Punjabi ethos of Sarbat Da Bhala.',
    },
    {
      title: 'Key Social Work Projects',
      category: 'public_service',
      content: 'Khushinder Singh has organized free village medical and eye camps serving over 15,000 citizens, distributed sports kits and established 8 village open gyms for youth, planted over 25,000 trees across Punjab roads and canals, and actively advocates for irrigation canal water rights for farmers at the tail ends.',
    },
    {
      title: 'Official Contact & Office Location',
      category: 'contact',
      content: 'Office Location: Village Jand Sahib, District Sri Muktsar Sahib / Bathinda region, Punjab 152026, India. Phone: +91 98765 43210. Email: contact@khushindersingh.org. WhatsApp: +91 98765 43210. Public hearing is held every Sunday at the Jand Sahib office.',
    },
  ];

  for (const ks of knowledgeSources) {
    const existing = await prisma.aiKnowledgeSource.findFirst({ where: { title: ks.title } });
    if (!existing) {
      await prisma.aiKnowledgeSource.create({ data: ks });
    }
  }

  // 17. SEO Settings
  const defaultSeo = [
    {
      pagePath: '/',
      metaTitle: 'Sardar Khushinder Singh Jand Sahib | Official Social Worker Website',
      metaDescription: 'Official website of Sardar Khushinder Singh Jand Sahib, Social Worker and Member of Punjab Sanjhivalta Dal. Explore initiatives, public updates, and contact.',
      metaKeywords: 'Khushinder Singh, Jand Sahib, Punjab Sanjhivalta Dal, Punjab Social Worker, Rural Punjab Welfare, Youth Sports Punjab',
    },
    {
      pagePath: '/about',
      metaTitle: 'About Sardar Khushinder Singh Jand Sahib | Biography & Public Service',
      metaDescription: 'Read the verified biography, social work journey, community initiatives, and vision for Punjab of Sardar Khushinder Singh Jand Sahib.',
      metaKeywords: 'Khushinder Singh biography, Jand Sahib social worker, Punjab Sanjhivalta Dal leader, Punjab public service',
    },
    {
      pagePath: '/blog',
      metaTitle: 'Latest Updates, News & Blogs | Sardar Khushinder Singh Jand Sahib',
      metaDescription: 'Stay informed with the latest public service activities, articles, and community initiatives from Sardar Khushinder Singh Jand Sahib.',
      metaKeywords: 'Khushinder Singh news, Punjab public updates, Jand Sahib blogs, rural healthcare Punjab',
    },
    {
      pagePath: '/contact',
      metaTitle: 'Contact Sardar Khushinder Singh Jand Sahib | Office & Public Inquiries',
      metaDescription: 'Reach out to Sardar Khushinder Singh Jand Sahib. Submit your public inquiry, feedback, or appointment request.',
      metaKeywords: 'Contact Khushinder Singh, Jand Sahib office, Punjab Sanjhivalta Dal contact, public grievances Punjab',
    },
  ];

  for (const s of defaultSeo) {
    await prisma.seoSetting.upsert({
      where: { pagePath: s.pagePath },
      update: {},
      create: s,
    });
  }

  console.log('✓ Seeding completed successfully!');
}

if (require.main === module) {
  seed()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = { seed };
