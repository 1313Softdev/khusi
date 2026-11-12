const mysql = require('mysql2/promise');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('--- Starting Database Setup for Sardar Khushinder Singh Official Website ---');
  
  // Potential credentials to try
  const credentials = [
    { user: 'root', password: '', host: '127.0.0.1', port: 3306 },
    { user: 'root', password: 'password', host: '127.0.0.1', port: 3306 },
    { user: 'root', password: 'root', host: '127.0.0.1', port: 3306 },
  ];

  let activeConn = null;
  let workingCred = null;

  for (const cred of credentials) {
    try {
      console.log(`Testing connection as ${cred.user}@${cred.host}:${cred.port}...`);
      const conn = await mysql.createConnection({
        host: cred.host,
        port: cred.port,
        user: cred.user,
        password: cred.password,
      });
      console.log(`✓ Connected successfully as ${cred.user}`);
      activeConn = conn;
      workingCred = cred;
      break;
    } catch (err) {
      console.log(`Failed connecting as ${cred.user} (${err.code || err.message})`);
    }
  }

  if (!activeConn) {
    console.error('Could not connect to MySQL with standard credentials. Please ensure MySQL is running on 127.0.0.1:3306');
    process.exit(1);
  }

  const dbName = 'khushinder_db';
  console.log(`Ensuring database '${dbName}' exists with utf8mb4 character set...`);
  await activeConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  console.log(`✓ Database '${dbName}' ready.`);
  await activeConn.end();

  const dbUrl = `mysql://${workingCred.user}:${workingCred.password ? workingCred.password : ''}@${workingCred.host}:${workingCred.port}/${dbName}`;
  
  // Write or update .env file
  const envPath = path.join(__dirname, '..', '.env');
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  if (envContent.includes('DATABASE_URL=')) {
    envContent = envContent.replace(/DATABASE_URL=.*/, `DATABASE_URL="${dbUrl}"`);
  } else {
    envContent += `\nDATABASE_URL="${dbUrl}"\n`;
  }

  if (!envContent.includes('JWT_SECRET=')) {
    envContent += `JWT_SECRET="khushinder_punjab_sanjhivalta_dal_super_secret_jwt_key_2026"\n`;
  }
  if (!envContent.includes('NEXT_PUBLIC_SITE_URL=')) {
    envContent += `NEXT_PUBLIC_SITE_URL="http://localhost:3000"\n`;
  }

  fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf8');
  console.log('✓ .env updated with DATABASE_URL.');

  console.log('Running Prisma generate...');
  execSync('npx prisma generate', { stdio: 'inherit', env: { ...process.env, DATABASE_URL: dbUrl } });

  console.log('Pushing database schema (prisma db push)...');
  execSync('npx prisma db push --skip-generate', { stdio: 'inherit', env: { ...process.env, DATABASE_URL: dbUrl } });

  console.log('Running seed data...');
  require('./seed.js');
}

main().catch((err) => {
  console.error('Setup failed:', err);
  process.exit(1);
});
