/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('parking_meters_master', (table) => {
        table.increments('id').primary();
        table.string('meterhead').notNullable();
        table.decimal('r_mf_9a_6p').notNullable();
        table.decimal('r_mf_6p_10').notNullable();
        table.decimal('r_sa_9a_6p').notNullable();
        table.decimal('r_sa_6p_10').notNullable();
        table.decimal('r_su_9a_6p').notNullable();
        table.decimal('r_su_6p_10').notNullable();
        table.decimal('rate_misc');
        table.string('timeineffe').notNullable();
        table.string('t_mf_9a_6p').notNullable();
        table.string('t_mf_6p_10').notNullable();
        table.string('t_sa_9a_6p').notNullable();
        table.string('t_sa_6p_10').notNullable();
        table.string('t_su_9a_6p').notNullable();
        table.string('t_su_6p_10').notNullable();
        table.string('time_misc');
        table.string('creditcard').notNullable();
        table.string('pay_phone').notNullable();
        table.jsonb('geom').notNullable();
        table.string('geo_local_area').notNullable();
        table.string('meterid').notNullable().unique();
        table.jsonb('geo_point_2d').notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
            table
                .timestamp("updated_at")
                .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      })
        .createTable("parking_spots", (table) => {
            table.increments("id").primary();
            table.string("location").notNullable();
            table.string("status").notNullable();
            // table.string('meter_id').notNullable();
            table
                .string("meter_id")
                .references("parking_meters_master.meterid")
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
    return knex.schema.dropTable("parking_spots").dropTable("parking_meters_master");
    // return knex.schema.dropTable("parking_spots");

};