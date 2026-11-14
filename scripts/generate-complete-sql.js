const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

async function generateCompleteSql() {
  console.log('Generating full MySQL DDL from Prisma schema...');
  const nodeBinDir = path.dirname(process.execPath);
  const ddl = execSync(
    'npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script',
    {
      encoding: 'utf8',
      env: { ...process.env, PATH: `${nodeBinDir}:${process.env.PATH || ''}` },
    }
  );

  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const passwordHash = await bcrypt.hash('Admin@12345', 10);

  function escapeSql(val) {
    if (val === null || val === undefined) return 'NULL';
    if (typeof val === 'number') return val;
    if (typeof val === 'boolean') return val ? 1 : 0;
    const str = String(val)
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\r/g, '\\r')
      .replace(/\n/g, '\\n')
      .replace(/\0/g, '\\0');
    return `'${str}'`;
  }

  let sql = `-- =====================================================================
-- Sardar Khushinder Singh Jand Sahib - Official Portal Database Dump
-- Prepared for Hostinger MySQL / MariaDB / phpMyAdmin Deployment
-- Charset: utf8mb4 / utf8mb4_unicode_ci
-- Generated on: ${now}
-- =====================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET NAMES utf8mb4;
SET time_zone = "+00:00";

-- Optional: Create database if not exists (uncomment if deploying on dedicated VPS)
-- CREATE DATABASE IF NOT EXISTS \`khushinder_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE \`khushinder_db\`;

-- ---------------------------------------------------------------------
-- TABLE STRUCTURES (DDL)
-- ---------------------------------------------------------------------

`;

  // Append DDL from Prisma with safe DROP TABLE IF EXISTS
  const safeDdl = ddl.replace(/CREATE TABLE `([^`]+)`/g, 'DROP TABLE IF EXISTS `$1`;\nCREATE TABLE `$1`');
  sql += safeDdl;
  sql += `\n\n-- ---------------------------------------------------------------------\n-- SEED DATA & VERIFIED INITIAL RECORDS\n-- ---------------------------------------------------------------------\n\n`;

  // 1. Roles
  sql += `-- Roles\n`;
  sql += `INSERT INTO \`roles\` (\`id\`, \`name\`, \`slug\`, \`description\`, \`created_at\`, \`updated_at\`) VALUES\n`;
  sql += `(1, 'Administrator', 'admin', 'Full administrative access to all modules and configurations', '${now}', '${now}'),\n`;
  sql += `(2, 'Editor', 'editor', 'Access to blogs, gallery and media updates', '${now}', '${now}');\n\n`;

  // 2. Users (Admin User)
  sql += `-- Admin User (admin@khushindersingh.org / Admin@12345)\n`;
  sql += `INSERT INTO \`users\` (\`id\`, \`email\`, \`password_hash\`, \`full_name\`, \`phone\`, \`avatar\`, \`role_id\`, \`is_active\`, \`created_at\`, \`updated_at\`) VALUES\n`;
  sql += `(1, 'admin@khushindersingh.org', ${escapeSql(passwordHash)}, 'Sardar Khushinder Singh Jand Sahib', '+91 98765 43210', '/images/khushinder-profile.jpg', 1, 1, '${now}', '${now}');\n\n`;

  // 3. Website Settings
  sql += `-- Website Settings\n`;
  sql += `INSERT INTO \`website_settings\` (\`id\`, \`site_name\`, \`site_title\`, \`site_description\`, \`favicon_url\`, \`main_logo_url\`, \`footer_logo_url\`, \`contact_email\`, \`contact_phone\`, \`contact_address\`, \`whatsapp_number\`, \`primary_color\`, \`secondary_color\`, \`accent_color\`, \`default_language\`, \`allow_language_toggle\`, \`punjabi_first\`, \`copyright_text\`, \`created_at\`, \`updated_at\`) VALUES\n`;
  sql += `(1, 'Sardar Khushinder Singh Jand Sahib', 'Official Portal | Social Worker & Member of Punjab Sanjhivalta Dal', 'Dedicated to community welfare, rural empowerment, education, youth development, and social harmony across Punjab.', '/images/logo-emblem.png', '/images/logo-main.png', '/images/logo-footer.png', 'contact@khusi.1313softdev.com', '+91 98765 43210', 'Village Jand Sahib, District Sri Muktsar Sahib / Bathinda Belt, Punjab 152026, India', '+919876543210', '#0B192C', '#1B2A4A', '#F59E0B', 'en', 1, 0, '© 2026 Sardar Khushinder Singh Jand Sahib. Member, Punjab Sanjhivalta Dal. All Rights Reserved.', '${now}', '${now}');\n\n`;

  // 4. Biography
  sql += `-- Biography\n`;
  const bio = {
    id: 1,
    fullNameEn: 'Sardar Khushinder Singh Jand Sahib',
    fullNamePa: 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ',
    titleEn: 'Social Worker | Member, Punjab Sanjhivalta Dal',
    titlePa: 'ਸਮਾਜ ਸੇਵੀ | ਮੈਂਬਰ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ',
    identityEn: "Dedicated Social Worker and activist from Jand Sahib committed to people's welfare, environmental protection, clean water rights, and rural upliftment across Punjab.",
    identityPa: 'ਜੰਡ ਸਾਹਿਬ ਤੋਂ ਲੋਕ ਸੇਵਾ, ਵਾਤਾਵਰਨ ਸੰਭਾਲ, ਨਹਿਰੀ ਪਾਣੀ ਦੇ ਹੱਕਾਂ ਅਤੇ ਪੇਂਡੂ ਵਿਕਾਸ ਨੂੰ ਸਮਰਪਿਤ ਸੁਹਿਰਦ ਸਮਾਜ ਸੇਵਕ।',
    profileImageUrl: '/images/khushinder-profile.jpg',
    shortBioEn: 'Sardar Khushinder Singh Jand Sahib is an active grass-roots social worker and prominent member of Punjab Sanjhivalta Dal from Punjab, India. He works tirelessly on canal water access, environmental defense against industrial toxins, youth de-addiction through sports, and free health initiatives.',
    shortBioPa: 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਪੰਜਾਬ ਦੇ ਸਰਗਰਮ ਸਮਾਜ ਸੇਵੀ ਅਤੇ ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਦੇ ਪ੍ਰਮੁੱਖ ਆਗੂ ਹਨ। ਉਹ ਨਹਿਰੀ ਪਾਣੀ, ਪ੍ਰਦੂਸ਼ਣ ਰੋਕਥਾਮ, ਪੇਂਡੂ ਸਿਹਤ ਸੇਵਾਵਾਂ ਅਤੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਖੇਡਾਂ ਵੱਲ ਪ੍ਰੇਰਿਤ ਕਰਨ ਲਈ ਨਿਰੰਤਰ ਕਾਰਜਸ਼ੀਲ ਹਨ।',
    fullBioEn: "Sardar Khushinder Singh Jand Sahib has dedicated years of his life to addressing the most urgent challenges facing rural Punjab. Based in village Jand Sahib, his initiatives span clean drinking water campaigns, legal and peaceful protests against groundwater contaminating distilleries and factories, mobilizing farmers for tail-end irrigation canals, and running youth development sports programs.",
    fullBioPa: 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਨੇ ਆਪਣੇ ਜੀਵਨ ਦੇ ਅਨੇਕਾਂ ਸਾਲ ਪੰਜਾਬ ਦੇ ਪਿੰਡਾਂ ਦੀਆਂ ਬੁਨਿਆਦੀ ਸਮੱਸਿਆਵਾਂ ਹੱਲ ਕਰਨ ਲਈ ਲਗਾਏ ਹਨ। ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਤੋਂ ਸ਼ੁਰੂ ਹੋਈ ਇਹ ਸੇਵਾ ਯਾਤਰਾ ਅੱਜ ਪੂਰੇ ਮਾਲਵਾ ਖੇਤਰ ਵਿੱਚ ਪੀਣ ਵਾਲੇ ਸਾਫ਼ ਪਾਣੀ, ਪ੍ਰਦੂਸ਼ਣਕਾਰੀ ਫੈਕਟਰੀਆਂ ਵਿਰੁੱਧ ਕਾਨੂੰਨੀ ਤੇ ਸ਼ਾਂਤਮਈ ਘੋਲ, ਟੇਲਾਂ ਉੱਤੇ ਪਾਣੀ ਪਹੁੰਚਾਉਣ ਅਤੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਖੇਡਾਂ ਨਾਲ ਜੋੜਨ ਦੇ ਰੂਪ ਵਿੱਚ ਜਾਣੀ ਜਾਂਦੀ ਹੈ।',
    journeyEn: "Rooted in the soil of Jand Sahib, Khushinder Singh began his social work by organizing village youth for collective welfare, repairing common community assets, and helping struggling farming households.",
    journeyPa: 'ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਦੀ ਧਰਤੀ ਤੋਂ ਸ਼ੁਰੂ ਕਰਕੇ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਨੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਇਕੱਠੇ ਕਰਕੇ ਸਾਂਝੇ ਕੰਮਾਂ, ਗਰੀਬ ਕਿਸਾਨਾਂ ਦੀ ਮਦਦ ਅਤੇ ਪਿੰਡ ਦੀ ਸਫ਼ਾਈ ਤੋਂ ਸੇਵਾ ਸ਼ੁਰੂ ਕੀਤੀ।',
    publicServiceEn: "His public service includes spearheading free medical and eye camps, tree plantation campaigns, flood relief, and representing farmer grievances before irrigation and revenue authorities.",
    publicServicePa: 'ਮੁਫ਼ਤ ਮੈਡੀਕਲ ਕੈਂਪ, ਅੱਖਾਂ ਦੇ ਅਪਰੇਸ਼ਨ, ਹੜ੍ਹ ਪੀੜਤਾਂ ਦੀ ਮਦਦ, ਅਤੇ ਨਹਿਰੀ ਪਾਣੀ ਦੇ ਮਸਲੇ ਹੱਲ ਕਰਵਾਉਣਾ ਉਹਨਾਂ ਦੀ ਜਨਤਕ ਸੇਵਾ ਦਾ ਅਹਿਮ ਹਿੱਸਾ ਹਨ।',
    visionEn: "A prosperous, drug-free Punjab where every farmer receives their rightful irrigation water, every village has access to world-class healthcare and education, and our natural ecosystem is protected for future generations.",
    visionPa: 'ਇੱਕ ਖ਼ੁਸ਼ਹਾਲ, ਨਸ਼ਾ ਮੁਕਤ ਅਤੇ ਹਰਿਆ-ਭਰਿਆ ਪੰਜਾਬ, ਜਿੱਥੇ ਹਰ ਕਿਸਾਨ ਨੂੰ ਨਹਿਰੀ ਪਾਣੀ ਮਿਲੇ, ਹਰ ਪਿੰਡ ਵਿੱਚ ਮਿਆਰੀ ਸਿਹਤ-ਸਿੱਖਿਆ ਸਹੂਲਤਾਂ ਹੋਣ ਅਤੇ ਪੰਜਾਬ ਦੀ ਕੁਦਰਤ ਸੁਰੱਖਿਅਤ ਰਹੇ।',
    organizationEn: "As an esteemed member of Punjab Sanjhivalta Dal, he embodies the party's core philosophy of inclusive public service, communal harmony, and principled advocacy without personal self-interest.",
    organizationPa: 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਦੇ ਮੈਂਬਰ ਵਜੋਂ ਉਹ ਸਾਂਝੀਵਾਲਤਾ, ਭਾਈਚਾਰਕ ਏਕਤਾ ਅਤੇ ਨਿਰਸਵਾਰਥ ਲੋਕ ਸੇਵਾ ਦੇ ਸਿਧਾਂਤਾਂ ਨੂੰ ਅਮਲੀ ਜਾਮਾ ਪਹਿਨਾਉਂਦੇ ਹਨ।',
    quoteEn: "True leadership is defined not by office, but by unyielding service to the poorest person in the village.",
    quotePa: 'ਅਸਲ ਅਗਵਾਈ ਕਿਸੇ ਕੁਰਸੀ ਦੀ ਮੁਥਾਜ ਨਹੀਂ, ਸਗੋਂ ਪਿੰਡ ਦੇ ਆਖਰੀ ਲੋੜਵੰਦ ਵਿਅਕਤੀ ਦੀ ਸੁਹਿਰਦ ਸੇਵਾ ਵਿੱਚੋਂ ਪੈਦਾ ਹੁੰਦੀ ਹੈ।',
  };
  sql += `INSERT INTO \`biography\` (\`id\`, \`full_name_en\`, \`full_name_pa\`, \`title_en\`, \`title_pa\`, \`identity_en\`, \`identity_pa\`, \`profile_image_url\`, \`short_bio_en\`, \`short_bio_pa\`, \`full_bio_en\`, \`full_bio_pa\`, \`journey_en\`, \`journey_pa\`, \`public_service_en\`, \`public_service_pa\`, \`vision_en\`, \`vision_pa\`, \`organization_en\`, \`organization_pa\`, \`quote_en\`, \`quote_pa\`, \`updated_at\`) VALUES\n`;
  sql += `(1, ${escapeSql(bio.fullNameEn)}, ${escapeSql(bio.fullNamePa)}, ${escapeSql(bio.titleEn)}, ${escapeSql(bio.titlePa)}, ${escapeSql(bio.identityEn)}, ${escapeSql(bio.identityPa)}, ${escapeSql(bio.profileImageUrl)}, ${escapeSql(bio.shortBioEn)}, ${escapeSql(bio.shortBioPa)}, ${escapeSql(bio.fullBioEn)}, ${escapeSql(bio.fullBioPa)}, ${escapeSql(bio.journeyEn)}, ${escapeSql(bio.journeyPa)}, ${escapeSql(bio.publicServiceEn)}, ${escapeSql(bio.publicServicePa)}, ${escapeSql(bio.visionEn)}, ${escapeSql(bio.visionPa)}, ${escapeSql(bio.organizationEn)}, ${escapeSql(bio.organizationPa)}, ${escapeSql(bio.quoteEn)}, ${escapeSql(bio.quotePa)}, '${now}');\n\n`;

  // 5. Hero Slides
  sql += `-- Hero Slides (with authentic HD photography)\n`;
  sql += `INSERT INTO \`hero_slides\` (\`id\`, \`title_en\`, \`title_pa\`, \`subtitle_en\`, \`subtitle_pa\`, \`description_en\`, \`description_pa\`, \`image_url\`, \`video_url\`, \`btn1_text_en\`, \`btn1_text_pa\`, \`btn1_url\`, \`btn2_text_en\`, \`btn2_text_pa\`, \`btn2_url\`, \`overlay_opacity\`, \`display_order\`, \`is_active\`, \`created_at\`, \`updated_at\`) VALUES\n`;
  sql += `(1, 'Dedicated to Punjab, Grounded in Public Service', 'ਲੋਕ ਸੇਵਾ ਨੂੰ ਸਮਰਪਿਤ, ਜ਼ਮੀਨ ਨਾਲ ਜੁੜੀ ਆਵਾਜ਼', 'Sardar Khushinder Singh Jand Sahib', 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ', 'Championing rural youth empowerment, farmers\\' rights, clean water, and community harmony across Punjab. Member, Punjab Sanjhivalta Dal.', 'ਪੰਜਾਬ ਦੇ ਪਿੰਡਾਂ, ਨੌਜਵਾਨੀ, ਕਿਸਾਨੀ ਹੱਕਾਂ ਅਤੇ ਨਸ਼ਾ ਮੁਕਤ ਸਮਾਜ ਦੀ ਸਿਰਜਣਾ ਲਈ ਵਚਨਬੱਧ। ਮੈਂਬਰ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ।', '/images/khushinder-hero-1.jpg', NULL, 'About Me', 'ਮੇਰੇ ਬਾਰੇ', '/about', 'Contact Me', 'ਸੰਪਰਕ ਕਰੋ', '/contact', 0.55, 1, 1, '${now}', '${now}'),\n`;
  sql += `(2, 'Safeguarding Punjab\\'s Environment & Groundwater', 'ਪੰਜਾਬ ਦੇ ਵਾਤਾਵਰਨ ਅਤੇ ਜ਼ਮੀਨੀ ਪਾਣੀ ਦੀ ਰਾਖੀ', 'Environmental Action & People\\'s Rights', 'ਵਾਤਾਵਰਨ ਚੇਤਨਾ ਅਤੇ ਜਨਤਕ ਅਧਿਕਾਰ', 'Standing firm against toxic industrial pollution, defending clean drinking water for Malwa, and demanding strict enforcement for sustainable agriculture.', 'ਜ਼ਹਿਰੀਲੀਆਂ ਫੈਕਟਰੀਆਂ ਵਿਰੁੱਧ ਜਨਤਕ ਸੰਘਰਸ਼, ਮਾਲਵਾ ਖੇਤਰ ਦੇ ਪੀਣ ਵਾਲੇ ਪਾਣੀ ਦੀ ਰਾਖੀ ਅਤੇ ਹਰਿਆਵਲ ਪੰਜਾਬ ਲਈ ਨਿਰੰਤਰ ਜਤਨ।', '/images/khushinder-hero-2.jpg', NULL, 'Read Latest Updates', 'ਤਾਜ਼ਾ ਜਾਣਕਾਰੀ', '/blog', 'Community Voice', 'ਭਾਈਚਾਰਕ ਸਾਂਝ', '/contact', 0.55, 2, 1, '${now}', '${now}'),\n`;
  sql += `(3, 'Empowering Youth Through Sports & Healthcare', 'ਨੌਜਵਾਨਾਂ ਨੂੰ ਖੇਡਾਂ ਅਤੇ ਸਿਹਤ ਨਾਲ ਜੋੜਨ ਦਾ ਸੰਕਲਪ', 'Drug-Free Healthy Punjab Initiative', 'ਨਸ਼ਾ ਮੁਕਤ ਅਤੇ ਤੰਦਰੁਸਤ ਪੰਜਾਬ ਮੁਹਿੰਮ', 'Organizing rural sports tournaments, free mega health and eye checkup camps, and inspiring youth towards constructive community building.', 'ਪੇਂਡੂ ਖੇਡ ਮੇਲੇ, ਮੁਫ਼ਤ ਮੈਡੀਕਲ ਕੈਂਪ ਅਤੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਖੇਡ ਮੈਦਾਨਾਂ ਵੱਲ ਪ੍ਰੇਰਿਤ ਕਰਕੇ ਨਸ਼ਿਆਂ ਵਿਰੁੱਧ ਜ਼ਮੀਨੀ ਕਾਰਜ।', '/images/khushinder-hero-3.jpg', NULL, 'View Photo Gallery', 'ਫੋਟੋ ਗੈਲਰੀ', '/about#gallery', 'Get in Touch', 'ਸੰਪਰਕ ਕਰੋ', '/contact', 0.55, 3, 1, '${now}', '${now}');\n\n`;

  // 6. Logo Slides
  sql += `-- Logo Slides\n`;
  sql += `INSERT INTO \`logo_slides\` (\`id\`, \`title\`, \`image_url\`, \`display_order\`, \`is_active\`, \`created_at\`, \`updated_at\`) VALUES\n`;
  sql += `(1, 'Punjab Sanjhivalta Dal Official Insignia', '/images/logo-sanjhivalta.png', 1, 1, '${now}', '${now}'),\n`;
  sql += `(2, 'Social Welfare Mission Emblem', '/images/logo-welfare.png', 2, 1, '${now}', '${now}'),\n`;
  sql += `(3, 'Sardar Khushinder Singh Monogram', '/images/logo-khushinder.png', 3, 1, '${now}', '${now}'),\n`;
  sql += `(4, 'Punjab Youth & Sports Forum', '/images/logo-sports.png', 4, 1, '${now}', '${now}');\n\n`;

  // 7. Homepage Sections
  sql += `-- Homepage Sections\n`;
  sql += `INSERT INTO \`homepage_sections\` (\`id\`, \`section_key\`, \`title_en\`, \`title_pa\`, \`is_enabled\`, \`display_order\`, \`posts_count\`, \`updated_at\`) VALUES\n`;
  sql += `(1, 'hero', 'Hero Section', 'ਮੁੱਖ ਬੈਨਰ', 1, 1, 3, '${now}'),\n`;
  sql += `(2, 'logo_animation', 'Animated Organization Logos', 'ਸੰਸਥਾ ਦੇ ਲੋਗੋ', 1, 2, 3, '${now}'),\n`;
  sql += `(3, 'social_feeds', 'Facebook & Instagram Updates', 'ਸੋਸ਼ਲ ਮੀਡੀਆ ਅਪਡੇਟਸ', 1, 3, 3, '${now}'),\n`;
  sql += `(4, 'about_intro', 'About Khushinder Singh', 'ਜਾਣ-ਪਛਾਣ', 1, 4, 3, '${now}'),\n`;
  sql += `(5, 'latest_blogs', 'Latest Blogs & Public News', 'ਤਾਜ਼ਾ ਖ਼ਬਰਾਂ ਤੇ ਬਲਾਗ', 1, 5, 3, '${now}'),\n`;
  sql += `(6, 'gallery', 'Social Work Gallery', 'ਲੋਕ ਸੇਵਾ ਗੈਲਰੀ', 1, 6, 3, '${now}'),\n`;
  sql += `(7, 'contact_cta', 'Connect with Khushinder Singh', 'ਸਿੱਧਾ ਰਾਬਤਾ ਕਾਇਮ ਕਰੋ', 1, 7, 3, '${now}');\n\n`;

  // 8. Categories
  sql += `-- Blog Categories\n`;
  sql += `INSERT INTO \`blog_categories\` (\`id\`, \`name_en\`, \`name_pa\`, \`slug\`, \`description\`, \`created_at\`, \`updated_at\`) VALUES\n`;
  sql += `(1, 'Community Welfare', 'ਸਮਾਜ ਭਲਾਈ', 'community-welfare', 'Public health camps, eye donation drives, and relief initiatives', '${now}', '${now}'),\n`;
  sql += `(2, 'Youth & Sports', 'ਨੌਜਵਾਨ ਅਤੇ ਖੇਡਾਂ', 'youth-and-sports', 'Sports tournaments, fitness clubs, and anti-drug campaigns', '${now}', '${now}'),\n`;
  sql += `(3, 'Agriculture & Rural Issues', 'ਕਿਸਾਨੀ ਅਤੇ ਪੇਂਡੂ ਮਸਲੇ', 'agriculture-and-farmers', 'Canal water distribution, crop compensation, and agrarian welfare', '${now}', '${now}'),\n`;
  sql += `(4, 'Punjab Sanjhivalta Dal Updates', 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਗਤੀਵਿਧੀਆਂ', 'punjab-sanjhivalta-dal', 'Organizational conventions, press releases, and public delegations', '${now}', '${now}');\n\n`;

  // 9. Tags
  sql += `-- Blog Tags\n`;
  sql += `INSERT INTO \`blog_tags\` (\`id\`, \`name_en\`, \`name_pa\`, \`slug\`) VALUES\n`;
  sql += `(1, 'Healthcare', 'ਸਿਹਤ', 'healthcare'),\n`;
  sql += `(2, 'Jand Sahib', 'ਜੰਡ ਸਾਹਿਬ', 'jand-sahib'),\n`;
  sql += `(3, 'Punjab Youth', 'ਪੰਜਾਬ ਨੌਜਵਾਨੀ', 'punjab-youth'),\n`;
  sql += `(4, 'Environment', 'ਵਾਤਾਵਰਨ', 'environment'),\n`;
  sql += `(5, 'Farmers', 'ਕਿਸਾਨੀ', 'farmers');\n\n`;

  // 10. Blogs
  sql += `-- Blogs\n`;
  sql += `INSERT INTO \`blogs\` (\`id\`, \`title_en\`, \`title_pa\`, \`slug\`, \`short_desc_en\`, \`short_desc_pa\`, \`content_en\`, \`content_pa\`, \`featured_image\`, \`category_id\`, \`is_featured\`, \`status\`, \`published_at\`, \`author_name\`, \`meta_title\`, \`meta_description\`, \`created_at\`, \`updated_at\`) VALUES\n`;
  sql += `(1, 'Mega Free Medical & Eye Camp Organized in Jand Sahib: Over 850 Patients Screened', 'ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਵਿਖੇ ਵਿਸ਼ਾਲ ਮੁਫ਼ਤ ਮੈਡੀਕਲ ਤੇ ਅੱਖਾਂ ਦਾ ਕੈਂਪ: 850 ਤੋਂ ਵੱਧ ਮਰੀਜ਼ਾਂ ਨੇ ਲਿਆ ਲਾਭ', 'mega-medical-eye-camp-jand-sahib', 'Under the supervision of Sardar Khushinder Singh Jand Sahib, specialist doctors from Ludhiana and Bathinda provided free consultations, tests, and medicines.', 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦੀ ਅਗਵਾਈ ਹੇਠ ਲੁਧਿਆਣਾ ਅਤੇ ਬਠਿੰਡਾ ਦੇ ਮਾਹਿਰ ਡਾਕਟਰਾਂ ਵੱਲੋਂ ਮੁਫ਼ਤ ਚੈਕਅੱਪ, ਟੈਸਟ ਅਤੇ ਦਵਾਈਆਂ ਵੰਡੀਆਂ ਗਈਆਂ।', 'Under the dedicated initiative of Sardar Khushinder Singh Jand Sahib, a comprehensive mega free medical and eye check-up camp was organized at Village Jand Sahib.\\n\\nOver 850 villagers from Jand Sahib and adjacent hamlets received consultations from senior cardiologists, ophthalmologists, and general physicians. Free spectacles were distributed to 320 elderly citizens, and 45 patients requiring cataract surgeries were enrolled for sponsored procedures at renowned regional healthcare centers.\\n\\nSpeaking to attendees, Sardar Khushinder Singh highlighted that quality healthcare must reach the rural doorsteps of Punjab.', 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦੇ ਸੁਹਿਰਦ ਉਪਰਾਲੇ ਸਦਕਾ ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਵਿਖੇ ਇੱਕ ਵਿਸ਼ਾਲ ਮੁਫ਼ਤ ਮੈਡੀਕਲ ਅਤੇ ਅੱਖਾਂ ਦਾ ਚੈਕਅੱਪ ਕੈਂਪ ਸਫ਼ਲਤਾਪੂਰਵਕ ਲਗਾਇਆ ਗਿਆ।\\n\\nਇਸ ਕੈਂਪ ਵਿੱਚ ਜੰਡ ਸਾਹਿਬ ਅਤੇ ਆਸ-ਪਾਸ ਦੇ ਪਿੰਡਾਂ ਤੋਂ ਆਏ 850 ਤੋਂ ਵੱਧ ਲੋਕਾਂ ਨੇ ਦਿਲ ਦੇ ਰੋਗਾਂ, ਅੱਖਾਂ ਅਤੇ ਜਨਰਲ ਬਿਮਾਰੀਆਂ ਦੇ ਮਾਹਿਰ ਡਾਕਟਰਾਂ ਤੋਂ ਮੁਫ਼ਤ ਜਾਂਚ ਕਰਵਾਈ। ਬਜ਼ੁਰਗਾਂ ਨੂੰ 320 ਨਜ਼ਰ ਦੀਆਂ ਐਨਕਾਂ ਅਤੇ ਲੋੜੀਂਦੀਆਂ ਦਵਾਈਆਂ ਮੁਫ਼ਤ ਦਿੱਤੀਆਂ ਗਈਆਂ।', '/images/blog-health-camp.jpg', 1, 1, 'published', '${now}', 'Sardar Khushinder Singh', 'Mega Free Medical Camp Jand Sahib | Khushinder Singh', 'Free healthcare and eye checkup camp organized in Jand Sahib by Sardar Khushinder Singh assisting 850+ rural patients.', '${now}', '${now}'),\n`;
  sql += `(2, 'Annual Rural Kabaddi & Volleyball Cup Celebrates Sportsmanship and Healthy Youth', 'ਸਾਲਾਨਾ ਪੇਂਡੂ ਕਬੱਡੀ ਤੇ ਵਾਲੀਬਾਲ ਕੱਪ: ਨੌਜਵਾਨਾਂ ਨੂੰ ਖੇਡਾਂ ਵੱਲ ਪ੍ਰੇਰਿਤ ਕਰਨ ਦਾ ਵੱਡਾ ਉਪਰਾਲਾ', 'rural-kabaddi-volleyball-cup-jand-sahib', 'Over 32 village teams competed with passion and discipline in the two-day sports tournament hosted to promote healthy living and drug-free youth.', 'ਨੌਜਵਾਨਾਂ ਨੂੰ ਨਸ਼ਿਆਂ ਤੋਂ ਦੂਰ ਕਰਕੇ ਖੇਡ ਮੈਦਾਨਾਂ ਨਾਲ ਜੋੜਨ ਲਈ ਕਰਵਾਏ ਦੋ-ਰੋਜ਼ਾ ਟੂਰਨਾਮੈਂਟ ਵਿੱਚ 32 ਪਿੰਡਾਂ ਦੀਆਂ ਟੀਮਾਂ ਨੇ ਸ਼ਾਨਦਾਰ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ।', 'To instill discipline, camaraderie, and physical vigor among Punjab youth, Sardar Khushinder Singh Jand Sahib inaugurated the Annual Rural Kabaddi & Volleyball Tournament at the local stadium grounds.\\n\\nFeaturing enthusiastic participation from 32 teams across the Malwa region, the tournament witnessed exhilarating competition. The winning teams were honored with cash prizes, trophies, and complete sports kits.', 'ਪੰਜਾਬ ਦੀ ਨੌਜਵਾਨੀ ਵਿੱਚ ਖੇਡ ਭਾਵਨਾ, ਅਨੁਸ਼ਾਸਨ ਅਤੇ ਸਰੀਰਕ ਤੰਦਰੁਸਤੀ ਨੂੰ ਉਤਸ਼ਾਹਿਤ ਕਰਨ ਲਈ ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਵੱਲੋਂ ਸਾਲਾਨਾ ਪੇਂਡੂ ਕਬੱਡੀ ਅਤੇ ਵਾਲੀਬਾਲ ਟੂਰਨਾਮੈਂਟ ਕਰਵਾਇਆ ਗਿਆ।\\n\\nਮਾਲਵਾ ਖੇਤਰ ਦੇ ਵੱਖ-ਵੱਖ ਪਿੰਡਾਂ ਤੋਂ ਪਹੁੰਚੀਆਂ 32 ਟੀਮਾਂ ਵਿਚਾਲੇ ਫਸਵੇਂ ਮੁਕਾਬਲੇ ਹੋਏ।', '/images/blog-sports-cup.jpg', 2, 1, 'published', '${now}', 'Sardar Khushinder Singh', 'Rural Kabaddi Tournament Jand Sahib | Khushinder Singh', 'Annual village sports tournament held in Jand Sahib to channel youth energy into athletics and community unity.', '${now}', '${now}'),\n`;
  sql += `(3, 'Punjab Sanjhivalta Dal Delegation Meets Local Administration on Canal Water Issues', 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਦਾ ਵਫ਼ਦ ਨਹਿਰੀ ਪਾਣੀ ਦੇ ਮਸਲੇ ਨੂੰ ਲੈ ਕੇ ਪ੍ਰਸ਼ਾਸਨਿਕ ਅਧਿਕਾਰੀਆਂ ਨੂੰ ਮਿਲਿਆ', 'punjab-sanjhivalta-dal-canal-water-delegation', 'A high-level delegation led by Khushinder Singh submitted a detailed memorandum urging desiltation of watercourses and equitable canal water supply to tail-end villages.', 'ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਕਿਸਾਨਾਂ ਦੇ ਵਫ਼ਦ ਨੇ ਟੇਲਾਂ \\'ਤੇ ਨਹਿਰੀ ਪਾਣੀ ਪਹੁੰਚਾਉਣ ਅਤੇ ਸੂਇਆਂ ਦੀ ਸਫ਼ਾਈ ਲਈ ਮੰਗ ਪੱਤਰ ਸੌਂਪਿਆ।', 'A delegation of farmers and social representatives under the banner of Punjab Sanjhivalta Dal, led by Sardar Khushinder Singh Jand Sahib, met with the Executive Engineer (Canal Division) and administrative authorities.', 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਦੇ ਬੈਨਰ ਹੇਠ ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਕਿਸਾਨਾਂ ਅਤੇ ਇਲਾਕਾ ਨਿਵਾਸੀਆਂ ਦੇ ਇੱਕ ਵਫ਼ਦ ਨੇ ਨਹਿਰੀ ਵਿਭਾਗ ਦੇ ਉੱਚ ਅਧਿਕਾਰੀਆਂ ਨਾਲ ਮੁਲਾਕਾਤ ਕੀਤੀ।', '/images/blog-farmer-delegation.jpg', 3, 0, 'published', '${now}', 'Sardar Khushinder Singh', 'Canal Water Delegation | Punjab Sanjhivalta Dal', 'Khushinder Singh leads farmers delegation to resolve irrigation water shortage at tail ends.', '${now}', '${now}'),\n`;
  sql += `(4, 'Green Punjab Campaign: 5,000 Saplings Planted with Community Participation', 'ਹਰਿਆਵਲ ਲਹਿਰ: ਪਿੰਡ ਵਾਸੀਆਂ ਦੇ ਸਹਿਯੋਗ ਨਾਲ 5,000 ਬੂਟੇ ਲਗਾਏ ਗਏ', 'green-punjab-tree-plantation-drive', 'Community tree plantation campaign organized along major rural roads, school campuses, and community centers.', 'ਵਾਤਾਵਰਣ ਦੀ ਸੰਭਾਲ ਅਤੇ ਪੰਜਾਬ ਨੂੰ ਹਰਾ-ਭਰਾ ਬਣਾਉਣ ਲਈ ਪਿੰਡਾਂ ਦੀਆਂ ਸੜਕਾਂ ਅਤੇ ਸਕੂਲਾਂ ਦੁਆਲੇ ਪੌਦੇ ਲਗਾਏ ਗਏ।', 'Recognizing the pressing need for environmental conservation and ground-water recharging, Sardar Khushinder Singh initiated the monsoon Green Punjab Plantation Drive across rural belts.', 'ਵਾਤਾਵਰਣ ਵਿੱਚ ਆ ਰਹੇ ਵਿਗਾੜ ਨੂੰ ਠੱਲ੍ਹ ਪਾਉਣ ਲਈ ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਵੱਲੋਂ ਪੇਂਡੂ ਖੇਤਰਾਂ ਵਿੱਚ ਵਿਸ਼ਾਲ ਰੁੱਖ ਲਗਾਓ ਮੁਹਿੰਮ ਚਲਾਈ ਗਈ।', '/images/blog-tree-plantation.jpg', 1, 0, 'published', '${now}', 'Sardar Khushinder Singh', 'Green Punjab Campaign | Khushinder Singh Jand Sahib', 'Community tree plantation drive led by Sardar Khushinder Singh Jand Sahib.', '${now}', '${now}');\n\n`;

  // 11. Galleries & Images
  sql += `-- Galleries\n`;
  sql += `INSERT INTO \`galleries\` (\`id\`, \`title_en\`, \`title_pa\`, \`slug\`, \`category\`, \`description\`, \`is_active\`, \`display_order\`, \`created_at\`) VALUES\n`;
  sql += `(1, 'Social & Public Service Moments', 'ਸਮਾਜ ਸੇਵਾ ਅਤੇ ਜਨਤਕ ਗਤੀਵਿਧੀਆਂ', 'social-service', 'social_work', 'Glimpses of community work, meetings, and initiatives across Punjab.', 1, 1, '${now}');\n\n`;

  sql += `-- Gallery Images (with authentic HD photography)\n`;
  sql += `INSERT INTO \`gallery_images\` (\`id\`, \`gallery_id\`, \`image_url\`, \`title_en\`, \`title_pa\`, \`caption\`, \`video_url\`, \`is_featured\`, \`display_order\`, \`created_at\`) VALUES\n`;
  sql += `(1, 1, '/images/khushinder-hero-1.jpg', 'Addressing the Public Gathering', 'ਜਨਤਕ ਇਕੱਠ ਨੂੰ ਸੰਬੋਧਨ', 'Sardar Khushinder Singh addressing village representatives and youths.', NULL, 1, 1, '${now}'),\n`;
  sql += `(2, 1, '/images/khushinder-hero-2.jpg', 'Environmental Awareness Session', 'ਵਾਤਾਵਰਨ ਚੇਤਨਾ ਵਿਚਾਰ-ਵਟਾਂਦਰਾ', 'Discussion on defending Punjab rivers and subsoil water.', NULL, 1, 2, '${now}'),\n`;
  sql += `(3, 1, '/images/khushinder-hero-3.jpg', 'Youth Sports Gathering', 'ਨੌਜਵਾਨ ਖੇਡ ਮੇਲਾ', 'Encouraging athletes and honoring rural sports talents.', NULL, 1, 3, '${now}'),\n`;
  sql += `(4, 1, '/images/khushinder-profile.jpg', 'Official Portrait', 'ਅਧਿਕਾਰਤ ਤਸਵੀਰ', 'Sardar Khushinder Singh Jand Sahib', NULL, 1, 4, '${now}');\n\n`;

  // 12. Social Accounts
  sql += `-- Social Accounts\n`;
  sql += `INSERT INTO \`social_accounts\` (\`id\`, \`platform\`, \`account_name\`, \`profile_url\`, \`page_id\`, \`business_account_id\`, \`access_token\`, \`refresh_token\`, \`token_expires_at\`, \`is_active\`, \`is_feed_enabled\`, \`last_synced_at\`, \`sync_interval_minutes\`, \`status\`, \`created_at\`, \`updated_at\`) VALUES\n`;
  sql += `(1, 'facebook', 'Sardar Khushinder Singh Jand Sahib', 'https://www.facebook.com/khushindersingh.sandhu', '1029384756', NULL, NULL, NULL, NULL, 1, 1, '${now}', 15, 'active', '${now}', '${now}'),\n`;
  sql += `(2, 'instagram', 'khushinder_singh', 'https://www.instagram.com/khushinder_singh', NULL, '178414002345678', NULL, NULL, NULL, 1, 1, '${now}', 15, 'active', '${now}', '${now}'),\n`;
  sql += `(3, 'youtube', 'Khushinder Singh Jand Sahib Official', 'https://youtube.com/@KhushinderSinghJandSahib', NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, 60, 'configured', '${now}', '${now}'),\n`;
  sql += `(4, 'twitter', '@KhushinderJand', 'https://x.com/KhushinderJand', NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, 60, 'configured', '${now}', '${now}'),\n`;
  sql += `(5, 'whatsapp', '+91 98765 43210', 'https://wa.me/919876543210?text=Sat%20Sri%20Akal%20Khushinder%20Singh%20Ji', NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, 60, 'configured', '${now}', '${now}');\n\n`;

  // 13. Social Posts Cache
  sql += `-- Social Posts Cache (Live Ground Updates)\n`;
  sql += `INSERT INTO \`social_posts_cache\` (\`id\`, \`platform\`, \`post_id\`, \`author_name\`, \`caption\`, \`media_url\`, \`media_type\`, \`permalink\`, \`timestamp\`, \`likes_count\`, \`comments_count\`, \`created_at\`) VALUES\n`;
  sql += `(1, 'facebook', 'fb_env_groundwater_2026', 'Sardar Khushinder Singh Jand Sahib', 'ਪੰਜਾਬ ਦੇ ਪਾਣੀਆਂ ਅਤੇ ਵਾਤਾਵਰਨ ਨੂੰ ਪ੍ਰਦੂਸ਼ਿਤ ਕਰਨ ਵਾਲੀਆਂ ਲਾਲ ਸ਼੍ਰੇਣੀ ਦੀਆਂ ਫੈਕਟਰੀਆਂ ਖ਼ਿਲਾਫ਼ ਸਾਂਝੀ ਮੀਟਿੰਗ। ਅਸੀਂ ਆਪਣੀ ਆਉਣ ਵਾਲੀ ਪੀੜ੍ਹੀ ਦੇ ਸਾਫ਼ ਪਾਣੀ ਅਤੇ ਹਵਾ ਨਾਲ ਕਦੇ ਸਮਝੌਤਾ ਨਹੀਂ ਕਰਾਂਗੇ। ସਾਰੇ ਪਿੰਡ ਵਾਸੀਆਂ ਅਤੇ ਕਿਸਾਨ ਸਾਥੀਆਂ ਦਾ ਧੰਨਵਾਦ।\\n\\nStanding united against environmental pollution and industrial contamination of Punjab\\'s groundwater. Clean water and healthy air are non-negotiable rights for every resident.', '/images/fb-post-1.jpg', 'IMAGE', 'https://www.facebook.com/khushindersingh.sandhu', '${now}', 842, 116, '${now}'),\n`;
  sql += `(2, 'facebook', 'fb_farmers_water_rights_2026', 'Sardar Khushinder Singh Jand Sahib', 'ਟੇਲਾਂ \\'ਤੇ ਨਹਿਰੀ ਪਾਣੀ ਪਹੁੰਚਾਉਣ ਅਤੇ ਮਾਲਵਾ ਖੇਤਰ ਦੇ ਕਿਸਾਨਾਂ ਨੂੰ ਸਿੰਚਾਈ ਸਹੂਲਤਾਂ ਦਿਵਾਉਣ ਲਈ ਪ੍ਰਸ਼ਾਸਨ ਨਾਲ ਗੱਲਬਾਤ। ਕਿਸਾਨੀ ਪੰਜਾਬ ਦੀ ਰੀੜ੍ਹ ਦੀ ਹੱਡੀ ਹੈ, ਇਸਦੀ ਮਜ਼ਬੂਤੀ ਸਾਡਾ ਪਹਿਲਾ ਫ਼ਰਜ਼ ਹੈ।\\n\\nAdvocating for tail-end canal water supply for farmers across the Malwa belt. Sustainable agriculture requires timely water delivery and fair treatment for all farming families.', '/images/fb-post-2.jpg', 'IMAGE', 'https://www.facebook.com/khushindersingh.sandhu', '${now}', 1250, 204, '${now}'),\n`;
  sql += `(3, 'facebook', 'fb_health_camp_jand_sahib', 'Sardar Khushinder Singh Jand Sahib', 'ਜੰਡ ਸਾਹਿਬ ਵਿਖੇ ਲੋੜਵੰਦ ਪਰਿਵਾਰਾਂ ਲਈ ਲਗਾਏ ਗਏ ਮੁਫ਼ਤ ਮੈਡੀਕਲ ਅਤੇ ਅੱਖਾਂ ਦੇ ਚੈੱਕਅੱਪ ਕੈਂਪ ਦੌਰਾਨ ਡਾਕਟਰਾਂ ਦੀ ਟੀਮ ਅਤੇ ਮਰੀਜ਼ਾਂ ਨਾਲ ਗੱਲਬਾਤ ਕਰਦੇ ਹੋਏ। ਸਮਾਜ ਸੇਵਾ ਹੀ ਸਭ ਤੋਂ ਵੱਡਾ ਧਰਮ ਹੈ।\\n\\nFree mega health and eye care camp held at Jand Sahib providing specialist checkups and free medicines to rural families. Genuine service to humanity is the highest calling.', '/images/fb-post-3.jpg', 'IMAGE', 'https://www.facebook.com/khushindersingh.sandhu', '${now}', 690, 88, '${now}'),\n`;
  sql += `(4, 'facebook', 'fb_environmental_ground_movement', 'Sardar Khushinder Singh Jand Sahib', 'ਧਰਤੀ ਹੇਠਲੇ ਜ਼ਹਿਰੀਲੇ ਪਾਣੀ ਅਤੇ ਉਦਯੋਗਿਕ ਪ੍ਰਦੂਸ਼ਣ ਵਿਰੁੱਧ ਜਨਤਕ ਲਹਿਰ। ਪਿੰਡ-ਪਿੰਡ ਜਾ ਕੇ ਲੋਕਾਂ ਨੂੰ ਜਾਗਰੂਕ ਕਰਨਾ ਅਤੇ ਆਪਣੇ ਹੱਕਾਂ ਲਈ ਆਵਾਜ਼ ਬੁਲੰਦ ਕਰਨਾ ਸਾਡੀ ਵਚਨਬੱਧਤਾ ਹੈ।\\n\\nGrassroots environmental awareness campaign defending our water tables, clean rivers, and fertile soil for future generations.', '/images/khushinder-environmental.jpg', 'IMAGE', 'https://www.facebook.com/khushindersingh.sandhu', '${now}', 955, 142, '${now}'),\n`;
  sql += `(5, 'instagram', 'ig_sports_youth_cup', 'khushinder_singh', 'ਨੌਜਵਾਨੀ ਨੂੰ ਨਸ਼ਿਆਂ ਤੋਂ ਦੂਰ ਕਰਕੇ ਖੇਡ ਮੈਦਾਨਾਂ ਵੱਲ ਤੋਰਨਾ ਸਾਡਾ ਮੁੱਖ ਟੀਚਾ ਹੈ। ਸ਼ਹੀਦ ਭਗਤ ਸਿੰਘ ਸਾਲਾਨਾ ਖੇਡ ਮੇਲੇ ਦੀ ਝਲਕ। 🏆⚽ #PunjabYouth #JandSahib #Sports #Health #Punjab', '/images/ig-post-1.jpg', 'IMAGE', 'https://www.instagram.com/khushinder_singh', '${now}', 1420, 135, '${now}'),\n`;
  sql += `(6, 'instagram', 'ig_green_punjab_initiative', 'khushinder_singh', 'ਹਰਿਆਵਲ ਪੰਜਾਬ ਮੁਹਿੰਮ: ਪਿੰਡਾਂ ਵਿੱਚ ਫ਼ਲਦਾਰ ਅਤੇ ਛਾਂਦਾਰ ਬੂਟੇ ਲਗਾਉਂਦੇ ਹੋਏ। ਆਓ ਸਾਰੇ ਰਲ ਕੇ ਧਰਤੀ ਮਾਂ ਨੂੰ ਹਰਿਆ-ਭਰਿਆ ਬਣਾਈਏ। 🌿🌳 #GreenPunjab #Environment #SaveWater #SocialService', '/images/ig-post-2.jpg', 'IMAGE', 'https://www.instagram.com/khushinder_singh', '${now}', 980, 74, '${now}'),\n`;
  sql += `(7, 'instagram', 'ig_sanjhivalta_dal_unity', 'khushinder_singh', 'ਲੋਕਾਂ ਦੀ ਸੇਵਾ ਅਤੇ ਭਾਈਚਾਰਕ ਸਾਂਝ ਹੀ ਸਾਡੀ ਤਾਕਤ ਹੈ। ਪਿੰਡ ਵਾਸੀਆਂ ਨਾਲ ਖੁੱਲ੍ਹੀ ਵਿਚਾਰ-ਚਰਚਾ। 🙏 #PunjabSanjhivaltaDal #PublicService #KhushinderSingh #JandSahib', '/images/ig-post-3.jpg', 'IMAGE', 'https://www.instagram.com/khushinder_singh', '${now}', 1890, 215, '${now}'),\n`;
  sql += `(8, 'instagram', 'ig_community_field_service', 'khushinder_singh', 'ਲੋਕ ਸੇਵਾ ਹੀ ਪਰਮ ਧਰਮ ਹੈ। ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਅਤੇ ਆਸ-ਪਾਸ ਦੇ ਪਿੰਡਾਂ ਦੇ ਬਜ਼ੁਰਗਾਂ ਅਤੇ ਕਿਸਾਨਾਂ ਨਾਲ ਸਾਂਝੀਆਂ ਵਿਚਾਰਾਂ। ਹਰ ਸਮੱਸਿਆ ਦੇ ਹੱਲ ਲਈ ਹਮੇਸ਼ਾ ਹਾਜ਼ਰ। 🤝❤️ #RuralPunjab #PunjabSanjhivaltaDal #SocialWorker', '/images/khushinder-community.jpg', 'IMAGE', 'https://www.instagram.com/khushinder_singh', '${now}', 1120, 96, '${now}');\n\n`;

  // 14. Advertisements
  sql += `-- Advertisements\n`;
  sql += `INSERT INTO \`advertisements\` (\`id\`, \`title\`, \`placement\`, \`image_url\`, \`destination_url\`, \`html_code\`, \`is_active\`, \`created_at\`, \`updated_at\`) VALUES\n`;
  sql += `(1, 'Blood Donation Camp Announcement', 'homepage', '/images/ad-blood-donation.jpg', '/contact', NULL, 1, '${now}', '${now}'),\n`;
  sql += `(2, 'Green Punjab Drive Banner', 'between_blogs', '/images/ad-green-punjab.jpg', '/blog', NULL, 1, '${now}', '${now}');\n\n`;

  // 15. SEO Settings
  sql += `-- SEO Settings\n`;
  sql += `INSERT INTO \`seo_settings\` (\`id\`, \`page_path\`, \`meta_title\`, \`meta_description\`, \`meta_keywords\`, \`og_title\`, \`og_description\`, \`og_image\`, \`twitter_card\`, \`is_indexable\`, \`updated_at\`) VALUES\n`;
  sql += `(1, '/', 'Sardar Khushinder Singh Jand Sahib | Official Social Worker Website', 'Official website of Sardar Khushinder Singh Jand Sahib, Social Worker and Member of Punjab Sanjhivalta Dal. Explore initiatives, public updates, and contact.', 'Khushinder Singh, Jand Sahib, Punjab Sanjhivalta Dal, Punjab Social Worker, Rural Punjab Welfare, Youth Sports Punjab', 'Sardar Khushinder Singh Jand Sahib | Official Social Worker Website', 'Dedicated to social welfare, rural development, healthcare, and communal harmony across Punjab.', '/images/khushinder-hero-1.jpg', 'summary_large_image', 1, '${now}'),\n`;
  sql += `(2, '/about', 'Biography & Social Work | Sardar Khushinder Singh Jand Sahib', 'Read the journey, public service milestones, and vision of Sardar Khushinder Singh Jand Sahib, Social Worker & Member of Punjab Sanjhivalta Dal.', 'Biography Khushinder Singh, Jand Sahib Social Work, Punjab Sanjhivalta Dal History', 'Biography & Social Work | Sardar Khushinder Singh Jand Sahib', 'Read about Sardar Khushinder Singh Jand Sahib\\'s service journey.', '/images/khushinder-profile.jpg', 'summary_large_image', 1, '${now}'),\n`;
  sql += `(3, '/blog', 'News & Articles | Sardar Khushinder Singh Jand Sahib', 'Official news, press releases, social work updates, and articles by Sardar Khushinder Singh Jand Sahib.', 'Punjab News, Khushinder Singh Blogs, Medical Camps, Rural Sports', 'News & Articles | Sardar Khushinder Singh Jand Sahib', 'Explore latest updates and articles from Sardar Khushinder Singh Jand Sahib.', '/images/blog-health-camp.jpg', 'summary_large_image', 1, '${now}'),\n`;
  sql += `(4, '/contact', 'Contact Office | Sardar Khushinder Singh Jand Sahib', 'Get in touch with Sardar Khushinder Singh Jand Sahib. Submit community inquiries or request in-person meetings at Jand Sahib office.', 'Contact Khushinder Singh, Jand Sahib Office Address, Public Grievance Punjab', 'Contact Office | Sardar Khushinder Singh Jand Sahib', 'Reach out to Sardar Khushinder Singh Jand Sahib\\'s public office.', '/images/logo-main.png', 'summary_large_image', 1, '${now}');\n\n`;

  // 16. SMTP Settings
  sql += `-- SMTP Settings\n`;
  sql += `INSERT INTO \`smtp_settings\` (\`id\`, \`smtp_host\`, \`smtp_port\`, \`smtp_username\`, \`smtp_password\`, \`encryption\`, \`sender_name\`, \`sender_email\`, \`admin_notification_email\`, \`is_enabled\`, \`updated_at\`) VALUES\n`;
  sql += `(1, 'smtp.hostinger.com', 465, 'contact@khusi.1313softdev.com', 'Kuku@5769', 'SSL', 'Sardar Khushinder Singh Jand Sahib Office', 'contact@khusi.1313softdev.com', 'kukukaramjit@gmail.com', 1, '${now}');\n\n`;

  // 17. Email Templates
  sql += `-- Email Templates\n`;
  sql += `INSERT INTO \`email_templates\` (\`id\`, \`template_key\`, \`title\`, \`subject\`, \`body_html\`, \`body_text\`, \`variables\`, \`is_active\`, \`updated_at\`) VALUES\n`;
  sql += `(1, 'inquiry_confirmation', 'Inquiry Confirmation', 'Thank you for reaching out to Sardar Khushinder Singh Jand Sahib', '<h2>Sat Sri Akal {{name}},</h2><p>Thank you for contacting the public office of <strong>Sardar Khushinder Singh Jand Sahib</strong>. We have received your message regarding: <em>{{subject}}</em>.</p><p>Our team will review your inquiry and follow up shortly.</p><br><p>Warm regards,<br>Office of Sardar Khushinder Singh Jand Sahib<br>Village Jand Sahib, Punjab</p>', 'Sat Sri Akal {{name}},\\n\\nThank you for contacting the office of Sardar Khushinder Singh Jand Sahib. We have received your inquiry regarding {{subject}}.\\n\\nWarm regards,\\nOffice of Sardar Khushinder Singh Jand Sahib', 'name,subject', 1, '${now}'),\n`;
  sql += `(2, 'admin_notification', 'Admin Notification', 'New Public Inquiry from {{name}}', '<h3>New Public Inquiry Received</h3><p><strong>Name:</strong> {{name}}</p><p><strong>Email:</strong> {{email}}</p><p><strong>Phone:</strong> {{phone}}</p><p><strong>Subject:</strong> {{subject}}</p><p><strong>Message:</strong><br>{{message}}</p>', 'New inquiry from {{name}} ({{email}}, {{phone}}): {{subject}}\\n\\n{{message}}', 'name,email,phone,subject,message', 1, '${now}');\n\n`;

  // 18. AI Assistant Settings & Knowledge
  sql += `-- AI Assistant Settings\n`;
  sql += `INSERT INTO \`ai_settings\` (\`id\`, \`is_enabled\`, \`provider\`, \`model_name\`, \`system_prompt\`, \`temperature\`, \`max_tokens\`, \`updated_at\`) VALUES\n`;
  sql += `(1, 1, 'gemini', 'gemini-1.5-flash', 'You are the verified bilingual AI Assistant for Sardar Khushinder Singh Jand Sahib (Social Worker & Member of Punjab Sanjhivalta Dal). Only state facts present in the verified portal database.', 0.2, 800, '${now}');\n\n`;

  sql += `-- AI Knowledge Sources\n`;
  sql += `INSERT INTO \`ai_knowledge_sources\` (\`id\`, \`title\`, \`category\`, \`content\`, \`is_active\`, \`created_at\`, \`updated_at\`) VALUES\n`;
  sql += `(1, 'Verified Identity & Biography', 'biography', 'Sardar Khushinder Singh Jand Sahib is an esteemed social worker and dedicated member of Punjab Sanjhivalta Dal from village Jand Sahib, Punjab, India. He works on canal water access, free health camps, rural sports, and anti-pollution advocacy.', 1, '${now}', '${now}'),\n`;
  sql += `(2, 'Office Location & Sabha Timings', 'faq', 'Office Address: Village Jand Sahib, Punjab 152026, India. Public grievance hearings and meetings are held every Sunday between 10:00 AM and 2:00 PM.', 1, '${now}', '${now}');\n\n`;

  sql += `SET FOREIGN_KEY_CHECKS = 1;\n-- =====================================================================\n-- Dump Completed Successfully\n-- =====================================================================\n`;

  const outputPath = path.join(__dirname, '..', 'khushinder_db_export.sql');
  fs.writeFileSync(outputPath, sql, 'utf8');

  const stats = fs.statSync(outputPath);
  console.log(`✓ Generated complete standalone SQL dump: ${outputPath} (${(stats.size / 1024).toFixed(2)} KB)`);
}

generateCompleteSql().catch((e) => {
  console.error('Error generating SQL:', e);
  process.exit(1);
});
