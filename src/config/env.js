require('dotenv').config();

const requiredVars = ['DATABASE_URL', 'JWT_SECRET', 'JWT_EXPIRES_IN'];

for (const key of requiredVars) {
  if (!process.env[key] || !process.env[key].trim()) {
    throw new Error(`Falta la variable de entorno obligatoria: ${key}`);
  }
}

if (process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET debe tener al menos 32 caracteres');
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};