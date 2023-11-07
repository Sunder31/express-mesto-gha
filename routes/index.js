const router = require('express').Router();
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const authRouter = require('./auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/', authRouter);

router.use('/users', usersRouter);

router.use('/cards', cardsRouter);

router.use('/*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
