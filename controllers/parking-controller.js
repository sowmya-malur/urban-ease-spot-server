const knex = require("knex")(require("../knexfile"));

/**
 * Retrieves and sends parking meter data and status of parking spot to the client
 *
 * @param {*} req - The request object
 * @param {*} res - The response object
 * @returns json object containing all the parking meters data and the status information
 */
const index = async (req, res) => {
  try {
    const parkingMetersData = await knex("parking_meters_master")
      .join(
        "parking_spots",
        "parking_meters_master.meterid",
        "=",
        "parking_spots.meter_id"
      )
      .select(
        "meterhead",
        "r_mf_9a_6p",
        "r_mf_6p_10",
        "r_sa_9a_6p",
        "r_sa_6p_10",
        "r_su_9a_6p",
        "r_su_6p_10",
        "rate_misc",
        "timeineffe",
        "t_mf_9a_6p",
        "t_mf_6p_10",
        "t_sa_9a_6p",
        "t_sa_6p_10",
        "t_su_9a_6p",
        "t_su_6p_10",
        "time_misc",
        "creditcard",
        "pay_phone",
        "geo_local_area",
        "geo_point_2d",
        "meter_id",
        "status",
        "parking_spots.updated_at"
      );

    res.status(200).json(parkingMetersData);
  } catch (error) {
    //Handle any internal server errors
    res.status(500).json({
      message: `Error retrieving parking meters: ${error}`,
    });
  }
};

/**
 * Finds and sends parking meter data for a specific meter ID to the client
 *
 * @param {*} req - The request object containing parameters
 * @param {*} res - The response object
 * @returns json object containing parking meter details for a specific meter id
 */
const findOne = async (req, res) => {
  try {
    const { meterId } = req.params;

    const parkingMeters = await knex("parking_meters_master");

    // Find the parking meter with the specified meter ID
    const foundParking = parkingMeters.find((parking) => {
      return parking.meterid === meterId;
    });

    // If the parking meter is found, send it as a response
    if (foundParking) {
      res.status(200).json(foundParking);
    } else {
      res.status(404).json({
        message: `Meter with that id not found`,
      });
    }
  } catch (error) {
    // Handle any internal server errors
    res.status(500).json({
      message: `Error fetching parking information for the meterid ${req.params.meterId}: ${error.message}`,
    });
  }
};

module.exports = {
  index: index,
  findOne: findOne,
};
