const router = require('express').Router();
const userController = require('../controllers/user-controller');

router
  .route('/')
  .get(userController.index);

router
  .route("/:email")
  .get(userController.findOne);

module.exports = router;