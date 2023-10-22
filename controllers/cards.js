const Card = require('../models/card');
const { Errors } = require('../errors/errors');

const createCard = (req, res) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: Errors.cardError400,
        });
      }

      return res.status(500).send({
        message: Errors.error500,
      });
    });
};

const getCards = (req, res) => {
  Card.find()
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(() => res.status(500).send({
      message: Errors.error500,
    }));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  return Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({
          message: Errors.cardError404,
        });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: Errors.cardError400,
        });
      }
      return res.status(500).send({
        message: Errors.error500,
      });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({
          message: Errors.cardError404,
        });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: Errors.cardError400,
        });
      }
      return res.status(500).send({
        message: Errors.error500,
      });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({
          message: Errors.cardError404,
        });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: Errors.cardError400,
        });
      }
      return res.status(500).send({
        message: Errors.error500,
      });
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
