const router = require('express').Router();
const userController = require('../controllers/user-controller');

router
  .route("/:email")
  .get(userController.findOne);

  router
  .route("/:id/vehicle")
  .get(userController.findVehicle);

  router
  .route("/:id/payment")
  .get(userController.findPayment);

module.exports = router;