const usersData = require("../seeds_data/users.js");
const vehiclesData = require("../seeds_data/vehicles.js");
const paymentsData = require("../seeds_data/payments.js");
const parkingMetersMasterData = require("../seeds_data/parking-meters-master.js");
const parkingSpotsData = require("../seeds_data/parking-spots.js");

exports.seed = async function (knex) {
    // Insert seed data for users, vehicles and payments table
  await knex("payments").del();
  await knex("vehicles").del();
  await knex("users").del();
  await knex("users").insert(usersData);
  await knex("vehicles").insert(vehiclesData);
  await knex("payments").insert(paymentsData);

  // Insert seed data for parking meters master table and parking spots table
  await knex("parking_spots").del();
  await knex("parking_meters_master").del();
  await knex("parking_meters_master").insert(parkingMetersMasterData);
  await knex("parking_spots").insert(parkingSpotsData);
};
