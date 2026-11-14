import { PrismaClient } from '@prisma/client';

const LIVE_PROD_DB_URL = 'mysql://u796814945_khusi:Kuku%405769@localhost:3306/u796814945_khusi';

function getEffectiveDatabaseUrl(): string {
  const currentUrl = process.env.DATABASE_URL;
  if (
    !currentUrl ||
    currentUrl.includes('u123456789_khushinder') ||
    currentUrl.includes('YourStrongPasswordHere') ||
    currentUrl.includes('khushinder_db')
  ) {
    return LIVE_PROD_DB_URL;
  }
  return currentUrl;
}

const dbUrl = getEffectiveDatabaseUrl();
process.env.DATABASE_URL = dbUrl;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: ['error', 'warn'],
  });

globalForPrisma.prisma = prisma;

export default prisma;
