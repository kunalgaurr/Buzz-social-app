const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const errorCatcher = require('../utilites/errorCatcher');
const AppError = require('../middleware/AppError');

// POST A COMMENT 
exports.postComment = errorCatcher(async (req, res) => {
  const { userId, postId, comment } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError('Post not found', 404);
  }
  const newComment = await Comment.create({
    userId,
    postId,
    comment,
  });
  post.comments.push(newComment._id);
  await post.save();
  res.status(200).json({
    success: true,
    message: 'New comment posted.',
    newComment,
  });
});

// DELETE A COMMENT 
exports.deleteComment = errorCatcher(async (req, res) => {
  const { userId, postId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('You can only delete your post or comment', 403);
  }
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError('You can only delete your post or comment', 403);
  }
  const comment = await Comment.findByIdAndDelete(req.params.commentId);
  res.status(200).json({
    success: true,
    message: 'Comment deleted successfully',
  });
});

// GET SINGLE POST COMMENT
exports.getSinglePostComment = errorCatcher(async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    throw new AppError('Cannot find post', 404);
  }
  const comments = await Comment.find({ postId: req.params.postId });
  res.status(200).json(comments);
});
