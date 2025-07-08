import { PrismaClient } from '@prisma/client';

// Create a single instance of PrismaClient
const prisma = new PrismaClient();

// Optional: Add shutdown hook for clean process exit
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;