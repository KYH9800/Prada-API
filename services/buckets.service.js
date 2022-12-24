const BucketRepository = require('../repositories/buckets.repository');

class BucketService {
  bucketRepository = new BucketRepository();
}

module.exports = BucketService;
