/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("bookings", (table) => {
            table.increments("id").primary();
            table.timestamp("start_time").notNullable();
            table.timestamp("end_time").notNullable();
            table.time("duration").notNullable();
            table.string("status").notNullable();
            table.integer("user_id").unsigned().notNullable();
            table
                .foreign("user_id")
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.string('meter_id').notNullable();
            table
                .foreign("meter_id")
                .references("meterid")
                .inTable("parking_meters_master")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table
                .timestamp("updated_at")
                .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("bookings");
};