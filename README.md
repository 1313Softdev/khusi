# Sardar Khushinder Singh Jand Sahib — Official Website & Admin Portal

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0%2FMariaDB-00758F?logo=mysql)](https://www.mysql.com/)

A modern, premium, fully responsive, dynamic political and social worker website built for **Sardar Khushinder Singh Jand Sahib**, Social Worker and Member of **Punjab Sanjhivalta Dal**, based in **Jand Sahib, Punjab, India**.

---

## 🌟 Key Features

### 1. Premium Public Website
- **Royal Navy, Saffron & Gold Branding:** Trustworthy, modern color palette with cultural elegance.
- **Bilingual English & Punjabi Support:** Instant language toggle with Gurmukhi font rendering.
- **Dynamic Hero Section:** Video & image slider with dynamic overlays, custom CTAs, and admin controls.
- **Animated Logo Introduction:** Rotating logo showcase for Punjab Sanjhivalta Dal and welfare emblems with configurable rotation time, duration, and display effects (fade, rotate, slide).
- **Facebook & Instagram Live Updates:** Direct feeds displaying photos, captions, and metrics with live caching and official links:
  - Facebook: `https://www.facebook.com/khushindersingh.sandhu`
  - Instagram: `https://www.instagram.com/khushinder_singh`
- **Dynamic Blogs & News:** Category filtering, search, pagination, SEO meta tags, and social share buttons.
- **Social Work Gallery:** Lightbox modal with photo viewer and video embeds.
- **Validated Public Contact Form:** Honeypot anti-spam, math challenge verification, MySQL storage, and instant SMTP email notifications.
- **Smart AI Public Assistant:** Dedicated multilingual chatbot strictly grounded in verified portal records, biography, Punjab Sanjhivalta Dal membership, and public service milestones.

### 2. Powerful Custom Admin Dashboard (`/admin`)
- **Executive Overview:** Live counts for published articles, drafts, citizen inquiries, media assets, social sync status, and audit logs.
- **Module 1: Website Settings:** Portal branding, logos, contact info, default language, colors, and copyright.
- **Module 2: Hero Slider Manager:** Bilingual headings, subtitles, slide images, video backgrounds, and overlay opacity.
- **Module 3: Biography Manager:** Full biography, social work journey, public service milestones, vision, and organization ethos.
- **Module 4: Logo Animation Manager:** Multi-logo uploads, sorting, animation duration, speed, and transition effects with live preview.
- **Module 5: Blog Management:** Full CRUD, rich text editor, featured media, category/tag assignment, and SEO meta.
- **Module 6: Media Library:** File uploads, format validation, size limit checks, folder sorting, and one-click URL copy.
- **Module 7: Meta & SEO Manager:** Per-page meta titles, descriptions, Open Graph cards, Google Analytics ID, dynamic `/sitemap.xml`, and `/robots.txt`.
- **Module 8: Advertisement Manager:** Banner graphics, Google AdSense script support, placements (homepage, between blogs, sidebar, footer).
- **Module 9: Social Media Manager:** Meta Graph API tokens, accounts configuration, sync intervals, and manual synchronization trigger.
- **Module 10: SMTP Email Settings:** Outgoing mail server configuration, automated email templates, and live test email sender.
- **Module 11: Contact Inquiry Manager:** Search, filter by read/unread, inspect inquiries, reply directly via email, and export CSV.
- **Module 12: Homepage Section Manager:** Reorder homepage sections, toggle visibility, customize titles, and adjust post display limits.
- **AI Assistant Manager:** Google Gemini API configuration, system prompt rules, approved knowledge documents CRUD, and chat session transcripts.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | Next.js 14 (App Router) + React 18 + TypeScript |
| **Styling** | Tailwind CSS + Custom Saffron & Navy Palettes |
| **Icons & Animations** | Lucide React + Framer Motion |
| **Database & ORM** | MySQL 8 / MariaDB (utf8mb4) + Prisma ORM |
| **Authentication** | Secure JWT in HTTP-Only Cookies + Bcrypt password hashing |
| **Email Engine** | Nodemailer with database SMTP settings & template rendering |
| **Social Sync** | Official Meta Graph API integration with background caching |
| **AI Assistant** | Google Gemini API + Internal deterministic knowledge retrieval engine |

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js:** v18.0.0 or later (v20+ recommended)
- **MySQL / MariaDB:** Running on port `3306`

### 1. Clone & Install Dependencies
```bash
git clone <repository_url>
cd Khuswinder
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update your database credentials if different:
```env
DATABASE_URL="mysql://root:@127.0.0.1:3306/khushinder_db"
JWT_SECRET="your_strong_random_jwt_secret"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
GEMINI_API_KEY="" # Optional: for Google Gemini LLM
```

### 3. Setup MySQL Database & Seed Verified Data
Run the automated setup script. This creates `khushinder_db` with `utf8mb4` encoding, pushes all 27 tables, and populates initial verified records:
```bash
npm run db:setup
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Default Administrator Credentials

| Role | Email | Password |
|---|---|---|
| **Super Admin** | `admin@khushindersingh.org` | `Admin@12345` |

> ⚠️ **Important:** Change this default password in production via the admin dashboard.

---

## 📦 Production Deployment

### 1. Build Optimized Application
```bash
npm run build
```

### 2. Start Production Server
```bash
npm run start
```

### 3. Process Management with PM2 (Recommended)
```bash
npm install -g pm2
pm2 start npm --name "khushinder-portal" -- start
pm2 save
pm2 startup
```

---

## 🗄️ Database Backup & Restore

### Backup Database
```bash
mysqldump -u root -p khushinder_db --default-character-set=utf8mb4 > backup_khushinder_$(date +%F).sql
```

### Restore Database
```bash
mysql -u root -p khushinder_db < backup_khushinder_2026-11-13.sql
```

---

## 🌐 Official Social Links
- **Facebook:** [https://www.facebook.com/khushindersingh.sandhu](https://www.facebook.com/khushindersingh.sandhu)
- **Instagram:** [https://www.instagram.com/khushinder_singh](https://www.instagram.com/khushinder_singh)
- **Office Location:** Village Jand Sahib, Punjab, India
