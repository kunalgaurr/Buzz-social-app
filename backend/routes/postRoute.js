const express = require('express');
const {
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
  likePost,
  editPost,
  getFriendsPosts,
  getSingleUserPosts,
} = require('../controller/postController');
const router = express.Router();

router.route('/create').post(createPost);
router.route('/all').get(getAllPosts);
router.route('/feed/:userId').get(getFriendsPosts);
router.route('/:postId').get(getSinglePost);
router.route('/single/:userId').get(getSingleUserPosts);
router.route('/:postId').delete(deletePost);
router.route('/:postId').put(editPost);
router.route('/:postId/like').put(likePost);

module.exports = router;
