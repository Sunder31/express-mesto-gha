const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_KEY = 'SECRET_KEY' } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError('Необходимо авторизоваться'));
  }

  let playload;

  try {
    playload = jwt.verify(token, JWT_KEY);
  } catch {
    return next(new UnauthorizedError('Необходимо авторизоваться'));
  }

  req.user = playload;

  next();
};

module.exports = auth;
