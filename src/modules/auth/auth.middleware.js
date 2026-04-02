const jwt = require('jsonwebtoken');
const prisma = require('../../lib/prisma');
const env = require('../../config/env');

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'No autorizado',
      });
    }

    const token = authHeader.split(' ')[1];

    let payload;

    try {
      payload = jwt.verify(token, env.jwtSecret);
    } catch (error) {
      return res.status(401).json({
        message: 'Token inválido o expirado',
      });
    }

    const userId = BigInt(payload.sub);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        message: 'Usuario no válido',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authenticate,
};