const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Product = require('@products/Product');

const connection = new Sequelize(dbConfig);

Product.init(connection);

console.log('\nDatabase connection successful!');

module.exports = connection;