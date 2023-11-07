const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

// const createUser = (req, res) => {
//   const { name, about, avatar } = req.body;

//   return User.create({ name, about, avatar })
//     .then((user) => res.status(201).send(user))
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         return res.status(ErrorCodes.errorCode400).send({
//           message: ErrorMessages.userError400,
//         });
//       }

//       return res.status(ErrorCodes.errorCode500).send({
//         message: ErrorMessages.error500,
//       });
//     });
// };

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new NotFoundError('Пользователь с данным id не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
  getUserById,
  getUsers,
  updateUserProfile,
  updateAvatar,
};
