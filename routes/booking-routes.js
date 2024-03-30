const router = require('express').Router();
const bookingController = require('../controllers/booking-controller');

router
  .route('/:meterId/user/:userId')
  .get(bookingController.addBooking);


module.exports = router;