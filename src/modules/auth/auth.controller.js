const authService = require('./auth.service');

async function register(req, res, next) {
  try {
    const { nombre, email, password } = req.body;

    const user = await authService.register({
      nombre,
      email,
      password,
    });

    return res.status(201).json({
      message: 'Usuario registrado correctamente',
      user,
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const result = await authService.login({
      email,
      password,
    });

    return res.status(200).json({
      message: 'Login correcto',
      ...result,
    });
  } catch (error) {
    return next(error);
  }
}

async function me(req, res, next) {
  try {
    return res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login,
  me,
};