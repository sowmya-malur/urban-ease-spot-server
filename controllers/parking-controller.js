const knex = require("knex")(require("../knexfile"));
const fs = require("fs");

/**
 * Retrieves and sends parking meter data to the client.
 *
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
const index = async (req, res) => {
  try {
    const parkingData = fs.readFileSync("./data/parking-meter-limited.json");
    const parkingMeters = JSON.parse(parkingData);

    const result = await knex("parking-meters-master")
    .insert(parkingMeters);

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(`Error retrieving parking meters: ${err}`);
  }
};

/**
 * Finds and sends parking meter data for a specific meter ID to the client.
 *
 * @param {*} req - The request object containing parameters.
 * @param {*} res - The response object.
 */
const findOne = async (req, res) => {
  try {
    const { meterId } = req.params;

    const parkingData = fs.readFileSync("./data/parking-meter-limited.json");
    const parkingMeters = JSON.parse(parkingData);

    // Find the parking meter with the specified meter ID
    const foundParking = parkingMeters.find((parking) => {
      return parking.meterid === meterId;
    });

    // If the parking meter is found, send it as a response
    if (foundParking) {
      res.status(200).send(foundParking);
    } else {
      res.status(404).send("Meter with that id not found");
    }
  } catch (err) {
    res.status(400).send("Error fetching parking information for the meterid");
  }
};

module.exports = {
  index: index,
  findOne: findOne,
};
