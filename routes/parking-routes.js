const router = require('express').Router();
const parkingController = require('../controllers/parking-controller');

router
  .route('/')
  .get(parkingController.index);

router
  .route('/:meterId')
  .get(parkingController.findOne);

module.exports = router;