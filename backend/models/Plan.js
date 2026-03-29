const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Basic', 'Standard', 'Premium']
  },
  price: {
    monthly: { type: Number, required: true },
    yearly: { type: Number, required: true }
  },
  features: [{
    type: String
  }],
  maxDevices: {
    type: Number,
    default: 1
  },
  quality: {
    type: String,
    default: 'HD'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);
