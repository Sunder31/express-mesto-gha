const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/auth');

const regexForURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
      about: Joi.string().min(2).max(30).default('Исследователь'),
      avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png').regex(regexForURL),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

module.exports = router;
