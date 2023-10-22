/* eslint-disable linebreak-style */
const http2 = require('http2');

const ErrorMessages = {
  cardError400: 'Ошибка при создании карточки',
  cardError404: 'Карточка не найдена',
  userError400: 'Ошибка при создании пользователя',
  userError404: 'Пользователь не найден',
  profileError400: 'Ошибка при обновлении профиля',
  avatarError400: 'Ошибка при обновлении аватара',
  error500: 'Ошибка на стороне сервера',
  pageError404: 'Страница не найдена',
};

const ErrorCodes = {
  errorCode400: http2.constants.HTTP_STATUS_BAD_REQUEST,
  errorCode404: http2.constants.HTTP_STATUS_NOT_FOUND,
  errorCode500: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
};

module.exports = {
  ErrorMessages,
  ErrorCodes,
};
