/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ErrorMessages, ErrorCodes } = require('../errors/errors');

const { JWT_KEY = 'SECRET_KEY' } = process.env;

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.status(201).send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res.status(ErrorCodes.errorCode400).send({
            message: ErrorMessages.userError400,
          });
        }

        return res.status(ErrorCodes.errorCode500).send({
          message: ErrorMessages.error500,
        });
      }));
};

const getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(ErrorCodes.errorCode500).send({
        message: ErrorMessages.error500,
      });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(ErrorCodes.errorCode404).send({
          message: ErrorMessages.userError404,
        });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ErrorCodes.errorCode400).send({
          message: ErrorMessages.userError400,
        });
      }
      return res.status(ErrorCodes.errorCode500).send({
        message: ErrorMessages.error500,
      });
    });
};

const updateUserProfile = (req, res) => {
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ErrorCodes.errorCode400).send({
          message: ErrorMessages.profileError400,
        });
      }

      return res.status(ErrorCodes.errorCode500).send({
        message: ErrorMessages.error500,
      });
    });
};

const updateAvatar = (req, res) => {
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ErrorCodes.errorCode400).send({
          message: ErrorMessages.avatarError400,
        });
      }

      return res.status(ErrorCodes.errorCode500).send({
        message: ErrorMessages.error500,
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email,
          _id: user._id,
        })
        .catch(() => {
          res.status(401).send({
            message: ErrorCodes.errorCode401,
          });
        });
    });
};

const getCurrentUser = (req, res) => {
  const currentUserId = req.user._id;

  User.findById(currentUserId)
    .orFail('InvalidUserId')
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'InvalidUserId') {
        res.status(404).send({ message: 'Пользователь с таким id не найден' });
      } else {
        res.status(ErrorCodes.errorCode500).send({ message: ErrorMessages.error500 });
      }
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  getUserById,
  getUsers,
  updateUserProfile,
  updateAvatar,
  login,
};
