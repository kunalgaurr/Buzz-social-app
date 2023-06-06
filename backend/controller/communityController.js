const User = require('../models/userModel');
const Community = require('../models/communityModel');
const communityPost = require('../models/communityPostModel');
const errorCatcher = require('../utilites/errorCatcher');
const AppError = require('../middleware/AppError');

exports.createCommunity = errorCatcher(async (req, res) => {
  const { admin, name, description } = req.body;
  const user = await User.findById(admin);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const newCommunity = await Community.create({
    admin,
    name,
    description,
  });
  newCommunity.members.push(admin);
  user.communities.push(newCommunity._id);
  await newCommunity.save();
  await user.save();
  return res.status(200).json(newCommunity);
});

exports.getAllCommunity = errorCatcher(async (req, res) => {
  const communities = await Community.find();
  return res.status(200).json(communities);
});

exports.getSingleCommunity = errorCatcher(async (req, res) => {
  const community = await Community.findById(req.params.communityId);
  if (!community) {
    throw new AppError('Community nout found', 404);
  }
  return res.status(200).json(community);
});

exports.editCommunity = errorCatcher(async (req, res) => {
  const community = await Community.findById(req.params.communityId);
  if (!community) {
    throw new AppError('Community nout found', 404);
  }
  const updatedData = req.body;
  const updatedCommunity = community.updateOne({ $set: updatedData });
  return res.status(200).json({
    success: true,
    message: `${community.name} updated successfully`,
    updatedCommunity,
  });
});

exports.joinCommunity = errorCatcher(async (req, res) => {
  const community = await Community.findById(req.params.communityId);
  if (!community) {
    throw new AppError('Community not found', 404);
  }
  const user = await User.findById(req.body.userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  if (community.members.includes(user._id)) {
    community.members.pull(user._id);
    return res
      .status(200)
      .json({ success: true, message: `You left ${community.name}` });
  } else {
    community.members.push(user._id);
    return res
      .status(200)
      .json({ success: true, message: `You Joined ${community.name}` });
  }
});

exports.deleteCommunity = errorCatcher(async (req, res) => {
  const community = await Community.findByIdAndDelete(req.params.communityId);
  const communityPost = await CommunityPost.findByIdAndDelete({ communityId });
});
