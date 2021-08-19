const express = require('express');
const router = express.Router();
const { index, show, save, remove} = require('@purchases/Purchases.Controller.js');

router.get('/purchase', index)
router.get('/purchase/:id', show)
router.post('/purchase', save)
router.delete('/purchase/:id', remove)

module.exports = router;