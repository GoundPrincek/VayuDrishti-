const cycloneService = require('../services/cycloneService');
const { createHttpError } = require('../utils/http');

function mapExternalError(error, next) {
  if (error?.statusCode === 400 || error?.statusCode === 404) return next(error);
  if (error?.statusCode === 504) return next(createHttpError(504, 'NOAA cyclone service timed out'));
  next(createHttpError(502, 'Unable to retrieve cyclone data'));
}

async function listCyclones(req, res, next) {
  try {
    res.json(await cycloneService.getCyclones());
  } catch (error) {
    mapExternalError(error, next);
  }
}

async function getCyclone(req, res, next) {
  try {
    const cyclone = await cycloneService.getCycloneById(req.params.id);
    res.json({ source: 'NOAA', cyclone });
  } catch (error) {
    mapExternalError(error, next);
  }
}

async function getForecast(req, res, next) {
  try {
    res.json(await cycloneService.getCycloneForecast(req.params.id));
  } catch (error) {
    mapExternalError(error, next);
  }
}

module.exports = { listCyclones, getCyclone, getForecast };
