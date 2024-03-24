const usersData = require("../seeds_data/users.js");
const vehiclesData = require("../seeds_data/vehicles.js");
const paymentsData = require("../seeds_data/payments.js");

exports.seed = async function(knex) {
    await knex('payments').del();
    await knex('vehicles').del();
    await knex('users').del();
    await knex('users').insert(usersData);
    await knex('vehicles').insert(vehiclesData);
    await knex('payments').insert(paymentsData);
  };