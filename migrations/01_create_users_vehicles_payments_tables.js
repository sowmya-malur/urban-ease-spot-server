/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("users", (table) => {
            table.increments("id").primary();
            table.string("email").notNullable();
            table.string("password").notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table
                .timestamp("updated_at")
                .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
        })
        .createTable("vehicles", (table) => {
            table.increments("id").primary();
            table.string("make").notNullable();
            table.string("model").notNullable();
            table.string("color").notNullable();
            table.string("license_plate").notNullable();
            table.string("year").notNullable();
            table
                .integer("user_id")
                .unsigned()
                .references("users.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table
                .timestamp("updated_at")
                .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
        })
        .createTable("payments", (table) => {
            table.increments("id").primary();
            table.bigInteger("card_number").notNullable();
            table.string("card_holder_name").notNullable();
            table.timestamp("expiration_date").notNullable();
            table.string("cvv").notNullable();
            table
                .integer("user_id")
                .unsigned()
                .references("users.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table
                .timestamp("updated_at")
                .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("payments").dropTable("vehicles").dropTable("users");
};