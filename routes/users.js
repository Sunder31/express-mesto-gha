const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCurrentUser,
  getUserById,
  getUsers,
  updateUserProfile,
  updateAvatar,
} = require('../controllers/users');

const regexForURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
      about: Joi.string().min(2).max(30).default('Исследователь'),
    }),
  }),
  updateUserProfile,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png').regex(regexForURL),
    }),
  }),
  updateAvatar,
);

module.exports = router;
