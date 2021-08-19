const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Product = require('@products/Product');
const Purchase = require('@purchases/Purchase');
const Purchase_product = require('@purchase_product/Purchase_product');

const connection = new Sequelize(dbConfig);

Product.init(connection);
Purchase.init(connection);
Purchase_product.init(connection);


console.log('\nDatabase connection successful!');

module.exports = connection;