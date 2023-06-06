const mongoose = require('mongoose');

const communitySchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    admin: { type: String, require: true },
    description: { type: String, required: true },
    members: { type: Array, default: [] },
    posts: { type: Array, default: [] },
    images: {
      profile: { type: String, required: true },
      cover: { type: String, require: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Community', communitySchema);
