const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    comments: { type: Array, default: [] },
    likes: { type: Array, default: [] },
    shares: { type: Array, default: [] },
    privacy: { type: String, default: 'Public' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
