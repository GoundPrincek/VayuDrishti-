const express = require('express');
const { getWeather, getWeatherGrid } = require('../controllers/weatherController');
const { asyncHandler } = require('../utils/http');

const router = express.Router();
router.get('/', asyncHandler(getWeather));
router.post('/grid', asyncHandler(getWeatherGrid));

module.exports = router;
