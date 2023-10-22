const User = require('../models/user');
const { Errors } = require('../errors/errors');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: Errors.userError400,
        });
      }

      return res.status(500).send({
        message: Errors.error500,
      });
    });
};

const getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(500).send({
        message: Errors.error500,
      });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: Errors.userError404,
        });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: Errors.userError400,
        });
      }
      return res.status(500).send({
        message: Errors.error500,
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
        return res.status(400).send({
          message: Errors.profileError400,
        });
      }

      return res.status(500).send({
        message: Errors.error500,
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
        return res.status(400).send({
          message: Errors.avatarError400,
        });
      }

      return res.status(500).send({
        message: Errors.error500,
      });
    });
};

module.exports = {
  createUser,
  getUserById,
  getUsers,
  updateUserProfile,
  updateAvatar,
};
