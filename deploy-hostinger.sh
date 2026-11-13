#!/bin/bash
# =====================================================================
# Sardar Khushinder Singh Jand Sahib Official Portal
# Hostinger One-Click Setup & Launch Script
# =====================================================================

set -e

echo "=========================================================="
echo " Starting Hostinger Deployment for Khushinder Singh Portal"
echo "=========================================================="

# Check Node.js version
NODE_VER=$(node -v || echo "none")
echo "✓ Node.js version: $NODE_VER"

if [ "$NODE_VER" = "none" ]; then
  echo "Error: Node.js is not installed. Please install Node.js 18+ or 20+."
  exit 1
fi

# Ensure .env exists
if [ ! -f .env ]; then
  if [ -f .env.production ]; then
    echo "Copying .env.production to .env..."
    cp .env.production .env
    echo "⚠️  NOTE: Please edit .env with your Hostinger MySQL database credentials!"
  else
    echo "Error: .env not found. Please create .env with your database connection string."
    exit 1
  fi
fi

# Install dependencies
echo "Installing production dependencies..."
npm install --production=false

# Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma generate

# Build Next.js
echo "Building Next.js application..."
npm run build

echo "=========================================================="
echo "✓ Build completed successfully!"
echo "To run with PM2 (recommended for Hostinger VPS):"
echo "  pm2 start npm --name 'khushinder-website' -- start -- -p 3000"
echo "  pm2 save"
echo "=========================================================="
