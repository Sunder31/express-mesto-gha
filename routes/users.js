const router = require('express').Router();

const {
  createUser,
  getUserById,
  getUsers,
  updateUserProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.post('/', createUser);

router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
