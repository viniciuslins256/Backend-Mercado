const express = require('express');
const router = express.Router();
const { index, show, save, update, remove} = require('@products/Products.Controller.js');

router.get('/products', index)
router.get('/products/:id', show)
router.post('/products', save)
router.put('/products/:id', update)
router.delete('/products/:id', remove)

module.exports = router;