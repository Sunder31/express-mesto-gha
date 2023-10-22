const router = require('express').Router();
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const { ErrorCodes, ErrorMessages } = require('../errors/errors');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', (req, res) => res.status(ErrorCodes.errorCode404).send({
  message: ErrorMessages.pageError404,
}));
module.exports = router;
