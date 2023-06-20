const AppError = require('../middleware/AppError');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');
const errorCatcher = require('../utilites/errorCatcher');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Community = require('../models/communityModel');

exports.registerUser = errorCatcher(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new AppError('This email is already registered.', 403);
  }
  if (password !== confirmPassword) {
    throw new AppError('Passwords must match.', 403);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  res.status(200).json({
    success: true,
    newUser,
  });
});

exports.loginUser = errorCatcher(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('This email is not registered.', 403);
  }
  const validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword) {
    throw new AppError(
      'Incorrect password, please enter correct password',
      403
    );
  }
  const payload = {
    userId: user.email,
    userPassword: user.password,
  };
  const token = await jwt.sign(payload, process.env.JWT_SECRET);
  res.status(200).json({
    success: true,
    token,
    user: user,
  });
});

exports.getAllUser = errorCatcher(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

exports.getSingleUser = errorCatcher(async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.status(200).json(user);
});

exports.updateUser = errorCatcher(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const updatedData = req.body;
  const updatedUser = await user.updateOne({ $set: updatedData });
  res.status(200).json({
    success: true,
    message: 'User updated succesfully',
    updatedUser,
  });
});

exports.resetPassword = errorCatcher(async (req, res) => {
  const user = User.findById(req.params.userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const { oldPassword, confirmPassword, newPassword } = req.body;
  if (oldPassword !== confirmPassword) {
    throw new AppError('Passwords do not match', 403);
  }
  if (oldPassword === newPassword) {
    throw new AppError('Old password and new password should not match', 403);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  const updatedUser = await user.updateOne({ password: hashedPassword });
  res.status(200).json({
    success: true,
    message: 'Password updated succesfully',
    updatedUser,
  });
});

exports.deleteUser = errorCatcher(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const post = await Post.findByIdAndDelete({ userId: user._id });
  const comment = await Comment.findByIdAndDelete({ userId: user._id });

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
});

exports.friendRequest = errorCatcher(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const friend = await User.findById(req.params.friendId);
  if (!friend) {
    throw new AppError('Friend not found', 404);
  }
  if (user._id === friend._id) {
    throw new AppError('You can send yourself a friend request.');
  }
  if (friend.settings.privacy === 'Public') {
    if (friend.friends.includes(user._id)) {
      friend.friends.pull(user._id);
      user.friends.pull(friend._id);
      await friend.save();
      await user.save();
      return res.status(200).json({
        success: true,
        message: `You and ${friend.name} are not friends now.`,
      });
    } else {
      friend.friends.push(user._id);
      user.friends.push(friend._id);
      await user.save();
      await friend.save();
      return res.status(200).json({
        success: true,
        message: `You and ${friend.name} are now friends.`,
      });
    }
  } else {
    if (friend.friendRequests.includes(user._id)) {
      friend.friendRequests.pull(user._id);
      return res.status(200).json({
        success: true,
        message: `Friend request canceled`,
      });
    } else {
      friend.friendRequests.push(user._id);
      return res.status(200).json({
        success: true,
        message: `Friend request sent to ${friend.name}`,
      });
    }
  }
});

exports.getFriends = errorCatcher(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const friends = await User.find({ _id: { $in: user.friends } });
  if (!friends) {
    throw new AppError('Friends not found', 404);
  }
  return res.status(200).json(friends);
});

exports.getEverything = errorCatcher(async (req, res) => {
  const users = await User.find();
  const communities = await Community.find();
  return res
    .status(200)
    .json(users.concat(communities).sort({ createdAt: -1 }));
});
