const AppError = require('../middleware/AppError');
const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const errorCatcher = require('../utilites/errorCatcher');

exports.createPost = errorCatcher(async (req, res) => {
  const { userId, description, image } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const newPost = await Post.create({
    userId,
    description,
    image,
  });
  if (user.settings.privacy === 'Private') {
    newPost.privacy === 'Private';
  }
  user.posts.push(newPost._id);
  await user.save();
  await newPost.save();
  res.status(200).json({
    success: true,
    message: 'Post created succesfully',
    newPost,
  });
});

exports.getAllPosts = errorCatcher(async (req, res) => {
  const posts = await Post.find({ privacy: 'Public' }).sort({
    createdAt: 1,
  });
  res.status(200).json(posts.reverse());
});

exports.getSinglePost = errorCatcher(async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    throw new AppError('Post not found', 404);
  }
  res.status(200).json(post);
});

exports.deletePost = errorCatcher(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.postId);
  if (!post) {
    throw new AppError('Post not found', 404);
  }
  const user = await User.findById(post.userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const comments = await Comment.find({ postId: post._id });
  user.posts.pull(req.params.postId);
  await user.save();
  res.status(200).json({
    success: true,
    message: 'The post has been deleted successfully',
  });
});

exports.likePost = errorCatcher(async (req, res) => {
  const { userId, friendId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const friend = await User.findById(friendId);
  if (!friend) {
    throw new AppError('Friend not found', 404);
  }
  const post = await Post.findById(req.params.postId);
  if (!post) {
    throw new AppError('Post not found', 404);
  }
  if (post.likes.includes(friendId)) {
    post.likes.pull(friendId);
    await post.save();
    return res.status(200).json({
      success: true,
      message: 'Post has been disliked successfully',
    });
  } else {
    post.likes.push(friendId);
    await post.save();
    return res.status(200).json({
      success: true,
      message: 'Post has been liked successfully',
    });
  }
});

exports.editPost = errorCatcher(async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (!user) {
    throw new AppError('User nout found', 404);
  }
  const post = await Post.findById(req.params.postId);
  if (!post) {
    throw new AppError('Post not found', 404);
  }
  if (post.userId !== req.body.userId) {
    throw new AppError('You cannot edit this post', 403);
  }
  const updatedPost = await post.update(req.body);
  return res.status(200).json({
    success: true,
    message: 'Post has been updated succesfully',
    updatedPost,
  });
});

exports.getFriendsPosts = errorCatcher(async (req, res) => {
  const currentUser = await User.findById(req.params.userId);
  if (!currentUser) {
    throw new AppError('User not found', 404);
  }
  const userPost = await Post.find({ userId: currentUser._id });
  const friendsPosts = await Promise.all(
    currentUser.friends.map((friendId) => {
      return Post.find({ userId: friendId }).sort({ createdAt: -1 });
    })
  );
  const allPosts = userPost.concat(...friendsPosts);
  const sortedPosts = allPosts.sort((a, b) => b.createdAt - a.createdAt);
  res.status(200).json(sortedPosts);
});

exports.getSingleUserPosts = errorCatcher(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const posts = await Post.find({ userId: user._id });
  res.status(200).json(posts);
});
