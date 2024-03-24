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

module.exports = {
  findOne: findOne,
};
