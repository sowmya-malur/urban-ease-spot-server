const knex = require("knex")(require("../knexfile"));

/**
 * Finds a user by email and password and returns user data if found.
 *
 * @param {*} req - The request object containing parameters and body.
 * @param {*} res - The response object.
 */
const findOne = async (req, res) => {
  try {
    // Validate if email and password are provided in the request
    if (!req.params.email || !req.body.password) {
      return res.status(400).json({
        message: `Email and password cannot be empty`,
      });
    }
    const userFound = await knex("users").where({
      email: req.params.email,
      password: req.body.password,
    });

    // Check if user with provided email and password exists
    if (userFound.length === 0) {
      return res.status(404).json({
        message: `User not found. Either the email or password is incorrect.`,
      });
    }

    // Extract user data from the first result
    const userData = userFound[0];
    res.status(200).json(userData);
  } catch (error) {
    // Handle any internal server errors during database query
    res.status(500).json({
      message: `Unable to retrieve user data for user with email ${req.params.email}. Please try again later.`,
    });
  }
};

/**
 * Finds the vehicle for the user id.
 *
 * @param {*} req - The request object containing parameters and body.
 * @param {*} res - The response object.
 */
const findVehicle = async (req, res) => {
  try {
    // Validate if user id is provided in the request
    if (!req.params.id) {
      return res.status(400).json({
        message: `User id cannot be empty`,
      });
    }
    const userFound = await knex("users").where({
      id: req.params.id,
    });

    // Check if user with user id exists
    if (userFound.length === 0) {
      return res.status(404).json({
        message: `User not found. `,
      });
    }

    // Extract user data from the first result
    const userData = userFound[0];

    // Find vehicle for the user id
    const vehiclesFound = await knex("vehicles").where({
      user_id: userData.id,
    });

    // If vehicle doesn't exist, response 404
    if (vehiclesFound.length === 0) {
      return res.status(404).json({
        message: `vehicle for the user ID ${req.params.id} not found`,
      });
    }
    res.status(200).json(vehiclesFound[0]);
  } catch (error) {
    // Handle any internal server errors during database query
    res.status(500).json({
      message: `Unable to retrieve vehicle data for user with id ${req.params.id}. Please try again later.`,
    });
  }
};

/**
 * Finds the payment for the user id.
 *
 * @param {*} req - The request object containing parameters and body.
 * @param {*} res - The response object.
 */
const findPayment = async (req, res) => {
  try {
    // Validate if user id is provided in the request
    if (!req.params.id) {
      return res.status(400).json({
        message: `User id cannot be empty`,
      });
    }
    const userFound = await knex("users").where({
      id: req.params.id,
    });

    // Check if user with user id exists
    if (userFound.length === 0) {
      return res.status(404).json({
        message: `User not found. `,
      });
    }

    // Extract user data from the first result
    const userData = userFound[0];

    // Find payment for the user id
    const paymentsFound = await knex("payments").where({
      user_id: userData.id,
    });

    // If payment doesn't exist, response 404
    if (paymentsFound.length === 0) {
      return res.status(404).json({
        message: `payment methods for the user ID ${req.params.id} not found`,
      });
    }
    res.status(200).json(paymentsFound[0]);
  } catch (error) {
    // Handle any internal server errors during database query
    res.status(500).json({
      message: `Unable to retrieve payment data for user with id ${req.params.id}. Please try again later.`,
    });
  }
};

module.exports = {
  findOne: findOne,
  findVehicle: findVehicle,
  findPayment: findPayment,
};
