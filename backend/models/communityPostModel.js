const mongoose = require('mongoose');

const communityPostSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    communityId: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    comments: { type: Array, default: [] },
    likes: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Community Post', communityPostSchema);
