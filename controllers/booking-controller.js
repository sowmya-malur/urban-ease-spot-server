const knex = require("knex")(require("../knexfile"));

/**
 * Adds a new booking to the database and updates the status of the parking spot to 'occupied'
 * @param {*} req The req object containing all the fields of the booking data.
 * @param {*} res The res object.
 * @returns JSON response containing all the fields of the booking data and newly generated id
 */
const addBooking = async (req, res) => {
  try {
    // Check for required fields in the request body and params
    if (
      !req.body.start_time ||
      !req.body.end_time ||
      !req.body.duration ||
      !req.body.status ||
      !req.params.userId ||
      !req.params.meterId
    ) {
      return res.status(400).json({
        message: "Please provide all required fields for the booking.",
      });
    }

    // Prepare the data for insertion by excluding the 'id' field, if present
    const { id, ...insertData } = { ...req.body };

    // Check if the meter id exists in parking spots table
    // Check if the status is vacant before inserting into the booking table
    const meterFound = await knex("parking_spots").where({
      meter_id: req.params.meterId,
    });

    if (meterFound.length === 0) {
      return res.status(404).json({
        message: `Meter not found with id ${req.params.meterId}`,
      });
    } else if (meterFound[0].status !== "vacant") {
      return res.status(404).json({
        message: `Unable to book the parking spot with meter id ${req.params.meterId} as it is ${meterFound[0].status}`,
      });
    } else {
      insertData.meter_id = req.params.meterId;
    }

    // Assign user id to be inserted into bookings table
    const userFound = await knex("users").where({
      id: req.params.userId,
    });

    if (userFound.length === 0) {
      return res.status(404).json({
        message: `User not found. `,
      });
    } else {
      insertData.user_id = req.params.userId;
    }

    // Insert the booking data into the table
    const result = await knex("bookings").insert(insertData);

    // Retrieve the ID of the newly inserted booking record
    const newBookingId = result[0];

    // Update the parking spot status to 'occupied'
    const rowsUpdated = await knex("parking_spots")
      .where({ meter_id: req.params.meterId })
      .update({ status: "occupied" });

    // Check if the row was updated successfully
    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Parking spot with meter ID ${req.params.meterId} not found`,
      });
    }

    // Fetch the newly created booking record from the database
    const [createdBooking] = await knex("bookings").where({
      id: newBookingId,
    });

    // Respond with the newly created booking record
    res.status(201).json(createdBooking);
  } catch (error) {
    // Handle any internal server errors
    res.status(500).json({
      message: `Unable to create new booking: ${error.message}`,
    });
  }
};

/**
 * Retrieves the active booking for a user
 * @param {*} req The req object containing the userId parameter and status
 * @param {*} res The res object
 * @returns JSON response containing the active booking information
 */
const getActiveBooking = async (req, res) => {
  try {
    const bookingFound = await knex("bookings").where({
      user_id: req.params.userId,
      status: "active",
    });

    if (bookingFound.length === 0) {
      return res.status(404).json({
        message: `No active booking for the user id ${req.params.userId}`,
      });
    }

    // Get parking meter information from master table to send location details
    const parkingInfo = await knex("parking_meters_master").where({
      meterid: bookingFound[0].meter_id,
    });

    if (parkingInfo.length === 0) {
      return res.status(404).json({
        message: `No meter found`,
      });
    }

    // Add location details to the response object
    const response = {
      location: parkingInfo.geo_local_area,
      ...bookingFound[0],
    };

    // Respond with the active booking record
    res.status(200).json(response);
  } catch (error) {
    // Handle any internal server errors
    res.status(500).json({
      message: `Unable to get active booking: ${error.message}`,
    });
  }
};

/**
 * Updates an existing booking in the database and updates the status of the parking spot to 'vacant'
 * @param {*} req The req object containing all the fields of the booking data.
 * @param {*} res The res object.
 * @returns JSON response containing the updated booking information
 */
const updateBooking = async (req, res) => {
  try {
    // Check for required fields in the request body and params
    if (
      !req.body.id ||
      !req.body.status ||
      !req.params.userId ||
      !req.params.meterId
    ) {
      return res.status(400).json({
        message: "Please provide all required fields for the booking.",
      });
    }

    // Prepare the data for insertion by excluding the 'id' field, if present
    const { id, ...updateData } = { ...req.body };

    const rowsUpdated = await knex("bookings")
      .where({ id: req.body.id })
      .update(updateData);

    // Check if the row was updated
    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Booking with ID ${req.body.id} not found`,
      });
    }

    // Update the status to 'vacant' for the meter id in parking spots table
    const parkingSpotUpdated = await knex("parking_spots")
      .where({ meter_id: req.params.meterId })
      .update({ status: "vacant" });

    // Check if the row was updated
    if (parkingSpotUpdated === 0) {
      return res.status(404).json({
        message: `Parking spot with meter id ${req.params.meterId} not found`,
      });
    }

    // Fetch updated booking record from the database
    const [updatedBooking] = await knex("bookings").where({
      id: req.body.id,
    });

    // Respond with the updated booking record
    res.status(200).json(updatedBooking);
  } catch (error) {
    // Handle any internal server errors
    res.status(500).json({
      message: `Unable to update booking: ${error.message}`,
    });
  }
};

module.exports = {
  addBooking: addBooking,
  getActiveBooking: getActiveBooking,
  updateBooking: updateBooking,
};
