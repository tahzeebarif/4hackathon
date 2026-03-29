const express = require('express');
const router = express.Router();
const {
  getVideos, getVideo, getFeatured, getByGenre,
  createVideo, updateVideo, deleteVideo,
  getAllVideosAdmin, toggleVisibility
} = require('../controllers/videoController');
const { protect, adminOnly, requireSubscription } = require('../middleware/auth');

// Public routes
router.get('/', getVideos);
router.get('/featured', getFeatured);
router.get('/genre/:genre', getByGenre);
router.get('/:id', protect, requireSubscription, getVideo);

// Admin routes
router.get('/admin/all', protect, adminOnly, getAllVideosAdmin);
router.post('/', protect, adminOnly, createVideo);
router.put('/:id', protect, adminOnly, updateVideo);
router.delete('/:id', protect, adminOnly, deleteVideo);
router.patch('/:id/visibility', protect, adminOnly, toggleVisibility);

module.exports = router;
