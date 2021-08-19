const express = require('express');
const router = express.Router();
const { index, show, save, remove, analytics } = require('@purchases/Purchases.Controller.js');

router.get('/purchase', index)
router.get('/purchase/:id', show)
router.post('/purchase', save)
router.delete('/purchase/:id', remove)
router.get('/purchase/info/analytics', analytics);

module.exports = router;