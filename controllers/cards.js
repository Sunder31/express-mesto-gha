const Card = require('../models/card')

const createCard = (req, res) => {
    const { name, link } = req.body

    return Card.create({ name, link, owner: req.user._id })
      .then((card) => res.status(201).send(card))
      .catch((err) => {
          if(err.name === 'ValidationError') {
              return res.status(400).send({
                  message: "Ошибка при создании карточки"
              })
          }

          return res.status(500).send({
              message: 'Ошибка на стороне сервера'
          })
      })
}

const getCards = (req, res) => {
    Card.find()
      .then((card) => {
        res.status(200).send(card)
      })
      .catch(() => res.status(500).send({
        message: 'Ошибка на стороне сервера'
      }))
}

const deleteCard = (req, res) => {
    const { cardId } = req.params

    return Card.findByIdAndDelete(cardId)
      .then((card) => {
        if (!card) {
          return res.status(404).send({
            message: 'Карточка не найдена'
          })
        }
        return res.status(200).send(card)
      })
      .catch(() => {
        res.status(500).send({
          message: 'Ошибка на стороне сервера'
        })
      })
}

const likeCard = (req, res) => {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id }},
      { new: true },
    )
    .then((card) => {
      if(!card) {
        return res.status(404).send({
          message: 'Карточка не найдена'
        })
      }
      return res.status(200).send(card)
    })
    .catch(() => {
      res.status(500).send({
        message: 'Ошибка на стороне сервера'
      })
    })
}

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id }},
    { new: true },
  )
  .then((card) => {
    if(!card) {
      return res.status(404).send({
        message: 'Карточка не найдена'
      })
    }
    return res.status(200).send(card)
  })
  .catch(() => {
    res.status(500).send({
      message: 'Ошибка на стороне сервера'
    })
  })
}

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
}