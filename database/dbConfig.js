const knex = require('knex');

const connection = require('../knexfile.js');
const environment = process.env.DB_ENV || 'development';

module.exports = knex(connection[environment]);
