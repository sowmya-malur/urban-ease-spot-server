const knex = require("knex")(require("../knexfile"));

/**
 *
 * @param {*} req The req object containing all the fields of the warehouse data
 * @param {*} res The res object
 * @returns JSON response containing all the fields of warehouse data and newly generated id
 *          except the created and updated timestamp
 */
const addBooking = async (req, res) => {
    // Check for required fields in the request body
    if (
      !req.body.start_time ||
      !req.body.end_time ||
      !req.body.duration ||
      !req.body.status ||
      !req.body.user_id ||
      !req.body.meter_id
    ) {
      return res.status(400).json({
        message: "Please provide all required fields for the booking.",
      });
    }
  
    // Prepare the data for insertion by excluding the 'id' field, if present
    const { id, ...insertData } = req.body;
  
    try {
      // Insert the booking data into the table
      const result = await knex("bookings").insert(insertData);
  
      // Retrieve the ID of the newly inserted booking record
      const newBookingId = result[0];
  
      // Fetch the newly created booking record from the database
      const [createdBooking] = await knex("bookings").where({
        id: newBookingId,
      });
  
      // Respond with the newly created booking record
      res.status(201).json(createdBooking);
    } catch (error) {
      // Handle any errors that occur during the database operations
      res.status(500).json({
        message: `Unable to create new booking: ${error.message}`,
      });
    }
  };

  module.exports = {
    addBooking: addBooking,
  };