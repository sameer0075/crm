// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.create({
    data: {
      name: 'ADMIN',
      description: 'Administrator role',
    },
  });

  await prisma.role.createMany({
    data: [
      {
        name: 'SDR',
        description: 'Sales Development Representative',
      },
      {
        name: 'MANAGER',
        description: 'Manager Role',
      },
    ],
  });
  const admin = await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@novatoresols.com',
      password: '$2a$10$1BHeieHcRUpFOxIJyI8gPuqqOT.l7nPfOrD4ZoUHYRwSvqzo26MMy', // password123
      roleId: adminRole.id,
      company: 'Novatore Slutions',
    },
  });

  console.log({ adminRole, admin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
