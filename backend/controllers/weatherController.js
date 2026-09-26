const weatherService = require('../services/weatherService');
const { createHttpError } = require('../utils/http');

function parseCoordinate(value) {
  if (typeof value !== 'string' || value.trim() === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function validateLocation(latitudeValue, longitudeValue) {
  const latitude = parseCoordinate(latitudeValue);
  const longitude = parseCoordinate(longitudeValue);
  if (latitude === null || longitude === null || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    throw createHttpError(400, 'Invalid latitude or longitude');
  }
  return { latitude, longitude };
}

function mapExternalError(error, next) {
  if (error?.statusCode === 400 || error?.statusCode === 404) return next(error);
  if (error?.statusCode === 504) return next(createHttpError(504, 'Weather service timed out'));
  next(createHttpError(502, 'Unable to retrieve weather data'));
}

async function getWeather(req, res, next) {
  try {
    const location = validateLocation(req.query.lat, req.query.lon);
    const model = req.query.model || 'icon_seamless';
    const weather = await weatherService.getWeather(location.latitude, location.longitude, model);
    res.json(weather);
  } catch (error) {
    mapExternalError(error, next);
  }
}

async function getWeatherGrid(req, res, next) {
  try {
    const { locations, model = 'icon_seamless', hourly = [] } = req.body || {};
    if (!Array.isArray(locations) || locations.length < 1 || locations.length > 81) {
      throw createHttpError(400, 'Weather grid must contain between 1 and 81 locations');
    }
    if (!Array.isArray(hourly) || hourly.length > Object.keys(weatherService.HOURLY_FIELDS).length) {
      throw createHttpError(400, 'Invalid hourly weather variables');
    }
    const validVariables = new Set(Object.values(weatherService.HOURLY_FIELDS));
    if (hourly.some(variable => !validVariables.has(variable))) {
      throw createHttpError(400, 'Invalid hourly weather variables');
    }
    const validatedLocations = locations.map(location => validateLocation(
      String(location?.latitude ?? location?.lat ?? ''),
      String(location?.longitude ?? location?.lon ?? '')
    ));
    const results = await weatherService.getWeatherGrid(validatedLocations, model, hourly);
    res.json({ source: 'Open-Meteo', model, locations: results });
  } catch (error) {
    mapExternalError(error, next);
  }
}

module.exports = { getWeather, getWeatherGrid };
