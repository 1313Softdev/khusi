# Hostinger Deployment Guide
### Sardar Khushinder Singh Jand Sahib – Official Website

This guide walks you through deploying the complete full-stack Next.js + MySQL portal on **Hostinger** (Hostinger VPS or Hostinger Cloud/Web Hosting with Node.js support).

---

## 📦 What is Included in this Package

1. **Complete Next.js Source Code** (`src/`, `public/`, `prisma/`, `package.json`, etc.)
2. **Pre-built Production Build** (`.next/`) ready to launch immediately
3. **Database Export (`khushinder_db_export.sql`)**: Complete standalone SQL dump with all 27 tables, relationships, admin user, bilingual data, hero slides, and social feeds
4. **Environment Configurations (`.env.production`, `.env.example`)**
5. **Process Manager Config (`ecosystem.config.js`)** for PM2 background process management
6. **One-Command Deploy Script (`deploy-hostinger.sh`)**

---

## STEP 1: Set Up MySQL Database on Hostinger

1. Log in to your **Hostinger hPanel** (`hpanel.hostinger.com`).
2. Go to **Databases** → **MySQL Databases**.
3. Create a new database:
   - **Database Name:** e.g., `u123456789_khushinder`
   - **Username:** e.g., `u123456789_khushinder`
   - **Password:** *Enter a strong password*
4. Click **Create**.
5. Once created, click **Enter phpMyAdmin** next to the database.
6. In phpMyAdmin:
   - Click the **Import** tab at the top.
   - Click **Choose File** and select `khushinder_db_export.sql`.
   - Click **Import** at the bottom.
   - All 27 tables and data will be imported in seconds!

---

## STEP 2: Configure Environment Variables

Edit `.env` (or copy `.env.production` to `.env`):

```env
DATABASE_URL="mysql://u123456789_khushinder:YOUR_PASSWORD@localhost:3306/u123456789_khushinder"
JWT_SECRET="khushinder_punjab_sanjhivalta_dal_super_secret_jwt_key_2026_hostinger_prod"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
PORT=3000
NODE_ENV=production
```

*(Replace `u123456789_khushinder`, `YOUR_PASSWORD`, and `https://yourdomain.com` with your actual Hostinger credentials and domain).*

---

## STEP 3: Deploying on Hostinger

### Option A: Hostinger VPS (Recommended for Best Performance)

1. Upload the zip file `khushinder_singh_website_hostinger.zip` to your VPS via SSH/SCP or FileZilla:
   ```bash
   scp khushinder_singh_website_hostinger.zip root@YOUR_SERVER_IP:/var/www/
   ```
2. SSH into your VPS:
   ```bash
   ssh root@YOUR_SERVER_IP
   cd /var/www
   unzip khushinder_singh_website_hostinger.zip -d khushinder-website
   cd khushinder-website
   ```
3. Copy environment file and edit:
   ```bash
   cp .env.production .env
   nano .env
   ```
4. Install dependencies and start with PM2:
   ```bash
   npm install
   npx prisma generate
   npm run build
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```
5. Configure Nginx Reverse Proxy to forward port 80/443 to `http://localhost:3000`:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
6. Install free SSL with Certbot:
   ```bash
   certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

---

### Option B: Hostinger Cloud / Shared Web Hosting (Node.js Application Manager)

1. In **hPanel**, go to **Advanced** → **Node.js**.
2. Click **Create Application**:
   - **Node.js version:** Select `20.x` or `18.x`
   - **Application mode:** `Production`
   - **Application root:** `public_html` (or `public_html/website`)
   - **Application startup file:** `node_modules/next/dist/bin/next` or `server.js`
3. Upload `khushinder_singh_website_hostinger.zip` via **File Manager** into your application root and **Extract** it.
4. Set the environment variables in hPanel or via `.env`.
5. In the Node.js manager, click **Run NPM Install** and then **Restart Application**.

---

## 🔑 Default Admin Login Credentials

Once deployed, access the dashboard at:
- **URL:** `https://yourdomain.com/admin`
- **Email:** `admin@khushindersingh.org`
- **Password:** `Admin@12345`

*(You can change your password anytime inside the Admin Dashboard under Settings).*
