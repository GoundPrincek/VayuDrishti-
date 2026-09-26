const express = require('express');
const { listCyclones, getCyclone, getForecast } = require('../controllers/cycloneController');
const { asyncHandler } = require('../utils/http');

const router = express.Router();
router.get('/', asyncHandler(listCyclones));
router.get('/:id/forecast', asyncHandler(getForecast));
router.get('/:id', asyncHandler(getCyclone));

module.exports = router;
