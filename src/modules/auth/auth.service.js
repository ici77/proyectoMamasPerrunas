const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = require('../../lib/prisma');
const env = require('../../config/env');

const SALT_ROUNDS = 12;

async function register({ nombre, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    throw new Error('Ya existe una cuenta con ese email');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      nombre: nombre.trim(),
      email: normalizedEmail,
      passwordHash,
    },
    select: {
      id: true,
      nombre: true,
      email: true,
      rol: true,
      createdAt: true,
    },
  });

  return {
    ...user,
    id: user.id.toString(),
  };
}

async function login({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user || !user.isActive) {
    throw new Error('Credenciales inválidas');
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error('Credenciales inválidas');
  }

  const token = jwt.sign(
    {
      sub: user.id.toString(),
      role: user.rol,
      email: user.email,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    }
  );

  return {
    token,
    user: {
      id: user.id.toString(),
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
    },
  };
}

module.exports = {
  register,
  login,
};