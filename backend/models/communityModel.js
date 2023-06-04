const mongoose = require('mongoose');

const communitySchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    admin: { type: String, require: true },
    members: { type: Array, default: [] },
    posts: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Community', communitySchema);
