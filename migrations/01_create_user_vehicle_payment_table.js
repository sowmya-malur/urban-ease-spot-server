/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("user", (table) => {
            table.increments("id").primary();
            table.string("email").notNullable();
            table.string("password").notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table
                .timestamp("updated_at")
                .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
        })
        .createTable("vehicle", (table) => {
            table.increments("id").primary();
            table.string("make").notNullable();
            table.string("model").notNullable();
            table.string("color").notNullable();
            table.string("license_plate").notNullable();
            table.string("year").notNullable();
            table
                .integer("user_id")
                .unsigned()
                .references("user.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table
                .timestamp("updated_at")
                .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
        })
        .createTable("payment", (table) => {
            table.increments("id").primary();
            table.integer("card_number").notNullable();
            table.string("card_holder_name").notNullable();
            table.timestamp("expiration_date").notNullable();
            table.string("cvv").notNullable();
            table
                .integer("user_id")
                .unsigned()
                .references("user.id")
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
    return knex.schema.dropTable("payment").dropTable("vehicle").dropTable("user");
};