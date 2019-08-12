
const { onUpdateTrigger } = require('../knexfile')
const uuid = require('uuid/v4')

const table = 'user'
const roles = [
  'manager', 'admin', 'staff', 'superAdmin'
]

exports.up = function(knex) {
  return knex.schema
    .createTable(table, function (table) {
      table.string('id').primary('id');
      table.string('username', 255).notNullable();
      table.string('password', 255).notNullable();
      table.string('email').unique('email');
      table.enu('roles', roles);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.timestamp("deleted_at");
    })
    .then(() => {
      knex.raw(onUpdateTrigger(table))
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable(table);
};

exports.config = { transaction: false };
