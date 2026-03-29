const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  genre: [{
    type: String,
    required: true
  }],
  duration: {
    type: String,
    required: [true, 'Please provide duration']
  },
  releaseYear: {
    type: Number,
    required: [true, 'Please provide release year']
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  thumbnail: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  bannerImage: {
    type: String,
    default: ''
  },
  cast: [{
    name: String,
    character: String,
    image: String
  }],
  director: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'English'
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    enum: ['movie', 'show'],
    default: 'movie'
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Video', videoSchema);
