const User = require('../models/user')

const createUser = (req, res) => {
  const { name, about, avatar} = req.body

  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if(err.name === "ValidationError") {
        return res.status(400).send({
          message: 'Ошибка при создании пользователя'
        })
      }

      return res.status(500).send({
        message: 'Ошибка на стороне сервера'
      })
    })
}

const getUsers = (req, res) => {
    User.find()
      .then((users) => {
        res.status(200).send(users)
      })
      .catch(() => {
        res.status(500).send({
          message: 'Ошибка на стороне сервера'
        })
      })
}

const getUserById = (req, res) => {
    const { userId } = req.params

    return User.findById(userId)
      .then((user) => {
        if(!user) {
          res.status(404).send({
            message: 'Пользователь не найден'
          })
        }
        return res.status(200).send(user)
      })
      .catch(() => {
        res.status(500).send({
          message: 'Ошибка на стороне сервера'
        })
      })
}

const updateUserProfile = (req, res) => {
    const { name, about } = req.body

    return User.findByIdAndUpdate(req.user._id,
      { name, about, },
      {
        new: true,
        runValidators: true,
      })
        .then((user) => {
          res.status(200).send(user)
        })
        .catch((err) => {
          if(err.name === "ValidationError") {
            return res.status(400).send({
              message: 'Ошибка при обновлении профиля'
            })
          }

          return res.status(500).send({
            message: 'Ошибка на стороне сервера'
          })
        })
}

const updateAvatar = (req, res) => {
    const { avatar } = req.body

    User.findByIdAndUpdate(req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      })
        .then((user) => {
          res.status(200).send(user)
        })
        .catch((err) => {
          if(err.name === "ValidationError") {
            return res.status(400).send({
              message: 'Ошибка при обновлении аватара'
            })
          }

          return res.status(500).send({
            message: 'Ошибка на стороне сервера'
          })
        })
}

module.exports = {
    createUser,
    getUserById,
    getUsers,
    updateUserProfile,
    updateAvatar,
}