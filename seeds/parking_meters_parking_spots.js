const parkingMetersMasterData = require("../seeds_data/parking-meters-master.js");
const parkingSpotsData = require("../seeds_data/parking-spots.js");

exports.seed = async function (knex) {
    // Insert seed data for parking meters master table and parking spots table
    await knex("parking_spots").del();
    await knex("parking_meters_master").del();
    await knex("parking_meters_master").insert(parkingMetersMasterData);
    await knex("parking_spots").insert(parkingSpotsData);
  
  };