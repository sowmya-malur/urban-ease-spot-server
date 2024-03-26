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
    // const parkingData = fs.readFileSync("./data/parking-meter-limited.json");
    // const parkingMeters = JSON.parse(parkingData);
    // res.status(200).send(parkingMeters);

    const data = await knex("parking_meters_master")
    .join('parking_spots','parking_meters_master.meterid','=', 'parking_spots.meter_id')
    .select(
      'meterhead',
      'r_mf_9a_6p',
      'r_mf_6p_10',
      'r_sa_9a_6p',
      'r_sa_6p_10',
      'r_su_9a_6p',
      'r_su_6p_10',
      'rate_misc',
      'timeineffe',
      't_mf_9a_6p',
      't_mf_6p_10',
      't_sa_9a_6p',
      't_sa_6p_10',
      't_su_9a_6p',
      't_su_6p_10',
      'time_misc',
      'creditcard',
      'pay_phone',
      'geo_local_area',
      'geo_point_2d',
      'meter_id',
      'status',
      'parking_spots.updated_at');

    res.status(200).send(data);
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
