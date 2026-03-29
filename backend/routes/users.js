const express = require('express');
const router = express.Router();
const { getUsers, getUser, blockUser, unblockUser } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', protect, adminOnly, getUsers);
router.get('/:id', protect, adminOnly, getUser);
router.patch('/:id/block', protect, adminOnly, blockUser);
router.patch('/:id/unblock', protect, adminOnly, unblockUser);

module.exports = router;
