const express = require('express');
const {
  createCommunity,
  getAllCommunity,
  getSingleCommunity,
  editCommunity,
  joinCommunity,
  deleteCommunity,
} = require('../controller/communityController');
const router = express.Router();

router.route('/create').post(createCommunity);
router.route('/all').get(getAllCommunity);
router.route('/:communityId').get(getSingleCommunity);
router.route('/:communityId').put(editCommunity);
router.route('/:communityId/join').put(joinCommunity);
router.route('/:communityId').delete(deleteCommunity);

module.exports = router;
