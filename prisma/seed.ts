// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Creating the ADMIN role
    const adminRole = await prisma.role.create({
      data: {
        name: 'ADMIN',
        description: 'Administrator role',
        key: 'admin',
      },
    });

    // Creating additional roles
    await prisma.role.createMany({
      data: [
        {
          name: 'SDR',
          description: 'Sales Development Representative',
          key: 'sdr',
        },
        {
          name: 'MANAGER',
          description: 'Manager Role',
          key: 'manager',
        },
      ],
    });

    // Creating the admin user with the ADMIN role
    const admin = await prisma.user.create({
      data: {
        name: 'admin',
        email: 'admin@novatoresols.com',
        password:
          '$2a$10$1BHeieHcRUpFOxIJyI8gPuqqOT.l7nPfOrD4ZoUHYRwSvqzo26MMy', // hashed password for 'password123'
        roleId: adminRole.id,
        company: 'Novatore Solutions',
      },
    });

    // Logging the created roles and user
    console.log({ adminRole, admin });
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

(async () => {
  try {
    await main();
    console.log('Seeding completed successfully.');
  } catch (e) {
    console.error('Unexpected error during seeding:', e);
    process.exit(1);
  }
})();
