const authService = require('../modules/auth/auth.service');
const prisma = require('../lib/prisma');

async function main() {
  const timestamp = Date.now();
  const testEmail = `test${timestamp}@mamasperrunas.com`;
  const testPassword = 'Perrunas2026!Segura';

  console.log('\n--- REGISTER ---');
  const newUser = await authService.register({
    nombre: 'Usuaria Test',
    email: testEmail,
    password: testPassword,
  });

  console.log(newUser);

  console.log('\n--- LOGIN ---');
  const loginResult = await authService.login({
    email: testEmail,
    password: testPassword,
  });

  console.log({
    tokenPreview: `${loginResult.token.slice(0, 30)}...`,
    user: loginResult.user,
  });
}

main()
  .catch((error) => {
    console.error('ERROR EN TEST AUTH:', error.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });