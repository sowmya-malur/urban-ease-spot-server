const knex = require("knex")(require("../knexfile"));

/**
 * Adds a new booking to the database and updates the status of the parking spot to 'occupied'
 * @param {*} req The req object containing all the fields of the booking data.
 * @param {*} res The res object.
 * @returns JSON response containing all the fields of the booking data and newly generated id
 *
 */
const addBooking = async (req, res) => {
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

  // Assign meter id to be inserted into bookings table if the meter id exists in parking spots table and the status is vacant
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

  try {
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

const getActiveBooking = async (req, res) => {
  const bookingFound = await knex("bookings").where({
    user_id: req.params.userId,
    status: "active",
  });

  if (bookingFound.length === 0) {
    return res.status(404).json({
      message: `No active booking for the user id ${req.params.userId}`,
    });
  }

   const parkingInfo = await knex("parking_meters_master").where(
    {meterid: bookingFound[0].meter_id,}
   )

   console.log(parkingInfo);
   if(parkingInfo.length === 0) {
    return res.status(404).json({
      message: `No meter found`,
    });
   }

   const response = {
    location: parkingInfo.geo_local_area,
    ...bookingFound[0]
  }

  res.status(200).json(response);
};


const updateBooking = async (req, res) => {
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

    // Fetch updated warehouse record from the database
    const [updatedBooking] = await knex("bookings").where({
      id: req.body.id,
    });

    const parkingSpotUpdated = await knex("parking_spots")
          .where({meter_id: req.params.meterId})
          .update({status: "vacant"});

          const [updatedParkingSpot] = await knex("parking_spots").where(
            {meter_id: req.params.meterId,}
          );

res.status(200).json(updatedBooking);

};

module.exports = {
  addBooking: addBooking,
  getActiveBooking: getActiveBooking,
  updateBooking: updateBooking,
};
