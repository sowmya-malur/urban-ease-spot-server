const knex = require("knex")(require("../knexfile"));

/**
 * Finds and sends parking meter data for a specific meter ID to the client.
 *
 * @param {*} req - The request object containing parameters.
 * @param {*} res - The response object.
 */
const findOne = async (req, res) => {
  try {
    const userFound = await knex("users").where({
      email: req.params.email,
      password: req.body.password,
    });

    if (userFound.length === 0) {
      return res.status(404).json({
        message: `User not found. Either the email or password is incorrect.`,
      });
    }

    const userData = userFound[0];
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve user data for user with email ${req.params.email}`,
    });
  }
};

module.exports = {
  findOne: findOne,
};
