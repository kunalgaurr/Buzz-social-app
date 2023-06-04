const express = require('express');
const {
  registerUser,
  loginUser,
  getAllUser,
  getSingleUser,
  updateUser,
  resetPassword,
  friendRequest,
  deleteUser,
} = require('../controller/userController');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/all').get(getAllUser);
router.route('/:userId').get(getSingleUser);
router.route('/:userId').put(updateUser);
router.route('/:userId').delete(deleteUser);
router.route('/:userId/reset-password').put(resetPassword);
router.route('/:friendId/:userId').put(friendRequest);

module.exports = router;
