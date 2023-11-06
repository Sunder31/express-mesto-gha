// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const { ErrorCodes } = require('../errors/errors');

const { JWT_KEY = 'SECRET_KEY' } = process.env;

const authError = (res) => res.status(401).send({ message: ErrorCodes.errorCode401 });

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(authError);
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    next(authError);
  }

  req.user = payload;
  next();
};

module.exports = auth;
