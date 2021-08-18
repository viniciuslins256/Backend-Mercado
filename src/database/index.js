const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Product = require('@products/Product');
const Purchase = require('@purchase/Purchase');

const connection = new Sequelize(dbConfig);

Product.init(connection);
Purchase.init(connection);

Product.associate(connection.models);
Purchase.associate(connection.models);

console.log('\nDatabase connection successful!');

module.exports = connection;