const router = require('express').Router();
const bookingController = require('../controllers/booking-controller');

router
  .route('/:meterId/user/:userId')
  .post(bookingController.addBooking);

router 
  .route('/user/:userId')
  .get(bookingController.getActiveBooking);


module.exports = router;