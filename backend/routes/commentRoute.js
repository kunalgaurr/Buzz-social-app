const express = require('express');
const {
  postComment,
  deleteComment,
  getSinglePostComment,
} = require('../controller/commentController');
const router = express.Router();

router.route('/post').post(postComment);
router.route('/delete').delete(deleteComment);
router.route('/:postId').get(getSinglePostComment);

module.exports = router;
