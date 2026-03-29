const Video = require('../models/Video');

// @desc    Get all videos
// @route   GET /api/videos
exports.getVideos = async (req, res) => {
  try {
    const { genre, type, search, featured, limit, page } = req.query;
    const query = { isVisible: true };

    if (genre) query.genre = { $in: [genre] };
    if (type) query.type = type;
    if (featured) query.featured = featured === 'true';
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;
    const skip = (pageNum - 1) * limitNum;

    const videos = await Video.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Video.countDocuments(query);

    res.status(200).json({
      success: true,
      count: videos.length,
      total,
      pages: Math.ceil(total / limitNum),
      videos
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single video
// @route   GET /api/videos/:id
exports.getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    // Increment views
    video.views += 1;
    await video.save();
    res.status(200).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get featured videos
// @route   GET /api/videos/featured
exports.getFeatured = async (req, res) => {
  try {
    const videos = await Video.find({ featured: true, isVisible: true }).limit(5);
    res.status(200).json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get videos by genre
// @route   GET /api/videos/genre/:genre
exports.getByGenre = async (req, res) => {
  try {
    const videos = await Video.find({ 
      genre: { $in: [req.params.genre] }, 
      isVisible: true 
    }).limit(20);
    res.status(200).json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create video (Admin)
// @route   POST /api/videos
exports.createVideo = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const video = await Video.create(req.body);
    res.status(201).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update video (Admin)
// @route   PUT /api/videos/:id
exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    res.status(200).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete video (Admin)
// @route   DELETE /api/videos/:id
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    res.status(200).json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all videos for admin (including hidden)
// @route   GET /api/videos/admin/all
exports.getAllVideosAdmin = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: videos.length, videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle video visibility (Admin)
// @route   PATCH /api/videos/:id/visibility
exports.toggleVisibility = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    video.isVisible = !video.isVisible;
    await video.save();
    res.status(200).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
