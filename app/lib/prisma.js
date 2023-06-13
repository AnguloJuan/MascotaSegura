import { PrismaClient } from '@prisma/client';

let prisma;

// Create a function to initialize the Prisma Client instance
export const getPrisma = () => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};