const router = require('express').Router();
const userController = require('../controllers/user-controller');

router
  .route("/:email")
  .get(userController.findOne);

module.exports = router;