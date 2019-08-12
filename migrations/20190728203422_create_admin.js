const { onUpdateTrigger } = require('../knexfile')
const uuid = require('uuid/v4')

const table = 'admin'

exports.up = function(knex) {
  return knex.schema
    .createTable(table, (table) => {
      table.string('id').primary();
      table.string('user_id').references('id').inTable('user');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable(table)
};
