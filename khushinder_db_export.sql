-- =====================================================================
-- Sardar Khushinder Singh Jand Sahib - Official Portal Database Dump
-- Prepared for Hostinger MySQL / MariaDB / phpMyAdmin Deployment
-- Charset: utf8mb4 / utf8mb4_unicode_ci
-- Generated on: 2026-11-14 05:28:08
-- =====================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET NAMES utf8mb4;
SET time_zone = "+00:00";

-- Optional: Create database if not exists (uncomment if deploying on dedicated VPS)
-- CREATE DATABASE IF NOT EXISTS `khushinder_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE `khushinder_db`;

-- ---------------------------------------------------------------------
-- TABLE STRUCTURES (DDL)
-- ---------------------------------------------------------------------

-- CreateTable
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(50) NULL,
    `avatar` VARCHAR(255) NULL,
    `role_id` INTEGER NOT NULL DEFAULT 1,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `roles_name_key`(`name`),
    UNIQUE INDEX `roles_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `module` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `permissions_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `website_settings`;
CREATE TABLE `website_settings` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `site_name` VARCHAR(255) NOT NULL DEFAULT 'Sardar Khushinder Singh Jand Sahib',
    `site_title` VARCHAR(255) NOT NULL DEFAULT 'Official Portal - Social Worker & Punjab Sanjhivalta Dal Leader',
    `site_description` TEXT NOT NULL DEFAULT 'Dedicated to public service, rural youth empowerment, healthcare, and community welfare across Punjab.',
    `favicon_url` VARCHAR(255) NULL,
    `main_logo_url` VARCHAR(255) NULL,
    `footer_logo_url` VARCHAR(255) NULL,
    `contact_email` VARCHAR(191) NOT NULL DEFAULT 'contact@khushindersingh.org',
    `contact_phone` VARCHAR(50) NOT NULL DEFAULT '+91 98765 43210',
    `contact_address` TEXT NOT NULL DEFAULT 'Jand Sahib, Sri Muktsar Sahib / Bathinda Region, Punjab, India',
    `whatsapp_number` VARCHAR(50) NOT NULL DEFAULT '+919876543210',
    `primary_color` VARCHAR(20) NOT NULL DEFAULT '#0B192C',
    `secondary_color` VARCHAR(20) NOT NULL DEFAULT '#1B2A4A',
    `accent_color` VARCHAR(20) NOT NULL DEFAULT '#F59E0B',
    `default_language` VARCHAR(10) NOT NULL DEFAULT 'en',
    `allow_language_toggle` BOOLEAN NOT NULL DEFAULT true,
    `punjabi_first` BOOLEAN NOT NULL DEFAULT false,
    `copyright_text` VARCHAR(255) NOT NULL DEFAULT '© 2026 Sardar Khushinder Singh Jand Sahib. All Rights Reserved. Punjab Sanjhivalta Dal.',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `page_content`;
CREATE TABLE `page_content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `page_slug` VARCHAR(100) NOT NULL,
    `section_key` VARCHAR(100) NOT NULL,
    `title_en` VARCHAR(255) NULL,
    `title_pa` VARCHAR(255) NULL,
    `content_en` LONGTEXT NULL,
    `content_pa` LONGTEXT NULL,
    `extra_data` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `page_content_page_slug_section_key_key`(`page_slug`, `section_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `biography`;
CREATE TABLE `biography` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `full_name_en` VARCHAR(255) NOT NULL DEFAULT 'Sardar Khushinder Singh Jand Sahib',
    `full_name_pa` VARCHAR(255) NOT NULL DEFAULT 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ',
    `title_en` VARCHAR(255) NOT NULL DEFAULT 'Social Worker | Member, Punjab Sanjhivalta Dal',
    `title_pa` VARCHAR(255) NOT NULL DEFAULT 'ਸਮਾਜ ਸੇਵੀ | ਮੈਂਬਰ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ',
    `identity_en` TEXT NOT NULL DEFAULT 'Dedicated Social Worker from Jand Sahib committed to people''s welfare, community harmony, and transparent public service in Punjab.',
    `identity_pa` TEXT NOT NULL DEFAULT 'ਜੰਡ ਸਾਹਿਬ ਤੋਂ ਲੋਕ ਸੇਵਾ, ਭਾਈਚਾਰਕ ਸਾਂਝ ਅਤੇ ਪੰਜਾਬ ਦੇ ਵਿਕਾਸ ਨੂੰ ਸਮਰਪਿਤ ਸੁਹਿਰਦ ਸਮਾਜ ਸੇਵਕ।',
    `profile_image_url` VARCHAR(255) NULL,
    `short_bio_en` TEXT NOT NULL,
    `short_bio_pa` TEXT NOT NULL,
    `full_bio_en` LONGTEXT NOT NULL,
    `full_bio_pa` LONGTEXT NOT NULL,
    `journey_en` LONGTEXT NOT NULL,
    `journey_pa` LONGTEXT NOT NULL,
    `public_service_en` LONGTEXT NOT NULL,
    `public_service_pa` LONGTEXT NOT NULL,
    `vision_en` LONGTEXT NOT NULL,
    `vision_pa` LONGTEXT NOT NULL,
    `organization_en` LONGTEXT NOT NULL,
    `organization_pa` LONGTEXT NOT NULL,
    `quote_en` VARCHAR(500) NULL,
    `quote_pa` VARCHAR(500) NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `hero_slides`;
CREATE TABLE `hero_slides` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_en` VARCHAR(255) NOT NULL,
    `title_pa` VARCHAR(255) NOT NULL,
    `subtitle_en` VARCHAR(255) NULL,
    `subtitle_pa` VARCHAR(255) NULL,
    `description_en` TEXT NULL,
    `description_pa` TEXT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `video_url` VARCHAR(255) NULL,
    `btn1_text_en` VARCHAR(100) NULL,
    `btn1_text_pa` VARCHAR(100) NULL,
    `btn1_url` VARCHAR(255) NULL,
    `btn2_text_en` VARCHAR(100) NULL,
    `btn2_text_pa` VARCHAR(100) NULL,
    `btn2_url` VARCHAR(255) NULL,
    `overlay_opacity` DOUBLE NOT NULL DEFAULT 0.4,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `logo_slides`;
CREATE TABLE `logo_slides` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `blog_categories`;
CREATE TABLE `blog_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_en` VARCHAR(100) NOT NULL,
    `name_pa` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `blog_categories_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `blog_tags`;
CREATE TABLE `blog_tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_en` VARCHAR(100) NOT NULL,
    `name_pa` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `blog_tags_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_en` VARCHAR(255) NOT NULL,
    `title_pa` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `short_desc_en` TEXT NOT NULL,
    `short_desc_pa` TEXT NOT NULL,
    `content_en` LONGTEXT NOT NULL,
    `content_pa` LONGTEXT NOT NULL,
    `featured_image` VARCHAR(255) NULL,
    `gallery_images` TEXT NULL,
    `video_url` VARCHAR(255) NULL,
    `category_id` INTEGER NOT NULL,
    `is_featured` BOOLEAN NOT NULL DEFAULT false,
    `status` VARCHAR(50) NOT NULL DEFAULT 'published',
    `published_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `author_name` VARCHAR(100) NOT NULL DEFAULT 'Sardar Khushinder Singh',
    `meta_title` VARCHAR(255) NULL,
    `meta_description` TEXT NULL,
    `meta_keywords` VARCHAR(255) NULL,
    `og_image` VARCHAR(255) NULL,
    `views_count` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `blogs_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `blog_tag_relations`;
CREATE TABLE `blog_tag_relations` (
    `blog_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,

    PRIMARY KEY (`blog_id`, `tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `media_library`;
CREATE TABLE `media_library` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_name` VARCHAR(255) NOT NULL,
    `file_url` VARCHAR(255) NOT NULL,
    `file_type` VARCHAR(50) NOT NULL,
    `file_size` INTEGER NOT NULL DEFAULT 0,
    `mime_type` VARCHAR(100) NOT NULL,
    `alt_text` VARCHAR(255) NULL,
    `title` VARCHAR(255) NULL,
    `folder` VARCHAR(100) NOT NULL DEFAULT 'general',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `galleries`;
CREATE TABLE `galleries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_en` VARCHAR(255) NOT NULL,
    `title_pa` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `category` VARCHAR(100) NOT NULL DEFAULT 'social_work',
    `description` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `galleries_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `gallery_images`;
CREATE TABLE `gallery_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gallery_id` INTEGER NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `title_en` VARCHAR(255) NULL,
    `title_pa` VARCHAR(255) NULL,
    `caption` TEXT NULL,
    `video_url` VARCHAR(255) NULL,
    `is_featured` BOOLEAN NOT NULL DEFAULT false,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `advertisements`;
CREATE TABLE `advertisements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `placement` VARCHAR(100) NOT NULL,
    `image_url` VARCHAR(255) NULL,
    `destination_url` VARCHAR(255) NULL,
    `html_code` LONGTEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `clicks_count` INTEGER NOT NULL DEFAULT 0,
    `views_count` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `social_accounts`;
CREATE TABLE `social_accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `platform` VARCHAR(50) NOT NULL,
    `account_name` VARCHAR(100) NOT NULL,
    `profile_url` VARCHAR(255) NOT NULL,
    `page_id` VARCHAR(100) NULL,
    `business_account_id` VARCHAR(100) NULL,
    `access_token` TEXT NULL,
    `refresh_token` TEXT NULL,
    `token_expires_at` DATETIME(3) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `is_feed_enabled` BOOLEAN NOT NULL DEFAULT true,
    `last_synced_at` DATETIME(3) NULL,
    `sync_interval_minutes` INTEGER NOT NULL DEFAULT 15,
    `status` VARCHAR(50) NOT NULL DEFAULT 'configured',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `social_accounts_platform_key`(`platform`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `social_posts_cache`;
CREATE TABLE `social_posts_cache` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `platform` VARCHAR(50) NOT NULL,
    `post_id` VARCHAR(191) NOT NULL,
    `author_name` VARCHAR(100) NOT NULL DEFAULT 'Khushinder Singh Jand Sahib',
    `caption` LONGTEXT NULL,
    `media_url` VARCHAR(500) NULL,
    `media_type` VARCHAR(50) NOT NULL DEFAULT 'IMAGE',
    `permalink` VARCHAR(500) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `likes_count` INTEGER NOT NULL DEFAULT 0,
    `comments_count` INTEGER NOT NULL DEFAULT 0,
    `raw_data` LONGTEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `social_posts_cache_post_id_key`(`post_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `seo_settings`;
CREATE TABLE `seo_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `page_path` VARCHAR(100) NOT NULL,
    `meta_title` VARCHAR(255) NOT NULL,
    `meta_description` TEXT NOT NULL,
    `meta_keywords` VARCHAR(255) NULL,
    `og_title` VARCHAR(255) NULL,
    `og_description` TEXT NULL,
    `og_image` VARCHAR(255) NULL,
    `twitter_card` VARCHAR(50) NOT NULL DEFAULT 'summary_large_image',
    `canonical_url` VARCHAR(255) NULL,
    `google_analytics_id` VARCHAR(50) NULL,
    `google_search_console_code` VARCHAR(100) NULL,
    `schema_markup` LONGTEXT NULL,
    `is_indexable` BOOLEAN NOT NULL DEFAULT true,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `seo_settings_page_path_key`(`page_path`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `smtp_settings`;
CREATE TABLE `smtp_settings` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `smtp_host` VARCHAR(255) NOT NULL DEFAULT 'smtp.gmail.com',
    `smtp_port` INTEGER NOT NULL DEFAULT 587,
    `smtp_username` VARCHAR(191) NOT NULL DEFAULT 'notifications@khushindersingh.org',
    `smtp_password` VARCHAR(255) NOT NULL DEFAULT '',
    `encryption` VARCHAR(20) NOT NULL DEFAULT 'TLS',
    `sender_name` VARCHAR(100) NOT NULL DEFAULT 'Office of Sardar Khushinder Singh',
    `sender_email` VARCHAR(191) NOT NULL DEFAULT 'office@khushindersingh.org',
    `admin_notification_email` VARCHAR(191) NOT NULL DEFAULT 'khushinder.jandsahib@gmail.com',
    `is_enabled` BOOLEAN NOT NULL DEFAULT true,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `contact_inquiries`;
CREATE TABLE `contact_inquiries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mobile_number` VARCHAR(50) NOT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `message` LONGTEXT NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `is_replied` BOOLEAN NOT NULL DEFAULT false,
    `admin_notes` TEXT NULL,
    `ip_address` VARCHAR(50) NULL,
    `user_agent` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `email_templates`;
CREATE TABLE `email_templates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `template_key` VARCHAR(100) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `body_html` LONGTEXT NOT NULL,
    `body_text` LONGTEXT NULL,
    `variables` VARCHAR(255) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `email_templates_template_key_key`(`template_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `ai_settings`;
CREATE TABLE `ai_settings` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `is_enabled` BOOLEAN NOT NULL DEFAULT true,
    `provider` VARCHAR(50) NOT NULL DEFAULT 'gemini',
    `api_key` VARCHAR(255) NULL,
    `model_name` VARCHAR(100) NOT NULL DEFAULT 'gemini-1.5-flash',
    `system_prompt` LONGTEXT NOT NULL,
    `welcome_message_en` TEXT NOT NULL DEFAULT 'Sat Sri Akal! Welcome to the official portal of Sardar Khushinder Singh Jand Sahib. How may I assist you regarding his public service, initiatives, or latest updates?',
    `welcome_message_pa` TEXT NOT NULL DEFAULT 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦੇ ਅਧਿਕਾਰਤ ਪੋਰਟਲ ''ਤੇ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਮੈਂ ਉਹਨਾਂ ਦੀ ਸਮਾਜ ਸੇਵਾ, ਲੋਕ ਭਲਾਈ ਕਾਰਜਾਂ ਅਤੇ ਤਾਜ਼ਾ ਗਤੀਵਿਧੀਆਂ ਬਾਰੇ ਤੁਹਾਡੀ ਕੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?',
    `fallback_response_en` TEXT NOT NULL DEFAULT 'Verified information on this specific topic is currently not available in our records. Please feel free to reach out directly through our Contact page or call the office.',
    `fallback_response_pa` TEXT NOT NULL DEFAULT 'ਇਸ ਵਿਸ਼ੇ ਸੰਬੰਧੀ ਪ੍ਰਮਾਣਿਤ ਜਾਣਕਾਰੀ ਇਸ ਵੇਲੇ ਉਪਲਬਧ ਨਹੀਂ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਸੰਪਰਕ ਪੰਨੇ ਰਾਹੀਂ ਸਿੱਧਾ ਦਫ਼ਤਰ ਨਾਲ ਰਾਬਤਾ ਕਾਇਮ ਕਰੋ।',
    `response_language` VARCHAR(20) NOT NULL DEFAULT 'auto',
    `max_tokens` INTEGER NOT NULL DEFAULT 500,
    `temperature` DOUBLE NOT NULL DEFAULT 0.3,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `ai_knowledge_sources`;
CREATE TABLE `ai_knowledge_sources` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(100) NOT NULL DEFAULT 'general',
    `content` LONGTEXT NOT NULL,
    `document_url` VARCHAR(255) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `ai_conversations`;
CREATE TABLE `ai_conversations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `session_id` VARCHAR(100) NOT NULL,
    `visitor_ip` VARCHAR(50) NULL,
    `visitor_name` VARCHAR(100) NULL,
    `language` VARCHAR(20) NOT NULL DEFAULT 'en',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ai_conversations_session_id_key`(`session_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `ai_messages`;
CREATE TABLE `ai_messages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `conversation_id` INTEGER NOT NULL,
    `sender` VARCHAR(20) NOT NULL,
    `message` LONGTEXT NOT NULL,
    `sources_used` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `activity_logs`;
CREATE TABLE `activity_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `action` VARCHAR(100) NOT NULL,
    `module` VARCHAR(100) NOT NULL,
    `details` TEXT NULL,
    `ip_address` VARCHAR(50) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `homepage_sections`;
CREATE TABLE `homepage_sections` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `section_key` VARCHAR(100) NOT NULL,
    `title_en` VARCHAR(255) NOT NULL,
    `title_pa` VARCHAR(255) NOT NULL,
    `subtitle_en` VARCHAR(255) NULL,
    `subtitle_pa` VARCHAR(255) NULL,
    `is_enabled` BOOLEAN NOT NULL DEFAULT true,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `bg_color` VARCHAR(50) NULL,
    `posts_count` INTEGER NOT NULL DEFAULT 6,
    `extra_json` TEXT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `homepage_sections_section_key_key`(`section_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
DROP TABLE IF EXISTS `_PermissionToRole`;
CREATE TABLE `_PermissionToRole` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PermissionToRole_AB_unique`(`A`, `B`),
    INDEX `_PermissionToRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `blog_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blog_tag_relations` ADD CONSTRAINT `blog_tag_relations_blog_id_fkey` FOREIGN KEY (`blog_id`) REFERENCES `blogs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blog_tag_relations` ADD CONSTRAINT `blog_tag_relations_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `blog_tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gallery_images` ADD CONSTRAINT `gallery_images_gallery_id_fkey` FOREIGN KEY (`gallery_id`) REFERENCES `galleries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ai_messages` ADD CONSTRAINT `ai_messages_conversation_id_fkey` FOREIGN KEY (`conversation_id`) REFERENCES `ai_conversations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity_logs` ADD CONSTRAINT `activity_logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionToRole` ADD CONSTRAINT `_PermissionToRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionToRole` ADD CONSTRAINT `_PermissionToRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;



-- ---------------------------------------------------------------------
-- SEED DATA & VERIFIED INITIAL RECORDS
-- ---------------------------------------------------------------------

-- Roles
INSERT INTO `roles` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 'admin', 'Full administrative access to all modules and configurations', '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(2, 'Editor', 'editor', 'Access to blogs, gallery and media updates', '2026-11-14 05:28:08', '2026-11-14 05:28:08');

-- Admin User (admin@khushindersingh.org / Admin@12345)
INSERT INTO `users` (`id`, `email`, `password_hash`, `full_name`, `phone`, `avatar`, `role_id`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'admin@khushindersingh.org', '$2a$10$v9EB0a9pN2ktPhzAHxDTmuZBSu46nLf9IxXJlhxUT0TA6qWWkrI4G', 'Sardar Khushinder Singh Jand Sahib', '+91 98765 43210', '/images/khushinder-profile.jpg', 1, 1, '2026-11-14 05:28:08', '2026-11-14 05:28:08');

-- Website Settings
INSERT INTO `website_settings` (`id`, `site_name`, `site_title`, `site_description`, `favicon_url`, `main_logo_url`, `footer_logo_url`, `contact_email`, `contact_phone`, `contact_address`, `whatsapp_number`, `primary_color`, `secondary_color`, `accent_color`, `default_language`, `allow_language_toggle`, `punjabi_first`, `copyright_text`, `created_at`, `updated_at`) VALUES
(1, 'Sardar Khushinder Singh Jand Sahib', 'Official Portal | Social Worker & Member of Punjab Sanjhivalta Dal', 'Dedicated to community welfare, rural empowerment, education, youth development, and social harmony across Punjab.', '/images/logo-emblem.png', '/images/logo-main.png', '/images/logo-footer.png', 'contact@khusi.1313softdev.com', '+91 98765 43210', 'Village Jand Sahib, District Sri Muktsar Sahib / Bathinda Belt, Punjab 152026, India', '+919876543210', '#0B192C', '#1B2A4A', '#F59E0B', 'en', 1, 0, '© 2026 Sardar Khushinder Singh Jand Sahib. Member, Punjab Sanjhivalta Dal. All Rights Reserved.', '2026-11-14 05:28:08', '2026-11-14 05:28:08');

-- Biography
INSERT INTO `biography` (`id`, `full_name_en`, `full_name_pa`, `title_en`, `title_pa`, `identity_en`, `identity_pa`, `profile_image_url`, `short_bio_en`, `short_bio_pa`, `full_bio_en`, `full_bio_pa`, `journey_en`, `journey_pa`, `public_service_en`, `public_service_pa`, `vision_en`, `vision_pa`, `organization_en`, `organization_pa`, `quote_en`, `quote_pa`, `updated_at`) VALUES
(1, 'Sardar Khushinder Singh Jand Sahib', 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ', 'Social Worker | Member, Punjab Sanjhivalta Dal', 'ਸਮਾਜ ਸੇਵੀ | ਮੈਂਬਰ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ', 'Dedicated Social Worker and activist from Jand Sahib committed to people\'s welfare, environmental protection, clean water rights, and rural upliftment across Punjab.', 'ਜੰਡ ਸਾਹਿਬ ਤੋਂ ਲੋਕ ਸੇਵਾ, ਵਾਤਾਵਰਨ ਸੰਭਾਲ, ਨਹਿਰੀ ਪਾਣੀ ਦੇ ਹੱਕਾਂ ਅਤੇ ਪੇਂਡੂ ਵਿਕਾਸ ਨੂੰ ਸਮਰਪਿਤ ਸੁਹਿਰਦ ਸਮਾਜ ਸੇਵਕ।', '/images/khushinder-profile.jpg', 'Sardar Khushinder Singh Jand Sahib is an active grass-roots social worker and prominent member of Punjab Sanjhivalta Dal from Punjab, India. He works tirelessly on canal water access, environmental defense against industrial toxins, youth de-addiction through sports, and free health initiatives.', 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਪੰਜਾਬ ਦੇ ਸਰਗਰਮ ਸਮਾਜ ਸੇਵੀ ਅਤੇ ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਦੇ ਪ੍ਰਮੁੱਖ ਆਗੂ ਹਨ। ਉਹ ਨਹਿਰੀ ਪਾਣੀ, ਪ੍ਰਦੂਸ਼ਣ ਰੋਕਥਾਮ, ਪੇਂਡੂ ਸਿਹਤ ਸੇਵਾਵਾਂ ਅਤੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਖੇਡਾਂ ਵੱਲ ਪ੍ਰੇਰਿਤ ਕਰਨ ਲਈ ਨਿਰੰਤਰ ਕਾਰਜਸ਼ੀਲ ਹਨ।', 'Sardar Khushinder Singh Jand Sahib has dedicated years of his life to addressing the most urgent challenges facing rural Punjab. Based in village Jand Sahib, his initiatives span clean drinking water campaigns, legal and peaceful protests against groundwater contaminating distilleries and factories, mobilizing farmers for tail-end irrigation canals, and running youth development sports programs.', 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਨੇ ਆਪਣੇ ਜੀਵਨ ਦੇ ਅਨੇਕਾਂ ਸਾਲ ਪੰਜਾਬ ਦੇ ਪਿੰਡਾਂ ਦੀਆਂ ਬੁਨਿਆਦੀ ਸਮੱਸਿਆਵਾਂ ਹੱਲ ਕਰਨ ਲਈ ਲਗਾਏ ਹਨ। ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਤੋਂ ਸ਼ੁਰੂ ਹੋਈ ਇਹ ਸੇਵਾ ਯਾਤਰਾ ਅੱਜ ਪੂਰੇ ਮਾਲਵਾ ਖੇਤਰ ਵਿੱਚ ਪੀਣ ਵਾਲੇ ਸਾਫ਼ ਪਾਣੀ, ਪ੍ਰਦੂਸ਼ਣਕਾਰੀ ਫੈਕਟਰੀਆਂ ਵਿਰੁੱਧ ਕਾਨੂੰਨੀ ਤੇ ਸ਼ਾਂਤਮਈ ਘੋਲ, ਟੇਲਾਂ ਉੱਤੇ ਪਾਣੀ ਪਹੁੰਚਾਉਣ ਅਤੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਖੇਡਾਂ ਨਾਲ ਜੋੜਨ ਦੇ ਰੂਪ ਵਿੱਚ ਜਾਣੀ ਜਾਂਦੀ ਹੈ।', 'Rooted in the soil of Jand Sahib, Khushinder Singh began his social work by organizing village youth for collective welfare, repairing common community assets, and helping struggling farming households.', 'ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਦੀ ਧਰਤੀ ਤੋਂ ਸ਼ੁਰੂ ਕਰਕੇ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਨੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਇਕੱਠੇ ਕਰਕੇ ਸਾਂਝੇ ਕੰਮਾਂ, ਗਰੀਬ ਕਿਸਾਨਾਂ ਦੀ ਮਦਦ ਅਤੇ ਪਿੰਡ ਦੀ ਸਫ਼ਾਈ ਤੋਂ ਸੇਵਾ ਸ਼ੁਰੂ ਕੀਤੀ।', 'His public service includes spearheading free medical and eye camps, tree plantation campaigns, flood relief, and representing farmer grievances before irrigation and revenue authorities.', 'ਮੁਫ਼ਤ ਮੈਡੀਕਲ ਕੈਂਪ, ਅੱਖਾਂ ਦੇ ਅਪਰੇਸ਼ਨ, ਹੜ੍ਹ ਪੀੜਤਾਂ ਦੀ ਮਦਦ, ਅਤੇ ਨਹਿਰੀ ਪਾਣੀ ਦੇ ਮਸਲੇ ਹੱਲ ਕਰਵਾਉਣਾ ਉਹਨਾਂ ਦੀ ਜਨਤਕ ਸੇਵਾ ਦਾ ਅਹਿਮ ਹਿੱਸਾ ਹਨ।', 'A prosperous, drug-free Punjab where every farmer receives their rightful irrigation water, every village has access to world-class healthcare and education, and our natural ecosystem is protected for future generations.', 'ਇੱਕ ਖ਼ੁਸ਼ਹਾਲ, ਨਸ਼ਾ ਮੁਕਤ ਅਤੇ ਹਰਿਆ-ਭਰਿਆ ਪੰਜਾਬ, ਜਿੱਥੇ ਹਰ ਕਿਸਾਨ ਨੂੰ ਨਹਿਰੀ ਪਾਣੀ ਮਿਲੇ, ਹਰ ਪਿੰਡ ਵਿੱਚ ਮਿਆਰੀ ਸਿਹਤ-ਸਿੱਖਿਆ ਸਹੂਲਤਾਂ ਹੋਣ ਅਤੇ ਪੰਜਾਬ ਦੀ ਕੁਦਰਤ ਸੁਰੱਖਿਅਤ ਰਹੇ।', 'As an esteemed member of Punjab Sanjhivalta Dal, he embodies the party\'s core philosophy of inclusive public service, communal harmony, and principled advocacy without personal self-interest.', 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਦੇ ਮੈਂਬਰ ਵਜੋਂ ਉਹ ਸਾਂਝੀਵਾਲਤਾ, ਭਾਈਚਾਰਕ ਏਕਤਾ ਅਤੇ ਨਿਰਸਵਾਰਥ ਲੋਕ ਸੇਵਾ ਦੇ ਸਿਧਾਂਤਾਂ ਨੂੰ ਅਮਲੀ ਜਾਮਾ ਪਹਿਨਾਉਂਦੇ ਹਨ।', 'True leadership is defined not by office, but by unyielding service to the poorest person in the village.', 'ਅਸਲ ਅਗਵਾਈ ਕਿਸੇ ਕੁਰਸੀ ਦੀ ਮੁਥਾਜ ਨਹੀਂ, ਸਗੋਂ ਪਿੰਡ ਦੇ ਆਖਰੀ ਲੋੜਵੰਦ ਵਿਅਕਤੀ ਦੀ ਸੁਹਿਰਦ ਸੇਵਾ ਵਿੱਚੋਂ ਪੈਦਾ ਹੁੰਦੀ ਹੈ।', '2026-11-14 05:28:08');

-- Hero Slides (with authentic HD photography)
INSERT INTO `hero_slides` (`id`, `title_en`, `title_pa`, `subtitle_en`, `subtitle_pa`, `description_en`, `description_pa`, `image_url`, `video_url`, `btn1_text_en`, `btn1_text_pa`, `btn1_url`, `btn2_text_en`, `btn2_text_pa`, `btn2_url`, `overlay_opacity`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Dedicated to Punjab, Grounded in Public Service', 'ਲੋਕ ਸੇਵਾ ਨੂੰ ਸਮਰਪਿਤ, ਜ਼ਮੀਨ ਨਾਲ ਜੁੜੀ ਆਵਾਜ਼', 'Sardar Khushinder Singh Jand Sahib', 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ', 'Championing rural youth empowerment, farmers\' rights, clean water, and community harmony across Punjab. Member, Punjab Sanjhivalta Dal.', 'ਪੰਜਾਬ ਦੇ ਪਿੰਡਾਂ, ਨੌਜਵਾਨੀ, ਕਿਸਾਨੀ ਹੱਕਾਂ ਅਤੇ ਨਸ਼ਾ ਮੁਕਤ ਸਮਾਜ ਦੀ ਸਿਰਜਣਾ ਲਈ ਵਚਨਬੱਧ। ਮੈਂਬਰ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ।', '/images/khushinder-hero-1.jpg', NULL, 'About Me', 'ਮੇਰੇ ਬਾਰੇ', '/about', 'Contact Me', 'ਸੰਪਰਕ ਕਰੋ', '/contact', 0.55, 1, 1, '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(2, 'Safeguarding Punjab\'s Environment & Groundwater', 'ਪੰਜਾਬ ਦੇ ਵਾਤਾਵਰਨ ਅਤੇ ਜ਼ਮੀਨੀ ਪਾਣੀ ਦੀ ਰਾਖੀ', 'Environmental Action & People\'s Rights', 'ਵਾਤਾਵਰਨ ਚੇਤਨਾ ਅਤੇ ਜਨਤਕ ਅਧਿਕਾਰ', 'Standing firm against toxic industrial pollution, defending clean drinking water for Malwa, and demanding strict enforcement for sustainable agriculture.', 'ਜ਼ਹਿਰੀਲੀਆਂ ਫੈਕਟਰੀਆਂ ਵਿਰੁੱਧ ਜਨਤਕ ਸੰਘਰਸ਼, ਮਾਲਵਾ ਖੇਤਰ ਦੇ ਪੀਣ ਵਾਲੇ ਪਾਣੀ ਦੀ ਰਾਖੀ ਅਤੇ ਹਰਿਆਵਲ ਪੰਜਾਬ ਲਈ ਨਿਰੰਤਰ ਜਤਨ।', '/images/khushinder-hero-2.jpg', NULL, 'Read Latest Updates', 'ਤਾਜ਼ਾ ਜਾਣਕਾਰੀ', '/blog', 'Community Voice', 'ਭਾਈਚਾਰਕ ਸਾਂਝ', '/contact', 0.55, 2, 1, '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(3, 'Empowering Youth Through Sports & Healthcare', 'ਨੌਜਵਾਨਾਂ ਨੂੰ ਖੇਡਾਂ ਅਤੇ ਸਿਹਤ ਨਾਲ ਜੋੜਨ ਦਾ ਸੰਕਲਪ', 'Drug-Free Healthy Punjab Initiative', 'ਨਸ਼ਾ ਮੁਕਤ ਅਤੇ ਤੰਦਰੁਸਤ ਪੰਜਾਬ ਮੁਹਿੰਮ', 'Organizing rural sports tournaments, free mega health and eye checkup camps, and inspiring youth towards constructive community building.', 'ਪੇਂਡੂ ਖੇਡ ਮੇਲੇ, ਮੁਫ਼ਤ ਮੈਡੀਕਲ ਕੈਂਪ ਅਤੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਖੇਡ ਮੈਦਾਨਾਂ ਵੱਲ ਪ੍ਰੇਰਿਤ ਕਰਕੇ ਨਸ਼ਿਆਂ ਵਿਰੁੱਧ ਜ਼ਮੀਨੀ ਕਾਰਜ।', '/images/khushinder-hero-3.jpg', NULL, 'View Photo Gallery', 'ਫੋਟੋ ਗੈਲਰੀ', '/about#gallery', 'Get in Touch', 'ਸੰਪਰਕ ਕਰੋ', '/contact', 0.55, 3, 1, '2026-11-14 05:28:08', '2026-11-14 05:28:08');

-- Logo Slides
INSERT INTO `logo_slides` (`id`, `title`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Punjab Sanjhivalta Dal Official Insignia', '/images/logo-sanjhivalta.png', 1, 1, '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(2, 'Social Welfare Mission Emblem', '/images/logo-welfare.png', 2, 1, '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(3, 'Sardar Khushinder Singh Monogram', '/images/logo-khushinder.png', 3, 1, '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(4, 'Punjab Youth & Sports Forum', '/images/logo-sports.png', 4, 1, '2026-11-14 05:28:08', '2026-11-14 05:28:08');

-- Homepage Sections
INSERT INTO `homepage_sections` (`id`, `section_key`, `title_en`, `title_pa`, `is_enabled`, `display_order`, `posts_count`, `updated_at`) VALUES
(1, 'hero', 'Hero Section', 'ਮੁੱਖ ਬੈਨਰ', 1, 1, 3, '2026-11-14 05:28:08'),
(2, 'logo_animation', 'Animated Organization Logos', 'ਸੰਸਥਾ ਦੇ ਲੋਗੋ', 1, 2, 3, '2026-11-14 05:28:08'),
(3, 'social_feeds', 'Facebook & Instagram Updates', 'ਸੋਸ਼ਲ ਮੀਡੀਆ ਅਪਡੇਟਸ', 1, 3, 3, '2026-11-14 05:28:08'),
(4, 'about_intro', 'About Khushinder Singh', 'ਜਾਣ-ਪਛਾਣ', 1, 4, 3, '2026-11-14 05:28:08'),
(5, 'latest_blogs', 'Latest Blogs & Public News', 'ਤਾਜ਼ਾ ਖ਼ਬਰਾਂ ਤੇ ਬਲਾਗ', 1, 5, 3, '2026-11-14 05:28:08'),
(6, 'gallery', 'Social Work Gallery', 'ਲੋਕ ਸੇਵਾ ਗੈਲਰੀ', 1, 6, 3, '2026-11-14 05:28:08'),
(7, 'contact_cta', 'Connect with Khushinder Singh', 'ਸਿੱਧਾ ਰਾਬਤਾ ਕਾਇਮ ਕਰੋ', 1, 7, 3, '2026-11-14 05:28:08');

-- Blog Categories
INSERT INTO `blog_categories` (`id`, `name_en`, `name_pa`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Community Welfare', 'ਸਮਾਜ ਭਲਾਈ', 'community-welfare', 'Public health camps, eye donation drives, and relief initiatives', '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(2, 'Youth & Sports', 'ਨੌਜਵਾਨ ਅਤੇ ਖੇਡਾਂ', 'youth-and-sports', 'Sports tournaments, fitness clubs, and anti-drug campaigns', '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(3, 'Agriculture & Rural Issues', 'ਕਿਸਾਨੀ ਅਤੇ ਪੇਂਡੂ ਮਸਲੇ', 'agriculture-and-farmers', 'Canal water distribution, crop compensation, and agrarian welfare', '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(4, 'Punjab Sanjhivalta Dal Updates', 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਗਤੀਵਿਧੀਆਂ', 'punjab-sanjhivalta-dal', 'Organizational conventions, press releases, and public delegations', '2026-11-14 05:28:08', '2026-11-14 05:28:08');

-- Blog Tags
INSERT INTO `blog_tags` (`id`, `name_en`, `name_pa`, `slug`) VALUES
(1, 'Healthcare', 'ਸਿਹਤ', 'healthcare'),
(2, 'Jand Sahib', 'ਜੰਡ ਸਾਹਿਬ', 'jand-sahib'),
(3, 'Punjab Youth', 'ਪੰਜਾਬ ਨੌਜਵਾਨੀ', 'punjab-youth'),
(4, 'Environment', 'ਵਾਤਾਵਰਨ', 'environment'),
(5, 'Farmers', 'ਕਿਸਾਨੀ', 'farmers');

-- Blogs
INSERT INTO `blogs` (`id`, `title_en`, `title_pa`, `slug`, `short_desc_en`, `short_desc_pa`, `content_en`, `content_pa`, `featured_image`, `category_id`, `is_featured`, `status`, `published_at`, `author_name`, `meta_title`, `meta_description`, `created_at`, `updated_at`) VALUES
(1, 'Mega Free Medical & Eye Camp Organized in Jand Sahib: Over 850 Patients Screened', 'ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਵਿਖੇ ਵਿਸ਼ਾਲ ਮੁਫ਼ਤ ਮੈਡੀਕਲ ਤੇ ਅੱਖਾਂ ਦਾ ਕੈਂਪ: 850 ਤੋਂ ਵੱਧ ਮਰੀਜ਼ਾਂ ਨੇ ਲਿਆ ਲਾਭ', 'mega-medical-eye-camp-jand-sahib', 'Under the supervision of Sardar Khushinder Singh Jand Sahib, specialist doctors from Ludhiana and Bathinda provided free consultations, tests, and medicines.', 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦੀ ਅਗਵਾਈ ਹੇਠ ਲੁਧਿਆਣਾ ਅਤੇ ਬਠਿੰਡਾ ਦੇ ਮਾਹਿਰ ਡਾਕਟਰਾਂ ਵੱਲੋਂ ਮੁਫ਼ਤ ਚੈਕਅੱਪ, ਟੈਸਟ ਅਤੇ ਦਵਾਈਆਂ ਵੰਡੀਆਂ ਗਈਆਂ।', 'Under the dedicated initiative of Sardar Khushinder Singh Jand Sahib, a comprehensive mega free medical and eye check-up camp was organized at Village Jand Sahib.\n\nOver 850 villagers from Jand Sahib and adjacent hamlets received consultations from senior cardiologists, ophthalmologists, and general physicians. Free spectacles were distributed to 320 elderly citizens, and 45 patients requiring cataract surgeries were enrolled for sponsored procedures at renowned regional healthcare centers.\n\nSpeaking to attendees, Sardar Khushinder Singh highlighted that quality healthcare must reach the rural doorsteps of Punjab.', 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦੇ ਸੁਹਿਰਦ ਉਪਰਾਲੇ ਸਦਕਾ ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਵਿਖੇ ਇੱਕ ਵਿਸ਼ਾਲ ਮੁਫ਼ਤ ਮੈਡੀਕਲ ਅਤੇ ਅੱਖਾਂ ਦਾ ਚੈਕਅੱਪ ਕੈਂਪ ਸਫ਼ਲਤਾਪੂਰਵਕ ਲਗਾਇਆ ਗਿਆ।\n\nਇਸ ਕੈਂਪ ਵਿੱਚ ਜੰਡ ਸਾਹਿਬ ਅਤੇ ਆਸ-ਪਾਸ ਦੇ ਪਿੰਡਾਂ ਤੋਂ ਆਏ 850 ਤੋਂ ਵੱਧ ਲੋਕਾਂ ਨੇ ਦਿਲ ਦੇ ਰੋਗਾਂ, ਅੱਖਾਂ ਅਤੇ ਜਨਰਲ ਬਿਮਾਰੀਆਂ ਦੇ ਮਾਹਿਰ ਡਾਕਟਰਾਂ ਤੋਂ ਮੁਫ਼ਤ ਜਾਂਚ ਕਰਵਾਈ। ਬਜ਼ੁਰਗਾਂ ਨੂੰ 320 ਨਜ਼ਰ ਦੀਆਂ ਐਨਕਾਂ ਅਤੇ ਲੋੜੀਂਦੀਆਂ ਦਵਾਈਆਂ ਮੁਫ਼ਤ ਦਿੱਤੀਆਂ ਗਈਆਂ।', '/images/blog-health-camp.jpg', 1, 1, 'published', '2026-11-14 05:28:08', 'Sardar Khushinder Singh', 'Mega Free Medical Camp Jand Sahib | Khushinder Singh', 'Free healthcare and eye checkup camp organized in Jand Sahib by Sardar Khushinder Singh assisting 850+ rural patients.', '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(2, 'Annual Rural Kabaddi & Volleyball Cup Celebrates Sportsmanship and Healthy Youth', 'ਸਾਲਾਨਾ ਪੇਂਡੂ ਕਬੱਡੀ ਤੇ ਵਾਲੀਬਾਲ ਕੱਪ: ਨੌਜਵਾਨਾਂ ਨੂੰ ਖੇਡਾਂ ਵੱਲ ਪ੍ਰੇਰਿਤ ਕਰਨ ਦਾ ਵੱਡਾ ਉਪਰਾਲਾ', 'rural-kabaddi-volleyball-cup-jand-sahib', 'Over 32 village teams competed with passion and discipline in the two-day sports tournament hosted to promote healthy living and drug-free youth.', 'ਨੌਜਵਾਨਾਂ ਨੂੰ ਨਸ਼ਿਆਂ ਤੋਂ ਦੂਰ ਕਰਕੇ ਖੇਡ ਮੈਦਾਨਾਂ ਨਾਲ ਜੋੜਨ ਲਈ ਕਰਵਾਏ ਦੋ-ਰੋਜ਼ਾ ਟੂਰਨਾਮੈਂਟ ਵਿੱਚ 32 ਪਿੰਡਾਂ ਦੀਆਂ ਟੀਮਾਂ ਨੇ ਸ਼ਾਨਦਾਰ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ।', 'To instill discipline, camaraderie, and physical vigor among Punjab youth, Sardar Khushinder Singh Jand Sahib inaugurated the Annual Rural Kabaddi & Volleyball Tournament at the local stadium grounds.\n\nFeaturing enthusiastic participation from 32 teams across the Malwa region, the tournament witnessed exhilarating competition. The winning teams were honored with cash prizes, trophies, and complete sports kits.', 'ਪੰਜਾਬ ਦੀ ਨੌਜਵਾਨੀ ਵਿੱਚ ਖੇਡ ਭਾਵਨਾ, ਅਨੁਸ਼ਾਸਨ ਅਤੇ ਸਰੀਰਕ ਤੰਦਰੁਸਤੀ ਨੂੰ ਉਤਸ਼ਾਹਿਤ ਕਰਨ ਲਈ ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਵੱਲੋਂ ਸਾਲਾਨਾ ਪੇਂਡੂ ਕਬੱਡੀ ਅਤੇ ਵਾਲੀਬਾਲ ਟੂਰਨਾਮੈਂਟ ਕਰਵਾਇਆ ਗਿਆ।\n\nਮਾਲਵਾ ਖੇਤਰ ਦੇ ਵੱਖ-ਵੱਖ ਪਿੰਡਾਂ ਤੋਂ ਪਹੁੰਚੀਆਂ 32 ਟੀਮਾਂ ਵਿਚਾਲੇ ਫਸਵੇਂ ਮੁਕਾਬਲੇ ਹੋਏ।', '/images/blog-sports-cup.jpg', 2, 1, 'published', '2026-11-14 05:28:08', 'Sardar Khushinder Singh', 'Rural Kabaddi Tournament Jand Sahib | Khushinder Singh', 'Annual village sports tournament held in Jand Sahib to channel youth energy into athletics and community unity.', '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(3, 'Punjab Sanjhivalta Dal Delegation Meets Local Administration on Canal Water Issues', 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਦਾ ਵਫ਼ਦ ਨਹਿਰੀ ਪਾਣੀ ਦੇ ਮਸਲੇ ਨੂੰ ਲੈ ਕੇ ਪ੍ਰਸ਼ਾਸਨਿਕ ਅਧਿਕਾਰੀਆਂ ਨੂੰ ਮਿਲਿਆ', 'punjab-sanjhivalta-dal-canal-water-delegation', 'A high-level delegation led by Khushinder Singh submitted a detailed memorandum urging desiltation of watercourses and equitable canal water supply to tail-end villages.', 'ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਕਿਸਾਨਾਂ ਦੇ ਵਫ਼ਦ ਨੇ ਟੇਲਾਂ \'ਤੇ ਨਹਿਰੀ ਪਾਣੀ ਪਹੁੰਚਾਉਣ ਅਤੇ ਸੂਇਆਂ ਦੀ ਸਫ਼ਾਈ ਲਈ ਮੰਗ ਪੱਤਰ ਸੌਂਪਿਆ।', 'A delegation of farmers and social representatives under the banner of Punjab Sanjhivalta Dal, led by Sardar Khushinder Singh Jand Sahib, met with the Executive Engineer (Canal Division) and administrative authorities.', 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਦੇ ਬੈਨਰ ਹੇਠ ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਕਿਸਾਨਾਂ ਅਤੇ ਇਲਾਕਾ ਨਿਵਾਸੀਆਂ ਦੇ ਇੱਕ ਵਫ਼ਦ ਨੇ ਨਹਿਰੀ ਵਿਭਾਗ ਦੇ ਉੱਚ ਅਧਿਕਾਰੀਆਂ ਨਾਲ ਮੁਲਾਕਾਤ ਕੀਤੀ।', '/images/blog-farmer-delegation.jpg', 3, 0, 'published', '2026-11-14 05:28:08', 'Sardar Khushinder Singh', 'Canal Water Delegation | Punjab Sanjhivalta Dal', 'Khushinder Singh leads farmers delegation to resolve irrigation water shortage at tail ends.', '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(4, 'Green Punjab Campaign: 5,000 Saplings Planted with Community Participation', 'ਹਰਿਆਵਲ ਲਹਿਰ: ਪਿੰਡ ਵਾਸੀਆਂ ਦੇ ਸਹਿਯੋਗ ਨਾਲ 5,000 ਬੂਟੇ ਲਗਾਏ ਗਏ', 'green-punjab-tree-plantation-drive', 'Community tree plantation campaign organized along major rural roads, school campuses, and community centers.', 'ਵਾਤਾਵਰਣ ਦੀ ਸੰਭਾਲ ਅਤੇ ਪੰਜਾਬ ਨੂੰ ਹਰਾ-ਭਰਾ ਬਣਾਉਣ ਲਈ ਪਿੰਡਾਂ ਦੀਆਂ ਸੜਕਾਂ ਅਤੇ ਸਕੂਲਾਂ ਦੁਆਲੇ ਪੌਦੇ ਲਗਾਏ ਗਏ।', 'Recognizing the pressing need for environmental conservation and ground-water recharging, Sardar Khushinder Singh initiated the monsoon Green Punjab Plantation Drive across rural belts.', 'ਵਾਤਾਵਰਣ ਵਿੱਚ ਆ ਰਹੇ ਵਿਗਾੜ ਨੂੰ ਠੱਲ੍ਹ ਪਾਉਣ ਲਈ ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਵੱਲੋਂ ਪੇਂਡੂ ਖੇਤਰਾਂ ਵਿੱਚ ਵਿਸ਼ਾਲ ਰੁੱਖ ਲਗਾਓ ਮੁਹਿੰਮ ਚਲਾਈ ਗਈ।', '/images/blog-tree-plantation.jpg', 1, 0, 'published', '2026-11-14 05:28:08', 'Sardar Khushinder Singh', 'Green Punjab Campaign | Khushinder Singh Jand Sahib', 'Community tree plantation drive led by Sardar Khushinder Singh Jand Sahib.', '2026-11-14 05:28:08', '2026-11-14 05:28:08');

-- Galleries
INSERT INTO `galleries` (`id`, `title_en`, `title_pa`, `slug`, `category`, `description`, `is_active`, `display_order`, `created_at`) VALUES
(1, 'Social & Public Service Moments', 'ਸਮਾਜ ਸੇਵਾ ਅਤੇ ਜਨਤਕ ਗਤੀਵਿਧੀਆਂ', 'social-service', 'social_work', 'Glimpses of community work, meetings, and initiatives across Punjab.', 1, 1, '2026-11-14 05:28:08');

-- Gallery Images (with authentic HD photography)
INSERT INTO `gallery_images` (`id`, `gallery_id`, `image_url`, `title_en`, `title_pa`, `caption`, `video_url`, `is_featured`, `display_order`, `created_at`) VALUES
(1, 1, '/images/khushinder-hero-1.jpg', 'Addressing the Public Gathering', 'ਜਨਤਕ ਇਕੱਠ ਨੂੰ ਸੰਬੋਧਨ', 'Sardar Khushinder Singh addressing village representatives and youths.', NULL, 1, 1, '2026-11-14 05:28:08'),
(2, 1, '/images/khushinder-hero-2.jpg', 'Environmental Awareness Session', 'ਵਾਤਾਵਰਨ ਚੇਤਨਾ ਵਿਚਾਰ-ਵਟਾਂਦਰਾ', 'Discussion on defending Punjab rivers and subsoil water.', NULL, 1, 2, '2026-11-14 05:28:08'),
(3, 1, '/images/khushinder-hero-3.jpg', 'Youth Sports Gathering', 'ਨੌਜਵਾਨ ਖੇਡ ਮੇਲਾ', 'Encouraging athletes and honoring rural sports talents.', NULL, 1, 3, '2026-11-14 05:28:08'),
(4, 1, '/images/khushinder-profile.jpg', 'Official Portrait', 'ਅਧਿਕਾਰਤ ਤਸਵੀਰ', 'Sardar Khushinder Singh Jand Sahib', NULL, 1, 4, '2026-11-14 05:28:08');

-- Social Accounts
INSERT INTO `social_accounts` (`id`, `platform`, `account_name`, `profile_url`, `page_id`, `business_account_id`, `access_token`, `refresh_token`, `token_expires_at`, `is_active`, `is_feed_enabled`, `last_synced_at`, `sync_interval_minutes`, `status`, `created_at`, `updated_at`) VALUES
(1, 'facebook', 'Sardar Khushinder Singh Jand Sahib', 'https://www.facebook.com/khushindersingh.sandhu', '1029384756', NULL, NULL, NULL, NULL, 1, 1, '2026-11-14 05:28:08', 15, 'active', '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(2, 'instagram', 'khushinder_singh', 'https://www.instagram.com/khushinder_singh', NULL, '178414002345678', NULL, NULL, NULL, 1, 1, '2026-11-14 05:28:08', 15, 'active', '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(3, 'youtube', 'Khushinder Singh Jand Sahib Official', 'https://youtube.com/@KhushinderSinghJandSahib', NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, 60, 'configured', '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(4, 'twitter', '@KhushinderJand', 'https://x.com/KhushinderJand', NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, 60, 'configured', '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(5, 'whatsapp', '+91 98765 43210', 'https://wa.me/919876543210?text=Sat%20Sri%20Akal%20Khushinder%20Singh%20Ji', NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, 60, 'configured', '2026-11-14 05:28:08', '2026-11-14 05:28:08');

-- Social Posts Cache (Live Ground Updates)
INSERT INTO `social_posts_cache` (`id`, `platform`, `post_id`, `author_name`, `caption`, `media_url`, `media_type`, `permalink`, `timestamp`, `likes_count`, `comments_count`, `created_at`) VALUES
(1, 'facebook', 'fb_env_groundwater_2026', 'Sardar Khushinder Singh Jand Sahib', 'ਪੰਜਾਬ ਦੇ ਪਾਣੀਆਂ ਅਤੇ ਵਾਤਾਵਰਨ ਨੂੰ ਪ੍ਰਦੂਸ਼ਿਤ ਕਰਨ ਵਾਲੀਆਂ ਲਾਲ ਸ਼੍ਰੇਣੀ ਦੀਆਂ ਫੈਕਟਰੀਆਂ ਖ਼ਿਲਾਫ਼ ਸਾਂਝੀ ਮੀਟਿੰਗ। ਅਸੀਂ ਆਪਣੀ ਆਉਣ ਵਾਲੀ ਪੀੜ੍ਹੀ ਦੇ ਸਾਫ਼ ਪਾਣੀ ਅਤੇ ਹਵਾ ਨਾਲ ਕਦੇ ਸਮਝੌਤਾ ਨਹੀਂ ਕਰਾਂਗੇ। ସਾਰੇ ਪਿੰਡ ਵਾਸੀਆਂ ਅਤੇ ਕਿਸਾਨ ਸਾਥੀਆਂ ਦਾ ਧੰਨਵਾਦ।\n\nStanding united against environmental pollution and industrial contamination of Punjab\'s groundwater. Clean water and healthy air are non-negotiable rights for every resident.', '/images/fb-post-1.jpg', 'IMAGE', 'https://www.facebook.com/khushindersingh.sandhu', '2026-11-14 05:28:08', 842, 116, '2026-11-14 05:28:08'),
(2, 'facebook', 'fb_farmers_water_rights_2026', 'Sardar Khushinder Singh Jand Sahib', 'ਟੇਲਾਂ \'ਤੇ ਨਹਿਰੀ ਪਾਣੀ ਪਹੁੰਚਾਉਣ ਅਤੇ ਮਾਲਵਾ ਖੇਤਰ ਦੇ ਕਿਸਾਨਾਂ ਨੂੰ ਸਿੰਚਾਈ ਸਹੂਲਤਾਂ ਦਿਵਾਉਣ ਲਈ ਪ੍ਰਸ਼ਾਸਨ ਨਾਲ ਗੱਲਬਾਤ। ਕਿਸਾਨੀ ਪੰਜਾਬ ਦੀ ਰੀੜ੍ਹ ਦੀ ਹੱਡੀ ਹੈ, ਇਸਦੀ ਮਜ਼ਬੂਤੀ ਸਾਡਾ ਪਹਿਲਾ ਫ਼ਰਜ਼ ਹੈ।\n\nAdvocating for tail-end canal water supply for farmers across the Malwa belt. Sustainable agriculture requires timely water delivery and fair treatment for all farming families.', '/images/fb-post-2.jpg', 'IMAGE', 'https://www.facebook.com/khushindersingh.sandhu', '2026-11-14 05:28:08', 1250, 204, '2026-11-14 05:28:08'),
(3, 'facebook', 'fb_health_camp_jand_sahib', 'Sardar Khushinder Singh Jand Sahib', 'ਜੰਡ ਸਾਹਿਬ ਵਿਖੇ ਲੋੜਵੰਦ ਪਰਿਵਾਰਾਂ ਲਈ ਲਗਾਏ ਗਏ ਮੁਫ਼ਤ ਮੈਡੀਕਲ ਅਤੇ ਅੱਖਾਂ ਦੇ ਚੈੱਕਅੱਪ ਕੈਂਪ ਦੌਰਾਨ ਡਾਕਟਰਾਂ ਦੀ ਟੀਮ ਅਤੇ ਮਰੀਜ਼ਾਂ ਨਾਲ ਗੱਲਬਾਤ ਕਰਦੇ ਹੋਏ। ਸਮਾਜ ਸੇਵਾ ਹੀ ਸਭ ਤੋਂ ਵੱਡਾ ਧਰਮ ਹੈ।\n\nFree mega health and eye care camp held at Jand Sahib providing specialist checkups and free medicines to rural families. Genuine service to humanity is the highest calling.', '/images/fb-post-3.jpg', 'IMAGE', 'https://www.facebook.com/khushindersingh.sandhu', '2026-11-14 05:28:08', 690, 88, '2026-11-14 05:28:08'),
(4, 'facebook', 'fb_environmental_ground_movement', 'Sardar Khushinder Singh Jand Sahib', 'ਧਰਤੀ ਹੇਠਲੇ ਜ਼ਹਿਰੀਲੇ ਪਾਣੀ ਅਤੇ ਉਦਯੋਗਿਕ ਪ੍ਰਦੂਸ਼ਣ ਵਿਰੁੱਧ ਜਨਤਕ ਲਹਿਰ। ਪਿੰਡ-ਪਿੰਡ ਜਾ ਕੇ ਲੋਕਾਂ ਨੂੰ ਜਾਗਰੂਕ ਕਰਨਾ ਅਤੇ ਆਪਣੇ ਹੱਕਾਂ ਲਈ ਆਵਾਜ਼ ਬੁਲੰਦ ਕਰਨਾ ਸਾਡੀ ਵਚਨਬੱਧਤਾ ਹੈ।\n\nGrassroots environmental awareness campaign defending our water tables, clean rivers, and fertile soil for future generations.', '/images/khushinder-environmental.jpg', 'IMAGE', 'https://www.facebook.com/khushindersingh.sandhu', '2026-11-14 05:28:08', 955, 142, '2026-11-14 05:28:08'),
(5, 'instagram', 'ig_sports_youth_cup', 'khushinder_singh', 'ਨੌਜਵਾਨੀ ਨੂੰ ਨਸ਼ਿਆਂ ਤੋਂ ਦੂਰ ਕਰਕੇ ਖੇਡ ਮੈਦਾਨਾਂ ਵੱਲ ਤੋਰਨਾ ਸਾਡਾ ਮੁੱਖ ਟੀਚਾ ਹੈ। ਸ਼ਹੀਦ ਭਗਤ ਸਿੰਘ ਸਾਲਾਨਾ ਖੇਡ ਮੇਲੇ ਦੀ ਝਲਕ। 🏆⚽ #PunjabYouth #JandSahib #Sports #Health #Punjab', '/images/ig-post-1.jpg', 'IMAGE', 'https://www.instagram.com/khushinder_singh', '2026-11-14 05:28:08', 1420, 135, '2026-11-14 05:28:08'),
(6, 'instagram', 'ig_green_punjab_initiative', 'khushinder_singh', 'ਹਰਿਆਵਲ ਪੰਜਾਬ ਮੁਹਿੰਮ: ਪਿੰਡਾਂ ਵਿੱਚ ਫ਼ਲਦਾਰ ਅਤੇ ਛਾਂਦਾਰ ਬੂਟੇ ਲਗਾਉਂਦੇ ਹੋਏ। ਆਓ ਸਾਰੇ ਰਲ ਕੇ ਧਰਤੀ ਮਾਂ ਨੂੰ ਹਰਿਆ-ਭਰਿਆ ਬਣਾਈਏ। 🌿🌳 #GreenPunjab #Environment #SaveWater #SocialService', '/images/ig-post-2.jpg', 'IMAGE', 'https://www.instagram.com/khushinder_singh', '2026-11-14 05:28:08', 980, 74, '2026-11-14 05:28:08'),
(7, 'instagram', 'ig_sanjhivalta_dal_unity', 'khushinder_singh', 'ਲੋਕਾਂ ਦੀ ਸੇਵਾ ਅਤੇ ਭਾਈਚਾਰਕ ਸਾਂਝ ਹੀ ਸਾਡੀ ਤਾਕਤ ਹੈ। ਪਿੰਡ ਵਾਸੀਆਂ ਨਾਲ ਖੁੱਲ੍ਹੀ ਵਿਚਾਰ-ਚਰਚਾ। 🙏 #PunjabSanjhivaltaDal #PublicService #KhushinderSingh #JandSahib', '/images/ig-post-3.jpg', 'IMAGE', 'https://www.instagram.com/khushinder_singh', '2026-11-14 05:28:08', 1890, 215, '2026-11-14 05:28:08'),
(8, 'instagram', 'ig_community_field_service', 'khushinder_singh', 'ਲੋਕ ਸੇਵਾ ਹੀ ਪਰਮ ਧਰਮ ਹੈ। ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਅਤੇ ਆਸ-ਪਾਸ ਦੇ ਪਿੰਡਾਂ ਦੇ ਬਜ਼ੁਰਗਾਂ ਅਤੇ ਕਿਸਾਨਾਂ ਨਾਲ ਸਾਂਝੀਆਂ ਵਿਚਾਰਾਂ। ਹਰ ਸਮੱਸਿਆ ਦੇ ਹੱਲ ਲਈ ਹਮੇਸ਼ਾ ਹਾਜ਼ਰ। 🤝❤️ #RuralPunjab #PunjabSanjhivaltaDal #SocialWorker', '/images/khushinder-community.jpg', 'IMAGE', 'https://www.instagram.com/khushinder_singh', '2026-11-14 05:28:08', 1120, 96, '2026-11-14 05:28:08');

-- Advertisements
INSERT INTO `advertisements` (`id`, `title`, `placement`, `image_url`, `destination_url`, `html_code`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Blood Donation Camp Announcement', 'homepage', '/images/ad-blood-donation.jpg', '/contact', NULL, 1, '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(2, 'Green Punjab Drive Banner', 'between_blogs', '/images/ad-green-punjab.jpg', '/blog', NULL, 1, '2026-11-14 05:28:08', '2026-11-14 05:28:08');

-- SEO Settings
INSERT INTO `seo_settings` (`id`, `page_path`, `meta_title`, `meta_description`, `meta_keywords`, `og_title`, `og_description`, `og_image`, `twitter_card`, `is_indexable`, `updated_at`) VALUES
(1, '/', 'Sardar Khushinder Singh Jand Sahib | Official Social Worker Website', 'Official website of Sardar Khushinder Singh Jand Sahib, Social Worker and Member of Punjab Sanjhivalta Dal. Explore initiatives, public updates, and contact.', 'Khushinder Singh, Jand Sahib, Punjab Sanjhivalta Dal, Punjab Social Worker, Rural Punjab Welfare, Youth Sports Punjab', 'Sardar Khushinder Singh Jand Sahib | Official Social Worker Website', 'Dedicated to social welfare, rural development, healthcare, and communal harmony across Punjab.', '/images/khushinder-hero-1.jpg', 'summary_large_image', 1, '2026-11-14 05:28:08'),
(2, '/about', 'Biography & Social Work | Sardar Khushinder Singh Jand Sahib', 'Read the journey, public service milestones, and vision of Sardar Khushinder Singh Jand Sahib, Social Worker & Member of Punjab Sanjhivalta Dal.', 'Biography Khushinder Singh, Jand Sahib Social Work, Punjab Sanjhivalta Dal History', 'Biography & Social Work | Sardar Khushinder Singh Jand Sahib', 'Read about Sardar Khushinder Singh Jand Sahib\'s service journey.', '/images/khushinder-profile.jpg', 'summary_large_image', 1, '2026-11-14 05:28:08'),
(3, '/blog', 'News & Articles | Sardar Khushinder Singh Jand Sahib', 'Official news, press releases, social work updates, and articles by Sardar Khushinder Singh Jand Sahib.', 'Punjab News, Khushinder Singh Blogs, Medical Camps, Rural Sports', 'News & Articles | Sardar Khushinder Singh Jand Sahib', 'Explore latest updates and articles from Sardar Khushinder Singh Jand Sahib.', '/images/blog-health-camp.jpg', 'summary_large_image', 1, '2026-11-14 05:28:08'),
(4, '/contact', 'Contact Office | Sardar Khushinder Singh Jand Sahib', 'Get in touch with Sardar Khushinder Singh Jand Sahib. Submit community inquiries or request in-person meetings at Jand Sahib office.', 'Contact Khushinder Singh, Jand Sahib Office Address, Public Grievance Punjab', 'Contact Office | Sardar Khushinder Singh Jand Sahib', 'Reach out to Sardar Khushinder Singh Jand Sahib\'s public office.', '/images/logo-main.png', 'summary_large_image', 1, '2026-11-14 05:28:08');

-- SMTP Settings
INSERT INTO `smtp_settings` (`id`, `smtp_host`, `smtp_port`, `smtp_username`, `smtp_password`, `encryption`, `sender_name`, `sender_email`, `admin_notification_email`, `is_enabled`, `updated_at`) VALUES
(1, 'smtp.hostinger.com', 465, 'contact@khusi.1313softdev.com', 'Kuku@5769', 'SSL', 'Sardar Khushinder Singh Jand Sahib Office', 'contact@khusi.1313softdev.com', 'kukukaramjit@gmail.com', 1, '2026-11-14 05:28:08');

-- Email Templates
INSERT INTO `email_templates` (`id`, `template_key`, `title`, `subject`, `body_html`, `body_text`, `variables`, `is_active`, `updated_at`) VALUES
(1, 'inquiry_confirmation', 'Inquiry Confirmation', 'Thank you for reaching out to Sardar Khushinder Singh Jand Sahib', '<h2>Sat Sri Akal {{name}},</h2><p>Thank you for contacting the public office of <strong>Sardar Khushinder Singh Jand Sahib</strong>. We have received your message regarding: <em>{{subject}}</em>.</p><p>Our team will review your inquiry and follow up shortly.</p><br><p>Warm regards,<br>Office of Sardar Khushinder Singh Jand Sahib<br>Village Jand Sahib, Punjab</p>', 'Sat Sri Akal {{name}},\n\nThank you for contacting the office of Sardar Khushinder Singh Jand Sahib. We have received your inquiry regarding {{subject}}.\n\nWarm regards,\nOffice of Sardar Khushinder Singh Jand Sahib', 'name,subject', 1, '2026-11-14 05:28:08'),
(2, 'admin_notification', 'Admin Notification', 'New Public Inquiry from {{name}}', '<h3>New Public Inquiry Received</h3><p><strong>Name:</strong> {{name}}</p><p><strong>Email:</strong> {{email}}</p><p><strong>Phone:</strong> {{phone}}</p><p><strong>Subject:</strong> {{subject}}</p><p><strong>Message:</strong><br>{{message}}</p>', 'New inquiry from {{name}} ({{email}}, {{phone}}): {{subject}}\n\n{{message}}', 'name,email,phone,subject,message', 1, '2026-11-14 05:28:08');

-- AI Assistant Settings
INSERT INTO `ai_settings` (`id`, `is_enabled`, `provider`, `model_name`, `system_prompt`, `temperature`, `max_tokens`, `updated_at`) VALUES
(1, 1, 'gemini', 'gemini-1.5-flash', 'You are the verified bilingual AI Assistant for Sardar Khushinder Singh Jand Sahib (Social Worker & Member of Punjab Sanjhivalta Dal). Only state facts present in the verified portal database.', 0.2, 800, '2026-11-14 05:28:08');

-- AI Knowledge Sources
INSERT INTO `ai_knowledge_sources` (`id`, `title`, `category`, `content`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Verified Identity & Biography', 'biography', 'Sardar Khushinder Singh Jand Sahib is an esteemed social worker and dedicated member of Punjab Sanjhivalta Dal from village Jand Sahib, Punjab, India. He works on canal water access, free health camps, rural sports, and anti-pollution advocacy.', 1, '2026-11-14 05:28:08', '2026-11-14 05:28:08'),
(2, 'Office Location & Sabha Timings', 'faq', 'Office Address: Village Jand Sahib, Punjab 152026, India. Public grievance hearings and meetings are held every Sunday between 10:00 AM and 2:00 PM.', 1, '2026-11-14 05:28:08', '2026-11-14 05:28:08');

SET FOREIGN_KEY_CHECKS = 1;
-- =====================================================================
-- Dump Completed Successfully
-- =====================================================================
