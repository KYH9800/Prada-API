const express = require('express');
const router = express.Router();

const BucketController = require('../controllers/buckets.controller');
const bucketController = new BucketController();

// router.get('/user/bucket', bucketController);

module.exports = router;
