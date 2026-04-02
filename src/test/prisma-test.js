const prisma = require('../lib/prisma');

async function main() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      nombre: true,
      email: true,
    },
  });

  console.log('USERS:', users);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });