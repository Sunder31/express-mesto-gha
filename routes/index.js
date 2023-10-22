const router = require('express').Router();
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const { Errors } = require('../errors/errors');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', (req, res) => res.status(404).send({
  message: Errors.pageError404,
}));
module.exports = router;
