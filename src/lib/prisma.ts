// // lib/prisma.ts
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default prisma;

import { PrismaClient } from '@prisma/client';

// Add PrismaClient to the global type if it doesn't exist
declare global {
  // Prevents the TypeScript compiler from complaining about redeclaring the PrismaClient in development mode
  let prisma: PrismaClient | undefined;
}

// Use a singleton pattern to prevent exhausting database connections in serverless environments
const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // Optional: Logs queries to help debug performance
  });

// Only create a new instance of PrismaClient if in a development environment
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
