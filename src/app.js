const express = require('express');
const productsRoutes = require('./routes/Products.routes');
const purchasesRoutes = require('./routes/Purchases.routes');
const app = express();
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(express.json());

app.use(cors())

app.use(cookieParser());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use('/', productsRoutes, purchasesRoutes);

module.exports = app;